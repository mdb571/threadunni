import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import "jspdf-autotable";
import ThreadsList from "./utils/ThreadsList";

export default function MyThreads(props) {
  let history = useHistory();
  const [thread, setthread] = useState(null);
  const [notfound, setnotfound] = useState("");
  const [loading, setloading] = useState(true);
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const options = {
        headers: { Authorization: token },
      };

      axios.get(`https://threadunni-replit.mdb571.repl.co/threads/`, options).then(
        (response) => {
        //   console.log(response.data);
        //   setthread([]);
          setthread(response.data.reverse());
          setloading(false);
        },
        (error) => {
        //   console.log(error.response?.status);
          setnotfound(error.response?.status);
          setloading(false);
        }
      );
    } else {
      logout();
    }
  }, []);

  return (
    <div>
      {loading && "Loading"}
      {notfound == 500 && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>
            Internal Server Error <br />
            <br />
            <Link to={"/"}>
              <button type="button" className="btn btn-outline-danger">
                Home
              </button>
            </Link>
          </p>
        </div>
      )}
      {!thread && (
        <div className="mt-5 mb-5 text-muted">
          Your saved threads will appear here
        </div>
      )}
      {notfound == 401 && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Session Expired</h4>
          <p>
            Please login again to continue <br />
            <br />
            <Link to={"/login"}>
              <button type="button" className="btn btn-outline-danger">
                Login
              </button>
            </Link>
          </p>
        </div>
      )}
      {/* {JSON.stringify(thread)} */}
      {thread ? (
        <div>
          {!props.more && (
            <Helmet>
              <meta charSet="utf-8" />
              <title>My Threads | Threadunni</title>
            </Helmet>
          )}
          <div>
            {thread && <ThreadsList list={thread} slice={props.slice || 500} />}
          </div>
          {thread && (
            <div className="p-5">
              {props.more && (
                <Link to={"/mythreads"}>
                  <button type="button" className="btn btn-outline-dark">
                    View All
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        notfound == 404 && (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Thread Not Found</h4>
            <p>
              Check thread id <br />
              <br />
              <Link to={"/"}>
                <button type="button" className="btn btn-outline-danger">
                  Go Home
                </button>
              </Link>
            </p>
          </div>
        )
      )}
    </div>
  );
}
