import React, { Component } from 'react'
import './SitePage.css';
import SiteContext from '../../contexts/SiteContext';
import {Input} from '../../components/Form/Form'

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

    render() {
        const id = +this.props.match.params.id;
        const site = this.context.sites.find(site => site.id === id);
        return(
            <div className='site-page-container'>
                <h3>{site.label}</h3>
                <a className="link-to-directions" rel="noopener noreferrer" target="_blank" href={site.url}>Get Directions</a>
                {/*<img alt='static-hub'src={image}/>*/}            
                <h3>Items Needed:</h3>
                <form onSubmit={this.handleSubmit}>
                <ul>
                    <li>
                        <button type="submit" >
                            <span >Donate Item</span>
                        </button> 
                        <span>clothes || </span>                       
                        <label htmlFor="quantity">amount donating:</label>
                        <Input className="siteInput" type="number" id="quantity" name="quantity" min="0" max="100"
                            value={this.state.donation}
                            onChange={this.handleChange}
                        />                             
                    </li>
                </ul>
               </form>
               {/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */}
               <a className="user-back-to-dash" href='javascript:window.history.back()'>Back</a>
            </div>
        );
    }
}

export default SitePage;
