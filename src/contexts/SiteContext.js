import React, { Component } from 'react'

const SiteContext = React.createContext({
  sites: {},
  inventory: {},
  setSites: ()=>{},
  setInventory: () => {}
});

export default SiteContext

export class SiteProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sites: [],
      inventory: [],
      setSites: () => {},
      setInventory: () => {}
    };
  }
  setSites = (sites) => {
    this.setState({sites})
  }
  setInventory = (inventory) => {
    this.setState({inventory})
    console.log(this.state.inventory)
  }
  render() {
    const value = {
      sites: this.state.sites,
      inventory: this.state.inventory,
      setInventory: this.setInventory,
      setSites: this.setSites,
    }
    return(
      <SiteContext.Provider value={value}>
        {this.props.children}
      </SiteContext.Provider>
    )
  }
}

