import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { DashboardPageProvider } from './context/DashboardPageContext';
import { CustomerDetails } from './pages/CustomerDetails';
import { Dashboard } from './pages/Dashboard'

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPageProvider><Dashboard /></DashboardPageProvider>,
  },
  {
    path: "/customer/:id",
    element: <CustomerDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
