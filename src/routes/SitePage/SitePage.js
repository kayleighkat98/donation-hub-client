import React, { Component } from 'react'
import './SitePage.css'
import SiteContext from '../../contexts/SiteContext'
import {Input} from '../../components/Form/Form'
import SiteService from '../../services/site-service'

class SitePage extends Component {
    static contextType = SiteContext;
  
    state = {
        inventory: null,
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
    async loadInventory (id)  {
        if (this.state.inventory === null){
            try {
                 await SiteService.findInventoryById(id)
                    .then((inventory) => {
                        this.setState({inventory})
                    });
            } catch (err) {
              console.log(err);
            }
        }
    }
    renderInventory () {
        if (this.state.inventory === null){
            return(
                <p>loading...</p>
            )
        }
        if (this.state.inventory.length < 1){
            return(
                <p> No information available for this organization's needs. Login or signup to update.</p>
            )
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <ul>    
                    {this.state.inventory.map((item,i)=>{
                        return(
                            <li key={i}>
                                <span>{item.item_name} </span>                       
                                <Input className="siteInput" type="number" id="quantity" name="quantity" min="0" max="100"
                                    value={this.state.donation}
                                    onChange={this.handleChange}
                                    placeholder='amount donating'
                                />                             
                                <button type="submit" >
                                    <span >Donate Item</span>
                                </button> 
                            </li>
                        )
                    })}
                </ul>
           </form>
        )
    }
    renderPhoneNumber(site){
        if (site.formatted_phone_number !== 'No phone number on file'){
            return(
                <a href={`tel:${site.formatted_phone_number}`}>{site.formatted_phone_number}</a>
            )
        }
        return(
            site.formatted_phone_number
        )
    }
    renderWebsite(site){
        if (site.website && site.website !== 'No website on file'){
            return(
                <a href={`${site.website}`} target='_blank' rel='noopener noreferrer'>Visit Website</a>
            )
        }
        return(
            site.website
        )
    }
    render() {
        const id = +this.props.match.params.id;
        const site = this.context.sites.find(site => site.id === id);
        this.loadInventory(id)
        return(
            <div className='site-page-container'>
                <h3>{site.label}</h3>
                <p> {site.address}</p>
                <p>{this.renderWebsite(site)}</p>
                <p>Phone: {this.renderPhoneNumber(site)} </p>
                <h3>Items Needed:</h3>
                {this.renderInventory()}
               {/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */}
                <a className="link-to-directions" rel="noopener noreferrer" target="_blank" href={site.url}>Get Directions</a>    
                <br/>       
               <a className="user-back-to-dash" href='javascript:window.history.back()'>Back</a>
            </div>
        );
    }
}

export default SitePage;
