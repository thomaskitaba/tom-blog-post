// src/components/JSONBinComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyContext from './MyContext';
import {HandThumbsUp, HandThumbsDown, Trash, PersonFill, PencilFill , ChatLeftText,  ExclamationTriangleFill, ReplyFill, Gear, ArrowUpCircle, ArrowDownCircle, X, Explicit, PenFill} from "react-bootstrap-icons";
export const Postsaccordion = (props) => {

  // get global contexts
  const { userId, setUserId } = useContext(MyContext);
  const { userTypeId, setUserTypeId } = useContext(MyContext);
  const { userName, setUuserNamee } = useContext(MyContext);
  const { signedIn, setSignedIn } = useContext(MyContext);
  const { endpoint, setEndpoint } = useContext(MyContext);
  const { myApiKey, setMyApiKey } = useContext(MyContext);
  const { databaseChanged, setDatabaseChanged } = useContext(MyContext);
  const { sortBy, setSortBy} = useContext(MyContext);
  const { sortWith, setSortWith }= useContext(MyContext);
  // comment and reply related
  const [ commentButtonClicked, setCommentButtonClicked ] = useState(false);
  const [ deleteCommentButtonClicked, setDeleteCommentButtonClicked ] = useState(false);
  const [ deletePostButtonClicked, setDeletePostButtonClicked ] = useState(false);
  const [ deleteReplyButtonClicked, setDeleteReplyButtonClicked ] = useState(false);

  const [ editCommentButtonClicked, setEditCommentButtonClicked] = useState(false);
  const [ editReplyButtonClicked, setEditReplyButtonClicked ] = useState(false);
  const [editPostButtonClicked, setEditPostButtonClicked] = useState(false);

  const [ addReplyButtonClicked, setAddReplyButtonClicked ] = useState(false);
  const [ addCommentButtonClicked, setAddCommentButtonClicked ] = useState(false);
  const [ addPostButtonClicked, setAddPostButtonClicked] = useState(false);

  const [comment, setComment] = useState('');

  // states for TOGGLE on | off
  const [checked, setChecked] = useState(false);
  const [displayText, setDisplayText] = useState('Expand individually');

  // states for Form
  const [openForm, setOpenForm] = useState(false);
  const [openAlertForm, setOpenAlertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const [formName, setFormName] = useState('Comment Form');
  const [alertFormName, setAlertFormName] = useState('Alert Form');
  const [editFormName, setEditFormName] = useState('Edit Form');

  const [submitFormText, setSubmitFormText] = useState('Submit');
  const [deletButtonText, setDeletButtonText] = useState('Delete');
  const [editButtonText, setEditButtonText] = useState('Edit');
  const [messageText, setMessageText] = useState('Successfull');
  const [commentText, setCommentText] = useState('Write Comment')
  const [postTitle, setPostTitle] = useState('Post Title');
  const [postStatus, setPostStatus] = useState('Post Status');
  const { database, setDatabase } = useContext(MyContext);

  // to handle comment/reply submit
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [description, setDescription] = useState('');
  const [actionTaker, setActionTaker] = useState('Commenter'); // to handle comment|reply|post actions
  const [tempStatus, setTempStatus] = useState('active');
  const [postContent, setPostContent] = useState('');
  const [commentButtonTypeClicked, setCommentButtonTypeClicked] = useState('');
  // const [deleteButtonTypeClicked, setDeletButtonTypeClicked] = useState('');

  const [viewStatus, setViewStatus] = useState('active');
  const [commentId, setCommentId] = useState('');

  // post related states
  const [postId, setPostId] = useState('');
  const [authorId, setAuthorId] = useState('');
  // to handle post|comment|reply likes
  const [likedContent, setLikedContent] = useState('');
  // const [postLikeClicked, setPostLikeClicked] = useState('');
  // const [commentLikeClicked, setCommentLikeClicked] = useState('');
  // const [replyLikeClicked, setReplyLikeClicked] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');



  useEffect(() => {
    userTypeId === 1 ? setTempStatus(prev=> "post.postStatus") : setTempStatus(prev => "post.postStatus = 'active'")
  },[userTypeId]);

  // TODO: HELPER FUNCTIONS
  const refineDate = (fullDate) => {
    const onlyDate = fullDate.slice(0, 10);
    return (onlyDate);
  }
  // get current day

  const currentDay = new Date().toISOString().slice(0, 10);
  //*******Caculate difference between Days return the result youtube style */
  const calculateDateDifference = (date) => {
    const tempdate = new Date(date);
    const currentDate = new Date();

    // Compute the difference in milliseconds
    const differenceInMs = currentDate - tempdate;
    const differenceInSeconds = differenceInMs / 1000;
    const differenceInMinutes = differenceInMs / (1000 * 60);
    const differenceInHours = differenceInMs / (1000 * 60 * 60);
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    const differenceInMonths = differenceInMs / (1000 * 60 * 60 * 24 * 30);
    const differenceInYears = differenceInMs / (1000 * 60 * 60 * 24 * 365);

    if (differenceInSeconds < 60) {
        return `Just Now`;
    } else if (differenceInMinutes < 60) {
        return `${Math.floor(differenceInMinutes)}min ago`;
    } else if (differenceInHours < 24) {

        return `${Math.floor(differenceInHours) - 3}hrs ago`;
    } else if (differenceInDays < 30) {
        return `${Math.floor(differenceInDays)}d ago`;
    } else if (differenceInMonths < 12) {
        return `${Math.floor(differenceInMonths)}m ago`;
    } else {
        return `${Math.floor(differenceInYears)}yr ago`;
    }
}

//todo:   check if input is not empty
const doesInputExist = (data) => {
  if (!data) {
    return false;
  }
  return true;
}

const getLikedContent = (id, value) => {

  if (value === 'post-liked') {
    setLikedContent('post');
    alert(`postId: ${id}  ${value}`);
  } else if (value === 'comment') {

  } else if (value === 'reply') {

  }

}
//todo: display message for 3 seconds
const handelMessage = () => {
  // delet message
  if (deleteReplyButtonClicked) {
    setMessageText('Reply Deleted Successfully');
  }
  if (deleteCommentButtonClicked) {
    setMessageText('Comment Deleted Successfully');
  }
  // edit messsage
  if (editReplyButtonClicked) {
    setMessageText('Reply Edited Successfully');
  }
  if (editCommentButtonClicked) {
    setMessageText('Comment Edited Successfully');
  }
  // post message
  if (deletePostButtonClicked) {
    setMessageText('Post Deleted Successfully');
  }
  if (editPostButtonClicked) {
    setMessageText(' Post Edited Successfully');
  }
  if (addCommentButtonClicked) {
    setMessageText('Comment Added Successfully');
  }
  if (addReplyButtonClicked) {
    setMessageText('Reply Added Successfully');
  }
  if (addPostButtonClicked) {
    setMessageText('Post Added Successfully');
  }
  setTimeout(() => {
    setOpenMessage(false);
  }, 2500);
}

const handelSortPost = (value) => {
  setSelectedSortOption(value);
  if (value === 'pending') {
      setSortBy('post-status'); setSortWith('pending');
  } else if (value === 'active') {
      setSortBy('post-status'); setSortWith('active');
  } else if (value === 'deleted') {
      setSortBy('post-status'); setSortWith('deleted');
  } else if (value === 'other') {
      setSortBy('post-status'); setSortWith('other');

  } else if (value === 'date-descending') {
      setSortBy('post-date'); setSortWith('descending');
  } else if (value === 'date-ascending') {
      setSortBy('post-date'); setSortWith('ascending');
  } else if (value === 'likes-most') {
    setSortBy('likes'); setSortWith('descending');
  } else if (value === 'likes-less') {
    setSortBy('likes'); setSortWith('ascending');
  } else {
    setSortBy('post-date'); setSortWith('ascending');
  }
}
const resetButtons = () => {
  setAddCommentButtonClicked(false);
  // setAddReplyButtonClicked(false);
  setAddPostButtonClicked(false);

  setDeleteCommentButtonClicked(false);
  setDeleteReplyButtonClicked(false);
  setDeletePostButtonClicked(false);

  setEditCommentButtonClicked(false);
  setEditReplyButtonClicked(false);
  setEditPostButtonClicked(false);

}
// enable user collapse and expand accrodion all as one, or individually
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    setDisplayText(e.target.checked ? 'Expand All' : 'Expand individually');
    // alert("hello thomas kitaba");
  };

  // const handleSelectedSortChange = (e) => {

  // }
  const handelActionTaker = (dataOwnerId) => {
    (userId === dataOwnerId && userTypeId === 1) && setActionTaker('Owner');
    (userId === dataOwnerId && userTypeId != 1) && setActionTaker('Owner');
    (userId !== dataOwnerId && userTypeId === 1) && setActionTaker('Admin');

  }
  const handelAddPostButtonClicked = (userId) => {
    // set required variables
    setPostId(userId);

    resetButtons();
    setAddPostButtonClicked(true);


    setOpenForm(true);
    setFormName('Post Form');
    setSubmitFormText('Submit Post');
  }

  const handelCommentButtonClicked = (value) => {
    // setCommentButtonTypeClicked('comment');
    setPostId(value);

    resetButtons();
    setAddCommentButtonClicked(true);

    setOpenForm(true);
    setSubmitFormText('Submit Comment');
    setFormName('Comment Form');

  }

  const handelReplyButtonClicked = (value) => {
    setCommentButtonTypeClicked('reply');

    setCommentId(value);

    resetButtons();
    setAddReplyButtonClicked(true);

    setOpenForm(true);
    setSubmitFormText('Reply Comment');
    setFormName('Reply Form');

  }

  //TODO:  post|comment|reply    tools   RUD
  const handelDeleteCommentClicked = (value, commenterId) => {

    // set required variables
    setCommentId(value);

    alert(JSON.stringify({commentId, userId, userTypeId}));
    handelActionTaker(commenterId);
    resetButtons();
    setDeleteCommentButtonClicked(true);

    // set form title bar text |  submit delet button text
    setAlertFormName('Delete Comment');
    setDeletButtonText('Delete Comment');

    setOpenAlertForm(true);
    setOpenEditForm(false);
    setOpenForm(false);

  }
  const handelDeletePostClicked = (value, id) => {
    // set required variables
    setPostId(value);
    setAuthorId(id);
    handelActionTaker(authorId);

    resetButtons();
    setDeletePostButtonClicked(true);
    // setDeleteCommentButtonClicked(false);
    // setDeleteReplyButtonClicked(false);

    setAlertFormName('Delete Post');
    setDeletButtonText('Delete Post');

    // prevent cascanding windows
    setOpenAlertForm(true);
    setOpenEditForm(false);
    setOpenForm(false);
  }

  const handelDeleteReplyClicked = (value, replierId) => {
    // set required variables
    setCommentId(value);

    // for use in axios or fetch
    alert(JSON.stringify({replierId, userId, userTypeId}));
    handelActionTaker(replierId);

    resetButtons();
    setDeleteReplyButtonClicked(true);
    //  setDeletePostButtonClicked(false);
    //  setDeleteCommentButtonClicked(false);

    setAlertFormName('Delete Reply');
    setDeletButtonText('Delete Reply');

    // prevent cascading forms
    setOpenAlertForm(true);
    setOpenEditForm(false);
    setOpenForm(false);

  }

  const handelEditPostClicked = (postId, authorId, description, postContent, postTitle, postStatus) => {
    // set required varaiables
    setPostId(postId);
    setAuthorId(authorId);
    setDescription(description);
    setPostContent(postContent);
    setPostTitle(postTitle);
    setPostStatus(postStatus)
    // alert(content);
    // for user in axios or fetch
    resetButtons();
    setEditPostButtonClicked(true);
    alert(postStatus);

     // set form title bar text  |  button text
    setEditFormName('Edit Post');
    setEditButtonText('Submit Edited Post .....');

    // prevent cascading forms and ambiguity
    setOpenEditForm(true);
    setOpenAlertForm(false);
    setOpenForm(false);

  }
  const handelEditCommentClicked = (id, content) => {
    setCommentId(id);
    setCommentContent(content);
    // alert(content);
    // for user in axios or fetch
    resetButtons();
    setEditCommentButtonClicked(true);

    // set form title bar text  |  button text
    setEditFormName('Edit Comment');
    setEditButtonText('Submit Edited Comment');

    // prevent cascading forms
    setOpenEditForm(true);
    setOpenAlertForm(false);
    setOpenForm(false);
  }
  const handelEditReplyClicked = (id, content) => {
    // get values and set required variables
    setCommentId(id);
    setCommentContent(content);
    // alert(content);

    // for use in axios or fetch
    resetButtons();
    setEditReplyButtonClicked(true);

    // set form title bar text  |  button text
    setEditFormName('Edit Reply');
    setEditButtonText('Submit Edit Reply')

    // show the edit form and prevent cascading forms
    setOpenEditForm(true);
    setOpenAlertForm(false);
    setOpenForm(false);
  }

  //TODO: end of TOOLS
  // TODO:  HANDEL FORM SUBMITS


  const handelCommentFormSubmit = async (e) => {
    e.preventDefault();
    if (userId != 0) {
      if (addCommentButtonClicked) {
        setSubmitFormText('Submiting .....Comment');
        alert (JSON.stringify({postId, userId, userName, firstName, lastName, commentContent, description}));

        try {
          const response = await axios.post(`${endpoint}/api/postcomment/add`, {postId, userId, userName, firstName, lastName, commentContent, description}, {
            headers: {
              'Content-type': 'application/json',
              'x-api-key': myApiKey,
            }
          });
          alert(JSON.stringify(response.data));
          setOpenForm(false);
          setDatabaseChanged(!databaseChanged);

          //show success message for specific interval
          setOpenMessage(true);
          // display message for 3 seconds
          handelMessage();

          setAddCommentButtonClicked(false);

        } catch(error) {
          alert(error);
          console.log(error);
        }
      } else if (addReplyButtonClicked) {

        setSubmitFormText('Submiting .....Reply');

        alert(commentId, userId, userName, firstName, lastName, commentContent, description);
        try {
          const response = await axios.post(`${endpoint}/api/reply/add`, {commentId, userId, userName, firstName, lastName, commentContent, description}, {
            headers: {
              'Content-type': 'application/json',
              'x-api-key': myApiKey,
            }
          });
          setOpenForm(!openForm);
          setSubmitFormText('Submit Comment');
          setDatabaseChanged(!databaseChanged);

          //show success message for specific interval
          setOpenMessage(true);
          // display message for 3 seconds
          handelMessage();

          setAddReplyButtonClicked(false);
        } catch(error) {
          alert(error);
          console.log(error);
        }
      } else if (addPostButtonClicked) {
        if (doesInputExist(commentContent)) {
          alert(JSON.stringify({postId, userId, userName, firstName, lastName, commentContent, description, userTypeId}));
          setSubmitFormText('Submitting .....post');

          try {
            const response = await axios.post(`${endpoint}/api/post/add`, {
              userId,
              postTitle,
              commentContent,
              description,
              userName,
              firstName,
              lastName,
              userTypeId,
            }, {
              headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
            });

            // alert(JSON.stringify(response.data));
            setOpenForm(false);
            setDatabaseChanged(!databaseChanged);
            // Show success message for a specific interval

            setOpenMessage(true);
            handelMessage();
            setAddPostButtonClicked(false);

          } catch (error) {
            // Display a user-friendly error message
            alert('An error occurred while submitting the post. Please try again later.');
            console.log('Error submitting post:', error);
          } finally {
            // Reset the submit button text regardless of success or failure
            setSubmitFormText('Submit Post');
          }
        } else {
          alert('Post content is needed');
        }
      } else {
        console.log('Unknown operation');
      }
    }
  }

  //TODO:   handelDeleteDataSubmit
  const handelDeleteDataSubmit = async (e) => {
    e.preventDefault();
    if (deletePostButtonClicked) {
      setDeletButtonText('Deleting .....');
      alert(JSON.stringify({postId, userId, userName, userTypeId}));
      try {
        const response = await axios.post(`${endpoint}/api/post/delete`, {postId, userId, userName, userTypeId}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        setOpenAlertForm(!openAlertForm);
        setDatabaseChanged(!databaseChanged);
        //show success message for specific interval

        setOpenMessage(true);
        // display message for 3 seconds
        handelMessage();


      } catch(error) {
        alert(error);
        console.log(error);
      } finally {
        setDeletButtonText('Deleting');
      }

    } else if (deleteReplyButtonClicked || deleteCommentButtonClicked) {
      setDeletButtonText('Deleting .....');

      try {
        const response = await axios.post(`${endpoint}/api/comment/delete`, {commentId, userId, userName, userTypeId}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        setOpenAlertForm(!openAlertForm);
        setDatabaseChanged(!databaseChanged);
        //show success message for specific interval

        setOpenMessage(true);
        // display message for 3 seconds
        handelMessage();

      } catch(error) {
        alert(error);
        console.log(error);
      }

    } else {
      console.log("Invalid Delete Command");
      //todo: notificaion
    }
  }

  const handelEditDataSubmit  = async (e) => {
    e.preventDefault();
    if (editPostButtonClicked) {
      setEditButtonText('Editing .....');

      alert(JSON.stringify({postStatus}));
      try {
        const response = await axios.post(`${endpoint}/api/post/edit`, {postId, userId, userName, authorId, description, postContent, postTitle, postStatus}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        setOpenEditForm(!openEditForm);
        setDatabaseChanged(!databaseChanged);

        //show success message for specific interval for 3 seconds
        setOpenMessage(true);
        handelMessage();

      } catch(error) {
        alert(error);
        console.log(error);
      }

    } else if (editReplyButtonClicked || editCommentButtonClicked) {
      setEditButtonText('Editing .....');
      try {
        const response = await axios.post(`${endpoint}/api/comment/edit`, {commentId, userId, userName, commentContent}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        setOpenEditForm(!openEditForm);
        setDatabaseChanged(!databaseChanged);

        //show success message for specific interval
        setOpenMessage(true);
        // display message for 3 seconds
        handelMessage();

      } catch(error) {
        alert(error);
        console.log(error);
      }

    } else {
      console.log("Invalid Edit Command");
      //todo: notificaion
    }
  }
  //alert(commentButtonTypeClicked);
  return (
    <>
    {openMessage &&
      <div className='message-form'>
        {messageText ? messageText : 'Successfull'}
      </div>
    }
    { openAlertForm &&
      <div className="alert-form">
        <div className="close-form">
        <div className="alert-form-title">
          <h6>{alertFormName ? alertFormName : 'Delete'}</h6>
        </div>
           <div onClick={() => setOpenAlertForm(false)}><X /></div>
           </div>
        <form onSubmit={handelDeleteDataSubmit}>
          <div>
          { signedIn &&
            <div className="comment-form-notification">
              <p>Are You sure you want to delete your comment </p>
            </div>
          }
          </div>
          <div>
              <button type="submit" className="submit-comment-button">{deletButtonText}</button>
          </div>
        </form>
      </div>
    }
    { openEditForm &&
      <div className="alert-form">
        <div className="close-form">
          <div className="alert-form-title">
            <h6>{editFormName ? editFormName : 'Edit'}</h6>
          </div>
           <div onClick={() => setOpenEditForm(false)}><X /></div>
        </div>

           { signedIn &&

        <form onSubmit={handelEditDataSubmit}>

          { editPostButtonClicked &&
          <>
            <div className="edit-title">
                <label htmlFor="postTitle"> Post Title</label>
                <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description"> Post Status </label>
                <input type="text" value={postStatus} onChange={(e) => setPostStatus(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description"> Description </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

          </>
          }
          <div className="edit-textarea">
          <label htmlFor="description"> Post Content </label>
          <textarea
                  placeholder="Add your comment here"
                  name={formName ? formName : 'form'}
                  value={editPostButtonClicked ? postContent : commentContent}
                  onChange={(e) => {editPostButtonClicked ? setPostContent(e.target.value) : setCommentContent(e.target.value)}}
                  />
          </div>
          <div>
              <button type="submit" className="submit-comment-button">{editButtonText}</button>
          </div>

        </form> }
      </div>
    }
    { openForm &&
      <div className="comment-form">
        <div className="close-form">
        <div className="comment-form-title">
          <h6>{formName ? formName : 'comment/reply form'}</h6>
        </div>
           <div onClick={() => setOpenForm(false)}><X /></div>
           </div>
        <div>
        { signedIn ? (
          <form onSubmit={handelCommentFormSubmit}>
            <div className="first-name">
              <label htmlFor="fname"> First Name</label>
              <input type="text" name="fname" value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="last-name">
              <label htmlFor="lname"> Last Name</label>
              <input type="text" name="lname" value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
            </div>
            {(addPostButtonClicked || editPostButtonClicked)  && <div className="comment-title">
              <input type="text" name="postTitle" value={postTitle} placeholder='Title of you post' onChange={(e) => setPostTitle(e.target.value)}/>
            </div>}
            <div className="comment-form-content">
              {/* <div className="comment-textarea-title"> {addPostButtonClicked ? 'Write your Post Here' : 'Write your comment here '} </div> */}
              <div className="comment-textarea">
              <textarea
                placeholder={addPostButtonClicked ? 'Write your Post Here' : 'Write your comment here'}
                name={formName ? formName : 'form'}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              </div>
              {(addPostButtonClicked || editPostButtonClicked)  &&
                <div className="comment-description">
                  <input className="description" placeholder="Description" value={description} name="description" onChange={(e)=> setDescription(e.target.value)}/>
                </div>
              }
              <div>
                <button type="submit" className="submit-comment-button">{submitFormText}</button>
              </div>
            </div>
          </form>
        ) :
          <div className="comment-form-notification">
            <p>You have to be signed in to Comment. if you Don't have an account create one now. </p>
            <p> <a href="#sign-in"> LogIn</a>  | <a href="#sign-up"> SignUp</a></p>
          </div>
}
        </div>

      </div>
    }
    {/* {JSON.stringify(database)} */}
    <div className="blog-post">
      <div className="blog-post-header">
        <h2>Read Research works</h2>
      </div>
      <div className="toggle-contribute">
        <div className="contribute-button" onClick={ (e) => handelAddPostButtonClicked(userId)}><PenFill className="gear"/>  <p> Contribute Your works</p></div>
        { userTypeId === 1 && <div className="contribute-button" onClick={ (e) => {setSortBy('post-status'); setSortWith('deleted')}}> <p><Gear className="gear"/>Manage Posts|Users</p></div> }
          <div className="toggle">
            <div className='toggle-buttons'>
            <input type="checkbox" name="toggle" className="toggle-cb" id="toggle-0" onChange={handleCheckboxChange}/>
            <label className="toggle-label" htmlFor="toggle-0">
                <div className="toggle-inner"></div>
                <div className="toggle-switch"></div>
            </label>
          </div>
          <div className="display-text">{displayText}</div>
          {/* <input type="checkbox" name="allposts" onChange={handleCheckboxChange}/>
            <label htmlFor="allposts">{displayText}</label> */}
        </div>
      </div>
      { userTypeId === 1 ?
      <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', fontWeight: '800'}}>
            <p style={{color: 'lightgreen'}}> Active </p>
            <p style={{color: 'salmon'}}> Deleted</p>
            <p style={{color: 'yellow'}}> Pending </p>
            <p style={{color: 'mediumorchid'}}> Others</p>
      </div> : null
}
      <div className="sort-posts">
      <div className="sort-container">
      <h6>Select Sort Options</h6>
      <select value={selectedSortOption} onChange={(e) => { handelSortPost(e.target.value)}}>
        <option value="">Sort by</option>
      { userTypeId === 1 &&
      <>
        <option value="pending">Pending</option>
        <option value="active">Active</option>
        <option value="deleted">Deleted</option>
        <option value="other">Others</option>
      </>
      }

        <option value="date-ascending">Date Ascending</option>
        <option value="date-descending">Date descending</option>
        <option value="likes-most">Most to Less Liked</option>
        <option value="likes-less">Less to Most Liked</option>
      </select>
      {selectedSortOption && (
        <p>You have selected: {selectedSortOption}</p>
      )}
    </div>
      </div>
      <div className="accordion-container-main">
      {database && database.record && database.record.posts && database.record.posts.length > 0 && (

       <div className="accordion accordion-flush half-width" id="accordionFlush-post">

        {database.record.posts.map((post, postIndex) => (
          // {let tempStatus = '';}
          // userTypeId === 1 ? setTempStatus("post.postStatus") : setTempStatus("post.postStatus = 'active'")
          eval(tempStatus) && (
          <div key={post.postId} className="accordion-item">
          <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-green"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={checked ? "#flush-collapse" : `#flush-collapse-${post.postId}`}
            aria-expanded='true'
            aria-controls={checked ? "flush-collapse" : `flush-collapse-${post.postId}`}
          >
            <div className="accordion-button-display">
              {/* <div className='post-id-before'>

              </div> */}
              <div>
                <div>
                  {/* <h4>{postIndex + 1}: [{post.authorId}] {post.postTitle} <cite className='citation' {style={userTypeId === 1 ? { backgroundColor: post.postStatus === 'deleted' ? 'red' : post.postStatus === 'active' ? 'green' : 'red' } : null}} ><PencilFill />: {post.authorName ? post.authorName : 'website owner'}</cite></h4> */}
                  <h4>
                    {postIndex + 1}: [{post.authorId}] {post.postTitle}
                    <cite className='citation' style={userTypeId === 1 ? { backgroundColor: post.postStatus === 'deleted' ? 'salmon' : post.postStatus === 'active' ? 'lightgreen' :  post.postStatus === 'pending' ? 'yellow' : 'mediumorchid'} : null}>
                      <PencilFill />: {post.authorName ? post.authorName : 'website owner'}
                    </cite>
                  </h4>

                </div>
                <div>{post.postDescription && post.postDescription}</div>
              </div>
              <div className=''>
                <p>{post.postCreatedDate ? calculateDateDifference(post.postCreatedDate) : ''}</p>
                <p style={{fontSize: '0.75rem'}}> {post.comments.length}: {post.comments.length <= 1 ? 'comment' : 'comments'}</p>
              </div>
            </div>
          </button>
          </h2>
          <div className="post-footer">
            <div className='open-comment-button' id="comment-button" onClick={(e) => handelCommentButtonClicked(post.postId)}> <ReplyFill /></div>
            {signedIn && (post.authorId === userId || userTypeId === 1) &&
                <div className='comment-sub-tools'>
                  <div className='open-comment-button' id="delete-button" onClick={(e)=> handelDeletePostClicked(post.postId, post.authorId) }> <Trash/> </div>
                  <div className='open-comment-button' id="edit-button" onClick={(e) => handelEditPostClicked(post.postId, post.authorId, post.description, post.postContent, post.postTitle, post.postStatus)}> <PencilFill/> </div>
                </div>
            }
            <div className="hands-thums-up"><HandThumbsUp onClick={(e)=> {getLikedContent(post.postId, 'post-liked')}}/>: {post.likes} </div>
            <div>
            <HandThumbsDown onClick={(e)=>getLikedContent(post.postId && post.PostId, c.commentId && c.commentId, reply.replyId && reply.replyId)}/>: {post.disLikes}  </div>
          </div>
          <div id={checked ? "flush-collapse" : `flush-collapse-${post.postId}`} className="accordion-collapse collapse bg-green" data-bs-parent="#accordionFlush-post">
            <div className="accordion-body">
              {/* post detail part */}

              {/* Post part */}
                <div className="post-content">
                  <div> {post.postStatus === 'deleted' ? <div className="deleted-reply"> <ExclamationTriangleFill className='exclamation'/> This Post has been deleted by {actionTaker}</div>
                      :  post.postContent}</div>
                  </div>
                  <div className="post-description">{post.postDescription ? post.postDescription : 'Description: not available'}</div>
              {/* comment part */}
              {/* comment content part */}

                {/* <div className="comment-container"> */}
                {post.comments.map((c, commentIndex) => (
                   <div className="comment-container">
                      <div key={c.commentId} className="comment-box">
                        <div className="comment-body">
                          <div className="comment-content">
                          <div > {c.commentStatus === 'deleted' ? <div className="deleted-reply"> <ExclamationTriangleFill className='exclamation'/> This Comment has been deleted by the {actionTaker}!</div>
                                          :  c.commentContent}</div>
                          </div>
                        </div>
                        <div className="comment-footer">
                          <div className="comment-tools">
                            <div className='open-comment-button' id="reply-button" onClick={(e) => { handelReplyButtonClicked(c.commentId) }}> <ReplyFill/> </div>
                            {signedIn && c.commentStatus === 'active' && (c.commenterId === userId  || userTypeId === 1) &&
                              <div className='comment-sub-tools'>
                                <div className='open-comment-button' id="delete-button" onClick={(e) => { handelDeleteCommentClicked(c.commentId, c.commenterId); }}> <Trash/> </div>
                                <div className='open-comment-button' id="edit-button" onClick={(e) => { handelEditCommentClicked(c.commentId, c.commentContent); }}> <PencilFill/> </div>
                              </div>
                            }
                          </div>
                          <div style={{fontSize: '0.75rem'}}> {c.replies.length}: {c.replies.length <= 1 ? 'reply' : 'replies'}</div>
                          {/* <div> commentId: {c.commentId}</div>
                          <div >userId: {c.commenterId}</div> */}
                          <div>{calculateDateDifference(c.commentCreatedDate) === '0hrs ago' ? 'just now' : calculateDateDifference(c.commentCreatedDate)}</div>

                          <div><PersonFill />: {c.commenterName}</div>
                          <div><HandThumbsUp onClick={(e) => getLikedContent( c.commentId )}/> : {c.likes ? c.likes : 0}</div>
                        </div>

                        {c.replies && c.replies.length > 0 && (

                            <div className="accordion accordion-flush half-width" id="childAccordion">
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button collapsed bg-green" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseChild1" aria-expanded="false" aria-controls="flush-collapseChild1">
                                    Replies
                                  </button>
                                </h2>
                                <div id="flush-collapseChild1" className="accordion-collapse collapse bg-green" data-bs-parent="#childAccordion">
                                  <div className="accordion-body">
                                  {c.replies.map((reply, replyIndex) => (
                                    <div key={reply.commentId} className="comment-reply-box">
                                      <div className="comment-reply-body">
                                      <div > {reply.replyStatus === 'deleted' ? <div className="deleted-reply"> <ExclamationTriangleFill className='exclamation'/> This Reply has been deleted by the {actionTaker}!</div>
                                          :  reply.replyContent}</div>
                                      </div>
                                      <div className="comment-reply-footer">
                                      <div className="comment-tools">

                                      {signedIn && reply.replyStatus === 'active'  && (reply.replierId === userId  || userTypeId === 1)&&
                                        <div className='comment-sub-tools'>
                                          {/* <div className='open-comment-button' id="reply-button" onClick={(e) => { handelReplyButtonClicked(c.commenterId); }}> <ReplyFill/> </div> */}
                                          <div className='open-comment-button' id="delete-button" onClick={(e) => { handelDeleteReplyClicked(reply.commentId , reply.replierId); }}> <Trash/> </div>
                                          <div className='open-comment-button' id="edit-button" onClick={(e) => { handelEditReplyClicked(reply.commentId, reply.replyContent); }}> <PencilFill/> </div>
                                        </div>
                                      }
                                    </div>
                                        <div> prnt[{reply.parentId}]- cid:[{reply.commentId}] </div>
                                        <div>{calculateDateDifference(reply.replyCreatedDate) === '0hrs ago' ? 'just now' : calculateDateDifference(reply.replyCreatedDate)}</div>
                                        <div><PersonFill />{reply.replierName}</div>
                                        <div><HandThumbsUp onClick={(e)=>getLikedContent(reply.replyId && reply.replyId)}/>: {reply.likes ? reply.likes : 0}</div>
                                      </div>
                                    </div>
                                  ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                  </div>
        ))}
                {/* </div> */}

              </div>
          </div>
            </div>
             )
    ))}

      </div>

      )}
      </div>
    </div>

    </>
  );
};
