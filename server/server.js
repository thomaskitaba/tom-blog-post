  const express = require('express');
  const cors = require('cors');
  const sqlite3 = require('sqlite3');
  const path = require('path');
  const bodyParser = require('body-parser');
  const bcrypt = require('bcrypt');
const { errorMonitor } = require('events');


  const app = express();
  const port = 5000;
  // const port = process.env.PORT || 5000;

  app.use(cors())

  // Choose the appropriate parser based on your login form's data submission method
  // Here, assuming JSON-based submission:
  app.use(bodyParser.json());


  // Serve static files from the 'build' directory

  // TODO: display index.html instead of server.js on production env-t

  // // Serve static files from the 'build' directory
  // app.use(express.static(path.join(__dirname, '..', 'dist')));

  // // Catch-all route to serve the 'index.html' for any other requests
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  // });


  // Create and initialize the SQLite database
  const db = new sqlite3.Database('posts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
  });

  // TODO: GLOBAL VARIABLES
  const jsonInitialized = false;
  const all = [];
  // general sql statments for use in enpoints
  const specficPosts = 'SELECT * FROM posts WHERE postStatus LIKE \"Active\" and postId LIKE ?';
  const allPostsSql = 'SELECT * FROM posts  WHERE postStatus LIKE \"Active\"';
  const allPostCommentsSql = 'SELECT * FROM postCommentsView';
  const activePostCommentsViewSql = 'SELECT * FROM activePostCommentsView';
  const activeCommentsViewSql = 'SELECT * FROM activeCommentsView';
  const activePostsViewSql = 'SELECT * from activePostsView';
  const activeRepliesViewSql = 'SELECT * FROM activeRepliesView';
  const activeMetadataViewSql = 'SELECT * FROM  activeMetadataView';
  const activeUsersViewSql = 'SELECT * FROM activeUserView';






  let allPostsJson = [];
  let allPostCommentsComment = [];

  let database = { record: ''};
  let activeCommentsViewJson = [];
  let activePostsCommentsView = []
  let activePostsView = []
  let activeRepliesView = []
  let allPostCommentsJson = [];
  let activeMetadataViewJson = [];
  let activeUsersViewJson = [];





  // Authentication middleware
  const apiKey = `process.env.REACT_APP_MY_API_KEY`;

  const authenticate = (req, res, next) => {
  const providedApiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (providedApiKey && providedApiKey === "NlunpyC9eK22pDD2PIMPHsfIF6e7uKiZHcehy1KNJO") {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
// Apply authentication middleware to all routes that need protection
app.use('/api', authenticate);
 //---------------------------------------------------------------------------------
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
//---------------------------------------------------------------------------------
const getDateTime = () => {
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().toISOString().slice(11, 19);
  const datetime = `${date} ${time}`;
  return datetime;
}
//---------------------------------------------------------------------------------




 // TODO: TABLE OF content
  // fuctions  ----

  // ---- 1.   /   :- root route
  // ---- 2.   /api/login  :- login
  // ---- 3.   /signup     :- signup



  const allPostsFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(allPostsSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);

      });
    });
  };

  // function to get all post comments


  const activePostsCommentsViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activePostCommentsViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  const activeCommentsViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activeCommentsViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      })
    });
  }

  const activePostsViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activePostsViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      })
    })
  }

  const activeRepliesViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activeRepliesViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      })
    })
  }

  const activeMetadataViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activeMetadataViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      })
    });
  }

  const activeUsersViewFunction = () => {
    return new Promise((resolve, reject) => {
      db.all(activeUsersViewSql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      })
    })
  }

  // Unpack all
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

//TODO  index.html
// ROUTE /

  app.get('/', async (req, res) => {
    let allData = [];
    try {
      //  content: posts + author     index: 0
      const activePostsViewTemp = await activePostsViewFunction();
      //  content: postComments + comments + commenter     index: 1
      const activePostCommentsViewTemp = await activePostsCommentsViewFunction();
      //  content: replies + replier     index: 2
      const activeRepliesViewTemp = await activeRepliesViewFunction();
      //  content: metadata     index: 3
      const activeMetadataViewTemp = await activeMetadataViewFunction();

      // PUSH RESULTS IN SPECFIC ORDER
      allData.push(activePostsViewTemp);
      allData.push(activePostCommentsViewTemp);
      allData.push(activeRepliesViewTemp);
      allData.push(activeMetadataViewTemp);
      res.json(allData);
      // TODO:  here the server handles the unpacking
      // const allUnpacked = unpackDatabase(allData);
      // database.record = allUnpacked;
      // res.json(database);

    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.stack})
    }
  });

  // TODO  signin   registration doesnot require authorization
// SIGN -- IN    ===================================================
const checkUserCredentials = async (data) => {
  const { name, password } = data;
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE userName LIKE ? OR userEmail LIKE ?', [name, name], (err, rows) => {
      if (err) {
        reject({ error: 'Database Error' }); // Handle database error
        return;
      }
      if (rows.length === 1) {
        const hashedPassword = rows[0].hash;
        bcrypt.compare(password, hashedPassword, (err, result) => {
          if (err) {
            reject({ error: 'Bcrypt Error' }); // Handle bcrypt error
            return;
          }
          if (result) {
            const { userName, userEmail, userId } = rows[0];
            resolve({ userName, userEmail, userId });
            return;
          } else {
            reject({ error: 'Password Incorrect' }); // Reject if password is incorrect
            return;
          }
        });
      } else {
        reject({ error: 'User not Found' }); // Reject if user not found
        return;
      }
    });
  });
};

app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await checkUserCredentials({ name, password });
    res.json(result);
  } catch (error) {
    if (error.error === 'Password Incorrect') {
      res.status(401).json({ error: 'Password Incorrect' });
    } else if (error.error === 'User not Found') {
      res.status(404).json({ error: 'User not Found' });
    } else {
      res.status(500).json({ error: 'Server Error' });
    }
  }
});



// SIGNUP    ===================================================
const checkIfUserExists = async(data) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users WHERE userName LIKE ? or userEmail Like ?", [data.name, data.email], (err, rows) =>
    {
      if (err) {
        reject(err);
      }
      resolve(rows.length === 0);
    })
  });
}

app.post('/api/signup', async (req, res) => {
  // Since we're using the authenticate middleware, if the request reaches this point, it means authentication was successful
  const { name, email, password } = req.body;
  const result = {}

  const userTypeId = 4 // user
  const datetime = getDateTime();

  //step 1: check if username and email doesnot exist
  try {
  const isUserInDatabase = await checkIfUserExists({'name': name, 'email':email});
  if(!isUserInDatabase) {
    console.log("user exist in database");
    res.status(409).json({ error: 'Username already exists' });
    return;
  }
}catch(error) {
    console.log(error.stack);
    res.status(500).json({error: error.message});
  }

  // step 2 hash the password
  const hashedPassword = await encryptPassword(password);
  const params = [name, email, hashedPassword, userTypeId, 'Active', datetime, datetime];
  // step 3 insert data to database
  const signUpUser = 'INSERT INTO users (userName, userEmail, hash, userTypeId, userStatus, userCreatedDate, userUpdatedDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(signUpUser, params, (err) => {
    if (err) {
      res.status(500).json({error: err.stack});
    } else {
      // console.log(`${this.LastID}`)
      let userId = this.LastID;
      res.json({'userId': userId, 'userName': name, 'userType': 'User', 'userEmail': email })
    }
  });
});

// COMMENT | REPLY    ===================================================

const addNewCommentFunction = async (data) => {
  const { postId, userId, userName, firstName, lastName, commentContent } = data;
  return new Promise((resolve, reject) => {

    const commentCreatedDate= getDateTime();
    const commentUpdatedDate = getDateTime();
    const commentStatus = 'Active';
    const parentId = null;
    const likes = 0;
    // TODO- add check if user exists  here | if user has no registered fname and lname  add lname and uname to users table
    // =====
    // ======
    const commentParam= [userId, commentContent, commentStatus, commentCreatedDate, commentUpdatedDate, parentId, likes];
    const postCommentParam = [postId, commentCreatedDate, commentUpdatedDate]

    const addNewCommentSql = 'INSERT INTO comments (userId, commentContent, commentStatus, commentCreatedDate, commentUpdatedDate, parentId, likes) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const addNewPostCommentSql = 'INSERT INTO postComments (postId, postCommentCreatedDate, postCommentUpdatedDate, commentId) VALUES (?, ?, ?, ?)';
    db.run(addNewCommentSql, commentParam, (err) => {
      if (err){
        reject({error: 'Can not add to Comments table'});
        return;
      }
      // after the comment is added to the comments table, add the commentId to the parampostComments array
      postCommentParam.push(this.LastID);
      db.run(addNewPostCommentSql, [postCommentParam], (err) => {

        if (err) {
          // remove the comment we added earlier
          db.run('DELETE FROM comments WHERE commentId = ?', [this.lastID], (err) => {
            if (err) {
              reject ({error: 'Zombi comment created'});
              return;
            }
            resolve({error: 'Can not add to postComments table'});
            return;
          });

          return;
        }
        resolve({commenterId: this.lastID, postId: postId, userId: userId});
        return;
      });

    });

  })
}

app.post('/api/comment/add', async (req, res) => {
  const { postId, userId, userName, firstName, lastName, commentContent } = req.body;
  const allData = { postId, userId, userName, firstName, lastName, commentContent };
  try {
    const result = await addNewCommentFunction(allData);
    res.json(result);
  } catch(error) {
    console.log('error occured when trying to add comment to the database');
    if (error.error === 'Can not add to Comments table' || error.error === 'Zombi comment created' || error.error === 'Can not add to postComments table') {
      res.status(500).json({error: error.stack});
  } else {
    res.status(500).json({ error: 'Unexpected error occurred' }); // Handle other errors gracefully
  }
  }
  // console.log(`${postId}|${userName}|${firstName}|${lastName}|${commentContent}|${userId}`);
});

const addNewReplyFunction = async (data) => {
  const { commentId, userId, userName, firstName, lastName, commentContent } = data;
  return new Promise((resolve, reject) => {
    console.log(commentId);
    const commentCreatedDate= getDateTime();
    const commentUpdatedDate = getDateTime();
    const commentStatus = 'active';
    const parentId = commentId;
    const likes = 0;
    // TODO- add check if user exists  here | if user has no registered fname and lname  add lname and uname to users table
    // =====
    // ======
    const replyParam= [userId, commentContent, commentStatus, commentCreatedDate, commentUpdatedDate, parentId, likes];
    const addNewReplySql = 'INSERT INTO comments (userId, commentContent, commentStatus, commentCreatedDate, commentUpdatedDate, parentId, likes) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.run(addNewReplySql, replyParam, (err) => {
      if (err){
        reject({error: 'Can not add to Reply table'});
        return;
      }
      resolve({commentId: this.lastID, parentId: commentId, userId: userId});
      console.log({commentId: this.lastID, parentId: commentId, userId: userId});
    });
  })
}

app.post('/api/reply/add', async (req, res) => {

  const { commentId, userId, userName, firstName, lastName, commentContent } = req.body;
  console.log(commentId);
  const allData = { commentId, userId, userName, firstName, lastName, commentContent };
  try {
    const result = await addNewReplyFunction(allData);
    res.json(result);
  } catch(error) {
    console.log('error occured when trying to add comment to the database');
    if (error.error === 'Can not add to Reply table') {
      res.status(500).json({error: error.stack});
  } else {
    res.status(500).json({ error: 'Unexpected error occurred' }); // Handle other errors gracefully
  }
  }
  // console.log(`${postId}|${userName}|${firstName}|${lastName}|${commentContent}|${userId}`);
});

// TODO function and endpoint to DELETE comment|reply|post
const deleteCommentFunction = async (commentId, userId) => {
  const deleteCommentSql = "UPDATE comments SET commentStatus = 'deleted' WHERE commentId = ? AND userId = ?";
  return new Promise((resolve, reject) => {
    db.run(deleteCommentSql, [commentId, userId], function(err) {
      if (err) {
        reject({ error: 'Database Error' });
        return;
      }
      if (this.changes === 0) {
        reject({ error: 'Comment not found or user does not have permission to delete' });
        return;
      }
      resolve({ commentId, userId });
    });
  });
};

app.post('/api/comment/delete', async (req, res) => {
  const { commentId, userId } = req.body;
  try {
    const result = await deleteCommentFunction(commentId, userId);
    res.json(result);
  } catch (error) {
    if (error.error === 'Database Error') {
      res.status(500).json({ error: error.error });
    } else {
      res.status(400).json({ error: error.error });
    }
  }
});

//TODO:      EDIT            post|comment|reply

//========================================================================
app.get('/api/posts', authenticate, async (req, res) => {
  try {
    const posts = await allPostsFunction();
    allPostsJson.push(posts) // for later use
    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
});

  // TODO:   ====== AUTHORIZATION NEDED====== to perform these activities

  // comment Mangement
  app.post('/api/comments/add', async (req, res) => {
  try {
    res.send("pass [postId, commentContent, userId] : to create new comment for a post")
  } catch(error) {
    res.status(500).json({error: error.stack});
  }
  });

  app.post('/api/comments/edit', async(req, res) => {
    try {
      res.send('send [commentId, userId] to edit your comment');
    } catch(error) {
      res.status(500).json({error: error.stack});
    }
  });

  app.post('api/comments/delete', async(req, res) => {
    try {
      res.send('provide [commentId, userId] to delete your comment' )
    } catch(error) {
      res.status(500).json({error: error.stack});
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
// TODO: ==== Code Recycle bin=====
      // const activeCommentsViewTemp= await activeCommentsViewFunction();
      // allData.push(activeCommentsViewTemp);

// const activeUsersViewTemp = await activeUsersViewFunction();
      // allData.push(activeUsersViewTemp);