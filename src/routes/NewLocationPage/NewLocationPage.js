import React, { Component } from 'react'
import './NewLocationPage.css';
import NewForm from '../../components/NewForm/NewForm';

class NewLocationPage extends Component {
    static defaultProps = {
        location: {},
        history: {
          push: () => { },
        },
    }
    handleSubmitSuccess = newSiteId => {
        // TODO redirect to the new site instead once we've made the necessary changes for that not to crash
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/dashboard'
        history.push(destination)
    }  
    render() {
        return(
            <div className='new-location-container'>
               <NewForm
                onSubmitSuccess={this.handleSubmitSuccess}
               />
            </div>
        );
    }
}

export default NewLocationPage