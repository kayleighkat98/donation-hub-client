import React, { Component } from 'react'

const SiteContext = React.createContext({
  sites: {},
});

export default SiteContext

export class SiteProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sites: [],
    };
  }

  render() {
    const value = {
      sites: this.state.sites,
    }
    return(
      <SiteContext.Provider value={value}>
        {this.props.children}
      </SiteContext.Provider>
    )
  }
}

