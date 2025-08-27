import { Dashboard } from './pages/Dashboard'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { CustomerDetails } from './pages/CustomerDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
