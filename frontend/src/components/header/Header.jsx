import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Header = () => {
  return (
    <>
      {
        <>
          <div className="header">
            <div className="profile-icon">
              <div>
                <NavLink to={`/home`} className="profile-button" activeclassname="active">ExpenseLog</NavLink>
              </div>
              <div>
                <NavLink to={`/profile`} className="navigation-link profile-title" activeclassname="active">Profile</NavLink>
              </div>
            </div>
            <div className="navigation-links">
              <div className="navigation-link-home">
                <NavLink to={`/home`} className="navigation-link" activeclassname="active">Home</NavLink>
              </div>
              <div className="navigation-link-income">
                <NavLink to={`/income`} className="navigation-link" activeclassname="active">Income</NavLink>
              </div>
              <div className="navigation-link-expense">
                <NavLink to={`/expense`} className="navigation-link" activeclassname="active">Expense</NavLink>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Header
