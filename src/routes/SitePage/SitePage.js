import React, { Component } from 'react'
import './SitePage.css';
import { Link } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext';
import image from '../../images/static-hub.jpg'

class SitePage extends Component {
    static contextType = SiteContext;
  
    state = {
        donated: false,
        donation: ''
    }

   
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({donation: ''})
        alert('Thanks for your donation!')
    } 

    handleChange = (e) => {
        this.setState({donation: e.target.value})
    } 

    static contextType = SiteContext;


    render() {
       
        const donated = this.state.handleSubmit
        return(
            <div className='site-page-container'>
               <h3>Drop Spot</h3>
               <img alt='static-hub'src={image}/>            
               <h3>Items Needed:</h3>
               <form  onSubmit={this.handleSubmit}>
                <ul>
                    <li>
                        
                                <button type="submit" >
                                    <span >Donate Item</span>
                                </button> 
                            <span>clothes || </span>                       
                            <label htmlFor="quantity">amount donating:</label>
                            <input className="siteInput" type="number" id="quantity" name="quantity" min="0" max="100"
                                value={this.state.donation}
                                onChange={this.handleChange}
                            /> 
                            
                    </li>
                </ul>
               </form>
               <a className="user-back-to-dash" href='javascript:window.history.back()'>Back</a>
            </div>
        );
    }
}

export default SitePage;
