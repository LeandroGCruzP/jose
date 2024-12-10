import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type Group = {
  id: string
  name: string
  age: number
  city: string
}

export function ModalCreateGroup() {
  const [isOpen, setIsOpen] = useState(false)
  const [newGroup, setNewGroup] = useState<Group>({
    id: "",
    name: "",
    age: 0,
    city: "",
  })

  function handleChange (field: keyof Group, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setNewGroup({ ...newGroup, [field]: event.target.value })
  }

  function handleClickOpen (): void {
    setIsOpen(true)
  }

  function handleOnClose (): void {
    setIsOpen(false)
  }

  function onSubmit (event: React.FormEvent): void {
    event.preventDefault()

    // TODO: Adicona a ação de criar o membro
    console.log('Criando o membro:', newGroup)

    handleOnClose()
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Criar
      </Button>

      <Dialog open={isOpen} onClose={handleOnClose}>
        <DialogTitle>Adicionar Novo Membro</DialogTitle>

        <DialogContent>
          <form onSubmit={onSubmit}>
            <TextField
              label="ID"
              fullWidth
              margin="normal"
              value={newGroup.id}
              onChange={(e) => handleChange("id", e)}
            />
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={newGroup.name}
              onChange={(e) => handleChange("name", e)}
            />
            <TextField
              label="Idade"
              fullWidth
              margin="normal"
              type="number"
              value={newGroup.age}
              onChange={(e) => handleChange("age", e)}
            />
            <TextField
              label="Cidade"
              fullWidth
              margin="normal"
              value={newGroup.city}
              onChange={(e) => handleChange("city", e)}
            />

            <DialogActions>
              <Button onClick={handleOnClose}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Criar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
