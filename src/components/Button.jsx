import {useState, useEffect } from 'react';
import {ChevronUp, ChevronDown} from "react-bootstrap-icons";
const Button = () => {

  const [scrolled, setScrolled] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 800) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (window.scrollY < document.documentElement.scrollHeight - 1500) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 1500,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <div className="button-container">
      {scrolled && <div className="button-top"> <ChevronUp className="Chevron-up" onClick={(e)=>scrollToTop()}/></div>}
      {reachedEnd && <div className="button-bottom"> <ChevronDown className="Chevron-down" onClick={(e)=>scrollToBottom()}/> </div>}
    </div>
    </>
  )
}

export default Button;