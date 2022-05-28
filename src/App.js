import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import NameDetail from "./NameDetail";

function App() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const usersFromAPI = await response.json();
      setUsers(usersFromAPI);
    }
    loadUsers();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    setPostId(e.target.id);
  };

  function userHandler(e) {
    e.preventDefault();
    setUserId(e.target.id);
  }

  const postMap = posts.map((post, index) => (
    <div>
      <ul>
        <h2>{post.title}</h2>
        <li key={index} onClick={clickHandler} id={post.id}>
          {post.body}
        </li>
      </ul>
    </div>
  ));

  const userMap = users.map((user, index) => (
    <div key={index}>
      <h2 id={user.id} onClick={userHandler} userId={userId} key={index}>
        {user.name} - {user.id}
      </h2>
      <p id={user.id} onClick={userHandler} userId={userId} key={index}>
        {user.email}
      </p>
    </div>
  ));

  return (
    <div className="App">
      <div>{postMap}</div>
      <div>{userMap}</div>
      {postId.length > 0 ? <PostDetail postId={postId} /> : null}
      {userId.length > 0 ? <NameDetail userId={userId} /> : null}
    </div>
  );
}

export default App;
