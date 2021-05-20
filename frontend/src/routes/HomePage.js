import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tweet } from "react-twitter-widgets";
import { Helmet } from "react-helmet";

export default function HomePage(props) {
  const [tweetId, setTweetId] = useState(null);
  const handleTweetId = (event) => {
    setTweetId(event.target.value);
  };

  return (
    <div className="mx-auto pt-5 pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Threadunni</title>
      </Helmet>
      <h5>Enter Id you Received from @threadunni</h5>
      <div class="input-group mb-3 pt-2 pb-2 mx-auto " style={{ width: "70%" }}>
        <input
          type="text"
          class="form-control"
          placeholder="Example: 1395129241767976961"
          onChange={handleTweetId}
          aria-label="Id"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <Link to={`/thread/${tweetId}`}>Go</Link>
          </button>
        </div>
      </div>
      {tweetId ? (
        <p>
          Navigate to{" "}
          <Link
            to={`/thread/${tweetId}`}
          >{`${window.location.hostname}/thread/${tweetId}`}</Link>
        </p>
      ) : (
        ""
      )}
      <div>
        <p>
          Example Thread:{" "}
          <Link
            to={`/thread/1395129241767976961`}
          >{`${window.location.hostname}/thread/1395129241767976961`}</Link>
        </p>
        <div class="container" style={{ paddingTop: "10vh" }}>
          {!localStorage.getItem("username") && (
            <div
              style={{ width: "45%" }}
              class="mx-auto alert alert-danger mb-5"
              role="alert"
            >
              Please login to continue.{" "}
              <Link to={"/login"}>
                <button type="button" class="btn btn-outline-danger">
                  Login
                </button>
              </Link>
            </div>
          )}
          <div class="row">
            <div class="col-sm pt-5 mx-auto">
              <Tweet tweetId="1394598476273520641" />
            </div>
            <div class="col-sm">
              <div className="pt-5 pb-5">
                <h3 className="text-left">How to use?</h3>
                <div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Twitter thread is series of tweets by the same author
                      connected with a line!
                    </li>
                    <li class="list-group-item">
                      From any tweet in the thread, mention us with a keyword{" "}
                      <br />
                      <code> @threadunni save</code>
                    </li>
                    <li class="list-group-item">
                      Follow{" "}
                      <a href="https://twitter.com/threadunni" target="_blank">
                        @threadunni
                      </a>{" "}
                      to mention us easily!
                    </li>
                    <li class="list-group-item">
                      Then wait for @threadunni to reply with an id or link
                    </li>
                    <li class="list-group-item">
                      Give id here or follow link to get your thread
                    </li>
                    <li class="list-group-item">
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
