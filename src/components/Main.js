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
  if (loading) return null;
  if (error) return `Error ${error}`;
  console.log(status, type);
  return (
    <div className="fl w-100">
      <h1 className="f2">Schedule</h1>
      <div className="ba">
        <div className="w-90 tc ml4">
          <button className="pa2 w-third" onClick={() => setStatus("Upcoming")}>
            UPCOMING
          </button>
          <button className="pa2 w-third" onClick={() => setStatus("live")}>
            RUNNING
          </button>
          <button
            className="pa2 w-third"
            onClick={() => setStatus("completed")}
          >
            COMPLETED
          </button>
        </div>
        <div className="w-100 ba mt4">
          <button className="w-third pa2" onClick={() => setType("All")}>
            ALL
          </button>
          <button
            className="w-third pa2"
            onClick={() => setType("International")}
          >
            INTERNATIONAL
          </button>
          <button className="w-third pa2" onClick={() => setType("Domestic")}>
            DOMESTIC
          </button>
        </div>
        <div className="">
          {data &&
            data.schedule.map((item, i) => {
              //   const series = item.seriesName.split(" tour of ");
              return (
                <div key={i}>
                  <div>{item.matchID}</div>
                  <div>{item.seriesName}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Main;
