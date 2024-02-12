// src/components/JSONBinComponent.js
import React, { useState, useEffect } from 'react';
import {Container } from 'react-bootstrap';
import '../App.css'
import axios from 'axios';
import { Postsaccordion } from './Postsaccordion';

const Posts = () => {


const lore = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, nulla dolore ipsum, sunt sit magni blanditiis alias animi, eos laboriosam aliquam quia optio enim repudiandae nostrum velit beatae itaque cupiditate."
  const sampleData = {
    "record": {
      "posts": [
        {
          "id": 1,
          "title": "First Post",
          "content": lore,
          "author": "John Doe",
          "comments": [
            {
              "id": 1,
              "text": "This is a comment on the first post.",
              "user": "Commenter1",
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
          "comments": [
            {
              "id": 1,
              "text": "Comment on the second post.",
              "user": "Commenter3",
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
          "comments": [
            {
              "id": 1,
              "text": "Comment on the third post.",
              "user": "Commenter4",
              "likes": 3,
              "replies": []
            }
          ]
        }
      ]
    },
    "metadata": {
      "id": "65a17308dc74654018914a1e",
      "private": false,
      "createdAt": "2024-01-12T17:12:40.611Z"
    }
  }
  const [data, setdata] = useState(sampleData);
  return (
    <Container>
      <h2>Read Researchs made by Yonas Kitaba</h2>
      <Postsaccordion data={data} />
    </Container>
  );
};

export default Posts;

  