import React from 'react'
import { Link } from '@reach/router'

import Logo from '../assets/images/logo.png'
import TimePeriod from './TimePeriod'

import './nav.scss'

const Nav = () => (
  <nav>
    <div className="navigation__links">
      <Link to="/">
        <img src={Logo} alt="" className="logo" />
        <p className="link-text"> Zeeguu Teacher Dashboard</p>
      </Link>
      <Link to="/">
        <p className="link-text"> Student activity page</p>
      </Link>
    </div>
    <TimePeriod />
  </nav>
)

export default Nav
