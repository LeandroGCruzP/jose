'use client'

import { SearchInput } from "@/components/InputSearch"
import {MenuData} from "@/components/Menu/Data/MenuData"
import { ModalCreateRecord } from "@/components/Modal/Data/ModalCreateData"
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import Fuse from 'fuse.js'
import { ChangeEvent, useState } from "react"

const apiData = [
  { id: 1, name: "John Doe", age: 28, city: "New York" },
  { id: 2, name: "Jane Smith", age: 34, city: "Los Angeles" },
  { id: 3, name: "Mike Brown", age: 23, city: "Chicago" },
  { id: 4, name: "Emily White", age: 30, city: "Houston" },
  { id: 5, name: "David Lee", age: 27, city: "Miami" },
  { id: 6, name: "Sarah Wilson", age: 31, city: "San Francisco" },
  { id: 7, name: "James Taylor", age: 29, city: "Seattle" },
  { id: 8, name: "Linda Anderson", age: 32, city: "Boston" },
  { id: 9, name: "Robert Thomas", age: 26, city: "Denver" },
  { id: 10, name: "Karen Hall", age: 33, city: "Dallas" },
  { id: 11, name: "Daniel Young", age: 25, city: "Phoenix" },
  { id: 12, name: "Chris Evans", age: 35, city: "Atlanta" },
  { id: 13, name: "Natalie Portman", age: 29, city: "Austin" },
  { id: 14, name: "Tom Hanks", age: 40, city: "Orlando" },
  { id: 15, name: "Scarlett Johansson", age: 28, city: "San Diego" },
  { id: 16, name: "Robert Downey Jr.", age: 45, city: "Las Vegas" },
  { id: 17, name: "Chris Hemsworth", age: 37, city: "Portland" },
  { id: 18, name: "Mark Ruffalo", age: 42, city: "Salt Lake City" },
  { id: 19, name: "Jeremy Renner", age: 38, city: "Charlotte" },
  { id: 20, name: "Paul Rudd", age: 36, city: "Indianapolis" },
  { id: 21, name: "Brie Larson", age: 31, city: "Columbus" },
  { id: 22, name: "Chadwick Boseman", age: 43, city: "Detroit" },
  { id: 23, name: "Benedict Cumberbatch", age: 39, city: "Memphis" },
  { id: 24, name: "Tom Holland", age: 25, city: "Louisville" },
  { id: 25, name: "Elizabeth Olsen", age: 32, city: "Baltimore" },
  { id: 26, name: "Anthony Mackie", age: 41, city: "Milwaukee" },
  { id: 27, name: "Sebastian Stan", age: 37, city: "Albuquerque" },
  { id: 28, name: "Don Cheadle", age: 46, city: "Tucson" },
  { id: 29, name: "Karen Gillan", age: 33, city: "Fresno" },
  { id: 30, name: "Zoe Saldana", age: 34, city: "Sacramento" },
  { id: 31, name: "Dave Bautista", age: 36, city: "Kansas City" },
  { id: 32, name: "Vin Diesel", age: 48, city: "Mesa" },
  { id: 33, name: "Bradley Cooper", age: 40, city: "Atlanta" },
  { id: 34, name: "Josh Brolin", age: 50, city: "Omaha" },
  { id: 35, name: "Chris Pratt", age: 38, city: "Raleigh" },
  { id: 36, name: "Zachary Levi", age: 39, city: "Miami" },
  { id: 37, name: "Gal Gadot", age: 35, city: "Long Beach" },
  { id: 38, name: "Henry Cavill", age: 37, city: "Virginia Beach" },
  { id: 39, name: "Jason Momoa", age: 41, city: "Oakland" },
  { id: 40, name: "Ezra Miller", age: 28, city: "Minneapolis" }
]

export default function Home() {
  const hasData = apiData.length > 0
  const rowsPerPageOptions = [5, 10, 20] // Info: min 3 options
  const defaultRowsPerPage = rowsPerPageOptions[1]
  const keysSearchTerm = ["id", "name", "age", "city"]
  const fuse = new Fuse(apiData, {
    keys: keysSearchTerm,
    threshold: 0.3,
  })

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

  const filteredData = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : apiData

  const paginatedData = filteredData.slice(
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

          <ModalCreateRecord />
        </Stack>

        {!hasData ? (
          <p>Não há dados a serem listados</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Edade</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.id} className="group">
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell className="p-0">
                      <MenuData />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={apiData.length}
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
