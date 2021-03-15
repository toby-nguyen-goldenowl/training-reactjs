import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './Components/Todoitem';

class App extends Component {
  constructor() {
    super();
    this.toDoItemsList = [
      { item: 'da bong', isComplete: true },
      { item: 'xem phim', isComplete: false },
      { item: 'choi the thao', isComplete: false },
    ];
  }

  render() {
    return (
      <div className="App">
        {this.toDoItemsList.map((objItem, index) => (
          <TodoItem key={index} item={objItem} />
        ))}
      </div>
    );
  }
}

export default App;
