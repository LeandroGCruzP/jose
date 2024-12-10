'use client'

import { SearchInput } from "@/components/InputSearch"
import { MenuGroup } from "@/components/Menu/MenuGroup"
import { ModalCreateGroup } from "@/components/Modal/Group/ModalCreateGroup"
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { ChangeEvent, useState } from "react"

const groups = [
  { id: 1, organization_id: 1, team_name: 'Team 1', created_at: new Date() },
  { id: 2, organization_id: 1, team_name: 'Team 2', created_at: new Date() },
  { id: 3, organization_id: 2, team_name: 'Team 3', created_at: new Date() },
  { id: 4, organization_id: 2, team_name: 'Team 4', created_at: new Date() },
  { id: 5, organization_id: 3, team_name: 'Team 5', created_at: new Date() },
  { id: 6, organization_id: 3, team_name: 'Team 6', created_at: new Date() },
  { id: 7, organization_id: 4, team_name: 'Team 7', created_at: new Date() },
  { id: 8, organization_id: 4, team_name: 'Team 8', created_at: new Date() },
  { id: 9, organization_id: 5, team_name: 'Team 9', created_at: new Date() },
  { id: 10, organization_id: 5, team_name: 'Team 10', created_at: new Date() },
  { id: 11, organization_id: 6, team_name: 'Team 11', created_at: new Date() },
  { id: 12, organization_id: 6, team_name: 'Team 12', created_at: new Date() },
  { id: 13, organization_id: 7, team_name: 'Team 13', created_at: new Date() },
  { id: 14, organization_id: 7, team_name: 'Team 14', created_at: new Date() },
  { id: 15, organization_id: 8, team_name: 'Team 15', created_at: new Date() },
  { id: 16, organization_id: 8, team_name: 'Team 16', created_at: new Date() },
  { id: 17, organization_id: 9, team_name: 'Team 17', created_at: new Date() },
  { id: 18, organization_id: 9, team_name: 'Team 18', created_at: new Date() },
  { id: 19, organization_id: 10, team_name: 'Team 19', created_at: new Date() },
  { id: 20, organization_id: 10, team_name: 'Team 20', created_at: new Date() },
  { id: 21, organization_id: 11, team_name: 'Team 21', created_at: new Date() },
  { id: 22, organization_id: 11, team_name: 'Team 22', created_at: new Date() },
  { id: 23, organization_id: 12, team_name: 'Team 23', created_at: new Date() },
  { id: 24, organization_id: 12, team_name: 'Team 24', created_at: new Date() },
  { id: 25, organization_id: 13, team_name: 'Team 25', created_at: new Date() },
]

// new team
// const data = { team_id: 0, member_id: 0 }

export default function Group() {
  const rowsPerPageOptions = [5, 10, 20] // Info: min 3 options
  const defaultRowsPerPage = rowsPerPageOptions[1]

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const groupsFiltered = Array.isArray(groups)
    ? groups.filter((member) => {
        const search = searchTerm.toLowerCase()

        return (
          member.id.toString().toLowerCase().includes(search) ||
          member.organization_id.toString().toLowerCase().includes(search) ||
          member.team_name.toLowerCase().includes(search)
        )
      })
    : []

  const groupsPaginated = groupsFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

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

  return (
    <div>
      <main className="p-4 grid gap-2">
        <Stack direction='row' spacing={{ xs: 1, sm: 2 }}>
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or city"
          />

          <ModalCreateGroup />
        </Stack>

        <Stack direction='column' spacing={{ xs: 1, sm: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Organização</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {groupsPaginated.map((group, index) => (
                  <TableRow key={`${index} ${group.team_name}`} className="group">
                    <TableCell>{group.id}</TableCell>
                    {/* TODO: Acho que aqui você fará o join para pegar o nome da organização. Lembra de trocar na busca também o filtro para o nome da org */}
                    <TableCell>{group.organization_id}</TableCell>
                    <TableCell>{group.team_name}</TableCell>
                    <TableCell className="p-0">
                      <MenuGroup id={group.id} name={group.team_name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={groups.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Registros por página"
            />
          </TableContainer>
        </Stack>
      </main>
    </div>
  )
}
