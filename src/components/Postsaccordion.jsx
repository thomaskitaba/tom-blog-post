// src/components/JSONBinComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyContext from './MyContext';
import {HandThumbsUp, HandThumbsDown, ArrowUpCircle, ArrowDownCircle, Explicit} from "react-bootstrap-icons";
export const Postsaccordion = (props) => {
  // get current day
  const currentDay = new Date().toISOString().slice(0, 10);
  const formInitialsDetail = {
    "id": '',
    "text": "",
    "user": "",
    "commentDate": currentDay,
    "replies": [
      {
        "id": '',
        "text": "",
        "user": ""
      }
    ]
  };

  // const { data } = props;
  const [comment, setComment] = useState(formInitialsDetail);
  const [checked, setChecked] = useState(false);
  const [displayText, setDisplayText] = useState('Expand individually');
  // const [postId, setpostId] = useState('');
  const [userName, setUserName] = useState('Unkown');
  const [commentText, setCommentText] = useState('Write Comment')
  const { database, setDatabase } = useContext(MyContext);


  // **** samplData ****
  // this will be replaced by fetched data
  const lore = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate."
  const data = {
  "record": {
    "posts": [
      {
        "id": 1,
        "title": "First Post",
        "content": "This is the content of the first post.",
        "author": "John Doe",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "This is a comment on the first post.",
            "user": "Commenter1",
            "commentDate": "22-11-23",
            "replies": [
              {
                "id": 1,
                "text": "Reply to Commenter1's comment",
                "user": "ReplyUser1"
              }
            ]
          },
          {
            "id": 2,
            "text": "Another comment on the first post.",
            "user": "Commenter2",
            "commentDate": "22-11-23",
            "replies": []
          }
        ]
      },
      {
        "id": 2,
        "title": "Second Post",
        "content": "Content for the second post goes here.",
        "author": "Yonas Kitaba",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the second post.",
            "user": "Commenter3",
            "commentDate": "22-11-23",
            "replies": [
              {
                "id": 1,
                "text": "Reply to Commenter3's comment",
                "user": "ReplyUser2"
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "title": "Education reimagined",
        "content": lore,
        "author": "Yonas Kitaba",
        "postDate": "22-11-25",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the third post.",
            "user": "Commenter4",
            "commentDate": "22-11-23",
            "replies": []
          }
        ]
      }
    ],
    "users": [
      {"userId": 0, "userName": 'unknown', "userEmail": 'empty', 'createdDate': '22-11-23'},
      {"userId": 1, "userName": 'Abebe', "userEmail": 'aaaaaaaaaa@gmail.com', 'createdDate': '22-11-23'},
      {"userId": 1, "userName": 'Kebede', "userEmail": 'bbbbbbbbbb@gmail.com',  'createdDate': '22-11-23'},
      {"userId": 1, "userName": 'bekele', "userEmail": 'cccccccccc@gmail.com', 'createdDate': '22-11-23'}
    ],
    "authors": [
      {"authorId": 1, "authorName": 'Yonas Kitaba', "authorTitle": 'consultant'},
    ]
  },
  "metadata": {
    "id": "65a17308dc74654018914a1e",
    "private": false,
    "createdAt": "2024-01-12T17:12:40.611Z"
  }
  }
   // **** Handle userName ****
  const [nameAvailable, setNameAvailable] = useState(false);
  const userNameFormUpdate = (postObject, value) => {
    if (value === "" && userName === "") {
      setUserName('Unknown');
    }
    else if (nameAvailable == false && value != "") {

      setUserName(value);
    }
    else if (nameAvailable == true && value === "") {
      setUserName(userName);
    }
  }
  // TODO: helper functions
  const refineDate = (fullDate) => {
    const onlyDate = fullDate.slice(0, 10);
    return (onlyDate);
  }
  // *** Comment related ****
  const commentFormUpdate = (postObject, value) => {

    // enable and change text of commit to submit
    setCommentText('Submit');
    const cid = postObject.comments.length + 1;
    // alert(cid);   test
  const updatedComment = {
    ...formInitialsDetail,
    "id": cid,
    "text": value,
    "user": userName,
    "commentDate": currentDay,
    "replies": []
  }

  setComment(updatedComment);
  // alert(JSON.stringify(comment));  test
  }
// fetch data here and strore it in jsonData variable
const [Data, setData] = useState(data);



  const handleDataSubmit = (pid) => {
    // alert(JSON.stringify(comment)); test    works

    const updatedData = {
      ...Data,
      record: {
          ...Data.record,
          posts: Data.record.posts.map((post) => {
            if (post.id === pid){
              return {
                ...post,
                comments: [
                  ...post.comments,
                  comment
                ]
              }
            }
            return post;
          })
      }
    }
    setData(updatedData);
    alert(JSON.stringify(updatedData.record.posts));
    // after adding the comment to updatedData change the state of data
    setData(updatedData);
    // alert(JSON.stringify(updatedData.record.posts));   test

    // reset  comment to empty or with the initial setup
    setComment(formInitialsDetail);
    setCommentText('Comment');
  }
  // Handle Comment


// enable user collapse and expand accrodion all as one, or individually
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    setDisplayText(e.target.checked ? 'Expand All' : 'Expand individually');
    // alert("hello thomas kitaba");
  };

  return (
    <>
    {/* {JSON.stringify(database)} */}

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
            <p>Date: {post.postCreatedDate ? refineDate(post.postCreatedDate) : ''}</p>
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
                  <div>{c.commentContent}</div>
                </div>
                <div className="comment-footer">
                  <div>{c.id}</div>
                  <div>Date: {refineDate(c.commentCreatedDate)}</div>
                  <div>by: {c.commenterName}</div>
                  <div><HandThumbsUp /> : {c.likes ? c.likes : 0}</div>
                </div>
                {c.replies && c.replies.length > 0 && (

                    <div class="accordion accordion-flush half-width" id="childAccordion">
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button class="accordion-button collapsed bg-green" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseChild" aria-expanded="false" aria-controls="flush-collapseChild">
                            Replies
                          </button>
                        </h2>
                        <div id="flush-collapseChild" class="accordion-collapse collapse bg-green" data-bs-parent="#childAccordion">
                          <div class="accordion-body">
                          {c.replies.map((reply, replyIndex) => (
                            <div key={reply.replyId} className="comment-reply-box">
                              <div className="comment-reply-body">
                                <div>{reply.replyContent}</div>
                              </div>
                              <div className="comment-reply-footer">
                                <div>Reply: {replyIndex + 1}</div>
                                <div>Date: {refineDate(reply.replyCreatedDate)}</div>
                                <div>by: {reply.replierName}</div>
                                <div><HandThumbsUp/>: {reply.likes ? reply.likes : 0}</div>
                              </div>
                            </div>
                          ))}
                          </div>
                          <div className="form">
                            <form onSubmit={(e) => { e.preventDefault(); handleDataSubmit(post.postId); }}>
                            <div className="comment-button-container">
                              <button type="submit" className="comment-button">Reply</button>
                              <input type="text" name="user" placeholder='your name/email-address' onChange={(e) => userNameFormUpdate(post, e.target.value)}/>
                              <lable for="user"> User</lable>
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
                          </div>
                        </div>
                      </div>
                    </div>

                )}
              </div>
    ))}
              {/* comment form */}
              <div className="form">
                <form onSubmit={(e) => { e.preventDefault(); handleDataSubmit(post.postId); }}>
                <div className="comment-button-container">
                  <button type="submit" className="comment-button">Comment</button>
                  <input type="text" name="user" placeholder='your name/email-address' onChange={(e) => userNameFormUpdate(post, e.target.value)}/>
                  <lable for="user"> User</lable>
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
              </div>
            </div>

          </div>
      </div>
  </div>
  ))}

    </div>
    )}

    </>
  );
};
