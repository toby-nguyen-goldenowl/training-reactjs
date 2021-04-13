import React from 'react';
import LinkRoute from '../Link';
const Complete = ({ children }) => (
  <div>
    <h2 className="text">Complete</h2>
    {children}
    <div>{LinkRoute()}</div>
  </div>
);

export default Complete;
