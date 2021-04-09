import React from 'react';
function ShowErr() {
  throw new Error('Loi');
}
const Test = () => (
  <div>
    <h2 className="text">Test Active</h2>
    {ShowErr()}
  </div>
);

export default Test;
