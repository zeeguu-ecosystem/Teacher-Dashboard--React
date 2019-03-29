import { Router } from '@reach/router'
import React, { useState, useEffect } from 'react'
import './App.scss'
import Nav from './components/Nav'
import Classroom from './pages/Classroom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'
import NotLoggedInPage from './pages/NotLoggedInPage'

import TimePeriodContext from './context/TimePeriodContext'

import { useAuthentication } from './utilities/permissions'

const App = () => {
  const [timePeriod, setTimePeriod] = useState(14)
  const { loadingAuth, isAuthenticated } = useAuthentication()

  return (
    <TimePeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
      <div className="App">
        {loadingAuth ? null : isAuthenticated ? (
          <div>
            <Nav />
            <Router>
              <Home path="/" />
              <Classroom path="classroom/:classId" />
              <StudentPage path="student/:studentId" />
            </Router>
          </div>
        ) : (
          //should redirect to zeeguu login page?
          <NotLoggedInPage />
        )}
      </div>
    </TimePeriodContext.Provider>
  )
}

export default App
