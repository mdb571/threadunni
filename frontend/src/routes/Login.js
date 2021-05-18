import React from "react";
import { Link } from "react-router-dom";
import TwitterLogin from "react-twitter-login";

export default function Login(props) {
    const authHandler = (err, data) => {
        console.log(err, data);
        
        if (data) {
          localStorage.setItem('oauth_token',data.oauth_token)
          localStorage.setItem('oauth_token_secret',data.oauth_token_secret)
        }
       
      };
  return (
    <div>
      <h1>Landing</h1>
      <p>
        <Link to="/">View Dashboard</Link>
      </p>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={"2bEtUE2pdoBoA3heSLm7fp3Bm"}
        consumerSecret={"xTHNkAmC94EiWyluyKXov8Jvi8Zt8X6m8KSMZNHhfrErdkfrUO"}
      />
    </div>
  );
}
