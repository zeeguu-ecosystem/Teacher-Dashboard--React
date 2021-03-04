import React from 'react'
import { Link } from '@reach/router'
import { Button } from '@material-ui/core'
import { MdArrowForward, MdPeople } from 'react-icons/md/'

export const CohortItemCard = ({ cohort }) => {
    return (
      <div className="cohort-card">
        <div>
          <p>{cohort.language_name}</p>
          <p className="special">
            {cohort.cur_students}/{cohort.max_students}{' '}
            <MdPeople className="cohort-card-icon-people" size="22px" />
          </p>
        </div>
        <h2 className="cohort-card-headline">{cohort.name}</h2>
        <div>
          <p className="font-light">invite code: {cohort.inv_code}</p>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/${process.env.REACT_APP_ROOT_NAME}/classroom/${cohort.id}`}
          >
            View class
            <MdArrowForward className="cohort-card-btn-arrow" size="18px" />
          </Button>{' '}
        </div>
      </div>
    )
  }