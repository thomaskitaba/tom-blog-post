
import MyContextProvider from './components/MyContextProvider';
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Notification } from './components/Notification';
import UserManagment from './components/UserManagment';
import Posts  from './components/Posts';
import NavBar2 from './components/NavBar2';
import Sqlite from './components/Sqlite';

import BackgroundImage from './components/BackgroundImage';
import ErrorBoundary from './components/ErrorBoundary';
import { Postsaccordion } from './components/Postsaccordion';
import { Services } from './components/Services';
import { Consultancy } from './components/Consultancy';
import Footer  from './components/Footer';
import Contact from './components/Contact';
import Loading from './components/Loading';
import Button from './components/Button';
import Slider from './components/Slider';
import SliderJson from './components/SliderJson';
import Texture from './components/Texture';
import Busy from './components/Busy';
import generateTextFromGPT from './components/generateTextFromGPT';
// Import Google Analytics functions
import { initGA, PageView } from './components/GoogleAnalytics';
import React, { useState, useEffect } from 'react';

function App() {
  // Initialize Google Analytics on component mount
  useEffect(() => {
    initGA('G-1B5MYTWDE3'); // Replace with your Measurement ID
    PageView();
  }, []);

  const [count, setCount] = useState(0)
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
      <MyContextProvider>
        <BackgroundImage />
        <NavBar />
        <Button />

        <Banner />
        {/* <Texture /> */}
        {/* <generateTextFromGPT /> */}

        {/* <Services/> */}
        {/* <Consultancy /> */}
        {/* <Busy /> */}

        <Slider SliderJson={SliderJson} />
        <Postsaccordion />
        <Contact />
        <Footer />
      </MyContextProvider>
    </div>
    </>
  );
      }
export default App
