const Database = {
  "posts": [
    {
      "postId": 3,
      "postTitle": "Third Post",
      "postContent": "Here goes the content of the third post",
      "description": "Description for post 3",
      "postStatus": "active",
      "postCreatedDate": "2024-02-09 22:22:22",
      "postUpdatedDate": "2024-02-09 22:22:22",
      "postUpdatedTime": "22:22:22",
      "postCreatedTime": "22:22:22",
      "authorName": "YonasKitaba",
      "authorEmail": "john@example.com",
      "comments": [
        {
          "postId": 3,
          "postCommentId": 3,
          "postCommentCreatedDate": "2024-02-08",
          "postCommentUpdatedDate": "2024-02-08",
          "commentId": 5,
          "commentContent": "This is the first comment for post 3",
          "commentCreatedDate": "2024-02-08",
          "commentUpdatedDate": "2024-02-08",
          "commentStatus": "active",
          "parentId": null,
          "likes": 7,
          "commenterId": 2,
          "commenterName": "ThomasKitaba",
          "typeId": 1,
          "typeName": "Admin",
          "replies": []
        }
      ]
    },
    {
      "postId": 4,
      "postTitle": "Fourth Post",
      "postContent": "Content for the fourth post",
      "description": "Description for post 4",
      "postStatus": "active",
      "postCreatedDate": "2024-02-08 22:22:22",
      "postUpdatedDate": "2024-02-08 22:22:22",
      "postUpdatedTime": "22:22:22",
      "postCreatedTime": "22:22:22",
      "authorName": "YonasKitaba",
      "authorEmail": "john@example.com",
      "comments": [
        {
          "postId": 4,
          "postCommentId": 4,
          "postCommentCreatedDate": "2024-02-08",
          "postCommentUpdatedDate": "2024-02-08",
          "commentId": 7,
          "commentContent": "This is the first comment for post 4",
          "commentCreatedDate": "2024-02-08",
          "commentUpdatedDate": "2024-02-08",
          "commentStatus": "active",
          "parentId": null,
          "likes": 6,
          "commenterId": 1,
          "commenterName": "YonasKitaba",
          "typeId": 1,
          "typeName": "Admin",
          "replies": [
            {
              "commentId": 2,
              "commentContent": "This is a reply to the first comment for post 1",
              "likes": 8,
              "userId": 2,
              "parentId": 1,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 2,
              "userName": "ThomasKitaba",
              "userEmail": "jane@example.com",
              "hash": "hashed_password_2",
              "userTypeId": 1,
              "fName": "Thomas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            },
            {
              "commentId": 10,
              "commentContent": "This is  a reply to the first comment for post 1",
              "likes": 2,
              "userId": 1,
              "parentId": 1,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 1,
              "userName": "YonasKitaba",
              "userEmail": "john@example.com",
              "hash": "hashed_password_1",
              "userTypeId": 1,
              "fName": "Yonas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            }
          ]
        }
      ]
    },
    {
      "postId": 1,
      "postTitle": "First Post",
      "postContent": "this is post for title 1. this is first post",
      "description": "Description for post 1",
      "postStatus": "active",
      "postCreatedDate": "2024-02-05 22:22:22",
      "postUpdatedDate": "2024-02-05 22:22:22",
      "postUpdatedTime": "22:22:22",
      "postCreatedTime": "22:22:22",
      "authorName": "YonasKitaba",
      "authorEmail": "john@example.com",
      "comments": [
        {
          "postId": 1,
          "postCommentId": 1,
          "postCommentCreatedDate": "2024-02-08",
          "postCommentUpdatedDate": "2024-02-08",
          "commentId": 1,
          "commentContent": "This is the first comment with parentId set",
          "commentCreatedDate": "2024-02-08",
          "commentUpdatedDate": "2024-02-08",
          "commentStatus": "active",
          "parentId": null,
          "likes": 5,
          "commenterId": 1,
          "commenterName": "YonasKitaba",
          "typeId": 1,
          "typeName": "Admin",
          "replies": [
            {
              "commentId": 2,
              "commentContent": "This is a reply to the first comment for post 1",
              "likes": 8,
              "userId": 2,
              "parentId": 1,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 2,
              "userName": "ThomasKitaba",
              "userEmail": "jane@example.com",
              "hash": "hashed_password_2",
              "userTypeId": 1,
              "fName": "Thomas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            },
            {
              "commentId": 10,
              "commentContent": "This is  a reply to the first comment for post 1",
              "likes": 2,
              "userId": 1,
              "parentId": 1,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 1,
              "userName": "YonasKitaba",
              "userEmail": "john@example.com",
              "hash": "hashed_password_1",
              "userTypeId": 1,
              "fName": "Yonas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            }
          ]
        },
        {
          "postId": 1,
          "postCommentId": 6,
          "postCommentCreatedDate": "2024-02-08",
          "postCommentUpdatedDate": "2024-02-08",
          "commentId": 11,
          "commentContent": "This is a reply to the first comment for ",
          "commentCreatedDate": "2024-02-08",
          "commentUpdatedDate": "2024-02-08",
          "commentStatus": "active",
          "parentId": null,
          "likes": 0,
          "commenterId": 3,
          "commenterName": "Alice Johnson",
          "typeId": 4,
          "typeName": "User",
          "replies": [
            {
              "commentId": 4,
              "commentContent": "This is a reply to the first comment for post 2",
              "likes": 2,
              "userId": 1,
              "parentId": 3,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 1,
              "userName": "YonasKitaba",
              "userEmail": "john@example.com",
              "hash": "hashed_password_1",
              "userTypeId": 1,
              "fName": "Yonas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            }
          ]
        }
      ]
    },
    {
      "postId": 2,
      "postTitle": "Second Post",
      "postContent": "title 2 post content post 2",
      "description": "Description for post 2",
      "postStatus": "active",
      "postCreatedDate": "2024-02-03 22:22:22",
      "postUpdatedDate": "2024-02-03 22:22:22",
      "postUpdatedTime": "22:22:22",
      "postCreatedTime": "22:22:22",
      "authorName": "YonasKitaba",
      "authorEmail": "john@example.com",
      "comments": [
        {
          "postId": 2,
          "postCommentId": 2,
          "postCommentCreatedDate": "2024-02-08",
          "postCommentUpdatedDate": "2024-02-08",
          "commentId": 3,
          "commentContent": "This is the first comment for post 2",
          "commentCreatedDate": "2024-02-08",
          "commentUpdatedDate": "2024-02-08",
          "commentStatus": "active",
          "parentId": null,
          "likes": 3,
          "commenterId": 3,
          "commenterName": "Alice Johnson",
          "typeId": 4,
          "typeName": "User",
          "replies": [
            {
              "commentId": 4,
              "commentContent": "This is a reply to the first comment for post 2",
              "likes": 2,
              "userId": 1,
              "parentId": 3,
              "commentStatus": "active",
              "commentDescription": null,
              "commentCreatedDate": "2024-02-08",
              "commentCreatedTime": "33:33:33",
              "commentUpdatedTime": "33:33:33",
              "commentUpdatedDate": "2024-02-08",
              "userId:1": 1,
              "userName": "YonasKitaba",
              "userEmail": "john@example.com",
              "hash": "hashed_password_1",
              "userTypeId": 1,
              "fName": "Yonas",
              "lName": "Kitaba",
              "userStatus": null,
              "userUpdatedDate": null,
              "userCreatedDate": null,
              "userCreatedTime": null,
              "userUpdatedTime": null,
              "typeId": 1,
              "typeName": "Admin",
              "userTypeUpdatedDate": null,
              "userTypeUpdatedTime": null,
              "userTypeCreatedTime": null,
              "userTypeCreatedDate": null
            }
          ]
        }
      ]
    }
  ]
}


const Data =
{
  "record": {
    "posts": [
      {
        "id": 1,
        "title": "First Post",
        "content": "This is the content of the first post.",
        "author": "John Doe",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "This is a comment on the first post.",
            "user": "Commenter1",
            "commentDate": "22-11-23",
            "likes": 5,
            "replies": [
              {
                "id": 1,
                "text": "Reply to Commenter1's comment",
                "user": "ReplyUser1"
              }
            ]
          },
          {
            "id": 2,
            "text": "Another comment on the first post.",
            "user": "Commenter2",
            "commentDate": "22-11-23",
            "likes": 8,
            "replies": []
          }
        ]
      },
      {
        "id": 2,
        "title": "Second Post",
        "content": "Content for the second post goes here.",
        "author": "Jane Smith",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the second post.",
            "user": "Commenter3",
            "commentDate": "22-11-23",
            "likes": 12,
            "replies": [
              {
                "id": 1,
                "text": "Reply to Commenter3's comment",
                "user": "ReplyUser2"
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "title": "Third Post",
        "content": "Third post content.",
        "author": "Alex Johnson",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the third post.",
            "user": "Commenter4",
            "commentDate": "22-11-23",
            "likes": 3,
            "replies": []
          }
        ]
      }
    ],
    "users": [
      { "userId": 1, "userName": "Abebe", "userEmail": "aaaaaaaaaa@gmail.com", "createdDate": "2022-11-23" },
      { "userId": 2, "userName": "Kebede", "userEmail": "bbbbbbbbbb@gmail.com", "createdDate": "2022-11-23" },
      { "userId": 3, "userName": "bekele", "userEmail": "cccccccccc@gmail.com", "createdDate": "2022-11-23" }
    ],
    "authors": [
      { "authorId": 1, "authorName": "Yonas Kitaba", "authorTitle": "consultant" }
    ]
  },
  "metadata": {
    "id": "65a17308dc74654018914a1e",
    "private": false,
    "newPostAvailable": false,
    "createdAt": "2024-01-12T17:12:40.611Z"
  }
}