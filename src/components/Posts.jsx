// src/components/JSONBinComponent.js
import React, { useState, useEffect, useContext } from 'react';
import {Container } from 'react-bootstrap';
import '../App.css'
import axios from 'axios';
import { Postsaccordion } from './Postsaccordion';
import MyContext from './MyContext';

const Posts = () => {
  // const binId = process.env.REACT_APP_BIN_ID;
  // const secretKey = process.env.REACT_APP_SECRET_KEY;
  // // const [data, setData] = useState('');

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
  //       headers: {
  //         'X-Master-Key': secretKey,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchJSONData = async () => {
  //     const jsonData = await fetchData();
  //     setData(jsonData);
  //   };

  //   fetchJSONData();
  // }, [binId, fetchData, secretKey]);

const lore = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate."
const sampleData = {
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
            "replies": []
          }
        ]
      },
      {
        "id": 2,
        "title": "Second Post",
        "content": "Content for the second post goes here.",
        "author": "Yonas Kitaba",
        "postDate": "22-11-23",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the second post.",
            "user": "Commenter3",
            "commentDate": "22-11-23",
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
        "title": "Education reimagined",
        "content": lore,
        "author": "Yonas Kitaba",
        "postDate": "22-11-25",
        "likes": 1,
        "comments": [
          {
            "id": 1,
            "text": "Comment on the third post.",
            "user": "Commenter4",
            "commentDate": "22-11-23",
            "replies": []
          }
        ]
      }
    ],
    "users": [
      {"userId": 1, "userName": 'Abebe', "userEmail": 'aaaaaaaaaa@gmail.com', 'createdDate': '22-11-23'},
      {"userId": 1, "userName": 'Kebede', "userEmail": 'bbbbbbbbbb@gmail.com',  'createdDate': '22-11-23'},
      {"userId": 1, "userName": 'bekele', "userEmail": 'cccccccccc@gmail.com', 'createdDate': '22-11-23'}
    ],
    "authors": [
      {"authorId": 1, "authorName": 'Yonas Kitaba', "authorTitle": 'consultant'},
    ]
  },
  "metadata": {
    "id": "65a17308dc74654018914a1e",
    "private": false,
    "createdAt": "2024-01-12T17:12:40.611Z"
  }
}

  const [data, setData] = useState(sampleData);
  const { Database, setDatabase } = useContext(MyContext);
  return (
    <Container>
       <ul>
        {Database && Database.length > 0 ? (
          Database[2].map(post => (
            <li key={post.postId}>
              ({post.postId}) {post.postTitle} - {post.postContent}
            </li>
          ))
        ) : (
          <li>No posts available</li>
        )}
      </ul>
      <h2>Read Researchs made by Yonas Kitaba</h2>
      <Postsaccordion data={data} />
    </Container>
  );
};

export default Posts;
