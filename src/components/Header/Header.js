import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'
import './Header.css'

// @TODO: logout should be a button
// @TODO: Header needs history prop (wrap it in Route)
 
class Header extends Component {
  static contextType = UserContext
  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      
      <div className='header-container'>
        <nav>
          <Link
            className='nav-item'
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
          </Link>
        {' '}
          <Link
            className='nav-item'
            to='/user'>
             {this.context.user.name}
          </Link>
        {' '}
          <Link 
            className="landingButton" 
            to='/dashboard'>
              <b>Dashboard</b>
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='nav-item'>Login</Link>
        {' '}
        <Link to='/register' className='nav-item'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="header-container">
        <h1 className="header">
          <Link to='/'>
            Donation-Hub
          </Link>
        </h1>
        <div className='nav'>
          {/* @TODO: Use UserContext user.id */}
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }

  static defaultProps = {
    history: {
      push: () => {},
    }
  }
}

export default Header
