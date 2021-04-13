import React from 'react';
import LinkRoute from '../Link';
const Active = ({ children }) => (
  <div>
    <h2 className="text">Active</h2>
    {children}
    <div>{LinkRoute()}</div>
  </div>
);

export default Active;
