import React from 'react'
import { MenuItem, Select } from '@material-ui/core'

export const LanguageSelector = ({ value, onChange }) => {
  return (
    <Select
      inputProps={{
        name: 'language_id',
        id: 'language_id',
      }}
      value={value}
      onChange={onChange}
    >
      <MenuItem value={'zh-CN'}>Chinese</MenuItem>
      <MenuItem value={'da'}>Danish</MenuItem>
      <MenuItem value={'nl'}>Dutch</MenuItem>
      <MenuItem value={'en'}>English</MenuItem>
      <MenuItem value={'fr'}>French</MenuItem>
      <MenuItem value={'de'}>German</MenuItem>
      <MenuItem value={'it'}>Italian</MenuItem>
      <MenuItem value={'es'}>Spanish</MenuItem>
    </Select>
  )
}
