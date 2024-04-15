// MyContextProvider.js
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';
import {sortPosts} from './UtilityFunctions';

const apiKey = import.meta.env.VITE_API_KEY;
const email = import.meta.env.VITE_EMAIL;
const password = import.meta.env.VITE_PASSWORD;
const gptKey = import.meta.env.VITE_GPT_KEY;

const MyContextProvider = ({ children }) => {

const [userList, setUserList] = useState([{}]);
const [database, setDatabase] = useState('');
const [userName, setUserName] = useState('Guest');
const [userEmail, setUserEmail] = useState('Guest-email');
const [userTypeId, setUserTypeId] = useState('');
const [userId, setUserId] = useState(0);
const [myApiKey, setMyApiKey ] = useState(apiKey);
const [gptEndpoint, setGptEndpoint] = useState('https://api.openai.com/v1/engines/davinci/completions');
const [myGptKey, setMyGptKey ] = useState(gptKey);
const [editProfileClicked, setEditProfileClicked] = useState(false);
const [showUserManagment, setShowUserManagment] = useState(false);
const [endpoint, setEndpoint] = useState('https://tom-blog-post.onrender.com');
// const [endpoint, setEndpoint] = useState('http://localhost:5000');
const [notification, setNotification] = useState(true);
const [notificationText, setNotificationText] = useState();
const[signedIn, setSignedIn] = useState(false);
const [databaseChanged, setDatabaseChanged] = useState(false);
const [sortWith, setSortWith] = useState('pending');
const [sortBy, setSortBy] = useState('post-status');
const [tempStatus, setTempStatus] = useState(userTypeId === 1 ? "post.postStatus" : "post.postStatus === 'active'");
const [selectedKeyIndex, setSelectedKeyIndex] =  useState(-1);
let posts = [];

// this code can be reused in other componentsex

  useEffect(() => {
    let tempNotificationText = {};
    if (!signedIn) {
      tempNotificationText.signInNotification = 'Sign in to comment and contribute';
      tempNotificationText.signInStatus = false;
      tempNotificationText.noNotification = 'No notification';
    }
    setNotificationText(tempNotificationText);
  }, [signedIn]);

  let tempDatabase  = '';
  let unpackedDatabase = { record: '' };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint + '/');
        // setDatabase(response.data);
        tempDatabase= unpackDatabase(response.data);
        unpackedDatabase.record = tempDatabase;
        setDatabase(unpackedDatabase);
        // setDatabase(tempDatabase);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  const unpackDatabase = (data) => {
    const [myPosts, postComments, replies, metadata] = data;
    posts = sortPosts(myPosts, sortWith, sortBy);
    // const posts = myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate));

    const postsWithComments = posts.map(post => {
      const sortedComments = postComments.sort((a, b) => new Date(b.commentCreatedDate) - new Date(a.commentCreatedDate));
      const comments = sortedComments.filter(comment => comment.postId === post.postId);
      return { ...post, comments };
    });

    const postsWithCommentsAndReplies = postsWithComments.map(post => {
      const postCommentsWithReplies = post.comments.map(comment => {
        const commentReplies = replies.filter(reply => reply.parentId === comment.commentId);
        return { ...comment, replies: commentReplies };
      });
      return { ...post, comments: postCommentsWithReplies };
    });

    return { posts: postsWithCommentsAndReplies };
  };
}, [databaseChanged, userName, userTypeId, sortBy, sortWith, signedIn]);
  return (
    <MyContext.Provider value={{ database, setDatabase, userList, setUserList, showUserManagment, setShowUserManagment, editProfileClicked, setEditProfileClicked, userName, setUserName, userEmail, setUserEmail, userId, setUserId, userTypeId, setUserTypeId, myApiKey, setMyApiKey, myGptKey, setMyGptKey , endpoint, setEndpoint, gptEndpoint, setGptEndpoint, notification, setNotification, notificationText, setNotificationText, signedIn, setSignedIn, databaseChanged, setDatabaseChanged, sortWith, setSortWith, sortBy, setSortBy, tempStatus, setTempStatus, selectedKeyIndex, setSelectedKeyIndex}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
