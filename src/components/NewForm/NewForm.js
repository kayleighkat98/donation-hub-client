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
        hasDescription: false,
        description: null,
        items: [{name:'' , critical_amount:''}],
    }

    firstInput = React.createRef();
    searchBoxRef = React.createRef();
    lastUiRef = React.createRef();

    handleSubmit = ev => {
        ev.preventDefault()
        SiteService.postLocation({
            lat: this.context.newPlace.geometry.viewport.getCenter().lat(),
            lon: this.context.newPlace.geometry.viewport.getCenter().lng(),
            label: this.context.newPlace.name,
            address: this.context.newPlace.formatted_address,
            description: this.state.description,
            formatted_phone_number: this.context.newPlace.formatted_phone_number,
            place_id: this.context.newPlace.place_id,
            url: this.context.newPlace.url,
            website:this.context.newPlace.website
        })
        .catch(res => {
            this.setState({ error: res.error });
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
        if (!this.state.hasDescription && this.state.verifiedSite && this.state.hasSite && this.context.newPlace){
            this.setState({hasDescription: true})
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
    handleItemChange = (ev, idx, property) => {
        let items = [...this.state.items]
        items[idx][property] = ev.target.value
        this.setState({ items })
    }
    handleAddItem = ev => {
        this.setState((prevState)=> ({
            items: [...prevState.items, {name:'', critical_amount:''}],
        }));
    }
    handleDeleteItem = (index) => {
        console.log(index);
        this.setState(prevState => {
            const { items: oldItems } = prevState;
            const newItems = oldItems;
            newItems.splice(index, 1);
            return { items: newItems };
        });
    }
    handleDescriptionChange = (ev) => {
        console.log(ev.target.value)
        this.setState({description: ev.target.value})
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
                                placeholder='ex) Salvation Army'
                                required
                            />
                        </div>

                        <footer ref={this.lastUiRef} className="form-line">
                            <Button type='submit'>
                                Next
                            </Button>
                        </footer>
                    </form>
                </>
            );
        }
        if (!this.state.verifiedSite && this.context.newPlace && this.state.hasSite){//confirm address
            return (
                <>
                    <div className="verify verify-header">
                        <h4>Double check this is the right place</h4>
                    </div>
                    {this.context.newPlace.name}
                    <br/>
                    {this.context.newPlace.formatted_address}
                    <br/>
                    {this.context.newPlace.formatted_phone_number}
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
        if (!this.state.hasDescription && this.state.verifiedSite &&  this.context.newPlace && this.state.hasSite){//add description
            return (
                <>
                    <form
                        className="new-form form"
                        onSubmit= {this.handleNext}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                        <div className="form-line"> 
                            <Label htmlFor='new-description-input'>
                                Description:<Required />
                            </Label>
                            <Input
                                id='new-description-input'
                                name='description'
                                placeholder='description'
                                onChange={this.handleDescriptionChange}
                                required
                            />
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
        if (!this.state.reviewing && this.state.hasDescription && this.state.verifiedSite && this.context.newPlace && this.state.hasSite){//add items
            return(
                <div className='add-items-container'>
                    <h4>What items does this place need?</h4>
                    <form 
                    id='add-item'
                    className="new-form form"
                    onSubmit={this.handleReview}
                    >
                        <div role='alert'>
                            {error && <p>{error}</p>}
                        </div>
                        <ItemInputs
                            items = {items}
                            handleItemChange = {this.handleItemChange}
                            handleDeleteItem = {this.handleDeleteItem}
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
            const {name} = this.context.newPlace
            return(
                <div className='new-site-review-container'>
                    <h4>Review before submitting</h4>
                    <div className='site-page-container'>
                        <h2>{name}</h2>
                        {/* <img alt='static-hub'src={image}/>             */}
                        <h4>Description:</h4>{this.state.description}
                        <h4>Items Needed:</h4>
                        <ul>
                            {this.state.items.map((val, idx)=> {
                                let itemId = `item-${idx}`
                                return(
                                    <li key={idx} htmlFor={`${itemId}`} className='item-form'>
                                        <p>{val.name}</p>
                                        <p>{val.critical_amount}</p>
                                        <br/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
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
        const lastUiNode = this.lastUiRef.current;
        // height of the top area, plus 4rem for App (margin-top + padding-top + padding-bottom + margin-bottom)
        const padding = lastUiNode ? lastUiNode.getBoundingClientRect().bottom
            + 4 * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : 0;
        this.context.autocompletePostOnly(this.searchBoxRef.current, padding);
    }
}

export default NewForm