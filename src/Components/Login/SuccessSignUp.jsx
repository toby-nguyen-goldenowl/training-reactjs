import React from 'react';
import { Link } from 'react-router-dom';

const SuccessSignIn = () => (
  <div>
    <h2 className="text">Account successfully created </h2>
    <div>
      <Link to="/signin" className="MyLink">
        Back SignIn
      </Link>
    </div>
  </div>
);

export default SuccessSignIn;
