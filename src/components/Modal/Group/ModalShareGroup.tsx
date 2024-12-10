import { BlockIcon } from "@/components/icons/BlockIcon"
import { DeleteIcon } from "@/components/icons/DeleteIcon"
import { SearchInput } from "@/components/InputSearch"
import { Button, Dialog, DialogContent, DialogTitle, MenuItem } from "@mui/material"
import { ChangeEvent, useState } from "react"

interface ModalShareGroupProps {
  id: number
  name: string
}

const members = [
  { id: 1, email: 'member_1@hotmail.com' },
  { id: 2, email: 'member_2@hotmail.com' },
  { id: 3, email: 'member_3@hotmail.com' },
  { id: 4, email: 'member_4@hotmail.com' },
  { id: 5, email: 'member_5@hotmail.com' },
  { id: 6, email: 'member_6@hotmail.com' },
  { id: 7, email: 'member_7@hotmail.com' },
  { id: 8, email: 'member_8@hotmail.com' },
  { id: 9, email: 'member_9@hotmail.com' },
  { id: 10, email: 'member_10@hotmail.com' },
  { id: 11, email: 'member_11@hotmail.com' },
  { id: 12, email: 'member_12@hotmail.com' },
  { id: 13, email: 'member_13@hotmail.com' },
  { id: 14, email: 'member_14@hotmail.com' },
  { id: 15, email: 'member_15@hotmail.com' },
  { id: 16, email: 'member_16@hotmail.com' },
  { id: 17, email: 'member_17@hotmail.com' },
  { id: 18, email: 'member_18@hotmail.com' },
  { id: 19, email: 'member_19@hotmail.com' },
  { id: 20, email: 'member_20@hotmail.com' },
  { id: 21, email: 'member_21@hotmail.com' },
  { id: 22, email: 'member_22@hotmail.com' },
  { id: 23, email: 'member_23@hotmail.com' },
  { id: 24, email: 'member_24@hotmail.com' },
]

export function ModalShareGroup({ id, name }: ModalShareGroupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const countMembers = members.length

  function handleClickOpen () {
    setIsOpen(true)
  }

  function handleOnClose () {
    setIsOpen(false)
  }

  function handleSearchChange (event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value)
  }

  function onShare () {
    // TODO: Adicona a ação de eliminar o grupo com o id
    console.log('Compartilhando o groupo com o id:', id)
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Compartilhar</MenuItem>

      <Dialog open={isOpen} onClose={handleOnClose} fullWidth>
        <DialogTitle>Compartilhar {name}</DialogTitle>

        <DialogContent>
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or city"
          />

          <span>Membros compartilhados ({ countMembers })</span>

          <div className="max-h-[50vh] overflow-y-auto rounded-md border">
            {members
              .filter((member) => member.email.includes(searchTerm))
              .map((member) => (
                <Line key={member.id} id={member.id} label={member.email} />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface LineProps {
  id: number
  label: string
}

export function Line({ id, label }: LineProps) {
  const [isBloquing, setIsBloquing] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  function onDelete () {
    // TODO: Adicona a ação de eliminar o grupo com o id
    console.log('Eliminando o groupo com o id:', id)

    setIsDeleting(false)
  }

  function onBlock () {
    // TODO: Adicona a ação de bloquear o grupo com o id
    console.log('Bloqueando o groupo com o id:', id)

    setIsBloquing(false)
  }

  return (
    <div className="border-b flex items-center gap-2 justify-between px-2 h-11 group">
      <span>{label}</span>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
        {isBloquing && (
          <Button color="secondary" variant="contained" onClick={onBlock} size="small">
            Bloquear
          </Button>
        )}

        {isDeleting && (
          <Button color="error" variant="contained" onClick={onDelete} size="small">
            Eliminar
          </Button>
        )}

        {!isBloquing && !isDeleting && (
          <>
            <button
              onClick={() => setIsBloquing(true)}
              className="hover:bg-gray-100 p-1 rounded-full group-hover:opacity-100 transition-opacity cursor-pointer relative top-[0.15rem]"
            >
              <BlockIcon width={18} height={18} />
            </button>

            <button
              onClick={() => setIsDeleting(true)}
              className="hover:bg-gray-100 p-1 rounded-full group-hover:opacity-100 transition-opacity cursor-pointer relative top-[0.15rem]"
            >
              <DeleteIcon width={18} height={18} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
