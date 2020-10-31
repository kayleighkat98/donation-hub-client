import React, { Component } from 'react'

const GoogleContext = React.createContext({
    newPlace: {},
    error: null,
    setError: () => {},
    setNewPlace: () => {},
    clearNewPlace: () => {},
    clearError: () => {},
    autocomplete: () => {},
})

export default GoogleContext

export class GoogleProvider extends Component {
    constructor(props) {
        super(props)
        const state = { newPlace: {}, error: null }
        this.state = state;
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
        this.setState({ error: null })
    }
    setNewPlace = newPlace => {
        this.setState({ newPlace })
    }
    clearNewPlace = () => {
        if (this.state.newPlace){
            this.setState({ newPlace : {} })
        }
    }
    autocompletePostOnly = (input, topPadding) => {
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
            window.markers.forEach(marker => marker.setMap(null));
            window.markers = [];

            const { map } = window;
            if(!map) // prevent this component from blowing up if tested without an attached map
                return;
            const place = autocomplete.getPlace();
            
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("Please start over and select a valid location");
                return undefined;
            } else {
                this.setNewPlace(place);
                map.fitBounds(place.geometry.viewport, { top: topPadding });
                this.newPlaceMarker = new window.google.maps.Marker({
                    position: { lat: place.geometry.viewport.getCenter().lat(), lng:place.geometry.viewport.getCenter().lng()},
                    map: map, 
                    animation: window.google.maps.Animation.DROP,
                });
                window.markers.push(this.newPlaceMarker);
            }
        })
    }

    render() {

        const value = {
            newPlace: this.state.newPlace,
            error: this.state.error,
            setError: this.setError,
            setNewPlace: this.setNewPlace,
            clearNewPlace: this.clearNewPlace,
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