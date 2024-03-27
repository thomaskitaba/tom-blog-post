import texture from '../assets/img/man-carrying-books.png';

const Texture = (props) => {
  const {image1} = props;
  return (
    <>
      <img src={texture} alt='texture' className='texture-right' />
    </>
  )
}
export default Texture;