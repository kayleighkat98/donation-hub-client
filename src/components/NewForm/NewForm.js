import React, { Component } from 'react'
import './NewForm.css';
import { Input, Required, Label} from '../Form/Form';
import Button from '../Button/Button';
import SiteService from '../../services/site-service'
import GoogleContext from '../../contexts/GoogleContext'
//use input names for reference to server naming convention

class NewForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => { }
    }
    static contextType = GoogleContext
    state = { 
        error: null ,
        hasSite: false,
        verifiedSite: false,
    }

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

    handleNext = ev => {
        ev.preventDefault()
        if (!this.state.hasSite && this.context.place){
            this.setState({hasSite: true})
        }
        if (!this.state.verifiedSite && this.state.hasSite && this.context.place){
            this.setState({verifiedSite: true})
        }
    }

    componentDidMount() {
        this.postRender()
        this.searchBoxRef.current.focus()
    }

    render() {
        const { error } = this.state
        if (!this.context.place|| !this.state.hasSite){
            return(
                <>
                    <form
                        className="new-form form"
                        onSubmit= {this.handleNext}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                        <div className="form-line"> 
                            <Label htmlFor='location-address-input'>
                                Find the location to add:<Required />
                            </Label>
                            <Input
                                ref={this.searchBoxRef}
                                id='location-address-input'
                                name='search'
                                placeholder='Zipcode/Address'
                                required
                            />
                        </div>

                        <footer className="form-line">
                            <Button type='submit'>
                                Next
                            </Button>
                        </footer>
                    </form>
                </>
            );
        }
        if (!this.state.verifiedSite && this.context.place){
            return (
                <>
                Double check this is the right place
                    <form
                        className="new-form form"
                        onSubmit= {this.handleNext}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>

                        <footer className="form-line">
                            <Button type='submit'>
                                Next
                            </Button>
                        </footer>
                    </form>
                </>
            )
        }
        if (this.state.verifiedSite && this.context.place && this.state.hasSite){
            return(
                <form 
                className="new-form form"
                onSubmit={this.handleSubmit}
                >
                <div role='alert'>
                    {error && <p>{error}</p>}
                </div>
                
                <footer className="form-line">
                    <Button type='submit'>
                        Submit
                    </Button>
                </footer>
            </form>
            )
        }
    }
    postRender() {
        this.context.autocompletePostOnly(this.searchBoxRef.current)
    }
}

export default NewForm