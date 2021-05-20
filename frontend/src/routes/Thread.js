import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NewlineText from "./utils/NewlineText";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
const JSON5 = require("json5");

export default function Thread(props) {
  const ref = React.createRef();
  let history = useHistory();
  const [thread, setthread] = useState(null);
  const [list, setlist] = useState(null);
  const [notfound, setnotfound] = useState("");
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.setItem("thread", props.match.params.id);
    history.push("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const options = {
        headers: { Authorization: token },
      };

      axios
        .get(
          `https://threadunni.herokuapp.com/thread/${props.match.params.id}/`,
          options
        )
        .then(
          (response) => {
            console.log(response.data);
            setthread(response.data);
            let arr = JSON5.parse(response.data.thread);
            console.log(arr);
            setlist(arr);
          },
          (error) => {
            console.log(error.response.status);
            setnotfound(error.response.status);
          }
        );
    } else {
      logout();
    }
  }, []);
  let generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.addFont("Farro", "Farro", "sans-serif");

    doc.addImage(thread.owner_photo, "JPEG", 15, 20, 15, 15);
    doc.text(thread.title, 15, 50);

    doc.setFontSize(8);
    doc.text("Downloaded from ThreadUnni", 15, 62);
    doc.textWithLink(
      `${window.location.hostname}/thread/${props.match.params.id}`,
      15,
      67,
      {
        url: `http://${window.location.hostname}/thread/${props.match.params.id}`,
      }
    );
    const tableColumn = [thread.title];
    const tableRows = [];
    list.forEach((list) => {
      const tweetData = [list];
      // push each tickcet's info into a row
      tableRows.push(tweetData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 70 });
    doc.save(`threadunni_${thread.owner}_${props.match.params.id}`);
  };
  return (
    <div>
      {notfound == 401 && (
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Session Expired</h4>
          <p>
            Please login again to continue <br />
            <br />
            <Link to={"/login"}>
              <button type="button" class="btn btn-outline-danger">
                Login
              </button>
            </Link>
          </p>
        </div>
      )}

      {thread ? (
        <div>
          <div ref={ref} className={"bg"}>
            <img
              src={thread.owner_photo}
              alt={thread.owner}
              width="50px"
              class="rounded-circle"
            />
            <h4> {thread.title}</h4>
            
            <p>
              <a
                href={`https://twitter.com/${thread.owner}`}
                target="_blank"
              >{`@${thread.owner}`}</a>
            </p>
            <div className="pt-5 pb-5">
              <button
                type="button"
                class="btn btn-outline-success"
                onClick={generatePDF}
              >
                Generate Pdf
              </button>
              <p className="pt-2 text-muted small">File will be downloaded in default download folder</p>
            </div>
            <div>
              <ul class="list-group">
                {list &&
                  list.map((item, index) => (
                    <li key={index} class="list-group-item">
                      <NewlineText key={index + 1} text={item} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        notfound == 404 && (
          <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Thread Not Found</h4>
            <p>
              Check thread id <br />
              <br />
              <Link to={"/"}>
                <button type="button" class="btn btn-outline-danger">
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
