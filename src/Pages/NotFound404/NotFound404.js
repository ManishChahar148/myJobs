import React from "react";
import "./NotFound404.scss";
import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <div className="notFound404Component">
      <div id="notfound" className="container">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! Nothing was found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.{" "}
            <Link to='/' data-location="Go Home" className="tooltipNotFoundToHome" >Return to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
