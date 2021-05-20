import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import TwitterLogin from "react-twitter-login";

export default function Login(props) {
    const authHandler = (err, data) => {
        // console.log(err, data);
        
        if (data) {
          axios.post('https://threadunni.herokuapp.com/twitter/', {
            access_token_key: data.oauth_token,
            access_token_secret: data.oauth_token_secret
          })
          .then((response) => {
            console.log(response.data);
            localStorage.setItem('token',`Bearer ${response.data.tokens?.access} `)
            localStorage.setItem('username',response.data.username)
          }, (error) => {
            console.log(error);
          });

          localStorage.setItem('token',data.oauth_token)
        }
       
      };
  return (
    <div className="pt-5">
      <p>
      Login to access your threads and archive PDFs. <br/>


        <Link to="/">View Dashboard</Link>
      </p>
      <div style={{paddingTop:'30vh'}}>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={process.env.REACT_APP_TWITTER_API_KEY}
        consumerSecret={process.env.REACT_APP_TWITTER_CONSUMER_SECRET}
      />
    </div>
    </div>
  );
}
