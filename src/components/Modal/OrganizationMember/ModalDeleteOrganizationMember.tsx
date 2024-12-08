import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material"
import { useState } from "react"

interface ModalDeleteOrganizationMemberProps {
  id: number
  name: string
}

export function ModalDeleteOrganizationMember({ id, name }: ModalDeleteOrganizationMemberProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClickOpen () {
    setIsOpen(true)
  }

  function handleOnClose () {
    setIsOpen(false)
  }

  function onDelete () {
    // TODO: Adicona a ação de eliminar o membro com o id
    console.log('Eliminando o membro com o id:', id)

    handleOnClose()
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Eliminar</MenuItem>

      <Dialog open={isOpen} onClose={handleOnClose}>
        <DialogTitle>Eliminar {name}</DialogTitle>

        <DialogContent>
            Tem certeza de que deseja remover o membro <strong>{name}</strong> da organização? Lembre-se de que essa ação é irreversível.
            <DialogActions>
              <Button color="inherit" onClick={handleOnClose}>
                Cancelar
              </Button>
              <Button color="error" variant="contained" onClick={onDelete}>
                Eliminar
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
