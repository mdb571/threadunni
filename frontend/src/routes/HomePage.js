import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { Helmet } from "react-helmet";
import MyThreads from "./MyThreads";
const parseUrl = require("parse-url");

export default function HomePage(props) {
  const [tweetId, setTweetId] = useState(null);
  const handleTweetId = (event) => {
    let url = parseUrl(event.target.value);

    if (url) {
      let path = url.pathname;
      let split = path.split("/");
      let id = split[2];
      if (isNaN(id)) {
        setTweetId(404);
      } else {
        setTweetId(id);
      }
    }
  };

  return (
    <div className="mx-auto pt-5 pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Threadunni</title>
      </Helmet>
      <div>
        <img width="100px" className="mb-3" src={"logo.png"} />
        <h5>Enter Link of Thread Received from @threadunni</h5>
        <div
          className="input-group mb-3 pt-2 pb-2 mx-auto "
          style={{ width: "70%" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Example: https://savethreads.vercel.app/thread/1393663472446148609"
            onChange={handleTweetId}
            aria-label="Id"
            aria-describedby="button-addon2"
          />
          {tweetId !== 404 && (
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                <Link to={`/thread/${tweetId}`}>Go</Link>
              </button>
            </div>
          )}
        </div>
        {tweetId == 404 && <p className="text-danger">Invalid Url</p>}
        <p className="text-muted  text-small">
          Example Thread:{" "}
          <Link
            to={`/thread/1395137928809095176`}
          >{`${window.location.hostname}/thread/1395137928809095176`}</Link>
        </p>
      </div>

      <div>
        <div className="container" style={{ paddingTop: "10vh" }}>
          <MyThreads slice={3} more={true} />
          {/* {!localStorage.getItem("username") && (
            <div
              style={{ width: "45%" }}
              className="mx-auto alert alert-danger mb-5"
              role="alert"
            >
              Please login to continue.{" "}
              <Link to={"/login"}>
                <button type="button" className="btn btn-outline-danger">
                  Login
                </button>
              </Link>
            </div>
          )} */}
          <div className="row">
            <div className="col-sm pt-5 mx-auto">
              <Tweet tweetId="1395668626175262723" />
              {/* <Tweet tweetId="1395623998650609669" /> */}
            </div>
            <div className="col-sm">
              <div className="pt-5 pb-5">
                <h3 className="text-left">How to use?</h3>
                <div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Twitter thread is series of tweets by the same author
                      connected with a line!
                    </li>
                    <li className="list-group-item">
                      From any tweet in the thread, mention us with a keyword{" "}
                      <br />
                      <br />
                      <code> @threadunni save</code>
                      <br />
                      <br />
                    </li>
                    <li className="list-group-item">
                      Follow{" "}
                      <a href="https://twitter.com/threadunni" target="_blank">
                        @threadunni
                      </a>{" "}
                      to mention us easily!
                    </li>
                    <li className="list-group-item">
                      Then wait for @threadunni to reply with an link
                    </li>
                    <li className="list-group-item">
                      Give id here or follow link to get your thread
                    </li>
                    <li className="list-group-item">
                      Save thread as PDF if needed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
