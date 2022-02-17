import { ADD_USER_VIEW, GET_VIEWS } from "./types";

const initialState = {
  lastViews: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_VIEW:
      // console.log(action.payload);
      // console.log(state);
      if (state.lastViews.length === 0) {
        return { lastViews: [...state.lastViews, action.payload] };
      }
      let addedItem = state.lastViews.find((c) => c.id === action.payload.id);
      // console.log(addedItem);
      if (addedItem) {
        return state;
      } else {
        const newState = [action.payload, ...state.lastViews].slice(0, 5);

        localStorage.setItem("lastView", JSON.stringify(newState));
        console.log(newState);
        return { lastViews: [...newState] };
      }
    case GET_VIEWS:
      return { lastViews: [...action.payload] };

    default: {
      return state;
    }
  }
};
