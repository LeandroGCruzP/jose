import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material"
import { useState } from "react"

interface ModalDeleteProps {
  id: string
  name: string
}

export function ModalDelete({ id, name }: ModalDeleteProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClickOpen () {
    setIsOpen(true)
  }

  function handleOnClose () {
    setIsOpen(false)
  }

  function onDelete () {
    console.log('record deleted', id)

    handleOnClose()
  }
  
  return (
    <>
      <MenuItem onClick={handleClickOpen}>Eliminar</MenuItem>

      <Dialog open={isOpen} onClose={handleOnClose}>
        <DialogTitle>Eliminar {name}</DialogTitle>
        
        <DialogContent>
            Você tem certeza que deseja eliminar o registro <strong>{name}</strong>?

            <DialogActions>
              <Button onClick={handleOnClose}>
                Cancelar
              </Button>
              <Button color="primary" variant="contained" onClick={onDelete}>
                Salvar
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}