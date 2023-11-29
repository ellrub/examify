import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Main from './components/Main.jsx'
import Quiz from "./components/Quiz.jsx"
import Result from "./components/Result.jsx"
import Options from "./components/Options/Options.jsx"
import './App.css'

// routes
const router = createBrowserRouter([
  {
    path : "/",
    element : <Main></Main>
  },
  {
    path : "/options",
    element : <Options></Options>
  },
  {
    path : "/quiz",
    element : <Quiz></Quiz>
  },
  {
    path : "/result",
    element : <Result></Result>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
