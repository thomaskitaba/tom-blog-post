import axios from 'axios';
import { useContext, useEffect } from 'react'; // Correct import statement
import MyContext from './MyContext';

const Keepalive = () => {
  const { endpoint, myApiKey } = useContext(MyContext);

  useEffect(() => {
    // Function to keep the backend instance active
    const keepInstanceActive = async () => {
      try {
        // Make a POST request to your server's keep-alive endpoint
        const response = await axios.get(
          `${endpoint}/`,

          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': myApiKey,
            }
          }
        );
        // console.log('Health check response:', `${response.status} ${response.data.message}`);
        console.log('Health check response:', `${response.status}`);
      } catch (error) {
        console.error('Error making health check request:');
      }
    };

    // Start sending periodic requests
    const intervalMs = 5 * 60 * 100; // 5 minutes
    const intervalId = setInterval(keepInstanceActive, intervalMs);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [endpoint, myApiKey]);
0
  return (
    <> </>
        // <h1>Keep me Alive</h1>

  );
};

export default Keepalive;
