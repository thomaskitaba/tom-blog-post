#!/usr/bin/node
const date = new Date().toISOString().slice(0, 10);
const time = new Date().toISOString().slice(11, 19);
const datetime = `${date} ${time}`;
console.log(datetime);