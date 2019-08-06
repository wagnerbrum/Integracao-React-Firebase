import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./Datatable.css";
import FirebaseService from "../../services/FirebaseService";
import { privateUrls } from "../../util/urlUtils";

const Datatable = ({ data }) => {
  const remove = id => {
    FirebaseService.remove(id, "leituras");
  };

  return (
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
              <th>Actions</th>
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
                <td>
                  <button>
                    <Link to={privateUrls.edit.pathWithoutParam + line.key}>
                      Edit
                    </Link>
                  </button>
                  <button onClick={() => remove(line.key)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Datatable;
