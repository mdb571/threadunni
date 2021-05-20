import React, { useState,useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";
import HomePage from "./routes/HomePage";
import ProtectedRoute from "./routes/utils/ProtectedRoute";
import NavTop from "./components/shared/NavTop";
import Footer from "./components/shared/Footer";

function App() {
  const [user, setUser] = useState(false);

  const handleLogin =  (e) => {
    alert('Login')
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(false);
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  };

  useEffect(() => {
  let username= localStorage.getItem('username');
  let token = localStorage.getItem('token')
  
  if(token){
    setUser({username:username,token:token})
  }
  }, [])

  return (
    <div className="App">
      <NavTop/>
      <Router>
        <Route
          exact
          path="/login"
          handleLogin={handleLogin}
          render={(props) => (
            <Login
              {...props}
              user={user}
              handleLogin={handleLogin}
            />
          )}
        />
        <ProtectedRoute
          exact
          path="/"
          user={user}
          handleLogout={handleLogout}
          component={HomePage}
        />
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
