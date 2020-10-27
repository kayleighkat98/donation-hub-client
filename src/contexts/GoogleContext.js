import React, { Component } from 'react'

const GoogleContext = React.createContext({
    place: {},
    error: null,
    setError: () => {},
    setPlace: () => {},
    clearError: () => {},
})

export default GoogleContext

export class GoogleProvider extends Component {
    constructor(props) {
        super(props)
        const state = { place: {}, error: null }
        this.state = state;
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
        this.setState({ error: null })
    }
    setPlace = place => {
        this.setState({ place })
    }

    render() {

        const value = {
            place: this.state.place,
            error: this.state.error,
            setError: this.setError,
            setPlace: this.setPlace,
            clearError: this.clearError,
        }
        return (
            <GoogleContext.Provider value={value}>
                {this.props.children}
            </GoogleContext.Provider>
        )
    }
}