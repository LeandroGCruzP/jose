import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type Member = {
  id: string
  name: string
  age: number
  city: string
}

export function ModalCreateOrganizationMember() {
  const [isOpen, setIsOpen] = useState(false)
  const [newMember, setNewMember] = useState<Member>({
    id: "",
    name: "",
    age: 0,
    city: "",
  })

  function handleChange (field: keyof Member, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setNewMember({ ...newMember, [field]: event.target.value })
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
    console.log('Criando o membro:', newMember)

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
              value={newMember.id}
              onChange={(e) => handleChange("id", e)}
            />
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={newMember.name}
              onChange={(e) => handleChange("name", e)}
            />
            <TextField
              label="Idade"
              fullWidth
              margin="normal"
              type="number"
              value={newMember.age}
              onChange={(e) => handleChange("age", e)}
            />
            <TextField
              label="Cidade"
              fullWidth
              margin="normal"
              value={newMember.city}
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
