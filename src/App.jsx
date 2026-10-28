import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import WorkshopsPage from "./pages/WorkshopsPage";
import WorkshopDetailsPage from "./pages/WorkshopDetailsPage";
import CreateWorkshopPage from "./pages/CreateWorkshopPage";
import EditWorkshopPage from "./pages/EditWorkshopPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([{
    path: "/", element: <Layout />,
    children: [
        { index: true, element: <HomePage /> },
        { path: "workshops", element: <WorkshopsPage /> },
        { path: "workshops/:id", element: <WorkshopDetailsPage /> },
        { path: "create", element: <CreateWorkshopPage /> },
        { path: "workshops/:id/edit", element: <EditWorkshopPage /> },
        { path: "*", element: <NotFoundPage /> }
    ]
}]);
export default function App() { return <RouterProvider router={router} />; }
