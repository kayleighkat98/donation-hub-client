import React, { Component } from 'react'
import './NewForm.css'
import { Input, Required, Label} from '../Form/Form'
import Button from '../Button/Button'
import SiteService from '../../services/site-service'
import GoogleContext from '../../contexts/GoogleContext'
import ItemInputs from '../ItemInputs/ItemInputs'
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
        reviewing: false,
        items: [{name:'' , critical_amount:''}],
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
        if (!this.state.hasSite && this.context.newPlace){
            this.setState({hasSite: true})
        }
        if (!this.state.verifiedSite && this.state.hasSite && this.context.newPlace){
            this.setState({verifiedSite: true})
        }
    }
    handleReview = ev => {
        ev.preventDefault()
            this.setState({reviewing: true})
    }
    handlePrevious = ev => {
        ev.preventDefault()
        window.location.reload(false);
        this.context.clearNewPlace()
        this.setState({hasSite: false})
        this.setState({verifiedSite: false})
    }
    handleItemChange = ev => {
        console.log('test')
        if (["name", "critical_amount"].includes(ev.target.className)){
            let items = [...this.state.items]
            items[ev.target.dataset.id][ev.target.className] = ev.target.value
            this.setState({ items }, () => console.log(this.state.items))
        }else{
            this.setState({ [ev.target.name]: ev.target.value})
        }
    }
    handleAddItem = ev => {
        this.setState((prevState)=> ({
            items: [...prevState.items, {name:'', critical_amout:''}],
        }));
    }
    componentDidMount() {
        this.postRender()
        this.searchBoxRef.current.focus()
    }

    render() {
        const { error } = this.state
        let {items} = this.state
        if (!this.context.newPlace|| !this.state.hasSite){//search for address
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
        if (!this.state.verifiedSite && this.context.newPlace){//confirm address
            return (
                <>
                    <div className="verify verify-header">
                        <h4>Double check this is the right place</h4>
                    </div>
                    {this.context.newPlace.name}
                    <form
                        className="new-form form"
                        onSubmit= {this.handleNext}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>

                        <footer className="form-line">
                            <Button type='button' onClick={this.handlePrevious}>
                                Start Over
                            </Button>
                            <Button type='submit'>
                                Next
                            </Button>
                        </footer>
                    </form>
                </>
            )
        }
        if (!this.state.reviewing && this.state.verifiedSite && this.context.newPlace && this.state.hasSite){//add detatils
            return(
                <div className='add-items-container'>
                    <h4>What items does this place need?</h4>
                    <form 
                    id='add-item'
                    className="new-form form"
                    onSubmit={this.handleReview}
                    onChange={(ev)=>this.handleItemChange(ev)}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                        <ItemInputs
                            items = {items}
                            handleItemChange = {this.handleItemChange}
                        />
                        <footer className="form-line">
                            <Button type='button' onClick={this.handlePrevious}>
                                Start Over
                            </Button>
                            <Button type='button' onClick={this.handleAddItem}>
                                Add New Item
                            </Button>
                            <Button type='submit'>
                                Review
                            </Button>
                        </footer>
                    </form>
                </div>
            )
        }
        if (this.state.reviewing){//review before submit
            return(
                <div className='new-site-review-container'>
                    <h4>Review before submitting</h4>
                   <form 
                    className="new-form form"
                    onSubmit={this.handleSubmit}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                        <footer className="form-line">
                            <Button type='button' onClick={this.handlePrevious}>
                                Start Over
                            </Button>
                            <Button type='submit'>
                                Submit
                            </Button>
                        </footer>
                    </form>
                </div>
            )
        }
    }
    postRender() {
        this.context.autocompletePostOnly(this.searchBoxRef.current)
    }
}

export default NewForm