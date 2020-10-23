import React, { Component } from 'react'
import './LandingPage.css';
import SearchForm from '../../components/SearchForm/SearchForm'



class LandingPage extends Component {

    static defaultProps = {
        location: {},
        history: {
          push: () => { },
        },
      }

    render() {
        return(
            <>
            <div className="landingText">
                Stop donating whatever to wherever or whoever, and start giving your belongings the second life they deserve
                by donating through Donation Hub! Welcome to Donation Hub, where you can find the donation centers nearest to you and 
                see what items they are most in need of. Make an account to give back to the community even more through sharing your donations, 
                flagging inaccurate information, and letting us know when there are new donation centers in your area. Get started today!
            </div>
             
            <SearchForm/>

           </>
        );
    }
}

export default LandingPage
