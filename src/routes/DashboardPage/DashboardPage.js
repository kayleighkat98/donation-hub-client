import React, { Component } from 'react'
import './DashboardPage.css';
import { Link } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext'
import SearchForm from '../../components/SearchForm/SearchForm'
import Button from '../../components/Button/Button'

class DashboardPage extends Component {
    static contextType = SiteContext

    render() {
        return(
            <div className='container'>
               Welcome to your dashboard!
               <br/>
               <SearchForm/>
               <Link to='/sites/test'><Button>test link to site page</Button></Link>
               <Link to='/new'><Button>Add a donation site +</Button></Link>
            </div>
        );
    }
}

export default DashboardPage