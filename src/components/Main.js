import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "../App.css";

const GETDATA = gql`
  query schedule($type: String!, $status: String!, $page: Int!) {
    schedule(type: $type, status: $status, page: $page) {
      matchID
      seriesName
    }
  }
`;
// variables: { type: "Domestic", status: "upcoming", page: 0 }
const Main = () => {
  const [status, setStatus] = useState("completed");
  const [type, setType] = useState("International");
  const [pageNo, setPageNo] = useState(0);
  const { loading, error, data } = useQuery(GETDATA, {
    variables: {
      type: `${type}`,
      status: `${status}`,
      page: 0
    }
  });
  if (loading) return <div className="mt5 mb5 tc pa3">Loading Data...</div>;
  if (error) return `Error ${error}`;
  console.log(data.length, data);
  return (
    <div className="fl w-100">
      <h1 className="f2">Schedule</h1>
      <div>
        <div className="w-90 tc ml4">
          <button
            className="pa2 w-third ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setStatus("upcoming")}
          >
            UPCOMING
          </button>
          <button
            className="pa2 w-third ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setStatus("live")}
          >
            RUNNING
          </button>
          <button
            className="pa2 w-third ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setStatus("completed")}
          >
            COMPLETED
          </button>
        </div>
        <div className="w-100 ba mt4">
          <button
            className="w-third pa2 ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setType("All")}
          >
            ALL
          </button>
          <button
            className="w-third pa2 ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setType("International")}
          >
            INTERNATIONAL
          </button>
          <button
            className="w-third pa2 ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
            onClick={() => setType("Domestic")}
          >
            DOMESTIC
          </button>
        </div>
        <div className="">
          {data &&
            data.schedule.map((item, i) => {
              //   const series = item.seriesName.split(" tour of ");
              return (
                <div key={i}>
                  <div className="pa3 ma2 bb tc">
                    {item.matchID} : {item.seriesName}
                  </div>
                </div>
              );
            })}
          {data.schedule.length == 0 && (
            <div className="mt5 mb5 tc pa3">No Match Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
