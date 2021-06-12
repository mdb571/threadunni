import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TwitterLogin from "react-twitter-login";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

let qs = require("qs");
export default function Login(props) {
  const [user, setuser] = useState(false);
  const [error, setError] = useState(false);
  let location = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }).redirect;
  let history = useHistory();

  const authHandler = (err, data) => {
    if (data) {
      axios
        .post("https://threadunni-replit.mdb571.repl.co/twitter/", {
          access_token_key: data.oauth_token,
          access_token_secret: data.oauth_token_secret,
        })
        .then(
          (response) => {
            // console.log(response.data);
            setuser(true);
            localStorage.setItem(
              "token",
              `Bearer ${response.data.tokens?.access} `
            );
            localStorage.setItem("username", response.data.username);
            // props.handleLogin();

            let thread = localStorage.getItem("thread");
            history.push(thread ? "/thread/" + thread : "/");
          },
          (error) => {
            console.log(error);
            setError(error);
          }
        );

      localStorage.setItem("token", data.oauth_token);
    }

    if (err) {
      console.log(err);
      setError(err);
    }
  };
  return (
    <div className="pt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | ThreadUnni</title>
      </Helmet>
      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>
            {error} <br />
            <br />
            {/* <Link to={"/"}>
              <button type="button" className="btn btn-outline-danger">
                Home
              </button>
            </Link> */}
          </p>
        </div>
      )}
      <h3>Login</h3>
      <p className="text-muted">Documenting Threads Since BFH!</p>
      <p>
        <small className="text-danger">
          {" "}
          Login to access your threads and archive PDFs.{" "}
        </small>
      </p>
      <div style={{ paddingTop: "10vh" }}>
        {!user ? (
          <TwitterLogin
            authCallback={authHandler}
            buttonTheme={'dark'}
            consumerKey={process.env.REACT_APP_TWITTER_API_KEY}
            consumerSecret={process.env.REACT_APP_TWITTER_CONSUMER_SECRET}
          />
        ) : (
          <Link to="/">Redirecting....</Link>
        )}
      </div>
    </div>
  );
}
