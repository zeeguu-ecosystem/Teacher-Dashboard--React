import React from 'react'
export const StudentActivityOverviewHead = [
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