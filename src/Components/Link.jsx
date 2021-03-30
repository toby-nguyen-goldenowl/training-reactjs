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
        <Link to="/all/todo" className="MyLink">
          AllTodo
        </Link>
      </div>
      <div>
        <Link to="/active/todo" className="MyLink">
          ActiveTodo
        </Link>
      </div>
      <div>
        <Link to="/completed/todo" className="MyLink">
          CompleteTodo
        </Link>
      </div>
    </div>
  );
}
