import React from 'react';
import LinkRoute from './Link';

const Title = ({ children }) => (
  <div>
    <h2 className="text">Title</h2>
    {children}
    <div>{LinkRoute()}</div>
  </div>
);

export default Title;
