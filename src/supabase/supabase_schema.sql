-- 👤 Таблица профилей пользователей
create table if not exists profiles (
  id uuid primary key references auth.users(id),
  username text
);

-- 💬 Таблица сообщений
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid references private_chats(id),
  sender_id uuid references auth.users(id),
  receiver_id uuid,
  content text not null,
  created_at timestamptz default now()
);

-- 👥 Таблица приватных чатов
create table if not exists private_chats (
  id uuid primary key default uuid_generate_v4(),
  user1_id uuid references auth.users(id),
  user2_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- 🧠 Функция: создать профиль при регистрации
create or replace function handle_new_user()
returns trigger
language plpgsql
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$;

-- 📜 Функция: получить список чатов с последним сообщением
create or replace function get_chatlist_with_last_message(user_id uuid)
returns table (
  chat_id uuid,
  partner_id uuid,
  partner_username text,
  last_content text,
  last_created_at timestamp
)
language plpgsql
as $$
begin
  return query
  select
    pc.id,
    case
      when pc.user1_id = user_id then pc.user2_id
      else pc.user1_id
    end,
    case
      when pc.user1_id = user_id then p2.username
      else p1.username
    end,
    lm.content,
    lm.created_at
  from private_chats pc
  join profiles p1 on pc.user1_id = p1.id
  join profiles p2 on pc.user2_id = p2.id
  left join (
    select distinct on (chat_id) *
    from messages
    order by chat_id, created_at desc
  ) lm on lm.chat_id = pc.id
  where pc.user1_id = user_id or pc.user2_id = user_id;
end;
$$;

-- 📜 Функция: получить пользователей с последним сообщением
create or replace function get_users_with_last_message(current_user_id uuid)
returns table (
  id uuid,
  username text,
  chat_id uuid,
  sender_id uuid,
  content text,
  created_at timestamptz
)
language plpgsql
as $$
begin
  return query
  select 
    p.id,
    p.username,
    m.chat_id,
    m.sender_id,
    m.content,
    m.created_at
  from profiles p
  join private_chats pc 
    on (pc.user1_id = p.id or pc.user2_id = p.id)
  join (
    select distinct on (chat_id) *
    from messages
    order by chat_id, created_at desc
  ) m on m.chat_id = pc.id
  where p.id != current_user_id and (pc.user1_id = current_user_id or pc.user2_id = current_user_id);
end;
$$;

-- 🔒 Включаем RLS и политики
alter table messages enable row level security;

create policy "Users can insert their own messages"
on messages for insert
using (auth.uid() = sender_id);

create policy "Users can read messages if participant"
on messages for select
using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);
