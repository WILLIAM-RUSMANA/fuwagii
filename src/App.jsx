import './App.css'
import './index.css'
import Home from "./pages/Home.jsx"
import QuizApp from "./pages/Quiz-App.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuizDemo from "./QuizEffectDemo.jsx"

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/quiz", element: <QuizApp /> },
    {path: "/1", element: <QuizDemo />},
  ]);

  return <RouterProvider router={router} />;
}

export default App;
