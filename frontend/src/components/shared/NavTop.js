import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function NavTop(props) {
    let history = useHistory();
    const logout =()=>{
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        history.push("/login");
    }
  return (
    <div className="pb-3">

<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
  <a className="navbar-brand" href="/">ThreadUnni</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav pt-3">
      {localStorage.getItem("username") && <li className="nav-item active">
        <a className="nav-link" target="_blank" href={`https://twitter.com/${localStorage.getItem("username")}`}>{`Hi @${localStorage.getItem("username")} `}</a>
      </li>}
      {localStorage.getItem("username") && <li className="nav-item">
        <Link className="nav-link" to={`/mythreads`}>My Threads</Link>
      </li>}
     {localStorage.getItem("username") &&  <li className="nav-item">
        <p className="nav-link" href="#"onClick={logout}>Logout</p>
      </li>}
      
    </ul>
  </div>
</nav>

      {/* <h2>ThreadUnni</h2>
      <hr className="myhr" style={{ border: " 5 !important" }} />
      <p>
        {" "}
        {localStorage.getItem("username") && `Hi @${localStorage.getItem("username")} `}
        {localStorage.getItem("username") && <span className="badge badge-secondary" onClick={logout}>
         Logout
        </span>}
      </p> */}
    </div>
  );
}
