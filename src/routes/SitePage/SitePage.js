import React, { Component } from 'react'
import './SitePage.css';
import { Link } from 'react-router-dom'
import HubContext from '../../contexts/HubContext';
import image from '../../images/static-hub.jpg'

class SitePage extends Component {
    static contextType = HubContext;


    render() {
        return(
            <div className='hub-page-container'>
               <h3>Drop Spot</h3>
               <img alt='static-hub'src={image}/>
               <p>last updated: 10-07-2020</p>
               <h3>Items Needed:</h3>
               <ul>
                   <li>
                        <span>clothes || </span>
                        <span>quantity needed : 20  || </span>
                        <label htmlFor="quantity">amount donating:</label>
                        <input type="number" id="quantity" name="quantity" min="0" max="100"/> 
                   </li>
               </ul>
               <Link className="user-back-to-dash" to='/dashboard'>Back to Dashboard</Link>
            </div>
        );
    }
}

export default SitePage;