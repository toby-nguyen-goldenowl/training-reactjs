import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import TodoItem from './Todoitem';
import { addItem, onchange } from '../store/actions/index';
import DownArrow from './img/down-arrow.svg';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      currentFilter: 'all', // all,active,completed
      hiddenState: false,
    };
    this.count = 0;
    this.onkeyup = this.onkeyup.bind(this);
    this.onchange = this.onchange.bind(this);
    this.handleClickAll = this.handleClickAll.bind(this);
    this.checkHiddenBtn = this.checkHiddenBtn.bind(this);
  }

  componentDidMount() {
    const { toDoItemsList } = this.props;
    toDoItemsList.forEach((element) => {
      if (element.isComplete === true) {
        this.count += 1;
      }
    });
  }

  handleClickAll() {
    const { toDoItemsList } = this.props;
    let { hiddenState } = this.state;
    hiddenState = !hiddenState;
    if (hiddenState === true) {
      toDoItemsList.forEach((todo) => {
        todo.isComplete = true;
      });
    } else {
      toDoItemsList.forEach((todo) => {
        todo.isComplete = false;
      });
    }
    this.setState({
      hiddenState,
    });
  }

  onkeyup(event) {
    const { addItems, toDoItemsList } = this.props;
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return null;
      }
      text = text.trim();
      if (!text) {
        return null;
      }
      addItems({
        toDoItemsList: [
          { id: uuid(), item: text, isComplete: false },
          ...toDoItemsList,
        ],
      });
    }
    return null;
  }

  onchange(event) {
    const { onchanges } = this.props;
    onchanges(event.target.value);
  }

  checkHiddenBtn(item) {
    const { toDoItemsList } = this.props;
    if (item.isComplete === false) {
      this.count -= 1;
    }
    if (item.isComplete === true) {
      this.count += 1;
    }
    if (this.count === toDoItemsList.length) {
      return true;
    }
    return false;
  }

  clickFilter(filter) {
    this.setState({
      currentFilter: filter,
    });
  }

  renderItem(objItem, currentFilter) {
    return (
      <TodoItem
        key={objItem.id}
        item={objItem}
        currentFilter={currentFilter}
        onclick={(item) => this.clickItem(item)}
      />
    );
  }

  render() {
    const { currentFilter } = this.state;
    const { toDoItemsList, newItem } = this.props;
    return (
      <>
        <div className="Header">
          <button type="button" onClick={this.handleClickAll}>
            <img src={DownArrow} alt="down-arrow" width="32px" height="32px " />
          </button>
          <input
            type="text"
            placeholder="what needs to be done"
            onKeyUp={this.onkeyup}
            value={newItem}
            onChange={this.onchange}
          />
        </div>
        {toDoItemsList &&
          toDoItemsList.map((objItem) => {
            if (
              currentFilter === 'active' &&
              objItem &&
              objItem.isComplete === false
            ) {
              return this.renderItem(objItem, currentFilter);
            }
            if (
              currentFilter === 'completed' &&
              objItem &&
              objItem.isComplete === true
            ) {
              return this.renderItem(objItem, currentFilter);
            }
            if (currentFilter === 'all' && objItem) {
              return this.renderItem(objItem, currentFilter);
            }
            return null;
          })}
        {toDoItemsList.length === 0 && 'Nothing here'}
        <div className="BtnOptionClick ">
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  toDoItemsList: state.todo.toDoItemsList,
  newItem: state.todo.newItem,
});

const mapDispatchToProps = {
  addItems: addItem,
  onchanges: onchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
