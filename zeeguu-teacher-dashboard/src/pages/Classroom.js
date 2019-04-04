import { Button, Dialog, DialogContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {
  getGeneralCohortInfo,
  getStudents,
  updateCohort
} from '../api/apiCohort'
import ClassForm from '../components/ClassForm'
import ClassFiles from '../components/ClassFiles'
import StudentListTable from '../components/StudentListTable'

import ClassRoomContext from '../context/ClassRoomContext'

import '../assets/styles/pages/classroom.scss'

const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState({})
  const [students, setStudents] = useState([])
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [formStateIsError, setFormStateIsError] = useState(false)

  useEffect(() => {
    getGeneralCohortInfo(classId).then(({ data }) => {
      setCohortInfo(data)
    })
    getStudents(classId, 9).then(students => {
      setStudents(students)
    })
  }, [])

  const updateClass = form => {
    setFormStateIsError(false)
    updateCohort(form, classId)
      .then(result => {
        setTimeout(() => {
          setFormIsOpen(false)
          getGeneralCohortInfo(classId).then(({ data }) => {
            setCohortInfo(data)
          })
        }, 2000)
      })
      .catch(err => setFormStateIsError(true))
  }

  return (
    <ClassRoomContext.Provider value={cohortInfo}>
      <div className="page-classroom">
        <div className="page-classroom__header">
          <div className="page-classroom__title">
            <h2 className="page-classroom__title--name">
              {cohortInfo.name}{' '}
              <span className="page-classroom__title--language">
                {cohortInfo.language_name}
              </span>
            </h2>
            <p>Invite code: {cohortInfo.inv_code}</p>
          </div>
          <div>
            <ClassFiles />
            <Button
              color="primary"
              variant="contained"
              onClick={() => setFormIsOpen(true)}
            >
              Edit class
            </Button>
            <Dialog open={formIsOpen} onClose={() => setFormIsOpen(false)}>
              <DialogContent>
                <ClassForm
                  primaryButtonText="Update Class"
                  cohort={cohortInfo}
                  onSubmit={updateClass}
                  isError={formStateIsError}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {students.length === 0 ? (
          <>
            <p> This class has no students</p>
            <p>
              Students can join this class by using the invite code:{' '}
              {cohortInfo.inv_code}
            </p>
          </>
        ) : (
          <StudentListTable students={students} />
        )}
      </div>
    </ClassRoomContext.Provider>
  )
}

export default Classroom
