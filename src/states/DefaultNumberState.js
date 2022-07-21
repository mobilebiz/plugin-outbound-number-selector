const SET_DEFAULT_NUMBER = 'DEFAULT_NUMBER';

const initialState = {
  defaultNumber: '',
};

export class Actions {
  static setDefaultNumber = (defaultNumber) => ({
    type: SET_DEFAULT_NUMBER,
    defaultNumber,
  });
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_NUMBER: {
      return {
        ...state,
        defaultNumber: action.defaultNumber,
      };
    }
    default: {
      return state;
    }
  }
}
