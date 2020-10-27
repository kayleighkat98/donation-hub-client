import React, { Component } from 'react'



const HubContext = React.createContext({
    hubs: {},
});

export default HubContext

export class HubProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
          hubs: {},
        };
      }

    render() {

        const value = {
            hubs: this.state.hubs,
          }
        return(
            <HubContext.Provider value={value}>
                {this.props.children}
            </HubContext.Provider>
        )
    }
}

