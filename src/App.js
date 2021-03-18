import React, { Component } from 'react';
import './App.css';
import TodoItem from './Components/Todoitem';
import DownArrow from './Components/img/down-arrow.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'all', // all,active,complete
      toDoItemsList: [
        { id: 1, item: 'da bong', isComplete: true },
        { id: 2, item: 'xem phim', isComplete: true },
        { id: 3, item: 'choi the thao', isComplete: false },
      ],
    };
    this.onkeyup = this.onkeyup.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onkeyup(event) {
    const { toDoItemsList } = this.state;
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return null;
      }
      text = text.trim();
      if (!text) {
        return null;
      }
      this.setState({
        newItem: '',
        toDoItemsList: [{ item: text, isComplete: false }, ...toDoItemsList],
      });
    }
    return null;
  }

  onchange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  clickItem(item) {
    const { toDoItemsList } = this.state;
    const index = toDoItemsList.findIndex((toDos) => toDos.id === item.id);
    if (index >= 0) {
      this.setState({
        toDoItemsList: [
          ...toDoItemsList.slice(0, index),
          item,
          ...toDoItemsList.slice(index + 1),
        ],
      });
    }
    return null;
  }

  clickFilter(filter) {
    const { toDoItemsList } = this.state;
    const arrActive = [];
    let check;
    if (filter === 'active') {
      check = false;
    } else if (filter === 'completed') {
      check = true;
    } else {
      this.setState({
        currentFilter: filter,
        toDoItemsList: [...toDoItemsList],
      });
    }
    toDoItemsList.forEach((itemFilter) => {
      if (itemFilter.isComplete === check) {
        arrActive.push(itemFilter);
      }
    });
    this.setState({
      currentFilter: filter,
    });
  }

  renderItem(objItem, index, currentFilter) {
    return (
      <TodoItem
        key={index}
        item={objItem}
        currentFilter={currentFilter}
        onclick={(item) => this.clickItem(item)}
      />
    );
  }

  render() {
    const { toDoItemsList, newItem, currentFilter } = this.state;
    return (
      <div className="App">
        <div className="Header">
          <img src={DownArrow} alt="down-arrow" width="32px" height="32px " />
          <input
            type="text"
            placeholder="what needs to be done"
            onKeyUp={this.onkeyup}
            value={newItem}
            onChange={this.onchange}
          />
        </div>
        {toDoItemsList.length > 0 &&
          toDoItemsList.map((objItem, index) => {
            if (
              currentFilter === 'active' &&
              objItem &&
              objItem.isComplete === false
            ) {
              return this.renderItem(objItem, index, currentFilter);
            }
            if (
              currentFilter === 'completed' &&
              objItem &&
              objItem.isComplete === true
            ) {
              return this.renderItem(objItem, index, currentFilter);
            }
            if (currentFilter === 'all' && objItem) {
              return this.renderItem(objItem, index, currentFilter);
            }
            return null;
          })}
        {toDoItemsList.length === 0 && 'Nothing here'}
        <div className="BtnOptionClick">
          <button type="button" onClick={() => this.clickFilter('all')}>
            All
          </button>
          <button type="button" onClick={() => this.clickFilter('active')}>
            Active
          </button>
          <button type="button" onClick={() => this.clickFilter('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default App;
