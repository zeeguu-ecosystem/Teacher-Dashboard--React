import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, { useEffect, useState, useContext } from 'react'
import TimePeriodContext from '../context/TimePeriodContext'
import { getCohortsInfo, getUsersByTeacher } from '../api/apiCohort'
import CohortList from '../components/CohortList'
import StudentListTable from '../components/StudentListTable'
import '../assets/styles/pages/Home.scss'
import Teacher from '../assets/images/teacher.svg'
import ElephantLoader from '../components/ElephantLoader'

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
  const [activeTab, setActiveTag] = useState(0)
  const [isLoadingCohorts, setIsLoadingCohorts] = useState(true)
  const [isLoadingStudents, setIsLoadingStudents] = useState(true)
  const [allStudents, setAllStudents] = useState([])
  const { timePeriod } = useContext(TimePeriodContext)

  useEffect(() => {
    setIsLoadingStudents(true)
    getUsersByTeacher(timePeriod).then(students => {
      setAllStudents(students)
      setIsLoadingStudents(false)
    })
  }, [timePeriod])

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
      setIsLoadingCohorts(false)
    })
  }, [])

  const handleChange = (event, value) => {
    setActiveTag(value)
  }
  return (
    <div className="page-home">
      <div className="page-home-content">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="CLASSES" />
          <Tab label="STUDENTS" />
        </Tabs>
        {activeTab === 0 ? (
          isLoadingCohorts ? (
            <ElephantLoader />
          ) : (
            <CohortList cohorts={cohorts} />
          )
        ) : null}
        {activeTab === 1 ? (
          isLoadingStudents ? (
            <ElephantLoader />
          ) : allStudents.length ? (
            <StudentListTable students={allStudents} />
          ) : (
            <NoStudents />
          )
        ) : null}
      </div>
      {/* )} */}
    </div>
  )
}

const NoStudents = () => (
  <div>
    <h4>You currently have no active students</h4>
    <img
      style={{
        maxWidth: 500
      }}
      src={Teacher}
      alt=""
    />
  </div>
)

export default Home
