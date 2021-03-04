import { Button, FormControl, InputLabel} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SpringSpinner } from 'react-epic-spinners'
import { Error } from './Error'
import { DangerZone } from './DangerZone'
import { languageMap } from '../helpers/sharedHelperMaps'
import { LanguageSelector } from './LanguageSelector'
import {
  CohortNameTextfield,
  InviteCodeTextfield,
  StudentNumberTextField,
} from './CohortFormTextFields'

const CohortForm = ({ primaryButtonText, cohort, isError, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false)
  const inputLabelRef = React.useRef(null)

  const [state, setState] = useState({
    id: cohort ? cohort.id : '',
    cohort_name: cohort ? cohort.name : '',
    invite_code: cohort ? cohort.inv_code : '',
    language_id: cohort ? languageMap[cohort.language_name] : 'es',
    max_students: cohort ? cohort.max_students : 20,
    labelWidth: 0,
  })

  useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth,
    })
  }, [])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function setupForm() {
    const form = new FormData()
    form.append('name', state.cohort_name)
    form.append('inv_code', state.invite_code)
    form.append('max_students', state.max_students)
    form.append('language_id', state.language_id)
    return form
  }

  function submitForm(event) {
    setIsLoading(true)
    const form = setupForm()
    onSubmit(form)
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitForm} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <CohortNameTextfield
          value={state.cohort_name}
          onChange={handleChange}
        />
        <InviteCodeTextfield
          value={state.invite_code}
          onChange={handleChange}
        />
        <StudentNumberTextField
          value={state.max_students}
          onChange={handleChange}
          cohort={cohort}
        />
        <FormControl
          fullWidth
          disabled={!!cohort}
          required
          style={{ minWidth: 120 }}
        >
          <InputLabel ref={inputLabelRef} htmlFor="language_id">
            Learned Language
          </InputLabel>
          <LanguageSelector value={state.language_id} onChange={handleChange} />
        </FormControl>
        {isError && (
          <Error
            message={
              'Something went wrong. Maybe the invite code is already in use.'
            }
            setLoading={setIsLoading}
          />
        )}
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {isLoading ? <SpringSpinner size={24} /> : primaryButtonText}
        </Button>
      </form>
      {cohort && <DangerZone cohortId={cohort.id} />}
    </div>
  )
}

export default CohortForm
