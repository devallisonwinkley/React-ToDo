// import React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [toDos, setToDos] = useState([]);
//   const [toDo, setToDo] = useState("");
//   const [toDoEditing, setToDoEditing] = useState(null);
//   const [editText, setEditText] = useState("");

//   useEffect(() => {
//     const data = localStorage.getItem("toDos");
//     const loadedToDos = JSON.parse(data);

//     if (loadedToDos) {
//       setToDos(loadedToDos);
//     }
//   }, []);

//   useEffect(() => {
//     const data = JSON.stringify(toDos);
//     localStorage.setItem("toDos", data);
//   }, [toDos]);

//   function handleSubmit(e) {
//     e.preventDefault();

//     const newToDo = {
//       id: new Date().getTime(),
//       text: toDo,
//       completed: false,
//     };

//     setToDos([...toDos].concat(newToDo));
//     setToDo("");
//   }

//   function deleteToDo(id) {
//     const updatedToDos = [...toDos].filter((toDo) => toDo.id !== id);

//     setToDos(updatedToDos);
//   }

//   function checkTriggered(id) {
//     const updatedToDos = [...toDos].map((toDo) => {
//       if (toDo.id === id) {
//         toDo.completed = !toDo.completed;
//       }

//       return toDo;
//     });

//     setToDos(updatedToDos);
//   }

//   function editToDo(id) {
//     const updatedToDos = [...toDos].map((toDo) => {
//       if (toDo.id === id) {
//         toDo.text = editText;
//       }
//       return toDo;
//     });

//     setToDos(updatedToDos);
//     setToDoEditing(null);
//     setEditText("");
//   }

//   return (
//     <>
//       <div className="App">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             onChange={(e) => setToDo(e.target.value)}
//             value={toDo}
//           />
//           <button type="submit"> Add </button>
//         </form>
//         {toDos.map((toDo) => (
//           <div key={toDo.id}>
//             {toDoEditing === toDo.id ? (
//               <input
//                 type="text"
//                 onChange={(e) => setEditText(e.target.value)}
//                 value={editText}
//               />
//             ) : (
//               <div> {toDo.text} </div>
//             )}

//             <button onClick={() => deleteToDo(toDo.id)}> Delete </button>

//             {toDoEditing === toDo.id ? (
//               <button onClick={() => editToDo(toDo.id)}>Submit Edit</button>
//             ) : (
//               <button onClick={() => setToDoEditing(toDo.id)}>Edit</button>
//             )}

//             <input
//               type="checkbox"
//               onChange={() => checkTriggered(toDo.id)}
//               checked={toDo.completed}
//             />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [stats, setStats] = useState("");

  // useEffect(() => {
  //   const json = localStorage.getItem("todos");
  //   const loadedTodos = JSON.parse(json);
  //   if (loadedTodos) {
  //     setTodos(loadedTodos);
  //   }
  // }, []);

  // useEffect(() => {
  //   const json = JSON.stringify(todos);
  //   localStorage.setItem("todos", json);
  // }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      status: stats,
      // completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function selectedStatus(e) {
    setStats(e.target.value);
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // function toggleComplete(id) {
  //   let updatedTodos = [...todos].map((todo) => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>TO-DO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          required
        />
        <select onChange={selectedStatus} id="status">
          <option value="Not Started" id="option-status">
            Not Started
          </option>
          <option value="Ongoing" id="option-status">
            Ongoing
          </option>
          <option value="Complete" id="option-status">
            Complete
          </option>
        </select>
        <button type="submit">ADD</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {/* <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            /> */}
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                required
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>SAVE CHANGES</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>UPDATE</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
