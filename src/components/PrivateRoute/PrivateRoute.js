import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import SiteContext from '../../contexts/SiteContext'
import UserContext from '../../contexts/UserContext'

// @TODO: use static ContextType UserContext
export default function PrivateRoute({ component, ...props }) {

  const Component = component
  return (
    
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext => <SiteContext.Consumer>
            {siteContext =>
              !!userContext.user.id
                ? <Component {...componentProps} />
                : (
                  <Redirect
                    to={{
                      pathname: userContext.user.idle ? '/login' : '/register',
                      state: { from: componentProps.location },
                    }}
                  />
                  )
            }
          </SiteContext.Consumer>}

        </UserContext.Consumer>
      )}
    />
  )
}
