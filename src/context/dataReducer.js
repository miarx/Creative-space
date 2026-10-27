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

    case ACTION_TYPES.SEARCH_CHANGED:
      return {
        ...state,
        search: action.payload,
        page: 1
      };

    case ACTION_TYPES.PAGE_CHANGED:
      return {
        ...state,
        page: action.payload
      };

    case ACTION_TYPES.SORT_CHANGED:
      return {
        ...state,
        sort: action.payload,
        page: 1
      };

    case ACTION_TYPES.FILTER_CHANGED:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
        page: 1
      };

    default:
      return state;
  }
}
