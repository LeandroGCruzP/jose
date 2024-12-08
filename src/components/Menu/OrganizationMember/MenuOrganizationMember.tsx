import { MenuIcon } from '@/components/icons/MenuIcon'
import { ModalDeleteOrganizationMember } from '@/components/Modal/OrganizationMember/ModalDeleteOrganizationMember'
import Menu from '@mui/material/Menu'
import { MouseEvent, useState } from 'react'

interface MenuOrganizationMemberProps {
  id: number
  name: string
}

export function MenuOrganizationMember({ id, name }: MenuOrganizationMemberProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleClick (event: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(): void {
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
        className={`
          hover:bg-gray-100 p-1 rounded-full group-hover:opacity-100 transition-opacity cursor-pointer relative top-[0.15rem]
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
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
        <ModalDeleteOrganizationMember id={id} name={name} />
      </Menu>
    </>
  )
}
