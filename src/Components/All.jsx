import React from 'react';
import LinkRoute from './Link';

const All = ({ children }) => (
  <div>
    <h2 className="text">All</h2>
    {children}
    <div>{LinkRoute()}</div>
  </div>
);

export default All;
