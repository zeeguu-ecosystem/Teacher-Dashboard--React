import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  SnackbarContent,
  TextField
} from '@material-ui/core'
import { navigate } from '@reach/router'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { SpringSpinner } from 'react-epic-spinners'
import { createCohort, deleteCohort, updateCohort } from '../api/apiCohort'
import { languageMap } from '../utilities/helpers'

const ClassForm = ({ primaryButtonText, cohort, isError, onSubmit }) => {
  const [errorState, setErrorState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputLabelRef = React.useRef(null)
  let curState = {}
  // If the form is being edited it already has data, so fill the inputs with that
  if (cohort) {
    curState = {
      id: cohort.id,
      class_name: cohort.name,
      invite_code: cohort.inv_code,
      language_id: languageMap[cohort.language_name],
      max_students: cohort.max_students,
      labelWidth: 0
    }
  } else {
    curState = {
      class_name: '',
      invite_code: '',
      language_id: 'es',
      max_students: 20,
      labelWidth: 0
    }
  }

  const [state, setState] = useState(curState)

  React.useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth
    })
  }, [])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function setupForm() {
    const form = new FormData()
    form.append('name', state.class_name)
    form.append('inv_code', state.invite_code)
    form.append('max_students', state.max_students)
    form.append('language_id', state.language_id)
    return form
  }

  function submitForm(event) {
    setErrorState(false)
    setIsLoading(true)

    const form = setupForm()
    onSubmit(form)
    // setTimeout(() => onSubmit(form), 2000)

    // if (cohort) {
    //   updateCohort(form, cohort.id)
    //     .then(res => {
    //       setTimeout(() => doneUpdating(), 2000)
    //     })
    //     .catch(err => setErrorState(true))
    // } else {
    //   createCohort(form)
    //     .then(res => {
    //       setTimeout(() => closemodal(), 2000)
    //     })
    //     .catch(err => setErrorState(true))
    // }
    event.preventDefault()
  }

  return (
    <div>
      <MySnackbar />
      <form onSubmit={submitForm} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField
          value={state.class_name}
          onChange={handleChange}
          name="class_name"
          id="class_name"
          label="Name of class"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.invite_code}
          onChange={handleChange}
          name="invite_code"
          id="invite_code"
          label="Invite Code"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.max_students}
          onChange={handleChange}
          name="max_students"
          id="max_students"
          label="Maximum number of students"
          fullWidth
          type="number"
          required
          disabled={!!cohort}
        />
        <FormControl
          fullWidth
          disabled={!!cohort}
          required
          style={{ minWidth: 120 }}
        >
          <InputLabel ref={inputLabelRef} htmlFor="language_id">
            Language
          </InputLabel>
          <Select
            inputProps={{
              name: 'language_id',
              id: 'language_id'
            }}
            value={state.language_id}
            onChange={handleChange}
          >
            <MenuItem value={'de'}>German</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
            <MenuItem value={'fr'}>French</MenuItem>
            <MenuItem value={'nl'}>Dutch</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'it'}>Italian</MenuItem>
            <MenuItem value={'zh-CN'}>Chinese</MenuItem>
          </Select>
        </FormControl>
        {isError && <Error setLoading={setIsLoading} />}
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {isLoading ? <SpringSpinner size={24} /> : primaryButtonText}
        </Button>
      </form>
      {cohort && <DangerZone id={cohort.id} />}
    </div>
  )
}

const MySnackbar = () => {
  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(true)
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ backgroundColor: 'green' }}
          aria-describedby="client-snackbar"
          message={
            <span
              id="client-snackbar"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'white'
              }}
            >
              Test hello
            </span>
          }
        />
      </Snackbar>
    </div>
  )
}

const Error = ({ setLoading }) => {
  setLoading(false)
  return (
    <p style={{ color: 'red' }}>
      A class with that invite code already exists. Please pick another one.
    </p>
  )
}

const DangerZone = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  function deleteClass(id) {
    setIsDeleting(true)
    deleteCohort(id)
      .then(() => setTimeout(() => navigate('/'), 2000))
      .catch(err => console.log('failed to delete class', err))
  }

  return (
    <div style={{ marginTop: 60 }}>
      <h3>Danger zone</h3>
      <p>Press the button to delete the class. The class must be empty. </p>
      <Button
        style={{ marginTop: 10 }}
        onClick={() => deleteClass(id)}
        variant="contained"
        color="secondary"
      >
        {isDeleting ? <SpringSpinner size={24} /> : 'Delete Class'}
      </Button>
    </div>
  )
}

export default ClassForm
