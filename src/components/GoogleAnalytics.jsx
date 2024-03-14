import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID, {
    gaOptions: {
      cookieFlags: 'SameSite=None; Secure'
    }
  });
};

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
