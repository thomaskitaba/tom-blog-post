
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config(); // This line loads the .env file
const { errorMonitor } = require('events');
const { promiseHooks } = require('v8');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
// const { ucs2 } = require('@sinonjs/commons');
// const punycode = require('@sinonjs/commons/lib/punycode');
// const config = require('./config.js');
require('dotenv').config();
const password = process.env.VITE_PASSWORD;
const email = process.env.VITE_EMAIL;
const apikey = process.env.VITE_API_KEY;
const secretKey = process.env.VITE_SECRETKEY;
const { AsyncLocalStorage } = require('async_hooks');


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
// app.use(express.static(path.join(__dirname, 'dist')));

// // For any other route, serve the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// Create and initialize the SQLite database


// TODO: GLOBAL VARIABLES
const jsonInitialized = false;
const all = [];
// general sql statments for use in enpoints
const specficPosts = 'SELECT * FROM posts WHERE postStatus LIKE \"active\" and postId LIKE ?';
const allPostsSql = 'SELECT * FROM posts  WHERE postStatus LIKE \"active\"';
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

const authenticate = (req, res, next) => {
const providedApiKey = req.headers['x-api-key'] || req.query.apiKey;
if (providedApiKey && providedApiKey === apikey) {
  next(); // Proceed to the next middleware/route handler
} else {
  res.status(401).json({ error: 'Unauthorized' });
}
};
// Apply authentication middleware to all routes that need protection
app.use('/api', authenticate);


const myDatabase = path.join(__dirname, 'posts.db');
const db = new sqlite3.Database(myDatabase, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});

// TODO: EMAIL related:  Configure the mail client


const expiresIn = '1h';
  let configEmail = {
      service : 'gmail',
      auth : {
          user: email,
          pass: password
      }
  };

  let transporter = nodemailer.createTransport(configEmail);
  let MailGenerator = new Mailgen({
      theme: "neopolitan",
      product : {
          name: "Successful registation",
          link : 'https://thomaskitaba.github.io/tom-blog-post/'
      },
      customCss: `
    body {
      background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
      color: white;
    }
  `,
      footer: {
        text: "Copyright © 2024 tom-blog-post"
      }
  });

  let ContactGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Contact Message",
        link : 'https://thomaskitaba.github.io/tom-blog-post/'
    },

    footer: {
      text: "Copyright © 2024 tom-blog-post"
    }
});

// todo   jwt   signner

// const expiresIn = '1h';
const signEmail = async (id) => {
  console.log("about to create token");
  try {
    const token = await jwt.sign({ id }, secretKey, { expiresIn });
    console.log(`Token: ${token}`);
    return token;
  } catch(error) {
    console.error('Error creating token:', error.message);
    return { error: 'Error creating token' };
  }
};
const verifyEmail = async (token) => {
  try {
    console.log("Token before verification:", token); // Log the received token
    const userId = await jwt.verify(token, secretKey);
    console.log("Verified userId:", userId);
    // output: Verified userId: { id: 8, iat: 1711022334, exp: 1711025934 }
    return userId.id;
  } catch (error) {
    console.error('Error verifying token:', error.message);
    throw new Error('Error verifying token: Invalid or expired token'); // Throw the error with a message
  }
};

//---------------------------------------------------------------------------------
const encryptPassword = async (password) => {
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
return hashedPassword;
}
// MARK: test Mark---------------------------------------------------------------------------------
const getDateTime = () => {
const date = new Date().toISOString().slice(0, 10);
const time = new Date().toISOString().slice(11, 19);
const datetime = `${date} ${time}`;
return datetime;
}
//---------------------------------------------------------------------------------
const runAllQuery = (sql, params) => {
return new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(rows);
  });
});
}
const runQuery = (sql, param) => {
return new promiseHooks((resolve, reject) => {
  db.run(sql, param, function(err) {
    if (err) {
      reject(err);
      return;
    }
    resolve(this.lastID);
  });
})
}

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
console.log('----------------');
console.log(data);
console.log('----------------');
return new Promise((resolve, reject) => {
  db.all('SELECT * FROM users WHERE (userName LIKE ? OR userEmail LIKE ?) AND confirmed = ?', [name, name, 1], (err, rows) => {
    if (err) {
      reject({ error: 'Database Error' }); // Handle database error
      console.log('inside db all select * ...');
      return;
    }
    if (rows.length === 1) {
      const hashedPassword = rows[0].hash;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          reject({ error: 'Bcrypt Error' }); // Handle bcrypt error
          console.log('cheking bcrypt....');
          return;
        }
        if (result) {
          const { fName, lName, userName, userEmail, userId, userTypeId} = rows[0];
          console.log(`${fName}, ${lName}, ${userName}, ${userEmail}, ${userId}, ${userTypeId}`);

          resolve( { fName, lName, userName, userEmail, userId, userTypeId});
          // console.log(rows);
          resolve(rows);
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

const allUsersListFunction = async() => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject({error: 'Unable to fetch users list'});
        return;
      }
      return resolve(rows);
    })
  });
}


app.post('/api/login', async (req, res) => {
const { name, password } = req.body;
try {
  const result = await checkUserCredentials({ name, password });
  // console.log(`${name} ${password}`);
  // TODO: if result.userTypeId === 1 then senda  alluser list Else Send single user information
  if (result.userTypeId === 1) {

    const userInfoList = await allUsersListFunction();
    console.log('This user is admin');
    userInfoList.unshift(result);
    console.log( `before unshifitnguserInfoList:- ${JSON.stringify(userInfoList[0])}`);
    console.log(`result: ${result}`);
    console.log( `afert unShifting result to userInfoList:- ${JSON.stringify(userInfoList[0])}`);
    res.json(userInfoList);

  } else {
    console.log(`This User Doesn't have admin priviledges`);
    console.log(`result: ${result}`);
    console.log(`[result]: ${[result]}`);

    console.log(`====================`);
    const userInfoList = await allUsersListFunction();
    console.log('This user is admin');
    console.log( `before unshifitnguserInfoList:- ${JSON.stringify(userInfoList[0])}`);
    userInfoList.unshift(result);

    console.log( `after unshifitnguserInfoList:- ${JSON.stringify(userInfoList[0])}`);
    console.log( `after X2 unshifitnguserInfoList:- ${JSON.stringify(userInfoList[1])}`);
    console.log(`result: ${result}`);

  res.json([result]);

  }
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
// todo: test send email

const sendEmail = async (data) => {
  const {destinationEmail, mailType} = data;
  console.log(`inside sendmail ${destinationEmail}`);

  let response = '';
  let subject = '';
  if (mailType === 'sign-up') {
    const {userId, mailType} = data;
    //todo Insert Confi
    const token = await signEmail(userId);
    const confirmationLink = `https://tom-blog-post.onrender.com/confirm?token=${token}`;
    subject = "Confirm your Account";
    response = {
      body: {
        name: "from tom-blog-post team",
        intro: "You have Successfully created an account, Confirm your account using the link provided below",
        table: {
          data: [
            {
              confirm: confirmationLink,
              expires: "after 1 hour",
            }
          ]
        },
        outro: "Enjoy our Website, and don't hesitate to contribute your work with us so that everyone can see."
      }
    };
  } else if (mailType === 'contact') {

    const {userId, mailType, form} = data;
    console.log(`inside sendmail ${destinationEmail}`);
    // destinationEmail = 'thomas.kitaba@gmail.com';
    console.log(form); // test
    console.log(form.message); // test

    subject = 'Contact Form Submission';
    if (form && form.fname && form.lname) {
      subject = `${form.fname} ${form.lname}'s Message`;
    }
    response = {
      body: {
        name: `from :${form.fname} ${form.lname}:- ${form.message}`,
        phone: `${form.phone}`,
        email: `${form.email}`,
        message: `Message: ${form.message}`,
      }
    };
  } else {
    return { message: 'Invalid request' };
  }

  // let mail = MailGenerator.generate(response);
  // if (mailType === 'contact') {
    mail = ContactGenerator.generate(response);
    mail = mail.replace('Yours truly, Contact Message', '');
  // }
    let message = {
      from: 'thomas.kitaba.diary@gmail.com',
      to: destinationEmail || 'thomas.kitaba.diary@gmail.com',
      subject: `${subject}`,
      html: mail
    };

    return new Promise((resolve, reject) => {
      if (transporter.sendMail(message)) {
        resolve({ message: "Message Sent Successfully" });
      } else {
        reject ({ error: 'error sending mail' });
      }
    })
};

const confirmAccount = (data) => {
  const { userId } = data;
  console.log(`inside confirmAccount Function ${userId}`);
  return new Promise((resolve, reject) => {
    db.run('BEGIN');
    db.run('UPDATE users SET confirmed = ? WHERE userId = ?', [1, userId], (err) => {
      if (err) {
        db.run('ROLLBACK');
        reject({ error: 'unable to confirm' });
        return;
      }
      db.run('COMMIT');
      console.log('Confirmed');
      resolve({ message: 'confirmed' });
    });
  });
};

app.post('/api/confirm/', async (req, res) => {
  const { userId } = req.body;
  try {
    await confirmAccount({ userId });
    res.json({ message: 'User confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to confirm user' });
  }
});

// Assume verifyEmail function is defined elsewhere
app.get('/confirm', async (req, res) => {
  console.log("inside get/confirm");

  let resultUserId = '';
  const token = req.query.token; // Correctly extract token from query parameters
  console.log("Token received:", token);

  try {
    resultUserId = await verifyEmail(token); // Pass the token to verifyEmail
    console.log("verifyingEmail inside get/confirm");
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' }); // Return here to avoid further execution
  }

  try {
    const response = await axios.post('https://tom-blog-post.onrender.com/api/confirm', { userId: resultUserId }, {
      headers: {
        'Content-type': 'application/json',
        'x-api-key': 'NlunpyC9eK22pDD2PIMPHsfIF6e7uKiZHcehy1KNJO',
      }
    });
    console.log("successfully confirmed");
    res.redirect('https://thomaskitaba.github.io/tom-blog-post/'); // Moved this to the end
  } catch (error) {
    res.status(500).json({ message: 'Unable to confirm' });
  }
});

app.post('/api/sendemail', async (req, res) => {
  try {
    console.log(req.body);
    const result = await sendEmail(req.body);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.json({ message: 'Error sending mail'});
  }
});

app.post('/test', async (req, res) => {
  res.json({test: 'success'});
});
// todo: end of test send email

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
const { fname, lname, name, email, password } = req.body;
console.log(`${fname} ${lname}`);
// return;
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
const params = [fname, lname, name, email, hashedPassword, userTypeId, 'active', datetime, datetime, 0];
// step 3 insert data to database
db.run('BEGIN');
const signUpUser = 'INSERT INTO users (fName, lName, userName, userEmail, hash, userTypeId, userStatus, userCreatedDate, userUpdatedDate, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
db.run(signUpUser, params, (err) => {
  if (err) {
    res.status(500).json({error: err.stack});
  } else {
    // console.log(`${this.LastID}`)
    // let userId = this.LastID;
    let userId = '';
    db.get('SELECT last_insert_rowid() AS lastID', function(err, row) {
      if (err) {
        reject({ error: 'Unable to get last inserted ID' });
        return;
      }
      userId = row.lastID;
      const mailType = 'sign-up'
      const destinationEmail = email;
      try {
      sendEmail({userId, destinationEmail, mailType});
      db.run('COMMIT');
      }catch(error) {
        db.run('ROLLBACK');
      }
    });
    //TODO: call sendEmail funciton
    res.json({'userId': userId, 'userName': name, 'userTypeId': userTypeId, 'userEmail': email })
  }
});
});

// #region.hello
// MARK: test Mark
const changePasswordFunction = async (data) => {
  const {userId, userName: name, oldPassword: password, newPassword} = data;

  let hashedPassword = '';
  let result = '';
  let updatedUserId = '';


  return new Promise(async (resolve, reject) => {
    try{
      //  this will be returned { fName, lName, userName, userEmail, userId, userTypeId}
      console.log({name, password});
      const resultTemp = await checkUserCredentials({name, password});
      result = resultTemp;
      updatedUserId = result.userId;
      console.log(`updatedUserId: ${updatedUserId}`);
      console.log('checking user credentials ');
      console.log(`checkUserCredentials returned ${JSON.stringify(result)}`);
    } catch(error) {
      console.log(`${result}`);
      console.log('old password incorrect, if the problem persists relogin');
      reject({error: 'old password incorrect, if the problem persists relogin'});
      return;
    }
    try {
      console.log(newPassword);
      const hashedPasswordTemp = await encryptPassword(newPassword);
      console.log(hashedPasswordTemp);
      hashedPassword = hashedPasswordTemp;
      console.log('hasing password');
      console.log(`NewPasword= ${newPassword}  After hasing= ${hashedPassword}`);
    } catch(error) {
      console.log("Error Hashing password");
      reject({error: 'Error Hashing Password'});
      return;
    }
    db.run('BEGIN');
      try {
        console.log('write code here to update the database');
        db.run('UPDATE users SET hash = ? WHERE userId = ?', [hashedPassword, updatedUserId], (err) => {
          if (err) {
            console.log('Server Error');
            db.run('ROLLBACK');
            reject({error: 'Server Error'});
          }
          console.log('changing password');
        });
        db.run('COMMIT');
        resolve({message: 'Database will be updated here'});
      } catch(error) {
        console.log('Server Error');
        db.run('ROLLBACK');
        reject({errror: 'Server Error'});
      }

  });
}

app.post('/api/changePassword', async (req, res) => {
  console.log("============change password============");
  console.log(req.body);
  const {userName, userId, oldPassword, newPassword } = req.body;
  try {
    const result = await changePasswordFunction(req.body);
    res.json({ message: 'Success'});
    console.log('Inside try block add code herer to handle password change');
  } catch(error) {
    res.status(500).json({ error: error.error || 'Internal Server Error' });
    console.log('inside endpoints: catch block ');
    console.log(error.error);
  }
})

// Edit user information
const editUserInformation = async (data) => {
  // return ({message: 'success dear thomas kitaba feyissa'});

  // step: 1   check if user is valid
  const {userId, newFname, newLname, newUserName, userName} = data;

  let found = false;
  let validUserId = '';
  return new Promise((resolve, reject) => {
    db.run('BEGIN');
    console.log('begining transaction');
    db.all('SELECT userId, userName FROM users WHERE userId LIKE ?', userId, (err, rows) => {
      console.log('inside select statment');
      if (err) {
        console.log('user not found');
        reject({error: 'user not found'});
        db.run('ROLLBACK');
        return;
      }
      console.log(`Rows: ${JSON.stringify(rows)}`);
      if (rows.length === 1){

        found = true;
        console.log('user found');
        validUserId = rows[0].userId;

        db.run('UPDATE users SET fName = ?, lName = ?, userName = ? WHERE userId = ?', [newFname, newLname, newUserName, validUserId], (err) => {
          console.log('ABOUT to update user information');
          if (err) {
            db.run('ROLLBACK');
            console.log('unable to update user information ')
            reject({error: 'unable to update user information'});
            return;
          }
          db.run('COMMIT');
          resolve({message: 'Success'});

        });





      } else {
        db.run('ROLLBACK');
        reject({error: 'Duplicate users found'});
        return;
      }
    })
    //  if valid user then update his info on the database
    // if (found === true) {
    //   db.run('UPDATE users SET fName = ?, lName = ?, userName = ? WHERE userId = ?', [newFname, newLname, newUserName, validUserId], (err) => {
    //     if (err) {
    //       db.run('ROLLBACK');
    //       console.log('unable to update user information ')
    //       reject({error: 'unable to update user information'});
    //       return;
    //     }
    //     db.run('COMMIT');
    //     resolve({message: 'Success'});

    //   });
    // }
  });
}

app.post('/api/edituserinfo', async (req, res) => {
  const {newFname, newLname, newUserName} = req.body;
  console.log(req.body);
  try {
    const result = await editUserInformation(req.body);54321
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({errror: 'Error occured dear thomas kitaba'});
  }
})

// ===================== end of USER MANAGMENT ==========================

// add newpost function
const addNewPostFunction = async (data) => {
const { userId, postTitle, userName, firstName, lastName, commentContent, description, userTypeId } = data;
return new Promise((resolve, reject) => {
  console.log(`userTypeId: ${userTypeId}`);
  const postCreatedDate= getDateTime();
  const postUpdatedDate = getDateTime();
  const likes = 1;
  const dislikes = 0;
  const ratings = 0;

  let postStatus = 'pending';
  // userTypeId === 1 ? postStatus = 'active' : postStatus = 'pending';
  postTitle === '' ? postTitle = 'Untitled' : postTitle;
  // ======
  const postParam= [userId, postTitle, commentContent, postStatus, postCreatedDate, postUpdatedDate, description, likes, dislikes];
  const addNewPostSql = 'INSERT INTO posts (authorId, postTitle, postContent, postStatus, postCreatedDate, postUpdatedDate, description, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.run(addNewPostSql, postParam, (err) => {
    if (err){
      reject({error: 'Can not add to posts table'});
      return;
    }
    // resolve({commentId: this.lastID, parentId: commentId, userId: userId});
    db.get('SELECT last_insert_rowid() AS lastID', function(err, row) {
      if (err) {
        reject({ error: 'Unable to get last inserted ID' });
        return;
      }
      // TODO: SEND CONFIRITION EMAIL TO USER ID.
      resolve({postId: row.lastID, authorId: userId});

      console.log({postId: row.lastID, authorId: userId});
    });
    // for unknown reason this.lastId is undefined so we will use ['SELECT last_insert_rowid() AS lastID']
  });
})
}

app.post('/api/post/add', async (req, res) => {
console.log(`post Title: ${req.body.postTitle}`);
const { userId, postTitle, commentContent, description, userName, firstName, lastName, userTypeId } = req.body;
const allData = { userId, postTitle, userName, firstName, lastName, commentContent, description, userTypeId };

try {
  // TODO: add fname and lname if they don't exist in users table.
  const result = await addNewPostFunction(allData);
  res.json(result);
} catch(error) {
  res.status(500).json({ error: 'Database Error' });
}
});

const commentLastId = () => {
return new Promise((resolve, reject) => {
  db.get('SELECT COUNT(*) AS lastID FROM comments', (err, row) => {
    if(err) {
      reject(err);
      return;
    }
    resolve (row.lastID);
  });
})
}
const addNewCommentFunction = async (data) => {
const { commentId, userId, userName, firstName, lastName, commentContent } = data;
return new Promise((resolve, reject) => {
  console.log(commentId);
  const commentCreatedDate= getDateTime();
  const commentUpdatedDate = getDateTime();
  const commentStatus = 'active';
  const parentId = null;
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
    // resolve({commentId: this.lastID, parentId: commentId, userId: userId});
    db.get('SELECT last_insert_rowid() AS lastID', function(err, row) {
      if (err) {
        reject({ error: 'Unable to get last inserted ID' });
        return;
      }
      resolve({commentId: row.lastID, parentId: commentId, userId: userId});
      console.log({commentId: row.lastID, parentId: commentId, userId: userId});
    });

    // for unknown reason this.lastId is undefined so we will use ['SELECT last_insert_rowid() AS lastID']
    // console.log({commentId: this.lastID, parentId: commentId, userId: userId});
  });
})
}

const addNewPostCommentFunction = async (data) => {
return new Promise((resolve, reject) => {
const {postId, commentId, createdDate, updatedDate} = data;
const addNewPostCommentSql = 'INSERT INTO postComments (postId, commentId, postCommentCreatedDate, postCommentUpdatedDate) VALUES (?, ?, ?, ?)';
const postCommentParam = [postId, commentId, createdDate, updatedDate];

  db.run(addNewPostCommentSql, postCommentParam, (err) => {
    if (err) {
      reject({error: 'unable to insert to postComments'});
      return;
    }
      resolve({postId, commentId});
   });
});
}

app.post('/api/postcomment/add', async (req, res) => {
const { postId, commentId, userId, userName, firstName, lastName, commentContent } = req.body;
createdDate = getDateTime();
updatedDate = getDateTime();
console.log(commentId);
const allData = { commentId, userId, userName, firstName, lastName, commentContent };
try {
  //STEP-1:  add the comment and get its id
  const resultComment = await addNewCommentFunction(allData);
  const commentId = resultComment.commentId;
  // STEP-2: add the comment to the postComments table
  const postCommentData = {postId, commentId, createdDate, updatedDate};
  console.log(postCommentData);
  const result = await addNewPostCommentFunction(postCommentData);
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

    db.get('SELECT last_insert_rowid() AS lastID', function(err, row) {
      if (err) {
        reject({ error: 'Unable to get last inserted ID' });
        return;
      }
      resolve({commentId: row.lastID, parentId: commentId, userId: userId});
      console.log({commentId: row.lastID, parentId: commentId, userId: userId});
    });

    // for unknown reason this.lastId is undefined so we will use ['SELECT last_insert_rowid() AS lastID']
    // console.log({commentId: this.lastID, parentId: commentId, userId: userId});
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
const commentUpdatedDate = getDateTime();
const commentStatus = 'deleted';
const deleteCommentSql = "UPDATE comments SET commentStatus = ?, commentUpdatedDate = ?  WHERE commentId = ? AND (userId = ? OR (SELECT userTypeId FROM users WHERE userId = ?) = 1)";
return new Promise((resolve, reject) => {
  db.run(deleteCommentSql, [commentStatus, commentUpdatedDate, commentId, userId, userId], function(err) {
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
// TODO:  post delete
const deletePostFunction = async (postId, userId, userTypeId) => {
const postUpdatedDate = getDateTime();
const postStatus = 'deleted';
const deletePostSql = "UPDATE posts SET postStatus = ?, postUpdatedDate = ?  WHERE postId = ? AND (authorId = ? OR (SELECT userTypeId FROM users WHERE userId = ? ) =  1)";
return new Promise((resolve, reject) => {
  console.log(`userId, ${userId}  , userTypeId: ${userTypeId}`);
  db.run(deletePostSql, [postStatus, postUpdatedDate, postId, userId, userId], function(err) {
    if (err) {
      reject({ error: 'Database Error' });
      return;
    }
    if (this.changes === 0) {
      reject({ error: 'Comment not found or user does not have permission to delete' });
      return;
    }
    resolve({ postId, userId });
  });
});
};
app.post('/api/post/delete', async (req, res) => {
const { postId, userId, userTypeId } = req.body;
try {
  const result = await deletePostFunction(postId, userId, userTypeId);
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
const editPostFunction = async (data) => {
console.log(data);
const { postId, userId, userTypeId, userName, authorId, description, postContent, postTitle, postStatus} = data;
const postUpdatedDate = getDateTime();
const editPostSql = "UPDATE posts SET postTitle = ?, postStatus = ?, postContent = ?, description = ?, postUpdatedDate = ?  WHERE postId = ? AND (authorId = ? OR (SELECT userTypeId FROM users WHERE userId = ? ) =  1)";
const editPostParam = [postTitle, postStatus, postContent, description, postUpdatedDate, postId, userId, userId]
return new Promise((resolve, reject) => {
  console.log(`userId, ${userId}  , userTypeId: ${userTypeId}`);
  db.run(editPostSql, editPostParam, function(err) {
    if (err) {
      reject({ error: 'Database Error' });
      return;
    }
    if (this.changes === 0) {
      reject({ error: 'Comment not found or user does not have permission to delete' });
      return;
    }
    resolve({ postId, userId });
  });
});
};
app.post('/api/post/edit', async (req, res) => {
const { postId, userId, userName, authorId, description, postContent, postTitle, postStatus} = req.body;
const allData = { postId, userId, userName, authorId, description, postContent, postTitle, postStatus };
try {
  const result = await editPostFunction(allData);
  res.json(result);
} catch (error) {
  if (error.error === 'Database Error') {
    res.status(500).json({ error: error.error });
  } else {
    res.status(400).json({ error: error.error });
  }
}
});
const editCommentFunction = async (commentContent, commentId, userId) => {
const commentUpdatedDate = getDateTime();
const editCommentSql = "UPDATE comments SET commentContent = ?, commentUpdatedDate = ? WHERE commentId = ? AND (userId = ? OR (SELECT userTypeId FROM users WHERE userId = ?) = 1)";
return new Promise((resolve, reject) => {
  db.run(editCommentSql, [commentContent, commentUpdatedDate, commentId, userId, userId], function(err) {
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

app.post('/api/comment/edit', async (req, res) => {
const {commentContent, commentId, userId } = req.body;
try {
  const result = await editCommentFunction(commentContent, commentId, userId);
  res.json(result);
} catch (error) {
  if (error.error === 'Database Error') {
    res.status(500).json({ error: error.error });
  } else {
    res.status(400).json({ error: error.error });
  }
}
});
//========================================================================
// TODO:           LIKE|DESLIKE|RATING        post|comment|reply


const numberOfLikesFunction = async (postId) => {
  return new Promise((resolve, reject) => {
    db.run('SELECT likes FROM posts WHERE postid = ?', [postId], function(err, row) {
    if(err) {
      reject ({error: 'can not reterive post from database'});
      return;
    }
    if (!row) {
      console.log('post with postId not found');
      reject({ error: 'Post not found' });
      return;
    }

    const updatedLikes = row.likes;

    console.log('Updated likes count:', updatedLikes);
    resolve (updatedLikes);
}  );
});
}

const updatedLikedAmount = async (id, tableType) => {
  console.log(`tableType: ${tableType}`)
  if (tableType === 'posts') {
    sqlStatment = 'SELECT likes, disLikes, thumbDirection, thumbDirectionDislike FROM posts WHERE postId = ?';

  } else if (tableType === 'comments') {
    sqlStatment = 'SELECT likes, disLikes, thumbDirection, thumbDirectionDislike FROM comments WHERE commentId = ?';
  }
  return new Promise((resolve, reject) => {
    db.get(sqlStatment, [id], function(err, row) {
      if(err) {
        reject ({error: 'can not reterive post from database'});
        return;
      }
      if (row === 0) {
        console.log('data with primary key not found');
        reject({ error: 'data not found' });
        return;
      }
      const tabelInfo = row;
      console.log('Updated likes count:', tabelInfo);
      resolve (tabelInfo);
  }  );
  });
}

const likePostFunction = async (data) => {
  const [postId, userId,  userTypeId ] = data;
  let likedValue = '';
  const userPostParam = [postId, userId];

  console.log(`userPostParam: ${userPostParam}`);
  const userPostAddSql = ["INSERT INTO userPostLikes postId = ?"];
  return new Promise((resolve, reject) => {
    // Step 1: Check if the user has already liked the post
    // db.run('BEGIN');

    db.all('SELECT * FROM userPostInfo WHERE postId LIKE ? AND userId LIKE ?', [postId, userId], (err, rows) => {
      console.log("checking if user has already liked the post");
      if (err) {
        reject({ error: 'Database Error' }); // Handle database error
        return;
      }

      if (rows.length === 0) {
        userPostParam.push(true, false, false);
        console.log(`you are about to like this post ${postId}  ${userId}`);
        db.run('INSERT INTO userPostInfo (postId, userId, liked, disliked, rating) VALUES (?, ?, ?, ?, ?)', userPostParam, function(err) {
          if (err) {
            console.log('error inserting to userProfile');
            reject({ error: 'Database Error' });
            return;
          }
          console.log("about to check this.changes");
          if (this.changes === 0) {
            console.log('error inserting to userProfile');
            reject({ error: 'Comment not found or user does not have permission to delete' });
            return;
          }
          console.log("about to insert  to post");
          db.run('UPDATE posts SET likes = likes + 1, thumbDirection = ?, WHERE postId = ?', ['up', postId], function(err) {
            if (err) {
              console.log('error updating post likes');
              reject({error: 'Database Error'});
              return;
            }
            console.log('successfully updated post likes');

            //get number of likes
            const updatedLikes = updatedLikedAmount(postId, 'posts');
            console.log(updatedLikes);
            resolve (updatedLikes);

          })
        });
      } else {

        // if like exists or if relationship exists between the post and the user it should be negated
       console.log(JSON.stringify(rows[0]));
       likedValue = rows[0].liked;

        userPostInfoId = rows[0].userPostInfoId;
        console.log(`userPostInfoId: ${userPostInfoId}, likedValue ${likedValue}`);
        console.log('TAKE away your likes to the post');
        db.run('BEGIN');
        db.run('UPDATE userPostInfo SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END WHERE userPostInfoId = ?', [userPostInfoId], function(err) {
          if (err) {
            console.log('Error updating userPostInfo');
            db.run('ROLLBACK');
            reject({ error: 'Database Error' });
            return;
          }
          console.log("about to check this.changes");
          if (this.changes === 0) {
            console.log('error geting this.changes');
            db.run('ROLLBACK');
            reject({ error: 'Post not found or user does not have permission to update' });
            return;
          }
          console.log("about to insert  to post");
          // TODO  we can add condition to check if liked value is 0.
          const count = likedValue === 1 ? -1 : 1;

          const newThumbDirection = count === 1 ? 'down' : 'up';

          db.run('UPDATE posts SET likes = likes + ?, thumbDirection = ?  WHERE postId = ?', [count, newThumbDirection, postId], function(err) {
            if (err) {
              console.log('error updating post likes');
              db.run('ROLLBACK');
              reject({error: 'Database Error'});
              return;
            }
            console.log('successfully updated post likes');

            const updatedLikes = updatedLikedAmount(postId, 'posts');
            db.run('COMMIT');
            resolve (updatedLikes);
            // return;
          })
        });
      }
    });
    // Note: Any code here will not execute after the resolve/reject
  });
}

app.post('/api/post/like', async (req, res) => {
const {id: postId, userId, userTypeId} = req.body;
allData = [postId, userId, userTypeId];
console.log(allData);
try {
  const result = await likePostFunction(allData);
  res.json(result);
} catch(error) {
  if (error.error === 'Database Error') {
    res.status(500).json({error: 'Database Error'});
  } else {
    res.status(400).json({error: 'Bad Request'})
  }
}
});

//TODO: DISLIKE
const disLikePostFunction = async (data) => {
// console.log("you are inside Dislike posts function"); // todo: test
const [postId, userId,  userTypeId ] = data;
let dislikedValue = '';
let userPostInfoId = '';

const userPostParam = [postId, userId];
// console.log(`userPostParam: ${userPostParam}`); // todo: test
return new Promise((resolve, reject) => {
  db.run('BEGIN');
  db.all('SELECT * FROM userPostInfo WHERE postId LIKE ? AND userId LIKE ?', [postId, userId], (err, rows) => {
    console.log("checking if user has already disliked the post");
    if (err) {
      reject({ error: 'Database Error' }); // Handle database error
      return;
    }
    if (rows.length === 0) {
      userPostParam.push(false, true, false);
      // console.log(`Dislike this post ${postId} - ${userId}`); // todo: test
      db.run('INSERT INTO userPostInfo (postId, userId, liked, disliked, rating) VALUES (?, ?, ?, ?, ?)', userPostParam, function(err) {
        if (err) {
          console.log('error inserting to userPostInfo');
          reject({ error: 'Database Error' });
          return;
        }
        db.run('UPDATE posts SET dislikes = dislikes + 1 WHERE postId = ?', [postId], function(err) {
          if (err) {
            console.log('error updating post dislikes');
            db.run('ROLLBACK');
            reject({error: 'Database Error'});
            return;
          }
          console.log('successfully updated post dislikes');
          db.run('COMMIT');
          const updatedLikes = updatedLikedAmount(postId, 'posts');

          resolve (updatedLikes);
          // resolve({postId, userId});
        })
      });
    } else {

      dislikedValue = rows[0].disliked;
      userPostInfoId = rows[0].userPostInfoId;
      if (!userPostInfoId) {
        reject({error: "userPostInfoId not found"});
      }
      // console.log(`userPostInfoId: ${userPostInfoId}, dislikedValue ${dislikedValue}`); // todo: test
      // console.log('TAKE away your likes to the post'); // todo: test

      db.run('UPDATE userPostInfo SET disliked = CASE WHEN disliked = 1 THEN 0 ELSE 1 END WHERE userPostInfoId = ?', [userPostInfoId], function(err) {
        if (err) {
          console.log('Error updating userPostInfo');
          db.run('ROLLBACK');
          reject({ error: 'Database Error' });
          return;
        }
        if (this.changes === 0) {
          console.log('error getting this.changes');
          db.run('ROLLBACK');
          reject({ error: 'Post not found or user does not have permission to update' });
          return;
        }
        const count = dislikedValue === 1 ? -1 : 1;
        const newThumbDirectionDeslike = count === 1 ? 'down' : 'up';
        db.run('UPDATE posts SET dislikes = dislikes + ?, thumbDirectionDislike = ? WHERE postId = ?', [count, newThumbDirectionDeslike, postId], function(err) {
          if (err) {
            console.log('error updating post dislikes');
            db.run('ROLLBACK');
            reject({error: 'Database Error'});
            return;
          }
          console.log('successfully updated post dislikes');
          db.run('COMMIT');
          const updatedLikes = updatedLikedAmount(postId, 'posts');
          resolve (updatedLikes);
        })
      });
    }
  });
});
}

app.post('/api/post/dislike', async (req, res) => {
const {id: postId, userId, userTypeId} = req.body;
allData = [postId, userId, userTypeId];
// console.log(allData); // todo: test
try {
  // console.log('inside try'); // todo: test
  const result = await disLikePostFunction(allData);
  res.json(result);
} catch(error) {
  // console.log('inside catch'); // todo: test
  if (error.error === 'Database Error') {
    res.status(500).json({error: error.error});
  } else {
    res.status(400).json({error: error.error})
  }
}
});

//todo: comment|reply             like|dislike
const handelCommentInfo = async (data) => {
  const [id, userId, userTypeId, value] = data;
  console.log(`DATA inside handelCommentInfo function ${data}`); // todo: test
  console.log('============================');
  // let commentInfoParam = [id, userId];
  let likedOrDislikedValue = 0;

  return new Promise((resolve, reject)=> {

    let commentInfoParam = [];
    let updateCommentsTable = '';
    let updateCommentsTableCase2 = '';

    let updateCommentInfoExistSql = '';

    console.log(`when initialized:- ${commentInfoParam}`);

    let thumbsDirection = 'up';

    const checkCommentInfoExistSql = 'SELECT * FROM userCommentInfo WHERE commentId LIKE ? AND userId LIKE ?';

    const insertIntoCommentInfoSql = 'INSERT INTO userCommentInfo (commentId, userId, liked, disliked) VALUES (?, ?, ?, ?)';
    const insertIntoCommentInfoSqlCase2 = 'UPDATE userCommentInfo SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END WHERE userPostInfoId = ?';


    if (value === 'comment-liked' || value === 'reply-liked') {
      console.log('inside Commentlike'); // todo: test

      // commentInfoParam.length = 0;
      console.log(`commentInfoParam.length=0 :- ${commentInfoParam}`);
      commentInfoParam.push(id, userId, true, false);
      console.log(`commentInfoParam.push:- ${commentInfoParam}`);

      updateCommentsTable = 'UPDATE comments SET likes = likes + 1, thumbDirection = ? WHERE commentId = ?';
      // updateCommentsTableCase2= 'UPDATE comments SET likes = likes + 1, thumbDirection = ? WHERE commentId = ?';
      updateCommentInfoExistSql = 'UPDATE userCommentInfo SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END WHERE userCommentInfoId = ?';

      thumbsDirection = 'up';

    } else if(value === 'comment-disliked' || value === 'reply-disliked') {
      console.log('inside Comment dislike'); // todo: test
      // commentInfoParam.length = 0;
      commentInfoParam.push(id, userId, false, true);

      updateCommentsTable = 'UPDATE comments SET dislikes = dislikes + 1, thumbDirectionDislike = ? WHERE commentId = ?';

      // updateCommentsTableCase2 = 'UPDATE comments SET dislikes = dislikes + 1, thumbDirectionDislike = ? WHERE commentId = ?';
      updateCommentInfoExistSql = 'UPDATE userCommentInfo SET disliked = CASE WHEN disliked = 1 THEN 0 ELSE 1 END WHERE userCommentInfoId = ?';

      thumbsDirection = 'down';
    }
    // todo: the main task goes here
    db.run('BEGIN');
    db.all(checkCommentInfoExistSql, [id, userId], (err, rows) => {
      console.log("checking if user has already liked the comment or reply");
      console.log('============================');
      if (err) {
        reject({ error: 'Database Error related to userCommentInfo table'}); // Handle database error
        return;
      }
      if (rows.length < 1) {
        // (likes = true, dislikes = false, rating = false)
        console.log(`you are about to like this comment ${id}  ${userId}`);
        console.log(`inside db.all:- ${commentInfoParam}`);
        console.log('============================');
        db.run(insertIntoCommentInfoSql, commentInfoParam, function(err) {
          if (err) {
            console.log('error inserting to userCommentInfo');
            reject({ error: 'Database Error' });
            return;
          }
          console.log("about to check this.changes");
          if (this.changes === 0) {
            console.log('error inserting to userCommentInfo');
            db.run('ROLLBACK');
            reject({ error: 'Comment not found or user does not have permission to insert to userCommentInfo' });
            return;
          }
          console.log("about to insert  to comments"); // todo: test

          console.log(`${id}`);
          db.run(updateCommentsTable, ['up', id], function(err) {
            if (err) {
              console.log('error updating coment likes');
              db.run('ROLLBACK');
              reject({error: 'Database Error'});
              return;
            }
            console.log('successfully updated Comment likes');
            console.log(`****************`);
            //get number of likes
            const updatedLikes = updatedLikedAmount(id, 'comments');
            console.log(updatedLikes);
            db.run('COMMIT');
            resolve (updatedLikes);
          })
        });
      } else {
        userCommentInfoId = rows[0].userCommentInfoId;
        // if like exists or if relationship exists between the post and the user it should be negated
      console.log(JSON.stringify(rows[0]));

      if (value === 'comment-liked' || value === 'reply-liked') {
        console.log(`********************`);
        console.log('inside Commentlike'); // todo: test

        likedOrDislikedValue = rows[0].liked;
        console.log(`inside condition:- ${likedOrDislikedValue}`);

        updateCommentsTableCase2 = 'UPDATE comments SET likes = likes + ?, thumbDirection = ? WHERE commentId = ?';

      } else if (value === 'comment-disliked' || value === 'reply-disliked') {
        likedOrDislikedValue = rows[0].disliked;
        updateCommentsTableCase2 = 'UPDATE comments SET disLikes = disLikes + ?, thumbDirectionDislike = ?  WHERE commentId = ?';

      }
        console.log(`userCommentInfoId: ${userCommentInfoId}, likedValue ${likedOrDislikedValue}`);
        console.log('TAKE away your likes to the post');

        db.run(updateCommentInfoExistSql, [userCommentInfoId], async (err) => {
          if (err) {
            console.log('Error updating userCommentInfo');
            db.run('ROLLBACK');
            reject({ error: 'Database Error' });
            return;
          }
          console.log("about to check this.changes");
          if (this.changes === 0) {
            console.log('error geting this.changes');
            db.run('ROLLBACK');
            reject({ error: 'Post not found or user does not have permission to update' });
            return;
          }
          console.log("about to insert  to Comment");
          const count = likedOrDislikedValue === 1 ? -1 : 1;

          const newThumbDirection = count === 1 ? 'down' : 'up';

          db.run(updateCommentsTableCase2, [count, newThumbDirection, id], function(err) {
            if (err) {
              console.log('error updating comment likes');
              db.run('ROLLBACK');
              reject({error: 'Database Error'});
              return;
            }
            console.log('successfully updated post likes');

            const updatedLikes = updatedLikedAmount(id, 'comments');
            db.run('COMMIT');
            resolve (updatedLikes);
            // return;
          })
        });
      }
    });
    })
 // TODO: end of comment|reply like

}

// const handelCommentInfotemp = async (data) => {
//   const [id, userId, userTypeId, value] = data;
//   console.log(`inside function ${value}`); // todo: test

//   return new Promise((resolve, reject) => {
//     let likedOrDislikedValue = '';
//     let updateCommentsTable = '';
//     let updateCommentsTableCase2 = '';
//     let updateCommentInfoExistSql = '';
//     let commentInfoParam = [];
//     let thumbsDirection = 'up';

//     const checkCommentInfoExistSql = 'SELECT * FROM userCommentInfo WHERE commentId LIKE ? AND userId LIKE ?';
//     const insertIntoCommentInfoSql = 'INSERT INTO userCommentInfo (commentId, userId, liked, disliked) VALUES (?, ?, ?, ?, ?)';
//     const insertIntoCommentInfoSqlCase2 = 'UPDATE userPostInfo SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END WHERE userPostInfoId = ?';

//     if (value === 'comment-like' || value === 'reply-like') {
//       console.log('inside Comment like'); // todo: test

//       commentInfoParam.length = 0;
//       commentInfoParam.push(id, userId, true, false);

//       updateCommentsTable = 'UPDATE comments SET likes = likes + 1, thumbDirection = ? WHERE commentId = ?';
//       updateCommentInfoExistSql = 'UPDATE userCommentInfo SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END WHERE userCommentInfoId = ?';
//       thumbsDirection = 'up';
//     } else if (value === 'comment-dislike' || value === 'reply-dislike') {
//       console.log('inside Comment dislike'); // todo: test

//       commentInfoParam.length = 0;
//       commentInfoParam.push(id, userId, false, true);

//       updateCommentsTable = 'UPDATE comments SET disLikes = disLikes + 1, thumbDirectionDislike = ? WHERE commentId = ?';
//       updateCommentInfoExistSql = 'UPDATE userCommentInfo SET disliked = CASE WHEN disliked = 1 THEN 0 ELSE 1 END WHERE userCommentInfoId = ?';
//       thumbsDirection = 'down';
//     } else {
//       resolve({ error: 'unknown operation' });
//       return;
//     }

//     db.run('BEGIN');
//     db.all(checkCommentInfoExistSql, [id, userId], (err, rows) => {
//       console.log("checking if user has already liked the comment or reply");
//       if (err) {
//         db.run('ROLLBACK');
//         reject({ error: 'Database Error' });
//         return;
//       }

//       if (rows.length === 0) {
//         console.log(`you are about to like this comment ${id}  ${userId}`);
//         db.run(insertIntoCommentInfoSql, commentInfoParam, function(err) {
//           if (err) {
//             console.log('error inserting to userCommentInfo');
//             db.run('ROLLBACK');
//             reject({ error: 'Database Error' });
//             return;
//           }
//           console.log("about to insert to comments");
//           if (this.changes === 0) {
//             console.log('error inserting to userCommentInfo');
//             db.run('ROLLBACK');
//             reject({ error: 'Comment not found or user does not have permission to insert' });
//             return;
//           }
//           db.run(updateCommentsTable, [thumbsDirection, id], function(err) {
//             if (err) {
//               console.log('error updating comment likes');
//               db.run('ROLLBACK');
//               reject({ error: 'Database Error' });
//               return;
//             }
//             console.log('successfully updated Comment likes');
//             const updatedLikes =  updatedLikedAmount(id, 'comments');
//             db.run('COMMIT');
//             resolve(updatedLikes);
//           })
//         });
//       } else {
//         likedOrDislikedValue = rows[0].liked;
//         userCommentInfoId = rows[0].userCommentInfoId;

//         console.log(`userCommentInfoId: ${userCommentInfoId}, likedValue ${likedOrDislikedValue}`);
//         console.log('TAKE away your likes to the post');

//         db.run(updateCommentInfoExistSql, [userCommentInfoId], function(err) {
//           if (err) {
//             console.log('Error updating userCommentInfo');
//             db.run('ROLLBACK');
//             reject({ error: 'Database Error' });
//             return;
//           }
//           console.log("about to insert to Comment");
//           const count = likedOrDislikedValue === 1 ? -1 : 1;
//           const newThumbDirection = count === 1 ? 'down' : 'up';

//           db.run(updateCommentsTableCase2, [count, newThumbDirection, id], function(err) {
//             if (err) {
//               console.log('error updating comment likes');
//               db.run('ROLLBACK');
//               reject({ error: 'Database Error' });
//               return;
//             }
//             console.log('successfully updated Comment likes');
//             const updatedLikes =  updatedLikedAmount(id, 'comments');
//             db.run('COMMIT');
//             resolve(updatedLikes);
//           })
//         });
//       }
//     });
//   });
// };

//todo: endpoint  /api/comment/info
app.post('/api/comment/test', async (req, res) => {
  console.log(`inside /api/comment/test ${req.body}`);
  res.status(200).json({message: 'successfully liked comment'});
})
app.post('/api/comment/info', async (req, res) => {
  const {id, userId, userTypeId, value} = req.body;
  console.log(`inside endpoint ${req.body}`);
  allData = [id, userId, userTypeId, value];
  console.log(allData); // todo: test
  console.log(`*******************`);
  try {
    // console.log('inside try'); // todo: test
    const result = await handelCommentInfo(allData);
    console.log(result);
    res.json(result);

  } catch(error) {
    // console.log('inside catch'); // todo: test
    if (error.error === 'Database Error') {
      res.status(500).json({error: error.error});
    } else {
      res.status(400).json({error: error.error})
    }
  }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









// TODO: ==== Code Recycle bin=====
