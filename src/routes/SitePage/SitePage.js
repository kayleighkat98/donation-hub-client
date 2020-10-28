import React, { Component } from 'react'
import './SitePage.css';
import { Link } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext';
import image from '../../images/static-hub.jpg'
// import InventroyService from '../../services/inventory-api-service';
// import config from '../../config';


class SitePage extends Component {
    static contextType = HubContext;
    
    // constructor() {
    //     super();
    //     this.state = {
    //         items: [],
    //         isChecked: false
    //     }
    // }
    state = {donated: false}
    firstInput = React.createRef()

    componentDidMount() {
      this.firstInput.current.focus()
    }

    // handleCheckedItem = (event) => {
    //     event.preventDefault();
    //     fetch(`${config.API_Endpoint}/:site_id/items/:item_id`, {
    //         method: 'GET',
    //         header: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //     .then(() => this.fetchData());
    //     this.isChecked(event.target.value);
    //     alert('Item added to your list');
    //     this.setState({
    //         isChecked: true
    //     })
    // }

    handleSubmit = (event) => {
        event.preventDefault()
        alert('Thanks for your donation!')
        .catch(res => {
            this.setState({donated: res.alert})
        })
    } 

    static contextType = SiteContext;


    render() {
        // let item= this.state.items ? this.state.items : [];
        // let handleSubmit= this.state.donated;
        // console.log(`this.isChecked`)
        const {donated} = this.state.handleSubmit
        return(
            <div className='site-page-container'>
               <h3>Drop Spot</h3>
               <img alt='static-hub'src={image}/>
               <p>last updated: 10-07-2020</p>
               <h3>Items Needed:</h3>
               <ul>
                   <li onSubmit={handleSubmit}>
                        {/* <span className="donationItem" {...item.checked ? "donationItem-checked" : ''}>{item}</span>
                            <button className="checkedToggle">
                                <span className="checkbox">Donate Item</span>
                            </button> */}
                        <span>clothes || </span>
                        <span>quantity needed : 20  || </span>
                        <label htmlFor="quantity">amount donating:</label>
                        <input className="siteInput" type="number" id="quantity" name="quantity" min="0" max="100"/> 
                   </li>
               </ul>
               <Link className="user-back-to-dash" to='/dashboard'>Back to Dashboard</Link>
            </div>
        );
    }
}

export default SitePage;
