  const express = require('express');
  const cors = require('cors');
  const sqlite3 = require('sqlite3');
  const path = require('path');
  const bodyParser = require('body-parser');



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
app.use('/api/login', authenticate);
// Apply authentication middleware to all routes that need protection



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


  // TODO   signup    registration doesnot require authorization

  app.post('/api/login',(req, res) => {
    // Since we're using the authenticate middleware, if the request reaches this point, it means authentication was successful
    const { name, password } = req.body;


    const result = `Your username is ${name} and your password is ${password}`;
    console.log(req.body.name);
    res.send(result);
  });



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