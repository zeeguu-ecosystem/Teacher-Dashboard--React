import React from 'react'
import ListTable from './ListTable'
import '../assets/styles/components/studentActivityOverview.scss'
import { StudentActivityOverviewHead } from './StudentActivityOverviewHead'
import { StudentActivityOverviewBody } from './StudentActivityOverviewBody'

const StudentActivityOverview = ({ students }) => {
  return (
    <div className="">
      <ListTable
        headItems={StudentActivityOverviewHead}
        bodyItems={StudentActivityOverviewBody(students)}
      />
    </div>
  )
}

export default StudentActivityOverview