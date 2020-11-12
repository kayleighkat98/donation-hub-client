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
              <p>
                Stop donating whatever to wherever or whoever, and start giving your belongings the second life they deserve
                by donating through Donation Hub! Welcome to Donation Hub, where you can find the donation centers nearest to you and 
                see what items they are most in need of. You can search for organizations near you without logging in, or make an account to give
                back to the community even more through sharing your donations, flagging inaccurate information, and letting us know when there are
                new donation centers in your area. Get started today!
              </p>
              <p>
                If you are just a guest on the site, feel free to use the login credentials below.
              </p>
              <p>
                Username: angeladt10261997 Password: 1234AbCd!
              </p>
            </div>
             
            <SearchForm/>

           </>
        );
    }
}

export default LandingPage
