import React from "react";
import { Link } from "react-router-dom";
import TwitterLogin from "react-twitter-login";

export default function Login(props) {
    const authHandler = (err, data) => {
        console.log(err, data);
      };
  return (
    <div>
      <h1>Landing</h1>
      <p>
        <Link to="/">View Dashboard</Link>
      </p>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={process.env.REACT_APP_CONSUMER_KEY}
        consumerSecret={process.env.REACT_APP_CONSUMER_SECRET}
      />
    </div>
  );
}
