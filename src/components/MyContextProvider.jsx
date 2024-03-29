// MyContextProvider.js
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';
import {sortPosts} from './UtilityFunctions';

const apiKey = import.meta.env.VITE_API_KEY;
  const email = import.meta.env.VITE_EMAIL;
  const password = import.meta.env.VITE_PASSWORD;

const MyContextProvider = ({ children }) => {

const [database, setDatabase] = useState('');
const [userName, setUserName] = useState('Guest');
const [userEmail, setUserEmail] = useState('Guest-email');
const [userTypeId, setUserTypeId] = useState('');
const [userId, setUserId] = useState(0);
const [myApiKey, setMyApiKey ] = useState(apiKey);
const [endpoint, setEndpoint] = useState('https://tom-blog-post.onrender.com');
// const [endpoint, setEndpoint] = useState('http://localhost:5000');
const [notification, setNotification] = useState(true);
const [notificationText, setNotificationText] = useState();
const[signedIn, setSignedIn] = useState(false);
const [databaseChanged, setDatabaseChanged] = useState(false);
const [sortWith, setSortWith] = useState('pending');
const [sortBy, setSortBy] = useState('post-status');
const [tempStatus, setTempStatus] = useState(userTypeId === 1 ? "post.postStatus" : "post.postStatus === 'active'");
let posts = [];

// this code can be reused in other componentsex
//

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
    <MyContext.Provider value={{ database, setDatabase, userName, setUserName, userEmail, setUserEmail, userId, setUserId, userTypeId, setUserTypeId, myApiKey, setMyApiKey, endpoint, setEndpoint, notification, setNotification, notificationText, setNotificationText, signedIn, setSignedIn, databaseChanged, setDatabaseChanged, sortWith, setSortWith, sortBy, setSortBy, tempStatus, setTempStatus}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
