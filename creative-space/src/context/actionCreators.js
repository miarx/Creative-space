
import { ACTION_TYPES } from "./actionTypes";

export const itemsLoaded = (items) => ({
  type: ACTION_TYPES.ITEMS_LOADED,
  payload: items
});

export const itemCreated = (item) => ({
  type: ACTION_TYPES.ITEM_CREATED,
  payload: item
});

export const itemUpdated = (item) => ({
  type: ACTION_TYPES.ITEM_UPDATED,
  payload: item
});

export const itemDeleted = (id) => ({
  type: ACTION_TYPES.ITEM_DELETED,
  payload: id
});

export const searchChanged = (search) => ({
  type: ACTION_TYPES.SEARCH_CHANGED,
  payload: search
});

export const pageChanged = (page) => ({
  type: ACTION_TYPES.PAGE_CHANGED,
  payload: page
});

export const sortChanged = (sort) => ({
  type: ACTION_TYPES.SORT_CHANGED,
  payload: sort
});

export const filterChanged = (filters) => ({
  type: ACTION_TYPES.FILTER_CHANGED,
  payload: filters
});
