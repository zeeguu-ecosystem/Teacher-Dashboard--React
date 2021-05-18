import React from 'react'
import { Link } from '@reach/router'
import ProgressBar from './ProgressBar'

export const StudentActivityOverviewBody = (students) => students.map((student) => {
    return {
      data: [
        //a
        {
          sortingValue: student.name,
          sortingType: 'string',
          content: <p>{student.name} <small>({student.email})</small></p>,
          width: '25%',
        },
        //b
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
          content: <p>{student.cohort_name}({student.cohort_id})</p>,
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
