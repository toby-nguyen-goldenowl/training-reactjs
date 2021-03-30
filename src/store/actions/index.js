import * as types from '../constants/ActionTypes';

export const handleClickItem = (item) => ({
  type: types.HANDLE_CLICK_ITEM,
  todo: {
    item,
  },
});

export const showItem = () => ({
  type: types.SHOW_ITEM,
});

export const addItem = (object) => ({
  type: types.ADD_ITEM,
  object,
});

export const onchange = (newItem) => ({
  type: types.ON_CHANGE,
  newItem,
});

// export const addItem = (object) => ({
//   type: types.ADD_ITEM,
//   object,
// });
