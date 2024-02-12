import React, { useContext } from 'react';
import MyContext from './MyContext';

const Sqlite = () => {
  const { database, setDatabase } = useContext(MyContext);
  const { userEmail, setUserEmail} = useContext(MyContext);
  const { userName, setUserName} = useContext(MyContext);
  // const [posts] = Database[2];
  return (
    <div>
      <h1>React App with Node.js Server and SQLite</h1>
      <h2>ALL Posts</h2>
      <h6>{database.post}</h6>
    {/* {JSON.stringify(database)} */}
      <ul>

        <h6> UserName: {userName}</h6>
        <h6> UserEmail: {userEmail}</h6>
        {database && database.length > 0 ? (
          database[0].map(post => (
            <li key={post.postId}>
              ({post.postId}) {post.postTitle} - {post.postContent}
            </li>
          ))
        ) : (
          <li>No posts available</li>
        )}
      </ul>
    </div>
  );
};

export default Sqlite;
