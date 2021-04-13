import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import '../../configdb/firebaseConfig';
// import firebase from '../connectdb/firebaseConnect';
import TodoItem from './Todoitem';

import { addItem } from '../../store/actions/index';
import DownArrow from '../img/down-arrow.svg';
class Todo extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
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
    Object.values(toDoItemsList).map((element) => {
      if (element && element.isComplete === true) {
        this.count += 1;
      }
      return null;
    });
  }

  handleClickAll() {
    const { toDoItemsList, userId } = this.props;
    let { hiddenState } = this.state;
    hiddenState = !hiddenState;
    if (hiddenState === true) {
      Object.keys(toDoItemsList).forEach((key) => {
        toDoItemsList[key].isComplete = true;
        const dataUser = firebase
          .database()
          .ref(`users/${userId}/todo/toDoItemsList/${key}`);
        dataUser.set({
          item: toDoItemsList[key].item,
          isComplete: true,
        });
      });
    } else {
      Object.keys(toDoItemsList).forEach((key) => {
        toDoItemsList[key].isComplete = false;
        const dataUser = firebase
          .database()
          .ref(`users/${userId}/todo/toDoItemsList/${key}`);
        dataUser.set({
          item: toDoItemsList[key].item,
          isComplete: false,
        });
      });
    }
    this.setState({
      hiddenState,
    });
  }

  onkeyup(event) {
    const { addItems, userId } = this.props;
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) {
        return null;
      }
      text = text.trim();
      if (!text) {
        return null;
      }
      const Id = uuid();
      const dataUser = firebase
        .database()
        .ref(`users/${userId}/todo/toDoItemsList/${Id}`);
      dataUser.set({
        item: text,
        isComplete: false,
      });
      addItems({ id: Id, item: text, isComplete: false });
    }
    return null;
  }

  onchange(event) {
    this.setState({
      newItem: event.target.value,
    });
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
        onclick={this}
      />
    );
  }

  render() {
    const { currentFilter, newItem } = this.state;
    const { toDoItemsList } = this.props;
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
          Object.keys(toDoItemsList).map((key) => {
            const objItem = toDoItemsList[key];
            objItem.id = key;
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
  userId: state.user.userId,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  addItems: addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
