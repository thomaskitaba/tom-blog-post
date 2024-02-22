import { useState } from 'react';
import MyContextProvider from './components/MyContextProvider';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Notification } from './components/Notification';
import Posts  from './components/Posts';
import NavBar2 from './components/NavBar2';
import Sqlite from './components/Sqlite';
import BackgroundImage from './components/BackgroundImage';
import ErrorBoundary from './components/ErrorBoundary';
import { Postsaccordion } from './components/Postsaccordion';
function App() {

  const [count, setCount] = useState(0)
  return (
    <>

    <MyContextProvider>
        <BackgroundImage />
        <NavBar />
        {/* <Sqlite /> */}
        <Banner />
        <Notification />
        <Postsaccordion />
        {/* <ErrorBoundary>
          <Posts />
        </ErrorBoundary> */}

    </MyContextProvider>

    </>
  )
}
export default App
