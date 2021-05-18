import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";
import HomePage from "./routes/HomePage";
import ProtectedRoute from "./routes/utils/ProtectedRoute";

function App() {
  const [user, setUser] = useState(false);

  const handleLogin =  (e) => {
    alert('Login')
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(false);
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
