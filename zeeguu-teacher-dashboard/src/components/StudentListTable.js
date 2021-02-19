import React from 'react'

import ListTable from './ListTable'
import { Link } from '@reach/router'
import '../assets/styles/components/studentActivityOverview.scss'
import ProgressBar from './ProgressBar'

const StudentActivityOverview = ({ students }) => {
  const headItems = [
    {
      width: '25%',
      isSortable: true,
      content: <p>NAME</p>,
    },
    {
      width: '15%',
      isSortable: true,
      content: <p>TIME SPENT</p>,
      isSortedDefault: true,
    },
    { width: '20%', isSortable: true, content: <p>CLASS NAME</p> },
    {
      width: '35%',
      isSortable: false,
      content: (
        <p>
          ACTIVITY{' '}
          <span className="activity-heading activity-heading__reading">
            Reading /
          </span>
          <span className="activity-heading activity-heading__exercises">
            Exercises
          </span>
        </p>
      ),
    },
  ]

  const bodyItems = students.map((student) => {
    return {
      data: [
        {
          sortingValue: student.name,
          sortingType: 'string',
          content: <p>{student.name}</p>,
          width: '25%',
        },
        {
          sortingValue: student.total_time,
          sortingType: 'number',
          width: '15%',
          content: (
            <p>
              {Math.floor(student.total_time / 3600)}h{' '}
              {Math.ceil((student.total_time / 60) % 60)}m
            </p>
          ),
        },
        {
          sortingValue: student.cohort_name,
          sortingType: 'string',
          width: '20%',
          content: <p>{student.cohort_name}</p>,
        },
        {
          width: '35%',
          content: (
            <ProgressBar
              normalized_activity_proportion={
                student.normalized_activity_proportion
              }
              learning_proportion={student.learning_proportion}
            />
          ),
        },
      ],
      renderComponent: (props) => (
        <Link
          to={`/${process.env.REACT_APP_ROOT_NAME}/student/${student.id}`}
          {...props}
        />
      ),
    }
  })

  return (
    <div className="">
      <ListTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  )
}

export default StudentActivityOverview
