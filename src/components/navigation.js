import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Settings from './pages/settings';


import { NavLink, Link } from "react-router-dom";




function hideHam() {
  var x = document.getElementById("new-nav-link-wrapper");
  if (x.style.display === "none") {
    x.style.display = "grid";
  } else {
    x.style.display = "none";
  }
}


const NavigationComponent = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} className="nav-link-active">
          {linkText}
        </NavLink>

      </div>
    );

  };



  const handleSignout = (e) => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }

        return response.data;
      }).catch(console.log('error from signout', e));
  };
  return (
    <div className="navbar-wrapper">

      <div className="left-side">
      <button className="nav-link-wrapper" id="hamBtn2" onClick={hideHam}>
      ☰

          </button>
        <div id="new-nav-link-wrapper">
        

          {props.loggedInStatus === "LOGGED_IN" ? (
            dynamicLink("/todo", "Todo")
          ) : null}
          {props.loggedInStatus === "LOGGED_IN" ? (
            dynamicLink("/settings", "Settings")
          ) : null}

        </div>

      </div>
      <div className="right-side">


        {props.loggedInStatus === "NOT_LOGGED_IN" ? (
          dynamicLink("/login", "Login")
        ) : <div className="nav-link-wrapper" >
          {<a className="nav-link-active" id='Sign Out' onClick={handleSignout}>
            <i className="icon-signout"></i> Signout
          </a>}
        </div>
        }

      </div>
      <div className="nav-link-wrapper" id='name'>
        <p>MIKE PIZZA</p>
      </div>
    </div>


  );
};

export default withRouter(NavigationComponent);
