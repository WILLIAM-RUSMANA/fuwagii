import './App.css'
import Home from "./pages/Home.jsx"
import QuizApp from "./pages/Quiz-App.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/quiz", element: <QuizApp /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
