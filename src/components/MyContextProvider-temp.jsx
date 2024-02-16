import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';

const MyContextProvider = ({ children }) => {
  const [database, setDatabase] = useState('');
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('Guest-email');
  const [userId, setUserId] = useState('no-user-id');
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('Your Notifications Here');
  // const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000');
        const unpackedDatabase = unpackDatabase(response.data);
        setDatabase(unpackedDatabase);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const unpackDatabase = (data) => {
    const [myPosts, postComments, replies, metadata] = data;

    const posts = myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate));
    const postsWithComments = posts.map(post => {
      const comments = postComments.filter(comment => comment.postId === post.postId);
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

  return (
    <MyContext.Provider value={{ database, setDatabase, userName, setUserName, userEmail, setUserEmail, notification, setNotification, notificationText, setNotificationText, userId, setUserId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
