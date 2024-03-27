import texture from '../assets/img/man-carrying-books.png';


const Texture = (props) => {
  // const apiKey = process.env.VITE_API_KEY;
  // const email = process.env.VITE_EMAIL;
  // const password = process.env.VITE_PASSWORD;
  const apiKey = import.meta.env.VITE_API_KEY;
  const email = import.meta.env.VITE_EMAIL;
  const password = import.meta.env.VITE_PASSWORD;

  const { image1 } = props;

  console.log(apiKey, email, password);

  return (
    <>
      {/* <img src={texture} alt='texture' className='texture-right' /> */}
      <h1> Testing environment variable </h1>
      <hr></hr>
      <div> {apiKey ? apiKey : 'API key not found'} </div>
      <div> {email ? email : 'Email not found'} </div>
    </>
  );
};

export default Texture;
