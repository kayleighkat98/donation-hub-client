import React, { Component } from 'react'

const GoogleContext = React.createContext({
    place: {},
    error: null,
    setError: () => {},
    setPlace: () => {},
    clearError: () => {},
    autocomplete: () => {},
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

    autocompletePostOnly = input => {
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {

            const { map } = window;
            if(!map) // prevent this component from blowing up if tested without an attached map
            return;
            const place = autocomplete.getPlace();
            
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return undefined;
            }
            if (place.geometry){
                this.setPlace(place)
                map.fitBounds(place.geometry.viewport)
                // let postInputMarker = new window.google.maps.Marker({
                //     position
                // })
            }
        })
    }

    render() {

        const value = {
            place: this.state.place,
            error: this.state.error,
            setError: this.setError,
            setPlace: this.setPlace,
            clearError: this.clearError,
            autocompletePostOnly: this.autocompletePostOnly,
        }
        return (
            <GoogleContext.Provider value={value}>
                {this.props.children}
            </GoogleContext.Provider>
        )
    }
}