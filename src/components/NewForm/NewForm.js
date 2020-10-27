import React, { Component } from 'react'
import './NewForm.css';
import { Input, Required, Label , Textarea} from '../Form/Form';
import Button from '../Button/Button';
import SiteService from '../../services/site-service'
import GoogleContext from '../../contexts/GoogleContext'
//use input names for reference to server naming convention

class NewForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => { }
    }
    static contextType = GoogleContext
    state = { error: null }

    firstInput = React.createRef()
    searchBoxRef = React.createRef()

    handleSubmit = ev => {
        ev.preventDefault()
        const { name, address, description, lat, lon} = ev.target
        SiteService.postLocation({
            label: name.label,
            description: description.value,
            address: address.value,
            lat: lat.value,
            lon: lon.value,
        })
        .catch(res => {
        this.setState({ error: res.error })
        })
    }

    componentDidMount() {
        this.postRender()
        this.firstInput.current.focus()
    }

    render() {
        const { error } = this.state
        return(
            <form className="new-form form">
                <div role='alert'>
                    {error && <p>{error}</p>}
                </div>
                <div className="form-line">     
                    <Label htmlFor='location-address-input'>
                        Address:<Required />
                    </Label>
                    <Input
                        ref={this.searchBoxRef}
                        id='location-address-input'
                        name='search'
                        placeholder='Zipcode/Address'
                        required
                    />
                </div>
                <div className="form-line">
                    <Label htmlFor='location-name-input'>
                        Title :<Required />
                    </Label>
                    <Input
                        ref={this.firstInput}
                        id='location-name-input'
                        name='name'
                        placeholder='Goodwill'
                        required

                    />
                </div> 
                <div className="form-line">
                    <Label htmlFor="location-description-input">
                        Description:<Required />
                    </Label>
                    <Textarea
                        id='location-description-input'
                        name='description'
                        placeholder='Who benefits from this organization?'
                        required
                    />
                </div>
                <footer className="form-line">
                    <Button type='submit'>
                        Submit
                    </Button>
                </footer>
            </form>
        );
    }
    postRender() {
        const autocomplete = new window.google.maps.places.Autocomplete(this.searchBoxRef.current);
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
                this.context.setPlace(place)
                map.fitBounds(place.geometry.viewport)
            }
          })
    }
}

export default NewForm