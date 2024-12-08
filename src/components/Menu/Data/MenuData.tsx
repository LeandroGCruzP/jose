import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MenuIcon } from '@/components/icons/MenuIcon'
import { ModalDelete } from '@/components/Modal/Data/ModalDelete'

interface MenuDataProps {
  id: string
  name: string
}

export function MenuData({ id, name }: MenuDataProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
    <button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={
          `hover:bg-gray-100 p-1 rounded-full group-hover:opacity-100 transition-opacity cursor-pointer relative top-[0.15rem]
          ${open ? 'opacity-100' : 'opacity-0'}
          `
        }
    >
        <MenuIcon width={20} height={20} />
    </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        style={{ marginTop: '30px', marginLeft: '-5px' }}
      >
        <ModalDelete id={id} name={name} />
        <MenuItem onClick={handleClose}>Compartilhar</MenuItem>
        <MenuItem onClick={handleClose}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}