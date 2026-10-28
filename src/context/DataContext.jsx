import { useReducer, useEffect } from "react";
import { dataReducer } from "./dataReducer";
import { DataContext } from "./DataContext.js";

import { workshops } from "../data/workshops";
import { studios } from "../data/studios";
import { materials } from "../data/materials";



const initialState = {
    workshops: workshops,
    studios: studios,
    materials: materials
};

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(
        dataReducer,
        initialState,
        (initial) => {
            try {
                const savedWorkshops = localStorage.getItem("creative-space-workshops");

                return {
                    ...initial,
                    workshops: savedWorkshops
                        ? JSON.parse(savedWorkshops)
                        : initial.workshops
                };
            } catch {
                return initial;
            }
        }
    );
    useEffect(() => {
        localStorage.setItem(
            "creative-space-workshops",
            JSON.stringify(state.workshops)
        );
    }, [state.workshops]);
    // таким чином, коли змінюється масив майстер-класів, ми автоматично зберігаємо його в localStorage

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}
