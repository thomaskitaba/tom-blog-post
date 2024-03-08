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
import { Services } from './components/Services';
import { Consultancy } from './components/Consultancy';
// import { Footer } from './components/Footer';


function App() {

  const [count, setCount] = useState(0)
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
      <MyContextProvider>
        <BackgroundImage />
        <NavBar />
        {/* <Sqlite /> */}
        <Banner />
        <Services/>
        {/* <Consultancy /> */}
        {/* <Notification /> */}
        <Postsaccordion />
        {/* <ErrorBoundary>
          <Posts />
        </ErrorBoundary> */}
      </MyContextProvider>
    </div>
    </>
  );
      }
export default App
