'use client'

import { SearchInput } from "@/components/InputSearch"
import { MenuOrganizationMember } from "@/components/Menu/OrganizationMember/MenuOrganizationMember"
import { ModalCreateOrganizationMember } from "@/components/Modal/OrganizationMember/ModalCreateOrganizationMember"
import { Avatar, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { ChangeEvent, useState } from "react"

type Member = {
  id: number
  picture: string
  given_name: string
  family_name: string
  email: string
  phone: string
  birth_date: string
  username: string
}

type OrganizationMembers = Member[]

const organizationMembers: OrganizationMembers = [ // TODO: Substituir por uma chamada à API
  { id: 1, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 2, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 3, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 4, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Kevin', family_name: 'Cruz', email: 'user@user.com', phone: '88888888', birth_date: '1990-01-01', username: 'Leh' },
  { id: 5, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Alexandra', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 6, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Alexandra', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 7, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 8, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 9, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 10, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 11, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 12, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 13, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 14, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 15, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 16, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 17, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 18, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 19, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 20, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 21, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 22, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 23, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 24, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 25, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 26, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 27, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 28, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 29, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
  { id: 30, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh' },
]

export default function Home() {
  const rowsPerPageOptions = [5, 10, 20] // Info: min 3 options
  const defaultRowsPerPage = rowsPerPageOptions[1]

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage)
  const [searchTerm, setSearchTerm] = useState<string>("")

  function handleChangePage (event: unknown, newPage: number): void {
    setPage(newPage)
  }

  function handleChangeRowsPerPage (event: ChangeEvent<HTMLInputElement>): void {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function handleSearchChange (event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const organizationMembersFiltered = Array.isArray(organizationMembers)
    ? organizationMembers.filter((member) => {
        const search = searchTerm.toLowerCase()

        return (
          member.username.toLowerCase().includes(search) ||
          member.given_name.toLowerCase().includes(search) ||
          member.family_name.toLowerCase().includes(search) ||
          member.email.toLowerCase().includes(search) ||
          member.phone.toLowerCase().includes(search)
        )
      })
    : []

  const hasOrganizationMembers = organizationMembersFiltered.length > 0

  const organizationMembersPaginated = organizationMembersFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div>
      <main className="p-4 grid gap-2">
        <Stack direction='row' spacing={{ xs: 1, sm: 2 }}>
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or city"
          />

          {/* TODO: Aqui você colocar o teu modal de criar */}
          <ModalCreateOrganizationMember />
        </Stack>

        {!hasOrganizationMembers ? (
          <p>Não há membros a serem listados</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Foto</TableCell>
                  <TableCell>Usuário</TableCell>
                  <TableCell>Nome Completo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Data de Nascimento</TableCell>
                  <TableCell></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {organizationMembersPaginated.map((member, index) => (
                  <TableRow key={`${index} ${member.username}`} className="group">
                    <TableCell>{member.id}</TableCell>
                    <TableCell>
                      <Avatar src={member.picture} alt={member.given_name} />
                    </TableCell>
                    <TableCell>{member.username}</TableCell>
                    <TableCell>{`${member.given_name} ${member.family_name}`}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      {member.birth_date ? new Date(member.birth_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className="p-0">
                      <MenuOrganizationMember id={member.id} name={`${member.given_name} ${member.family_name}`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={organizationMembers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Registros por página"
            />
          </TableContainer>
        )}
      </main>
    </div>
  )
}
