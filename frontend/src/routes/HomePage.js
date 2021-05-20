import React,{useState} from "react";

export default function HomePage() {

  const [tweetId, setTweetId] = useState(null)
  const handleTweetId = (event) => {
    setTweetId(event.target.value);
  };

  return (
    <div style={{width:"50%"}} className="mx-auto pt-5">
      <h5>Enter Id you Received from @threadunni</h5>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="1395129241767976961"
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
            Button
          </button>
        </div>
      </div>
      {tweetId ? 'Navigate to '+ window.location.hostname +"/"+ tweetId:  "Blank"}
    </div>
  );
}
