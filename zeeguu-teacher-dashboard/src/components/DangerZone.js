import React, {useState} from 'react'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'
import { Button } from '@material-ui/core'

import { SpringSpinner } from 'react-epic-spinners'
import { deleteCohort as deleteCohortAPI } from '../api/apiCohort'
import { Error } from './Error'

export const DangerZone = ({ cohortId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
  
    function deleteCohort(cohortId) {
      setIsLoading(true)
      setIsError(false)
      deleteCohortAPI(cohortId)
        .then(res => {
          toast('👩‍🎓 The class was deleted!', {
            type: toast.TYPE.SUCCESS
          })
          navigate(`/${process.env.REACT_APP_ROOT_NAME}`)
        })
        .catch(err => {
          toast('🤨 The class could not be deleted', {
            type: toast.TYPE.ERROR
          })
          setIsError(true)
        })
    }
  
    return (
      <div style={{ marginTop: 60 }}>
        <h3>Danger zone</h3>
        <p>Press the button to delete the class. The class must be empty. </p>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => deleteCohort(cohortId)}
          variant="contained"
          color="secondary"
        >
          {isLoading ? <SpringSpinner size={24} /> : 'Delete Class'}
        </Button>
        {isError && (
          <Error
            message={`You can't delete a class that has students or files.`}
            setLoading={setIsLoading}
          />
        )}
      </div>
    )
  }