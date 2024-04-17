//TODO: sort Posts
import React, { useEffect, useState, useContext } from 'react';
// import MyContext from './MyContext';

export const sortPosts = (myPosts, sortWith, sortBy) => {
    // const {yAxis, setYaxis} = useContext(MyContext);
    const statusOrderActive = ['active', 'pending', 'deleted', 'other'];
    const statusOrderPending = ['pending', 'active', 'deleted', 'other'];
    const statusOrderDeleted = ['deleted', 'active', 'pending', 'other'];
    const statusOrderOthers = ['other', 'active', 'deleted', 'pending'];

    // Here you should choose the correct status order based on your requirement
    let statusOrder;
    if (sortBy === 'post-status') {
      if (sortWith=== 'active') {
        statusOrder = statusOrderActive;
      } else if (sortWith === 'deleted') {
        statusOrder = statusOrderDeleted;
      } else if (sortWith === 'pending') {
        statusOrder = statusOrderPending;
      } else if (sortWith === 'other'){
        statusOrder = statusOrderOthers;
      } else {
        statusOrder = statusOrderActive;
      }
    }

    if (sortBy === 'post-status') {
     return(myPosts.sort((a, b) => statusOrder.indexOf(a.postStatus) - statusOrder.indexOf(b.postStatus)));
    } else if(sortBy === 'post-date') {
        if (sortWith === 'ascending') {
          return (myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate)));
        } else if (sortWith === 'descending'){
          return (myPosts.sort((a, b) => new Date(a.postCreatedDate) - new Date(b.postCreatedDate)));
        } else {
          // sort by date
          return (myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate)));
        }
    } else if(sortBy === 'likes'){
        if (sortWith === 'ascending') {
          return(myPosts.sort((a, b) => a.likes - b.likes));
        } else if (sortWith === 'descending') {
          return(myPosts.sort((a, b) => b.likes - a.likes))
        }

    } else {
       // sort by date
       return (myPosts.sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate)));
    }
}

//TODO: check 1. if text is > 0 length.
// check if email is valid


export const checkEmailTest = (email) => {
  if (email.length > 5) {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') > email.lastIndexOf('.') || email.length - email.lastIndexOf('.') <= 1) {
        return (false);
    }

    return(true);
  }
  return (false);
}
// export const checkEmail = (email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }
export const checkEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};


export const checkTextExist = (text) => {
  if (text.length > 0) {
    return (true);
  }
  return (false);

}

export const checkPhone = (phone) => {
  if (phone.length < 8) {
    return(false);
  }
  return (true);
}

export const checkIfSimilar = (string1, string2) => {
  if (string1 === string2) {
    return true;
  }
  return false
}

export const checkIfPasswordCorrect = (password) => {
  if (password.length >= 8) {
    let numberOfChars = 0;
    for(let i = 0; i < password.length; i++) {
        if ((password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) || (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)) {
            numberOfChars++;
        }
    }
    if (numberOfChars < 2) {
        return 'composition-error';
    }
  } else {
    return 'size-error';
}

}

// export const detectClickedLocation = (event) => {

//     const clickPosition = event.pageY - (window.pageYOffset || document.documentElement.scrollTop);
//     alert("Clicked at", clickPosition, "pixels from the top of the page");
//     setYaxis(clickPosition);
//     return clickPosition;
// }