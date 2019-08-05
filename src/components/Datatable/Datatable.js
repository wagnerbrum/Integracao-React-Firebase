import React, { Fragment } from "react";

import "./Datatable.css";

const Datatable = ({ data }) => (
  <Fragment>
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Client</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((line, key) => (
            <tr key={key}>
              <td>{line.key + 1}</td>
              <td>{line.temperature}</td>
              <td>{line.humidity}</td>
              <td>{line.client}</td>
              <td>{line.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Fragment>
);

export default Datatable;
