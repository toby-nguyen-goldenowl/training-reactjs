import React, { Component } from 'react';
import './App.css';
import TodoItem from './Components/Todoitem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      toDoItemsList: [
        { item: 'da bong', isComplete: true },
        { item: 'xem phim', isComplete: true },
        { item: 'choi the thao', isComplete: false },
      ],
    };
  }

  /* eslint-disable */
  clickItem(item) {
    // this.toDoItemsList.isComplete = !this.toDoItemsList.isComplete;
    return (_event) => {
      const { isComplete } = item;
      const { toDoItemsList } = this.state;
      const index = toDoItemsList.indexOf(item);
      this.setState({
        toDoItemsList: [
          ...toDoItemsList.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...toDoItemsList.slice(index + 1),
        ],
      });
    };
  }
  /* eslint-enable */

  render() {
    const { toDoItemsList } = this.state;
    return (
      <div className="App">
        {toDoItemsList.length > 0 &&
          toDoItemsList.map((objItem, index) => (
            <TodoItem
              // eslint-disable-next-line react/no-array-index-key
              key={`TodoItem${index}`}
              item={objItem}
              onclick={this.clickItem(objItem)}
            />
          ))}
        {toDoItemsList.length === 0 && 'Nothing here'}
      </div>
    );
  }
}

export default App;
