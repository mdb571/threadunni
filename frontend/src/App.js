import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./routes/Login";
import HomePage from "./routes/HomePage";
import ProtectedRoute from "./routes/utils/ProtectedRoute";
import NavTop from "./components/shared/NavTop";
import Footer from "./components/shared/Footer";
import Thread from "./routes/Thread";
import MyThreads from "./routes/MyThreads";

function App() {
  const [user, setUser] = useState(false);

  const handleLogin = (e) => {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");

    setUser(true);
    // alert('Login')
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");

    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <NavTop logout={handleLogout} />
        <div className="App">
          <Route
            exact
            path="/login"
            handleLogin={handleLogin}
            render={(props) => (
              <Login {...props} user={user} handleLogin={handleLogin} />
            )}
          />
          <ProtectedRoute
            exact
            path="/"
            user={true}
            handleLogout={handleLogout}
            component={HomePage}
          />
          <ProtectedRoute
            exact
            path="/thread/:id"
            user={true}
            handleLogout={handleLogout}
            component={Thread}
          />
           <ProtectedRoute
            exact
            path="/mythreads/"
            user={true}
            handleLogout={handleLogout}
            component={MyThreads}
          />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
