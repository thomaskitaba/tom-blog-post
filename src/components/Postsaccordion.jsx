// src/components/JSONBinComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyContext from './MyContext';
import {HandThumbsUp, HandThumbsDown, Trash, ChatLeftText, ReplyAllFill, ReplyFill, PencilFill, ArrowUpCircle, ArrowDownCircle, X, Explicit} from "react-bootstrap-icons";
export const Postsaccordion = (props) => {

  // get global contexts
  const { userId, setUserId } = useContext(MyContext);
  const { userName, setUuserNamee } = useContext(MyContext);
  const { signedIn, setSignedIn } = useContext(MyContext);
  const { endpoint, setEndpoint } = useContext(MyContext);
  const { myApiKey, setMyApiKey } = useContext(MyContext);
  const { databaseChanged, setDatabaseChanged } = useContext(MyContext);
  // comment and reply related
  const [ commentButtonClicked, setCommentButtonClicked ] = useState(false);
  const [ deletButtonClicked, setDeleteButtonClicked ] = useState(false);
  const [comment, setComment] = useState('');

  // states for TOGGLE on | off
  const [checked, setChecked] = useState(false);
  const [displayText, setDisplayText] = useState('individually');

  // states for Form
  const [openForm, setOpenForm] = useState(false);
  const [formName, setFormName] = useState('Comment Form');
  const [submitFormText, setSubmitFormText] = useState('Submit');

  const [commentText, setCommentText] = useState('Write Comment')
  const { database, setDatabase } = useContext(MyContext);

  // to handle comment/reply submit
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentButtonTypeClicked, setCommentButtonTypeClicked] = useState('');
  const [deleteButtonTypeClicked, setDeletButtonTypeClicked] = useState('');

  const [commentId, setCommentId] = useState('');


  // post related states
  const [postId, setPostId] = useState('');
  // to handle post|comment|reply likes
  const [postLikeClicked, setPostLikeClicked] = useState('');
  const [commentLikeClicked, setCommentLikeClicked] = useState('');
  const [replyLikeClicked, setReplyLikeClicked] = useState('');



  // TODO: HELPER FUNCTIONS
  const refineDate = (fullDate) => {
    const onlyDate = fullDate.slice(0, 10);
    return (onlyDate);
  }
  // get current day
  const currentDay = new Date().toISOString().slice(0, 10);
  //*******Caculate difference between Days return the result youtube style */
  const calculateDateDifference = (date) => {
    const tempdate = new Date(date)

    const date2 = new Date(tempdate);
    const currentDate = new Date();

    // Compute the difference in milliseconds
    const differenceInMs = currentDate - date2 ;
    const differenceInSeconds = differenceInMs / 1000;
    const differenceInMinutes = differenceInMs / (1000 * 60);
    const differenceInHours = differenceInMs / (1000 * 60 * 60);
    const differenceInDays = differenceInMs /(1000 * 60 * 60 * 24);
    const differenceInMonths = differenceInMs / (1000 * 60 * 60 * 24 * 30);
    const differenceInYears = differenceInMs / (1000 * 60 * 60 * 24 * 365);

    if ((differenceInSeconds >= 0 && differenceInSeconds < 60) || ((differenceInMs >= 0 && differenceInMs < 1000))) {
      return `JustNow`;
    } else if (differenceInMinutes >= 1 &&differenceInMinutes < 60) {
      return `${Math.floor(differenceInMinutes)}min ago`;
    } else if (differenceInHours < 24) {
      return `${Math.floor(differenceInHours)}hrs ago`;
     } else if (differenceInDays >= 1 && differenceInDays <= 30) {
      return `${Math.floor(differenceInDays)}d ago`;
     } else if (differenceInMonths >= 1 && differenceInMonths <= 12) {
      return `${Math.floor(differenceInMonths)}m ago`;
     } else if (differenceInYears >= 1) {
      return `${Math.floor(differenceInYears)}yr ago`;
     } else {
      return '?';
  }
    }


  const handleDataSubmit = (pid) => {
    // alert(JSON.stringify(comment)); test    works

  }
  // Handle Comment


// enable user collapse and expand accrodion all as one, or individually
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    setDisplayText(e.target.checked ? 'Expand All' : 'Expand individually');
    // alert("hello thomas kitaba");
  };
  const handelCommentButtonClicked = (value) => {
    setCommentButtonTypeClicked('comment');
    setOpenForm(true);
    setSubmitFormText('Submit Comment');
    setFormName('Comment Form');

    setPostId(value);

  }
  const handelDeleteCommentClicked = (value) => {

  }
  const handelReplyButtonClicked = (value) => {
    setCommentButtonTypeClicked('reply');
    setOpenForm(true);

    setFormName('Reply Form');
    setCommentId(value);
    setSubmitFormText('Submit Reply');

  }



  const handelCommentFormSubmit = async (e) => {
    e.preventDefault();
    if (commentButtonTypeClicked === 'comment') {
      alert ('you are about to comment on a post');

      try {
        const response = await axios.post(`${endpoint}/api/comment/add`, {postId, userId, userName, firstName, lastName, commentContent}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        alert(response.data);
      } catch(error) {
        alert(error);
        console.log(error);
      }

    } else if (commentButtonTypeClicked === 'reply') {
      setSubmitFormText('Submiting .....');
      try {
        const response = await axios.post(`${endpoint}/api/reply/add`, {commentId, userId, userName, firstName, lastName, commentContent}, {
          headers: {
            'Content-type': 'application/json',
            'x-api-key': myApiKey,
          }
        });
        setOpenForm(!openForm);
        setSubmitFormText('Submit');
        setDatabaseChanged(!databaseChanged);

        // alert(JSON.stringify(response.data));

      } catch(error) {
        alert(error);
        console.log(error);
      }
    } else {
      alert ('you have to submit a form');
    }

  }

  // alert(commentButtonTypeClicked);
  return (
    <>
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
            <div className="comment-form-content">
              <div className="comment-textarea-title"> Write your comment here </div>
              <div className="comment-textarea">
                <textarea
                placeholder="Add your comment here"
                name={formName ? formName : 'form'}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                  />
              </div>
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
      <div className="toggle">
        <input type="checkbox" name="toggle" className="toggle-cb" id="toggle-0" onChange={handleCheckboxChange}/>
        <label className="toggle-label" htmlFor="toggle-0">
            <div className="toggle-inner"></div>
            <div className="toggle-switch"></div>
            <div className="display-text">{displayText}</div>
        </label>
        {/* <input type="checkbox" name="allposts" onChange={handleCheckboxChange}/>
          <label htmlFor="allposts">{displayText}</label> */}
      </div>
      {database && database.record && database.record.posts && database.record.posts.length > 0 && (
      <div className="accordion accordion-flush half-width" id="accordionFlush-post">

        {database.record.posts.map((post, postIndex) => (
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
                <h4>{postIndex + 1}: [{post.authorId}] {post.postTitle} <cite className='citation'>By: {post.authorName ? post.authorName : 'website owner'}</cite></h4>
              </div>
              <div>{post.postDescription && post.postDescription}</div>
            </div>
            <div className=''>
              <p>{post.postCreatedDate ? calculateDateDifference(post.postCreatedDate) : ''}</p>

            </div>
          </div>
        </button>
        </h2>
        <div className="post-footer">
          <div className='open-comment-button' id="comment-button" onClick={(e) => handelCommentButtonClicked(post.postId)}> <ChatLeftText /></div>
          {signedIn && post.authorId === userId &&
                        <div className='comment-sub-tools'>
                          <div className='open-comment-button' id="delete-button" onClick={(e) => { handelDeletePostClicked(c.commenterId); }}> <Trash/> </div>
                          <div className='open-comment-button' id="edit-button" onClick={(e) => { handelEditPostClicked(c.commenterId); }}> <PencilFill/> </div>
                        </div>
                      }
          <div className="hands-thums-up"><HandThumbsUp onClick={()=>alert(post.postId ? post.postId : 0)}/>: {post.likes} </div>
          <div>
          <HandThumbsDown onClick={()=>alert(post.postId ? post.postId : 0)}/>: {post.disLikes}  </div>
        </div>
        <div id={checked ? "flush-collapse" : `flush-collapse-${post.postId}`} className="accordion-collapse collapse bg-green" data-bs-parent="#accordionFlush-post">
          <div className="accordion-body">
            {/* post detail part */}

            {/* Post part */}
              <div className="post-content">{post.postContent}</div>
            {/* comment part */}
              {/* comment content part */}

              <div className="comment-container">
              {post.comments.map((c, commentIndex) => (
                <div key={c.commenterId} className="comment-box">
                  <div className="comment-body">
                    <div className="comment-content">{c.commentContent}</div>
                  </div>
                  <div className="comment-footer">

                    <div className="comment-tools">
                      <div className='open-comment-button' id="reply-button" onClick={(e) => { handelReplyButtonClicked(c.commenterId); }}> <ReplyFill/> </div>
                      {signedIn && c.commenterId === userId &&
                        <div className='comment-sub-tools'>
                          <div className='open-comment-button' id="delete-button" onClick={(e) => { handelDeleteCommentClicked(c.commenterId); }}> <Trash/> </div>
                          <div className='open-comment-button' id="edit-button" onClick={(e) => { handelEditCommentClicked(c.commenterId); }}> <PencilFill/> </div>
                        </div>
                      }
                    </div>
                     <div >userId: {c.commenterId}</div>
                    <div>{calculateDateDifference(c.commentCreatedDate)}</div>
                    <div>by: {c.commenterName}</div>
                    <div><HandThumbsUp /> : {c.likes ? c.likes : 0}</div>
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
                              <div key={reply.replyId} className="comment-reply-box">
                                <div className="comment-reply-body">
                                  <div>{reply.replyContent}</div>
                                </div>
                                <div className="comment-reply-footer">
                                  {/* <div>{replyIndex + 1}</div> */}

                                  <div>{calculateDateDifference(reply.replyCreatedDate)}</div>
                                  <div>by:{reply.replierName}</div>
                                  <div><HandThumbsUp/>: {reply.likes ? reply.likes : 0}</div>
                                </div>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      </div>
                  )}
                </div>
      ))}
              </div>

            </div>
        </div>
    </div>
    ))}

      </div>
      )}
    </div>

    </>
  );
};
