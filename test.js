const axios = requires('axios');
const FILE_ID = '27895fdb-696a-4d92-8700-e4b4c7bc9c40'; //process.env.REACT_APP_FILE_ID;
  const API_KEY = 'NlunpyC9eK22pDD2PIMPHsfIF6e7uKiZHcehy1KNJO';//process.env.REACT_APP_API_KEY;
  const endpoint = `https://api.jsonsilo.com/${FILE_ID}`;


    const fetchData = async () => {
        try {
          const response = await axios.get(endpoint, {
            headers: {
              'X-Master-Key': secretKey,
            },
          });

          return response.data;

        } catch (error) {
          console.error('Error fetching data:', error);
          return null;
        }
      };


    const fetchJSONData = async () => {
          const jsonData = await fetchData();
    }
