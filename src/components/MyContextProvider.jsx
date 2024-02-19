// MyContextProvider.js
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';

const MyContextProvider = ({ children }) => {

  const [database, setDatabase] = useState('');
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('Guest-email');
  const [userId, setUserId] = useState(0);
  const [myApiKey, setMyApiKey ] = useState('NlunpyC9eK22pDD2PIMPHsfIF6e7uKiZHcehy1KNJO');
  // const [endpoint, setEndpoint] = useState('https://tom-blog-post.onrender.com');
  const [endpoint, setEndpoint] = useState('http://localhost:5000');
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState();
  const[signedIn, setSignedIn] = useState(false);
  const [databaseChanged, setDatabaseChanged] = useState(false);
  // this code can be reused in other components

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

    const posts = myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate));

    const postsWithComments = posts.map(post => {
      const sortedComments = postComments.sort((a, b) => new Date(b.commentCreatedDate) - new Date(a.commentCreatedDate));
      const comments = sortedComments.filter(comment => comment.postId === post.postId);
      return { ...post, comments };
    });

    const postsWithCommentsAndReplies = postsWithComments.map(post => {
      const postCommentsWithReplies = post.comments.map(comment => {
        const commentReplies = replies.filter(reply => reply.parentId === comment.commenterId);
        return { ...comment, replies: commentReplies };
      });
      return { ...post, comments: postCommentsWithReplies };
    });

    return { posts: postsWithCommentsAndReplies };
  };
}, [databaseChanged, userName]);
  return (
    <MyContext.Provider value={{ database, setDatabase, userName, setUserName, userEmail, setUserEmail, userId, setUserId, myApiKey, setMyApiKey, endpoint, setEndpoint, notification, setNotification, notificationText, setNotificationText, signedIn, setSignedIn, databaseChanged, setDatabaseChanged}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
