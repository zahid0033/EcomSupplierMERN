import React from "react";
import {Link} from "react-router-dom";

const Breadcrumbs = props => {
  return (
      <div className="breadcrumb_section bg_gray page-title-mini">
          <div className="container">
              {/* STRART CONTAINER */}
              <div className="row align-items-center">
                  <div className="col-md-6">
                      <div className="page-title">
                          <h1>{props.title}</h1>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <ol className="breadcrumb justify-content-md-end">
                          <li className="breadcrumb-item">
                              <Link to={"/home"}>Home</Link>
                          </li>
                          <li className="breadcrumb-item active">{props.title}</li>
                      </ol>
                  </div>
              </div>
          </div>
          {/* END CONTAINER*/}
      </div>
  )
};

export default Breadcrumbs