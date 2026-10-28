import { ACTION_TYPES } from "./actionTypes";

export function dataReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ITEMS_LOADED:
      return {
        ...state,
        workshops: action.payload
      };

    case ACTION_TYPES.ITEM_CREATED:
      return {
        ...state,
        workshops: [...state.workshops, action.payload]
      };

    case ACTION_TYPES.ITEM_UPDATED:
      return {
        ...state,
        workshops: state.workshops.map((workshop) =>
            workshop.id === action.payload.id
                ? action.payload
                : workshop
        )
      };

    case ACTION_TYPES.ITEM_DELETED:
      return {
        ...state,
        workshops: state.workshops.filter(
            (workshop) => workshop.id !== action.payload
        )
      };

    default:
      return state;
  }
}
