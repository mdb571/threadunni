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

<nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
  <Link class="navbar-brand" to="/">ThreadUnni Bot</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav pt-3">
      {localStorage.getItem("username") && <li class="nav-item active">
        <a class="nav-link" href={`https://twitter.com/${localStorage.getItem("username")}`}>{`Hi @${localStorage.getItem("username")} `}</a>
      </li>}
      {localStorage.getItem("username") && <li class="nav-item">
        <Link class="nav-link" to={`/mythreads`}>My Threads</Link>
      </li>}
     {localStorage.getItem("username") &&  <li class="nav-item">
        <p class="nav-link" href="#"onClick={logout}>Logout</p>
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
