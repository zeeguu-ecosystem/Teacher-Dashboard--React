import React from 'react'
import { TextField } from '@material-ui/core'

export const CohortNameTextfield = ({ value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      name="cohort_name"
      id="cohort_name"
      label="Name of class"
      fullWidth
      type="text"
      required
    />
  )
}

export const InviteCodeTextfield = ({ value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      name="invite_code"
      id="invite_code"
      label="Invite Code"
      fullWidth
      type="text"
      required
    />
  )
}
export const StudentNumberTextField = ({ value, onChange, cohort }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      name="max_students"
      id="max_students"
      label="Maximum number of students"
      fullWidth
      type="number"
      required
      disabled={!!cohort}
    />
  )
}
