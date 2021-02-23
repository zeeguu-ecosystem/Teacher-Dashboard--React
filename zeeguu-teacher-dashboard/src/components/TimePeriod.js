import React, { useContext } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'

import '../assets/styles/components/timeperiod.scss'

import TimePeriodContext from '../context/TimePeriodContext'

import { timePeriodMap } from '../helpers/sharedHelpers'

const TimePeriod = () => {
  const { timePeriod, setTimePeriod } = useContext(TimePeriodContext)

  return (
    <div className="timeperiod__component">
      <p className="timeperiod__text">Summary for the last </p>
      <FormControl required>
        <Select
          value={timePeriod}
          onChange={e => setTimePeriod(e.target.value)}
        >
          <MenuItem value={'7'}>{timePeriodMap[7]}</MenuItem>
          <MenuItem value={'14'}>{timePeriodMap[14]}</MenuItem>
          <MenuItem value={'30'}>{timePeriodMap[30]}</MenuItem>
          <MenuItem value={'182'}>{timePeriodMap[182]}</MenuItem>
          <MenuItem value={'365'}>{timePeriodMap[365]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TimePeriod
