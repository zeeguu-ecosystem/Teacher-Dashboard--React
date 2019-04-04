import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { Link } from '@reach/router'
import React, { useEffect, useState, useContext } from 'react'
import TimePeriodContext from '../context/TimePeriodContext'
import { getCohortsInfo, getUsersByTeacher } from '../api/apiCohort'
import CohortsList from '../components/CohortsList'
import StudentListTable from '../components/StudentListTable'
import '../assets/styles/pages/Home.scss'
import Teacher from '../assets/images/teacher.svg'

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
  const [activeTab, setActiveTag] = useState(0)
  const [allStudents, setAllStudents] = useState([])
  const { timePeriod } = useContext(TimePeriodContext)

  useEffect(() => {
    getUsersByTeacher(timePeriod).then(students => {
      setAllStudents(students)
    })
  }, [timePeriod])

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
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
        {activeTab === 0 && <CohortsList cohorts={cohorts} />}
        {activeTab === 1 &&
          (allStudents.length ? (
            <StudentListTable
              students={allStudents}
            />
          ) : (
            <NoStudents />
          ))}
      </div>
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
