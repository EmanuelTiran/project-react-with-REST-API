import React, { useEffect, useState } from 'react';



import './css/todos.css';


export default function Todos() {
  let userID = localStorage.getItem('id');

  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updateTodoId, setUpdateTodoId] = useState('');
  const [updateTodoContent, setUpdateTodoContent] = useState('');
  const [isUpdateInputVisible, setIsUpdateInputVisible] = useState(false);
  const [sort, setSort] = useState('');
  const [searchText, setSearchText] = useState('');

  const isEnglish = (text) => /^[A-Za-z0-9\s]*$/.test(text);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch(`http://localhost:3500/users/${userID}/todos`);
        const getData = await res.json();
        setData(getData);
      } catch (error) {
        alert('Network error:', error);
      }
    };
    getTodos();
  }, [userID]);

  const handleAddTodo = async () => {
    try {
      if (!newTodo.trim()) {
        console.error('Title cannot be empty.');
        return;
      }
  
      const response = await fetch(`http://localhost:3500/users/${userID}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userID,
          title: newTodo,
          completed: false,
        }),
      });
  
      const addTodo = await response.json();
      setData([...data, addTodo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  

  const handleDeleteTodo = async (idToDelete) => {
    try {
      await fetch(`http://localhost:3500/todos/${idToDelete}`, {
        method: 'DELETE',
      });

      const updateTodos = data.filter((item) => item.id !== idToDelete);
      setData(updateTodos);
      setIsUpdateInputVisible(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handleUpdateTodo = async () => {
    try {
      if (!updateTodoContent.trim()) {
        console.error('Updated content cannot be empty.');
        return;
      }
  
      await fetch(`http://localhost:3500/todos/${updateTodoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updateTodoContent }),
      });
  
      const updatedTodos = data.map((item) =>
        item.id === updateTodoId ? { ...item, title: updateTodoContent } : item
      );
      setData(updatedTodos);
      setUpdateTodoId('');
      setUpdateTodoContent('');
      setIsUpdateInputVisible(false);
    } catch (error) {
      console.error('Error updating todo content:', error);
    }
  };
  
  
  const handleUpdateTodoStatus = async (todoId, newStatus) => {
    try {
      await fetch(`http://localhost:3500/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newStatus }),
      });

      const updatedTodos = data.map((todo) =>
        todo.id === todoId ? { ...todo, completed: newStatus } : todo
      );

      setData(updatedTodos);
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;

    if (isEnglish(searchText)) {
      setSearchText(searchText);
    }
  };

  const handleChange = (event) => {
    const sorted = event.target.value;

    switch (sorted) {
      case 'abc':
        setData((prevData) =>
          prevData.slice().sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
        );
        break;
      case 'random':
        setData((prevData) => prevData.slice().sort(() => (Math.random() > 0.5 ? 1 : -1)));
        break;
      case 'Uncompleted first':
        setData((prevData) => prevData.slice().sort((a, b) => (a.completed ? 1 : -1)));
        break;
      case 'Completed first':
        setData((prevData) => prevData.slice().sort((a, b) => (a.completed ? -1 : 1)));
        break;
      default:
        setData((prevData) =>
          prevData.slice().sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        );
        break;
    }
    setSort(sorted);
  };

  const filteredTodos = searchText
    ? data.filter((todo) => todo.title.toLowerCase().includes(searchText.toLowerCase()))
    : data;


    
  return (
    <div className="body">
      <div>
        <h1>Todos</h1>
      </div>
      <div className='td'>
        <div></div>
        <label>
          
          <br />
          <select value={sort} label='sort'onChange={handleChange}>
          <option value="" disabled>↕️ sort</option>
            <option value={'123'}>123</option>
            <option value={'abc'}>abc</option>
            <option value={'random'}>random</option>
            <option value={'Uncompleted first'}>Uncompleted first</option>
            <option value={'Completed first'}>Completed first</option>
          </select>
        </label>

        <input
          className="searchInput"
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="🔎Search Todo"
          style={{ marginRight: '10px' }}
        />

      
        <input
          className="inputaddTodo"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="🆕New Todo"
        />
        <button className="addTodo" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredTodos.map((item, idx) => (
  <React.Fragment key={idx}>
    <tr>
      <td>🆔{item.id}</td>
      <td>📃{item.title}</td>
      <td>
  {item.completed ? (
    <span role="img" aria-label="Completed">✅</span>
  ) : (
    <span role="img" aria-label="Not Completed">❌</span>
  )}
  <input
    type="checkbox"
    checked={item.completed}
    onChange={() => handleUpdateTodoStatus(item.id, !item.completed)}
    name=""
    id=""
  />
</td>

      <td>

  
    
        <button onClick={() => handleDeleteTodo(item.id)}>Delete🗑️</button>
        <button
          onClick={() => {
            setUpdateTodoId(item.id);
            setUpdateTodoContent(item.title);
            setIsUpdateInputVisible(true);
          }}
        >
          Edit ✏️
        </button>
      </td>
    </tr>
    {isUpdateInputVisible && updateTodoId === item.id && (
      <tr>
        <td colSpan="2">
          <input
            type="text" 
            value={updateTodoContent}
            onChange={(e) => setUpdateTodoContent(e.target.value)}
          />
        </td>
        <td>
          <button onClick={handleUpdateTodo}>Update Content</button>
        </td>
      </tr>
    )}
  </React.Fragment>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
