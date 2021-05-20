import axios from "axios";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import TwitterLogin from "react-twitter-login";
import { useHistory } from "react-router-dom";

let qs = require("qs");
export default function Login(props) {
  const [user, setuser] = useState(false)
    let location = qs.parse(props.location.search, { ignoreQueryPrefix: true }).redirect;
    let history = useHistory();

    const authHandler = (err, data) => {
        // console.log(err, data);
        
        if (data) {
          axios.post('https://threadunni.herokuapp.com/twitter/', {
            access_token_key: data.oauth_token,
            access_token_secret: data.oauth_token_secret
          })
          .then((response) => {
            console.log(response.data);
            setuser(true)
            localStorage.setItem('token',`Bearer ${response.data.tokens?.access} `)
            localStorage.setItem('username',response.data.username)
            props.handleLogin()
           
            let thread = localStorage.getItem('thread')
            history.push(thread? "/thread/"+thread:'/');

          }, (error) => {
            console.log(error);
          });

          localStorage.setItem('token',data.oauth_token)
        }
       
      };
  return (
    <div className="pt-5">
      <h3>Login | ThreadUnni</h3>
      <p className="text-muted">Documenting Threads Since BFH!</p>

      <div class="alert alert-danger mx-auto" style={{width:"50%"}} role="alert">
      Login to access your threads and archive PDFs. 
</div>
      <p>
    <br/>


        
      </p>
      <div style={{paddingTop:'30vh'}}>
      
     {!user? <TwitterLogin
        authCallback={authHandler}
        consumerKey={process.env.REACT_APP_TWITTER_API_KEY}
        consumerSecret={process.env.REACT_APP_TWITTER_CONSUMER_SECRET}
      />: <Link to="/">Redirecting....</Link>}
    </div>
    </div>
  );
}
