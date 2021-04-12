import React from 'react';
import { Link } from 'react-router-dom';

const NotSuccessSignIn = () => (
  <div>
    <h2 className="text">Signup Account Fail.</h2>
    <div>
      <Link to="/signin" className="MyLink">
        Back SignIn
      </Link>
    </div>
  </div>
);

export default NotSuccessSignIn;
