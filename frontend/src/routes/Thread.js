import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NewlineText from "./utils/NewlineText";
import {Helmet} from "react-helmet";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Linkify from 'react-linkify';
import './Gayathri-Regular'
const JSON5 = require("json5");
const detectlanguage = require("language-identifier");

export default function Thread(props) {
  const ref = React.createRef();
  let history = useHistory();
  const [thread, setthread] = useState(null);
  const [list, setlist] = useState(null);
  const [notfound, setnotfound] = useState("");
  const [loading, setloading] = useState(true)
  const [language, setlanguage] = useState('')
  
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.setItem("thread", props.match.params.id);
    history.push("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    localStorage.setItem("thread", props.match.params.id);
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
            // console.log(response.data);
            setthread(response.data);
            let arr = JSON5.parse(response.data.thread);
            setlist(arr);
            const languageName = detectlanguage.identify(response.data.thread);
            setlanguage(languageName)
            
            setloading(false)
          },
          (error) => {
            // console.log(error.response?.status);
            setnotfound(error.response?.status);
            setloading(false)
          }
        );
    } else {
      logout();
    }
  }, []);
  let generatePDF = () => {

    if (language== "English"|| "Malayalam"||'English | Spanish | Basic Latin') {
      const doc = new jsPDF();
    doc.setFontSize(25);
    doc.setFont('Gayathri-Regular', 'normal');

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
    doc.addImage(thread.thread_thumbnail, "JPEG", 15, 72, 30, 15);
    const tableColumn = [thread.title];
    const tableRows = [];
    list.forEach((list) => {
      const tweetData = [list];
      // push each tickcet's info into a row
      tableRows.push(tweetData);
    });
    // tableColumn, tableRows, { startY: 90 }
    doc.autoTable({
      head: [[tableColumn]],
      body: tableRows,
      styles: {
        font: 'Gayathri-Regular',    // <-- place name of your font here
        fontStyle: 'normal',
      },
      margin: { top: 90 }
  });
    doc.save(`threadunni_${thread.owner}_${props.match.params.id}`);
    } else {
      alert(`Unsupported Language (${language}) detected`)
    }
    
  };
  return (
    <div>
       
        {loading &&"Loading"}
      
        {notfound == 500 && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>
            Internal Server Error <br />
            <br />
            {/* <Link to={"/"}>
              <button type="button" className="btn btn-outline-danger">
                Home
              </button>
            </Link> */}
          </p>
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

      {thread ? (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{thread.title} | Threadunni</title>
              
            </Helmet>
          <div ref={ref} className={"bg"}>
            <img
              src={thread.owner_photo}
              alt={thread.owner}
              width="50px"
              className="rounded-circle"
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
                className="btn btn-outline-success"
                onClick={generatePDF}
              >
                Generate Pdf
              </button>
              <p className="pt-2 text-muted small">File will be downloaded in default download folder</p>
              <p className="pt-2 text-muted small">{`Tweet Language ${language}`}</p>
            </div>
            <div>
           
              <ul className="list-group">
              <li className="list-group-item">
                  <img src={thread.thread_thumbnail} width="38%"/>
              </li>
                {list &&
                  list.map((item, index) => (
                    <li key={item} className="list-group-item">
                         
                      <NewlineText text={item} />
                      
                    </li>
                  ))}
              </ul>
            </div>
          </div>
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
