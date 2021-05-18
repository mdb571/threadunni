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
        // consumerKey={process.env.REACT_APP_TWITTER_API_KEY}
        // consumerSecret={process.env.REACT_APP_TWITTER_CONSUMER_SECRET}
        consumerKey={"bSEjCJ5NnCQpol7lPEg3iAysB"}
        consumerSecret={"wkSn35ris1WLVFi59oBtCr6IDYYisSlbRTv0i9NxsRFXKiG7ov"}
      />
    </div>
  );
}
