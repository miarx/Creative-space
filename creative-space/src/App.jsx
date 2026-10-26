import "./App.css";

import { Routes, Route } from "react-router-dom";


import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import WorkshopsPage from "./pages/WorkshopsPage";

import WorkshopDetailsPage from "./pages/WorkshopDetailsPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route
                    path="workshops"
                    element={<WorkshopsPage />}
                />

                <Route
                     path="/workshops/:id"
                     element={<WorkshopDetailsPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;