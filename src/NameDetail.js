import React, { useEffect, useState } from "react";

function NameDetail({ userId }) {
  const [toDos, setToDos] = useState(null);

  useEffect(() => {
    async function loadToDos() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      const toDoFromAPI = await response.json();
      setToDos(toDoFromAPI);
    }
    loadToDos();
  }, [userId]);

  if (toDos) {
    return (
      <div>
        <ol>
          {toDos.map((toDo, index) => (
            <li key={index}>{toDo.title}</li>
          ))}
        </ol>
      </div>
    );
  } else {
    return null;
  }
}

export default NameDetail;
