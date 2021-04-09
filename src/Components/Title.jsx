import React from 'react';
import { Link } from 'react-router-dom';
const Title = ({ children }) => (
  <>
    <div>
      <div>
        <Link to="/signin" className="MyLink">
          Sign In
        </Link>
      </div>
    </div>
    {children}
  </>
);

export default Title;
