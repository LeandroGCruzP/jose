import { TextField } from "@mui/material"
import { ChangeEvent } from "react"

interface SearchInputProps {
  label?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export function SearchInput({ onChange, value }: SearchInputProps) {
  return (
    <TextField
      label="Buscar"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder="Digite para buscar..."
    />
  )
}
