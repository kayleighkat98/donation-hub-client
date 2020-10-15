import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from '../NavBar/NavBar';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import Landing from "../../Routes/LandingPage/LandingPage";
import RegistrationPage from "../../Routes/RegistrationPage/RegistrationPage";
import LoginPage from "../../Routes/LoginPage/LoginPage";
import TokenService from '../../Services/token-service'
import Logout from "../../Routes/Logout/Logout";
import NotFoundPage from "../../Routes/NotFoundPage/NotFoundPage";
import RegistrationPage from "../../Routes/RegistrationPage/RegistrationPage";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (TokenService.hasAuthToken()) {
      setIsLoggedIn(true)
    } 
  },[])


  return (
    <div className="App">
    <header className="AppNavBar">
      <NavBar isLoggedIn={isLoggedIn}/>
    </header>
      <p></p>
      <p></p>
      <main className="AppMain">
        <Switch>
          <Route
            exact path={'/'}
            component={Landing}
          />
          
          <PublicOnlyRoute
            path={'/register'}
            component={RegistrationPage}
          />

          <PublicOnlyRoute
            path={'/login'}
            component={() => <LoginPage onLogin={setIsLoggedIn}/>}
            componentProps={{onLogin: setIsLoggedIn}}
          />
      
          <PrivateRoute
            path={'/logout'}
            component={() => <Logout
              setIsLoggedIn={setIsLoggedIn}
            />}
          />

          <Route 
            component={NotFoundPage}
          /> 
        </Switch>
      </main>
    </div>
  );
}
  
  export default App;
