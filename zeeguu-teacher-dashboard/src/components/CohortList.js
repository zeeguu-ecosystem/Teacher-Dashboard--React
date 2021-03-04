import { Button, Dialog, DialogContent } from '@material-ui/core'
import React, { useState } from 'react'
import { MdAddCircle } from 'react-icons/md/'
import { createCohort } from '../api/apiCohort'
import CohortForm from './CohortForm'
import { CohortItemCard } from './CohortItemCard'
import { toast } from 'react-toastify'

import '../assets/styles/components/cohortList.scss'

const CohortList = ({ cohorts, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  const addCohort = form => {
    setIsError(false)
    createCohort(form)
      .then(result => {
        setIsOpen(false)
        toast('👩‍🎓 The class was created successfully!', {
          type: toast.TYPE.SUCCESS
        })
        refetch(prev => prev + 1) // reloads the classes to update the UI
      })
      .catch(err => {
        toast('🤨 The class could not be created', {
          type: toast.TYPE.ERROR
        })
        setIsError(true)
      })
  }

  return (
    <div className="cohorts-list">
      {cohorts.map(cohort => (
        <CohortItemCard key={cohort.id} cohort={cohort} />
      ))}
      <Button
        aria-label="Create Class"
        style={{ minHeight: 200 }}
        color="primary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        <MdAddCircle size="48px" />
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <CohortForm
            primaryButtonText="Create Class"
            onSubmit={addCohort}
            isError={isError}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default CohortList
