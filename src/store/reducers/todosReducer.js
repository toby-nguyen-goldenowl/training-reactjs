import * as types from '../constants/ActionTypes';
const initialState = {
  toDoItemsList: {},
};

const todosReducer = (state = initialState, action) => {
  const { todo, object, data } = action;
  const { toDoItemsList } = state;
  switch (action.type) {
    case types.HANDLE_CLICK_ITEM:
      toDoItemsList[todo.item.id] = todo.item;
      // return { ...state };
      return {
        toDoItemsList: { ...toDoItemsList },
      };

    case types.ADD_ITEM:
      toDoItemsList[object.id] = {
        isComplete: object.isComplete,
        item: object.item,
      };
      return {
        toDoItemsList: { ...toDoItemsList },
      };
    case types.ON_CHANGE:
      return {
        toDoItemsList: { ...toDoItemsList },
      };
    case types.LOAD_DATA:
      if (data === undefined) {
        return {
          toDoItemsList: {},
        };
      }
      return {
        toDoItemsList: { ...data.toDoItemsList },
      };
    case types.AUTH_USERID:
      return {
        toDoItemsList: { ...toDoItemsList },
      };
    default:
      return state;
  }
};
export default todosReducer;
