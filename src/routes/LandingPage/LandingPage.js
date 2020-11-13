import React, { Component } from 'react'
import './LandingPage.css';
import SearchForm from '../../components/SearchForm/SearchForm'

class LandingPage extends Component {

    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
      }

    render() {
        return(
            <>
            <div className="landingText">
              <p>
              <b>Stop</b> donating <b>whatever</b> to <b>wherever</b> or <b>whoever</b>, and <b>start</b> giving your belongings the second life they deserve by donating through <b>Donation Hub</b>! 
                Welcome to Donation Hub, where you can find places near you and see what items they need. 
                <b>You can</b> search for organizations near you without logging in, <b>or</b> make an account to give back to the community even more by letting us know when there are new donation centers in your area. 
              </p>
              <p><b>Get started today!</b></p>
              <p>
                If you are just a guest on the site, feel free to use the login credentials below.
              </p>
              <p>
              <b>Username:</b> guest <b>Password:</b> Password!1
              </p>
            </div>
             
            <SearchForm/>

           </>
        );
    }
}

export default LandingPage
