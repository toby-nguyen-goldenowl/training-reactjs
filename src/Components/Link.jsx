import React from 'react';
import { Link } from 'react-router-dom';
import './Link.css';

export default function LinkRoute() {
  return (
    <div className="divMyLink">
      <div>
        <Link to="/" className="MyLink">
          Title
        </Link>
      </div>
      <div>
        <Link to="/all" className="MyLink">
          All
        </Link>
      </div>
      <div>
        <Link to="/active/test" className="MyLink">
          Active
        </Link>
      </div>
      <div>
        <Link to="/active" className="MyLink">
          Active
        </Link>
      </div>
      <div>
        <Link to="/completed" className="MyLink">
          Complete
        </Link>
      </div>
    </div>
  );
}
