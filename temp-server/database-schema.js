
db.serialize(() => {
db.run(`
  CREATE TABLE IF NOT EXISTS users (
  userId INTEGER PRIMARY KEY,
  userName TEXT,
  userEmail TEXT,
  hash TEXT,
  createdDate TEXT,
  updatedDate TEXT,
  userTypeId INTEGER,
  FOREIGN KEY (userTypeId) REFERENCES userTypes(typeId)
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS userTypes(
  typeId INTEGER PRIMARY KEY,
  typeName TEXT,
  createdDate TEXT,
  updatedDate TEXT
)
`);
db.run(`
  CREATE TABLE IF NOT EXISTS comments (
    commentId INTEGER PRIMARY KEY,
    commentContent TEXT,
    likes INTEGER,
    userId INTEGER,
    parentId INTEGER DEFAULT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (parentId) REFERENCES comments(commentId)
);
`);

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    postTitle TEXT,
    postContent TEXT,
    postDate DATETIME,
    updateDate DATETIME
  )
`);
const title = "title 1"
const content = "this is post for title 1. this is first post"
const currentDate = updateDate = new Date().toISOString().slice(0, 10);
// db.run(`
// INSERT INTO posts (postTitle, postContent, postDate, updateDate)
// VALUES (?, ?, ?, ?)`, [title, content, currentDate, updateDate])

db.run(`
    CREATE TABLE IF NOT EXISTS postComments(
      postCommentId INTEGER PRIMARY KEY,
      commentDate TEXT,
      udateDate TEXT,
      postId INTEGER,
      commentId INTEGER,
      FOREIGN KEY(postId) REFERENCES posts(postId),
      FOREIGN KEY(commentId) REFERENCES comments(commentId)
    )
`);
db.run(`
      CREATE TABLE IF NOT EXISTS metadata (
        id INTEGER,
        rdbms TEXT,
        databaseVersion TEXT,
        createdDate TEXT,
        updatedDate TEXT,
        createdTime TEXT,
        updatedTime TEXT
      )
`);
});

// sample data
db.run(`
INSERT INTO userTypes (typeName, createdDate, updatedDate) VALUES ('Admin', '2024-02-06', '2024-02-06');
INSERT INTO userTypes (typeName, createdDate, updatedDate) VALUES ('OutsideSource', '2024-02-06', '2024-02-06');
INSERT INTO userTypes (typeName, createdDate, updatedDate) VALUES ('UnkownSource', '2024-02-06', '2024-02-06');
INSERT INTO userTypes (typeName, createdDate, updatedDate) VALUES ('User', '2024-02-06', '2024-02-06');
INSERT INTO userTypes (typeName, createdDate, updatedDate) VALUES ('Guest', '2024-02-06', '2024-02-06');
`)

db.run (`
INSERT INTO users (userName, userEmail, fName, lName, hash, createdDate, updatedDate, userTypeId) VALUES ('YonasKitaba', 'john@example.com', 'Yonas', 'Kitaba', 'hashed_password_1', '2024-02-06', '2024-02-06', 1);
INSERT INTO users (userName, userEmail, fName, lName, hash, createdDate, updatedDate, userTypeId) VALUES ('ThomasKitaba', 'jane@example.com', 'Thomas', 'Kitaba', 'hashed_password_2', '2024-02-06', '2024-02-06', 1);
INSERT INTO users (userName, userEmail, fName, lName, hash, createdDate, updatedDate, userTypeId) VALUES ('Alice Johnson', 'alice@example.com', 'Alice', 'Johnson', 'hashed_password_3', '2024-02-06', '2024-02-06', 4);
INSERT INTO users (userName, userEmail, fName, lName, hash, createdDate, updatedDate, userTypeId) VALUES ('Bob Brown', 'bob@example.com', 'Bob', 'Brown', 'hashed_password_4', '2024-02-06', '2024-02-06', 4);
INSERT INTO users (userName, userEmail, fName, lName, hash, createdDate, updatedDate, userTypeId) VALUES ('Eva Green', 'eva@example.com', 'Eva', 'Green', 'hashed_password_5', '2024-02-06', '2024-02-06', 5);
`)