import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import SiteContext from '../../contexts/SiteContext';
import SiteService from '../../services/site-service';
import Button from '../../components/Button/Button';
import './SiteListPage.css';

class SiteListPage extends Component {
  static contextType = SiteContext;
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  };
  state = { 
    added: false,
    searchReturnedResults: null
  };
  uiRef = React.createRef();
  componentDidMount() {
    this.postRender();
  };
  componentDidUpdate() {
    this.postRender();
  };
  recursiveContextAdd = (map, sites)=> {//This is to prevent the async fuction this is implemented in from repeating indefinitely
    if(this.state.added === true){
      return;
    }else{
      this.context.setSites({sites});
      if (sites === 'There is no site'){
        this.setState({searchReturnedResults: false})
      };
      this.setState({added: true})
      this.recursiveContextAdd(map, sites);
    };
  };
  onClickButton(){
    window.location.reload(false);
  }
  setMapBoundsFromQuery(map, query) {
    if((typeof(query) !== 'string'))
    return;
    const args = query.substring(1).split(',');
    if(args.length < 4)
      return;
    // height of the top area, plus 4rem for App (margin-top + padding-top + padding-bottom + margin-bottom)
    const offset = this.uiRef.current.getBottom()
      + 4 * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
      const sw = { lat: +args[3], lng: +args[0] };
    const ne = { lat: +args[1], lng: +args[2] };
    const bounds = new window.google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds, { top: offset });
  };  
  handleRender() {//This function displays more information to a user in case a search does not find locations
    if (this.context.sites===null){
      return(
        <>
          <p>
            Uh oh, an error occured. Please refresh and search again.
          </p>
        </>
      );
    };
    if (this.state.searchReturnedResults === false){
      return(
        <>
          <p>
            No data found. Please search somewhere else or register/sign-in as a user to add data.
          </p>
        </>
      );
    };
  };
  async postRender() {
    const { map } = window;
    if(!map) // prevent this component from blowing up if tested without an attached map
      return;
    window.markers.forEach(marker => marker.setMap(null));
    window.markers = [];//This will be used to hold the marker icons

    this.setMapBoundsFromQuery(map, this.props.location.search);
    const bounds = map.getBounds();
    if(!bounds) // bail if the map doesn't have bounds
      return;
    const sw = bounds.getSouthWest(), ne = bounds.getNorthEast();//these are functions provided by google places api to retrieve the coordinates from a search result.
    const box = [ sw.lng(), ne.lat(), ne.lng(), sw.lat() ];
    try {
      const sites = await SiteService.search(...box);
      this.recursiveContextAdd(map,sites);
      if(Array.isArray(sites)){
        sites.forEach(site => {
          const marker = new window.google.maps.Marker({
            label: site.label[0],
            map: map,
            position: { lat: site.lat, lng: site.lon },
            animation: window.google.maps.Animation.DROP,
          });
          window.markers.push(marker);
          marker.addListener('click', () => this.props.history.push(`/sites/${site.id}`));
        });
      }
    } catch (err) {
      console.log(err);
    };
  };
  render() {
    return (
      <>
        {/* keeping this div around for now because it may help us animate the position of the
            SearchForm when entering this route */}
        {this.handleRender()}
        <div className="landingText"></div>
        <SearchForm uiRef={this.uiRef} />
        <Button onClick={this.onClickButton}>Clear Search</Button>
      </>
    );
  };
};
export default SiteListPage;
