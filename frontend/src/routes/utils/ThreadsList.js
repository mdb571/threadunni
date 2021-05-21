import json5 from "json5";
import React from "react";
import { Link } from "react-router-dom";
import NewlineText from "./NewlineText";
import ClampLines from "react-clamp-lines";
import moment from "moment";

export default function ThreadsList(props) {
  return (
    <div>
      <div class="container mx-auto">
        <h5 className="text-left text-center">
          My Saved Threads {props.list.length < 3 && "and Suggested"}
        </h5>
        <div className="row row-eq-height">
          {props.list &&
            props.list.slice(0, props.slice || 500).map((item, index) => (
              <div key={index} class={"col-sm-4 p-2"}>
                <div class="card text-left">
                  <Link to={item.link}>
                    <div class="card-body">
                      <img
                        src={item.owner_photo}
                        alt={item.owner}
                        width="50px"
                        class="rounded-circle mb-3"
                      />
                      <h5 class="card-title">{item.title}</h5>

                      {json5
                        .parse(item.thread)
                        .slice(0, 1)
                        .map((item, index) => (
                          //  console.log(item)
                          <ClampLines
                            text={String(item)}
                            id="really-unique-id"
                            lines={4}
                            buttons={false}
                            ellipsis="..."
                            // moreText="Expand"
                            // lessText="Collapse"
                            className="text-muted card-text"
                            innerElement="p"
                          />
                        ))}
                      <p className="text-small text-muted">
                        {moment(item.created_at).fromNow()}
                      </p>
                      <Link to={item.link} class="btn btn-primary">
                        View Thread
                      </Link>
                    </div>
                  </Link>
                </div>
              </div>
              //   <NewlineText key={item} text={item} />
            ))}
          {props.list.length < 2 && (
            <div class={"col-sm-4 p-2"}>
              <div class="card text-left">
                <Link to={"/thread/1395137928809095176"}>
                  <div class="card-body">
                    <p className="text-small text-muted mx-right">
                      <span class="badge badge-success">Suggested</span>
                    </p>
                    <img
                      src={
                        "https://pbs.twimg.com/profile_images/1095918960187342848/jyFGwWyv.jpg"
                      }
                      alt={""}
                      width="50px"
                      class="rounded-circle mb-3"
                    />
                    <h5 class="card-title">A Thread by Julian</h5>

                    <ClampLines
                      text={"10 of my realizations about writing well:"}
                      id="really-unique-id"
                      lines={4}
                      buttons={false}
                      ellipsis="..."
                      // moreText="Expand"
                      // lessText="Collapse"
                      className="text-muted card-text"
                      innerElement="p"
                    />

                    <Link
                      to={"/thread/1395137928809095176"}
                      class="btn btn-primary"
                    >
                      View Thread
                    </Link>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {props.list.length < 3 && (
            <div class={"col-sm-4 p-2"}>
              <div class="card text-left">
                <Link to={"/thread/1393663472446148609"}>
                  <div class="card-body">
                    <p className="text-small text-muted mx-right">
                      <span class="badge badge-success">Suggested</span>
                    </p>
                    <img
                      src={
                        "https://pbs.twimg.com/profile_images/1385696445886603267/5IyhK9o3.jpg"
                      }
                      alt={""}
                      width="50px"
                      class="rounded-circle mb-3"
                    />
                    <h5 class="card-title">A Thread by oluwole_dada</h5>

                    <ClampLines
                      text={
                        "Tonight, I saw on Twitter the usual argument that Dangote is not a successful businessman as he thrives only on government's connection and as usual I laughed. Let me respond as a marketing professional. There are three major ways by which you gain competitive advantage.#Thread"
                      }
                      id="really-unique-id"
                      lines={4}
                      buttons={false}
                      ellipsis="..."
                      // moreText="Expand"
                      // lessText="Collapse"
                      className="text-muted card-text"
                      innerElement="p"
                    />

                    <Link
                      to={"/thread/1393663472446148609"}
                      class="btn btn-primary"
                    >
                      View Thread
                    </Link>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {props.list.length < 1 && (
            <div class={"col-sm-4 p-2"}>
              <div class="card text-left">
                <Link to={"/thread/1393876659535765505"}>
                  <div class="card-body">
                    <p className="text-small text-muted mx-right">
                      <span class="badge badge-success">Suggested</span>
                    </p>
                    <img
                      src={
                        "https://pbs.twimg.com/profile_images/1392131769936203777/ax5qmltd.jpg"
                      }
                      alt={""}
                      width="50px"
                      class="rounded-circle mb-3"
                    />
                    <h5 class="card-title">A Thread by PrasoonPratham</h5>

                    <ClampLines
                      text={
                        "Now if we optimize our model to have an F₁ score, we can have high precision and recall."
                      }
                      id="really-unique-id"
                      lines={4}
                      buttons={false}
                      ellipsis="..."
                      // moreText="Expand"
                      // lessText="Collapse"
                      className="text-muted card-text"
                      innerElement="p"
                    />

                    <Link
                      to={"/thread/1393876659535765505"}
                      class="btn btn-primary"
                    >
                      View Thread
                    </Link>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
