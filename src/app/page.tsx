'use client'

import { LockIcon } from "@/components/icons/LockIcon"
import { UnlockIcon } from "@/components/icons/UnlockIcon"
import { SearchInput } from "@/components/InputSearch"
import { MenuOrganizationMember } from "@/components/Menu/MenuOrganizationMember"
import { ModalCreateOrganizationMember } from "@/components/Modal/OrganizationMember/ModalCreateOrganizationMember"
import { Avatar, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { ChangeEvent, MouseEvent, useState } from "react"

type Member = {
  id: number
  picture: string
  given_name: string
  family_name: string
  email: string
  phone: string
  birth_date: string
  username: string
  enable: boolean
}

type EnableTab = 'active' | 'inactive'

type OrganizationMembers = Member[]

const organizationMembers: OrganizationMembers = [ // TODO: Substituir por uma chamada à API
  { id: 1, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 2, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 3, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 4, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Kevin', family_name: 'Cruz', email: 'user@user.com', phone: '88888888', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 5, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Alexandra', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 6, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Alexandra', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 7, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 8, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 9, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 10, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 11, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 12, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 13, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 14, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 15, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 16, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 17, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 18, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 19, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 20, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: false },
  { id: 21, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 22, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 23, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 24, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 25, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 26, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 27, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 28, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 29, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
  { id: 30, picture: 'https://github.com/leandrogcruzp.png', given_name: 'Leandro', family_name: 'Cruz', email: 'user@user.com', phone: '999999999', birth_date: '1990-01-01', username: 'Leh', enable: true },
]

export default function Home() {
  const rowsPerPageOptions = [5, 10, 20] // Info: min 3 options
  const defaultRowsPerPage = rowsPerPageOptions[1]

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [enableTab, setEnableTab] = useState<EnableTab>('active')

  const organizationMembersActive = organizationMembers.filter((member) => member.enable) // TODO: Membros filtros por ativo
  const organizationMembersInactive = organizationMembers.filter((member) => !member.enable) // TODO: Membros filtros por inativo

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

  const organizationMembersFilteredActive = Array.isArray(organizationMembersFiltered)
    ? organizationMembers.filter((member) => member.enable)
    : []

  const organizationMembersFilteredInactive = Array.isArray(organizationMembersFiltered)
    ? organizationMembers.filter((member) => !member.enable)
    : []

  const hasOrganizationMembersActive = organizationMembersFiltered.some((member) => member.enable)
  const hasOrganizationMembersInactive = organizationMembersFiltered.some((member) => !member.enable)

  const organizationMembersActivePaginated = organizationMembersFilteredActive.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )
  const organizationMembersInactivePaginated = organizationMembersFilteredInactive.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  function handleChangeEnableTab (event: MouseEvent<HTMLElement>): void {
    setEnableTab(event.target.value)
  }

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

  function onChangeStatus (status: EnableTab): void {
    console.log(status) // TODO: Alterar o status do membro na API
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

          {/* TODO: Aqui você colocar o teu modal de criar */}
          <ModalCreateOrganizationMember />
        </Stack>

        <Stack direction='column' spacing={{ xs: 1, sm: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value=""
            exclusive
            onChange={handleChangeEnableTab}
            aria-label="Platform"
          >
            <ToggleButton className={`flex items-center gap-2 ${enableTab === 'active' ? '' : 'bg-gray-200'}`} value="active">
              {/* <div className="flex items-center gap-2"> */}
                <UnlockIcon width={16} height={16} />
                Ativo ({organizationMembersActive.length})
              {/* </div> */}
            </ToggleButton>
            <ToggleButton className={`flex items-center gap-2 ${enableTab === 'inactive' ? '' : 'bg-gray-200'}`} value="inactive">
              <LockIcon width={16} height={16} /> {' '}
              Inativo ({organizationMembersInactive.length})
            </ToggleButton>
          </ToggleButtonGroup>

          {enableTab === 'active' && (
            !hasOrganizationMembersActive ? (
              <p className="text-black">Não há membros ativos a serem listados</p>
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
                      <TableCell>Status</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {organizationMembersActivePaginated.map((member, index) => (
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
                        <TableCell>
                          <div onClick={() => onChangeStatus('inactive')}>
                            <UnlockIcon width={20} height={20} className="cursor-pointer" />
                          </div>
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
                  count={organizationMembersActive.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Registros por página"
                />
              </TableContainer>
            )
          )}

          {enableTab === 'inactive' && (
            !hasOrganizationMembersInactive ? (
              <p className="text-black">Não há membros inativos a serem listados</p>
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
                      <TableCell>Statue</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {organizationMembersInactivePaginated.map((member, index) => (
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
                        <TableCell>
                          <div onClick={() => onChangeStatus('active')}>
                            <LockIcon width={20} height={20} className="cursor-pointer" />
                          </div>
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
                  count={organizationMembersInactive.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Registros por página"
                />
              </TableContainer>
            )
          )}
        </Stack>
      </main>
    </div>
  )
}
