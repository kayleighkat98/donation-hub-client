import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SearchForm.css';
import { Input, Label } from '../Form/Form';

class SearchForm extends Component {

  searchBoxRef = React.createRef();
  state = { error: null };

  componentDidMount() {
    this.postRender();
  }
  
  componentDidUpdate() {
    this.postRender();
  }

  getBottom() {
    return this.searchBoxRef.current.getBoundingClientRect().bottom;
  }

  handleSubmit(e) {
    e.preventDefault();
    return false;
  }

  render() {
    const { error } = this.state;
    return (
      <form
        className="search-form form"
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className="form-line">
          <Label htmlFor='search-form-input'>
            Search your area:
          </Label>
          <Input
            ref={this.searchBoxRef}
            id='search-form-input'
            name='search'
            placeholder='zipcode/address'
          />
        </div>
      </form>
    );
  }

  placeChanged = () => {
    const { history } = this.props;
    const place = this.autocomplete.getPlace();
    if(!place.geometry){
      window.alert("Please select a valid location from the list");
      return undefined;
    }
    window.sessionStorage.setItem("targetPlace", place);
    const { viewport } = place.geometry;
    const ne = viewport.getNorthEast(), sw = viewport.getSouthWest();
    history.push(`/sites?${sw.lng()},${ne.lat()},${ne.lng()},${sw.lat()}`);
  }

  postRender() {
    const { uiRef } = this.props;
    if(uiRef)
      uiRef.current = this;
    if(window.google) {
      this.autocomplete = new window.google.maps.places.Autocomplete(this.searchBoxRef.current);
      this.autocomplete.addListener("place_changed", this.placeChanged);
    }
  }
}

export default withRouter(SearchForm);