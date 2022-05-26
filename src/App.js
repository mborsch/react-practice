import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

function App() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=1`
      );
      const postsAPI = await response.json();
      setPosts(postsAPI);
    }
    loadPosts();
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

  function idHandler(e) {
    e.preventDefault();
    setPostId(e.target.id);
  }

  const userMap = users.map((user, index) => (
    <div key={index}>
      <h2>
        {user.name} - {user.id}
      </h2>
      <p>{user.email}</p>
    </div>
  ));

  const postMap = posts.map((post, index) => (
    <div key={index} postId={post.id}>
      <h2>{post.title}</h2>
      <ul>
        <li id={post.id} onClick={idHandler} postId={postId} key={index}>
          {post.body}
        </li>
      </ul>
    </div>
  ));

  return (
    <div className="App">
      <div>{postMap}</div>
      <div>{userMap}</div>
      {postId.length > 0 ? <PostDetail postId={postId} /> : null}
    </div>
  );
}

export default App;
