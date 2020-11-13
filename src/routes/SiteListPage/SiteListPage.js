import React, { Component } from 'react'
import SearchForm from '../../components/SearchForm/SearchForm';
import SiteContext from '../../contexts/SiteContext';
import SiteService from '../../services/site-service';
import './SiteListPage.css';

class SiteListPage extends Component {

  static contextType = SiteContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }
  state = { 
    added: false,
    searchReturnedResults: null
  }

  uiRef = React.createRef();

  componentDidMount() {
    this.postRender();
  }
  componentDidUpdate() {
    this.postRender();
  }
  recursiveContextAdd = (map, sites)=> {
    if(this.state.added === true){
      return
    }else{
      this.context.setSites({sites});
      if (sites === 'There is no site'){
        console.log('b')
        this.setState({searchReturnedResults: false})
      }
      this.setState({added: true})
      this.recursiveContextAdd(map, sites);
    }
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
  }
  
  handleRender() {
    if (this.context.sites===null){
      return(
        <>
          <p>
            Uh oh, an erro occured. Please refresh and search again.
          </p>
        </>
      )
    }
    if (this.state.searchReturnedResults === false){
      return(
        <>
          <p>
            No donation centers found in your area. Create an account or Log in to add a new center or search somewhere else
          </p>
        </>
      )
    }
  }
  async postRender() {
    const { map } = window;
    if(!map) // prevent this component from blowing up if tested without an attached map
    return;

    window.markers.forEach(marker => marker.setMap(null));
    window.markers = [];

    this.setMapBoundsFromQuery(map, this.props.location.search);
    const bounds = map.getBounds();
    if(!bounds) // bail if the map doesn't have bounds
    return;
    const sw = bounds.getSouthWest(), ne = bounds.getNorthEast();
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
    }
  }

  render() {
    return (
      <>
        {/* keeping this div around for now because it may help us animate the position of the
            SearchForm when entering this route */}
        {this.handleRender()}
        <div className="landingText"></div>
        <SearchForm uiRef={this.uiRef} />
      </>
    );
  }
}

export default SiteListPage;
