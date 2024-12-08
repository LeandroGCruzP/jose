import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type Record = {
  id: string
  name: string
  age: number
  city: string
}

// interface ModalCreateRecordProps {
  // onClose: () => void
// }

export function ModalCreateRecord() {
  const [newRecord, setNewRecord] = useState<Record>({
    id: "",
    name: "",
    age: 0,
    city: "",
  })

  function handleChange (field: keyof Record, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setNewRecord({ ...newRecord, [field]: event.target.value })
  }

  function onSubmit (event: React.FormEvent) {
    event.preventDefault()

    console.log(newRecord)
  }

  const [isOpen, setIsOpen] = useState(false)

  function handleClickOpen () {
    setIsOpen(true)
  }

  function handleOnClose () {
    setIsOpen(false)
  }
  
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Criar
      </Button>

      <Dialog open={isOpen} onClose={handleOnClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        
        <DialogContent>
            <form onSubmit={onSubmit}>
            <TextField
              label="ID"
              fullWidth
              margin="normal"
              value={newRecord.id}
              onChange={(e) => handleChange("id", e)}
            />
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={newRecord.name}
              onChange={(e) => handleChange("name", e)}
            />
            <TextField
              label="Idade"
              fullWidth
              margin="normal"
              type="number"
              value={newRecord.age}
              onChange={(e) => handleChange("age", e)}
            />
            <TextField
              label="Cidade"
              fullWidth
              margin="normal"
              value={newRecord.city}
              onChange={(e) => handleChange("city", e)}
            />

            <DialogActions>
              <Button onClick={handleOnClose}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Salvar
              </Button>
            </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </>
  )
}