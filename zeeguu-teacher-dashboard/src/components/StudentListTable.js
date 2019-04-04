import React from 'react'

import ListTable from './ListTable'
import { Link } from '@reach/router'
import '../assets/styles/components/studentListTable.scss'

const StudentListTable = ({ students }) => {
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
      )
    }
  ]

  const bodyItems = students.map(student => ({
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
        content: (
          <div
            className="activity-bar"
            style={{
              width: student.normalized_activity_proportion + '%'
            }}
          >
            <div
              className="activity-bar__reading"
              style={{
                width: student.learning_proportion + '%'
              }}
            />
            <div
              className="activity-bar__exercises"
              style={{
                width: 100 - student.learning_proportion + '%'
              }}
            />
          </div>
        )
      }
    ],
    renderComponent: props => <Link to={'/student/' + student.id} {...props} />
  }))

  return (
    <div className="">
      <ListTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  )
}

export default StudentListTable
