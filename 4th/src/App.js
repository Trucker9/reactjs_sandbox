import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect Usage 1: run one time
  // function of the useEffect only runs once, when this component is being created.
  // later when the state changed with  setIsLoggedIn(false); useEffect will run again, but since there is no dependencies to change,
  // its function wont run again.
  const useEffect_function = () => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInfo === "1") setIsLoggedIn(true);
  };
  useEffect(useEffect_function, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    
    // This state changing tells react to change the webpage.
    setIsLoggedIn(true);
  }
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
