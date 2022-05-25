import React, { useEffect, useState } from "react";

function PostDetail({ postId }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function loadComments() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const commentsFromAPI = await response.json();
      setComments(commentsFromAPI);
      console.log("API", commentsFromAPI);
    }
    loadComments();
  }, [postId]);

  console.log(comments);

  if (comments) {
    return (
      <div>
        <div>
          <ol>
            {comments.map((comment, index) => (
              <li key={index}>{comment.body}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default PostDetail;
