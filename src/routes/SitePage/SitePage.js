import React, { Component } from 'react'
import './SitePage.css';
import { Link } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext';
import image from '../../images/static-hub.jpg'

class SitePage extends Component {
    static contextType = SiteContext;
  
    state = {donated: false}


   
    handleClick = (event) => {
        event.preventDefault()
        alert('Thanks for your donation!')
    
    } 

    static contextType = SiteContext;


    render() {
       
        const donated = this.state.handleSubmit
        return(
            <div className='site-page-container'>
               <h3>Drop Spot</h3>
               <img alt='static-hub'src={image}/>
               <p>last updated: 10-07-2020</p>
               <h3>Items Needed:</h3>
               <ul>
                   <li>
                      
                            <button  onClick={this.handleClick}>
                                <span >Donate Item</span>
                            </button> 
                        <span>clothes || </span>
                        <span>quantity needed : 20  || </span>
                        <label htmlFor="quantity">amount donating:</label>
                        <input className="siteInput" type="number" id="quantity" name="quantity" min="0" max="100"/> 
                        {console.log("submit handled")}
                   </li>
               </ul>
               <Link className="user-back-to-dash" to='/dashboard'>Back to Dashboard</Link>
            </div>
        );
    }
}

export default SitePage;
