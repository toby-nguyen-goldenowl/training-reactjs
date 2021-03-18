import React, { Component } from 'react';
import './Todoitem.css';
import classNames from 'classnames';
class TodoItem extends Component {
  /* cách xử lý cho onclick khi không có context */
  constructor(props) {
    super(props);
    this.handleItem = this.handleItem.bind(this);
  }

  handleItem() {
    const { item, onclick } = this.props;
    // eslint-disable-next-line no-unused-expressions
    onclick && onclick({ ...item, isComplete: !item.isComplete });
  }

  render() {
    const { item } = this.props;
    let url =
      // eslint-disable-next-line max-len
      'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E';
    if (item.isComplete) {
      url =
        // eslint-disable-next-line max-len
        'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E';
    }
    return (
      <div
        className={classNames('TodoItem', {
          'TodoItem-Complete': item.isComplete,
        })}
        aria-hidden="true"
      >
        <button type="button" onClick={this.handleItem}>
          <img src={url} alt="" width="40px" height="49px " />
        </button>
        <p>{item.item}</p>
      </div>
    );
  }
}
export default TodoItem;
