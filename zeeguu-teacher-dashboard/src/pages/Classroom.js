import { Button, Dialog, DialogContent } from '@material-ui/core'
import { Link } from '@reach/router'
import React, { useEffect, useState } from 'react'
import {
  getGeneralCohortInfo,
  getStudents,
  updateCohort
} from '../api/apiCohort'
import ClassForm from '../components/ClassForm'
import ClassFiles from '../components/ClassFiles'
import ListTable from '../components/ui/ListTable'
import './classroom.scss'
import { secondsToHoursAndMinutes } from '../utilities/helpers'

import ClassRoomContext from '../context/ClassRoomContext'

const ClassroomTemplate = ({ cohort, students }) => {
  const headItems = [
    {
      width: 25,
      isSortable: true,
      content: <p>NAME</p>
    },
    {
      width: 25,
      isSortable: true,
      content: <p>TIME SPENT</p>
    },
    {
      width: 50,
      isSortable: false,
      content: <p>ACTIVITY</p>
    }
  ]

  const bodyItems = students.map(student => {
    console.log('student.total_time')
    console.log(student.total_time)
    return {
      data: [
        {
          sortingValue: student.name,
          sortingType: 'string',
          content: <p>{student.name}</p>
        },
        {
          sortingValue: student.total_time,
          sortingType: 'number',
          content: <p>{secondsToHoursAndMinutes(student.total_time)}</p>
        },
        {
          content: <p>{student.learning_proportion}</p>
        }
      ],
      renderComponent: props => (
        <Link to={'/student/' + student.id} {...props} />
      )
    }
  })
  return (
    <div className="">
      <ListTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  )
}
const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState({})
  const [students, setStudents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getGeneralCohortInfo(classId).then(({ data }) => {
      setCohortInfo(data)
    })
    getStudents(classId, 9).then(students => {
      setStudents(students)
    })
  }, [])

  const updateClass = form => {
    console.log('in updateclass')
    setIsError(false)
    updateCohort(form, classId)
      .then(result => {
        setTimeout(() => {
          setIsOpen(false)
          console.log('updating')
          getGeneralCohortInfo(classId).then(({ data }) => {
            setCohortInfo(data)
          })
        }, 2000)
      })
      .catch(err => setIsError(true))
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
              onClick={() => setIsOpen(true)}
            >
              Edit class
            </Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <DialogContent>
                <ClassForm
                  primaryButtonText="Update Class"
                  cohort={cohortInfo}
                  onSubmit={updateClass}
                  isError={isError}
                  // closemodal={() => setIsOpen(false)}
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
          <ClassroomTemplate students={students} cohort={cohortInfo} />
        )}
      </div>
    </ClassRoomContext.Provider>
  )
}

export default Classroom
