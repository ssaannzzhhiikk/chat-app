import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
            backgroundColor: 'white',
            '&:hover':{backgroundColor: '#D3D3D3'},
            borderRadius: '50%',
            width: 40,
            height: 40,
            minWidth: 0,
            color: "black"
            }}
        
      >
        <p className='font-bold text-2xl'>⋮</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <div>
            <MenuItem onClick={handleClose}>Contact info</MenuItem>
            <MenuItem onClick={handleClose}>Select messages</MenuItem>
            <hr />
            <MenuItem onClick={handleClose}
                sx={{
                    '&:hover': {backgroundColor: '#ec644b'}
                }}
            >Clear chat</MenuItem>

            <MenuItem onClick={handleClose}
                sx={{
                    '&:hover': {backgroundColor: '#ec644b'}
                }}
            >Delete chat</MenuItem>
        </div>
        
      </Menu>
    </div>
  );
}
