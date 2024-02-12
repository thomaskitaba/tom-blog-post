// MyContextProvider.js
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';

const MyContextProvider = ({ children }) => {

  const [database, setDatabase] = useState('');
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('Guest-email');
  const [myApiKey, setMyApiKey ] = useState('NlunpyC9eK22pDD2PIMPHsfIF6e7uKiZHcehy1KNJO');
  // const [endpoint, setEndpoint] = useState('https://tom-blog-post-2.onrender.com');
  const [endpoint, setEndpoint] = useState('http://localhost:5000');
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
    <MyContext.Provider value={{ database, setDatabase, userName, setUserName, userEmail, setUserEmail, myApiKey, setMyApiKey, endpoint, setEndpoint}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
