import React, { Component } from "react";
import "./Todoitem.css";
class TodoItem extends Component {
  render() {
    const { item } = this.props;
    let className = "TodoItem";
    if (item.isComplete) className += " TodoItem-Complete";
    return (
      <div className={className}>
        <p>{item.item}</p>
      </div>
    );
  }
}
export default TodoItem;
