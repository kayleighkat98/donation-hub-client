const GoogleService = {
    autocomplete(input){
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
                map.fitBounds(place.geometry.viewport)
                return autocomplete.getPlace()
            }
          })
    },

}
export default GoogleService

// AUTOCOMPLETE ERROR HANDLING ATTEMPT

// placeChanged = () => {
//   const { history } = this.props;
//   const place = this.autocomplete.getPlace();
//   if(!place.geometry){
//     const predictionService = new window.google.maps.places.AutocompleteService();
//     predictionService.getPlacePredictions({input:place.name}, (predictions) => {
//       if(predictions.length) {
//         const { place_id, description } = predictions[0];
//         // TODO maybe use this prediction
//       }
//     });
//     return;
//   }
//   window.sessionStorage.setItem("targetPlace", place);
//   const { viewport } = place.geometry;
//   const ne = viewport.getNorthEast(), sw = viewport.getSouthWest();
//   history.push(`/sites?${sw.lng()},${ne.lat()},${ne.lng()},${sw.lat()}`);
// }

// postRender() {
//   const { uiRef } = this.props;
//   if(uiRef)
//     uiRef.current = this;
//   this.autocomplete = new window.google.maps.places.Autocomplete(this.searchBoxRef.current);
//   this.autocomplete.addListener("place_changed", this.placeChanged);
// }