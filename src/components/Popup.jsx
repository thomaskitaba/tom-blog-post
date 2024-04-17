import {X} from 'react-bootstrap-icons';
export const Popup = (props) => {
  const {message} = props;
  return (
    <div className='message-form' style={signedIn ? {backgroundColor: 'lightgreen'}: {backgroundColor: 'salmon'}}>
        <div> <X /> </div>
        {messageText ? messageText : null}
    </div>
  )
}