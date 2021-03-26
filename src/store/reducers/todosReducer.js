import * as types from '../constants/ActionTypes';
const initialState = {
  newItem: '',
  toDoItemsList: [],
};

const todosReducer = (state = initialState, action) => {
  const { todo, object, newItem } = action;
  const { toDoItemsList } = state;
  let index;
  switch (action.type) {
    case types.HANDLE_CLICK_ITEM:
      index =
        todo &&
        state.toDoItemsList.findIndex((toDos) => toDos.id === todo.item.id);
      if (index > 0) {
        return {
          toDoItemsList: [
            ...toDoItemsList.slice(0, index),
            todo.item,
            ...toDoItemsList.slice(index + 1),
          ],
        };
      }
      if (index === 0) {
        return {
          toDoItemsList: [todo.item, ...toDoItemsList.slice(1)],
        };
      }
      return state;
    case types.ADD_ITEM:
      return {
        newItem: '',
        toDoItemsList: [...object.toDoItemsList],
      };
    case types.ON_CHANGE:
      return {
        newItem,
        toDoItemsList: [...toDoItemsList],
      };
    default:
      return state;
  }
};
export default todosReducer;
