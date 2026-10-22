
import { createContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";

import { workshops } from "../data/workshops";
import { studios } from "../data/studios";
import { materials } from "../data/materials";

export const DataContext = createContext(null);

const initialState = {
  workshops: workshops,
  studios: studios,
  materials: materials,

  search: "",
  page: 1,
  sort: {
    field: "title",
    direction: "asc"
  },
  filters: {
    studioId: null,
    materialIds: [],
    minPrice: "",
    maxPrice: ""
  }
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(
    dataReducer,
    initialState
  );

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
