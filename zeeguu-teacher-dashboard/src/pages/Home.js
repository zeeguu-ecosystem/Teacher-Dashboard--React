import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { Link } from '@reach/router'
import React, { useEffect, useState, useContext } from 'react'
import TimePeriodContext from '../context/TimePeriodContext'
import { getCohortsInfo, getUsersByTeacher } from '../api/apiCohort'
import CohortsList from '../components/CohortsList'
import ListTable from '../components/ui/ListTable'
import './Home.scss'
import Teacher from '../assets/images/teacher.svg'

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

function getStudentBodyItems(students) {
  return students.map(student => ({
    data: [
      {
        sortingValue: student.name,
        sortingType: 'string',
        content: <p>{student.name}</p>
      },
      {
        sortingValue: student.total_time,
        sortingType: 'number',
        content: (
          <p>
            {Math.floor(student.total_time / 3600)}h{' '}
            {Math.ceil((student.total_time / 60) % 60)}m
          </p>
        )
      },
      {
        content: <p>{student.learning_proportion}</p>
      }
    ],
    renderComponent: props => <Link to={'student/' + student.id} {...props} />
  }))
}

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
  const [activeTab, setActiveTag] = useState(0)
  const [allStudents, setAllStudents] = useState([])
  const { timePeriod } = useContext(TimePeriodContext)

  useEffect(() => {
    console.log('CURRENT TIME PERIOD IN HOME', timePeriod)
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

  // can be used to add a newly created cohort to the list without refreshing
  // might not be smart though - needs testing
  // function addCohort(cohort) {
  //   setCohortsInfo([...cohorts, cohort])
  // }

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
            <ListTable
              headItems={headItems}
              bodyItems={getStudentBodyItems(allStudents)}
            />
          ) : (
            <NoStudents />
          ))}
        {/* {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>} */}
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
