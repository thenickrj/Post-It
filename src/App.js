import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { faThumbsUp, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./App.css";
import { useState } from "react";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./components/Header";

// const Container = styled.div``;

function App() {
  const [like, setLike] = useState(false);

  var userInfo;
  if (localStorage.userInfo) {
    var userInfo = JSON.parse(localStorage.userInfo) || undefined;
    console.log(userInfo);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            {userInfo ? (
              <>
                <Header />
                <Home />
              </>
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
