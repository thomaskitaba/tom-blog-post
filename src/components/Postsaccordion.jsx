// src/components/JSONBinComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyContext from './MyContext';
import {HandThumbsUp, HandThumbsDown, ArrowUpCircle, ArrowDownCircle, X, Explicit} from "react-bootstrap-icons";
export const Postsaccordion = (props) => {
  // get current day
  const currentDay = new Date().toISOString().slice(0, 10);
  // comment and reply related
  const [ commentButtonClicked, setCommentButtonClicked ] = useState(false);
  const [ replyButtonClicked, setReplyButtonClicked ] = useState(false);
  const [comment, setComment] = useState('');

  // states for TOGGLE on | off
  const [checked, setChecked] = useState(false);
  const [displayText, setDisplayText] = useState('individually');

  // states for Form
  const [openForm, setOpenForm] = useState(false);
  const [formName, setFormName] = useState('Comment Form');

  const {userName, setUserName }= useContext(MyContext);

  const [commentText, setCommentText] = useState('Write Comment')
  const { database, setDatabase } = useContext(MyContext);

  // to handle comment/reply submit
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentButtonTypeClicked, setCommentButtonTypeClicked] = useState('');
  const [commentId, setCommentId] = useState('');
  const [replyId, setReplyId] = useState('');

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


  const dateDifference = calculateDateDifference('2024-02-17 20:30:00');
  console.log(`${dateDifference}`);

  // TODO: END of HELPER FUNCTIONS
  // *** Comment related ****


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
  const handelCommentButtonClicked = (e) => {
    setCommentButtonTypeClicked('comment');
    setOpenForm(true);
    setFormName('Comment Form');
  }
  const handelReplyButtonClicked = (e) => {
    setCommentButtonTypeClicked('reply');
    setOpenForm(true);
    setFormName('Reply Form');
  }

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
          <form>

            <div className="first-name">
              <label htmlFor="fname"> First Name</label>
              <input type="text" name="fname" placeholder='First Name' onChange={(e) => setFirstName(post, e.target.value)}/>
            </div>
            <div className="last-name">
              <label htmlFor="lname"> Last Name</label>
              <input type="text" name="lname" placeholder='Last Name' onChange={(e) => setLastName(post, e.target.value)}/>
            </div>
            <div className="comment-form-content">
              <div className="comment-textarea-title"> Write your comment here </div>
              <div className="comment-textarea">
                <textarea
                placeholder="Add your comment here"
                name={`${comment.id + 1}`}
                value={commentContent.text}
                onChange={(e) => setCommentContent(e.target.value)}
                  />
              </div>
            </div>
          </form>
        </div>

      </div>
    }
    {/* {JSON.stringify(database)} */}
    <div className="blog-post">
      <div className="blog-post-header">
        <h2>Read Researchs made by Yonas Kitaba</h2>
      </div>
      <div class="toggle">
        <input type="checkbox" name="toggle" class="toggle-cb" id="toggle-0" onChange={handleCheckboxChange}/>
        <label class="toggle-label" for="toggle-0">
            <div class="toggle-inner"></div>
            <div class="toggle-switch"></div>
            <div class="display-text">{displayText}</div>
        </label>
        {/* <input type="checkbox" name="allposts" onChange={handleCheckboxChange}/>
          <label htmlFor="allposts">{displayText}</label> */}
      </div>
      {database && database.record && database.record.posts && database.record.posts.length > 0 && (
      <div class="accordion accordion-flush half-width" id="accordionFlush-post">

        {database.record.posts.map((post, postIndex) => (
          <div class="accordion-item">
        <h2 class="accordion-header">
        <button
          className="accordion-button collapsed bg-green"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={checked ? "#flush-collapse" : `#flush-collapse-${post.postId}`}
          aria-expanded='true'
          aria-controls={checked ? "flush-collapse" : `flush-collapse-${post.postId}`}
        >
          <div className="accordion-button-display">
            <div>
              <h6>{postIndex + 1}</h6>
            </div>
            <div>
              <h3>{post.postTitle}</h3>
              <div>{post.postDescription && post.postDescription}</div>
            </div>
            <div className=''>
              <p>Date: {post.postCreatedDate ? calculateDateDifference(post.postCreatedDate) : ''}</p>
              <p>Author: {post.authorName ? post.authorName : 'website owner'}</p>
            </div>
          </div>
        </button>
        </h2>

        <div id={checked ? "flush-collapse" : `flush-collapse-${post.postId}`} class="accordion-collapse collapse bg-green" data-bs-parent="#accordionFlush-post">
          <div class="accordion-body">
            {/* post detail part */}
            <div><HandThumbsUp onClick={()=>alert(post.postId ? post.postId : 0)}/> </div>
            {/* Post part */}
              <div className="post-content">{post.postContent}</div>
            {/* comment part */}
              {/* comment content part */}
              <div className="comment-container">
              {post.comments.map((c, commentIndex) => (
                <div key={c.id} className="comment-box">
                  <div className="comment-body">
                    <div className="comment-content">{c.commentContent}</div>
                  </div>
                  <div className="comment-footer">
                    <div >{c.id}</div>
                    <div className='open-comment-button' onClick={(e) => handelCommentButtonClicked()}> Comment</div>
                    <div>{calculateDateDifference(c.commentCreatedDate)}</div>
                    <div>by: {c.commenterName}</div>
                    <div><HandThumbsUp /> : {c.likes ? c.likes : 0}</div>
                  </div>
                  {c.replies && c.replies.length > 0 && (

                      <div class="accordion accordion-flush half-width" id="childAccordion">
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed bg-green" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseChild1" aria-expanded="false" aria-controls="flush-collapseChild1">
                              Replies
                            </button>
                          </h2>
                          <div id="flush-collapseChild1" class="accordion-collapse collapse bg-green" data-bs-parent="#childAccordion">
                            <div class="accordion-body">
                            {c.replies.map((reply, replyIndex) => (
                              <div key={reply.replyId} className="comment-reply-box">
                                <div className="comment-reply-body">
                                  <div>{reply.replyContent}</div>
                                </div>
                                <div className="comment-reply-footer">
                                  <div>{replyIndex + 1}</div>
                                  <div className='open-comment-button' onClick={(e) => handelReplyButtonClicked()}> Reply</div>
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





{/* <div className="form">
                              <form onSubmit={(e) => { e.preventDefault(); handleDataSubmit(post.postId); }}>
                              <div className="comment-button-container">
                                <button type="submit" className="comment-button">Reply</button>
                                <input type="text" name="user" placeholder='your name/email-address' onChange={(e) => userNameFormUpdate(post, e.target.value)}/>
                                <label htmlFor="user"> User</label>
                              </div>
                              <div className="comment-textarea">
                                <textarea
                                  placeholder="Add your comment here"
                                  name={`${comment.id + 1}`}
                                  value={comment.text}
                                  onChange={(e) => commentFormUpdate(post, e.target.value)}
                                />
                              </div>
                              <div className="post-icons"></div>
                            </form>
                            </div> */}