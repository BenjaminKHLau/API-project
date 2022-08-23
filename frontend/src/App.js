// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/AllSpots";
import GetAllReviewsComponent from "./components/Reviews";
// import LoginFormPage from "./components/LoginFormModal";
import CreateSpotFormComponent from "./components/CreateNewSpot";
import GetSpotByIdComponent from "./components/GetSpotById"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/spots/:spotId">
            <GetSpotByIdComponent />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <GetAllSpots />
            <CreateSpotFormComponent />
          </Route>
          <Route exact path="/reviews">
            <GetAllReviewsComponent />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;