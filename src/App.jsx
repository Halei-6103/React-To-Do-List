import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };
  const editTodo = (index) => {
    setEditingIndex(index);
    setEditedText(todos[index]);
  };

  const saveTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = editedText;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditedText('');
  };


  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTodo}>Add</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li 
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: 'f9f9f9',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            {editingIndex === index ? (
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                style={{ flexGrow: 1, marginRight: '10px', minWidth: 0 }}
              />
            ) : (
              <span style={{display: 'flex', alignItems: 'center', flexGrow: 1, marginRight: '10px', wordBreak: 'break-word'}}>
                <span
                  style={{
                    height: '8px',
                    width: '8px',
                    backgroundColor: 'black',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '10px'
                  }}
              ></span>
              {todo}
              </span>
            )}
            
            {/*This is for when you edit the chore, both the save the edit with the greencheck, and the edit button (FaEdit)*/}
            <div style={{ display: 'flex', gap: '10px'}}>
              {editingIndex === index ? (
                <button
                  onClick={saveTodo}
                  style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                  title="Save"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => editTodo(index)}
                  style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                  title="Edit"
                >
                  <FaEdit color="#007bff" />
                </button>
              )}
            
            
            {/*This is for when you delete the chore*/}
              <button
                onClick={() => removeTodo(index)}
                style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                title="Delete"
              >
                <FaTrash color="grey" />
              </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

