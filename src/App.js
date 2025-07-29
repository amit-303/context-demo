import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';

// Utility for unique IDs
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const LOCAL_STORAGE_KEY = 'todoApp.tasks';

function App() {
  // State
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editDescInput, setEditDescInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [error, setError] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTasks(parsed);
      }
    } catch (e) {
      // If corrupted, start fresh
      setTasks([]);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      // Ignore write errors (e.g., quota exceeded)
    }
  }, [tasks]);

  // Add new task
  function handleAddTask(e) {
    e.preventDefault();
    const text = input.trim();
    const description = descInput.trim();
    if (!text) {
      setError('Task cannot be empty.');
      return;
    }
    setError('');
    setTasks(prev => [
      ...prev,
      { id: generateId(), text, description, completed: false }
    ]);
    setInput('');
    setDescInput('');
  }

  // Toggle completion
  function handleToggle(id) {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  // Delete task
  function handleDelete(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  function handleEditTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingId(id);
      setEditInput(task.text);
      setEditDescInput(task.description || '');
      setError('');
    }
  }
  function handleEditSave(e) {
    e.preventDefault();
    const text = editInput.trim();
    const description = editDescInput.trim();
    if (!text) {
      setError('Task cannot be empty.');
      return;
    }
    setTasks(prev => prev.map(task =>
      task.id === editingId ? { ...task, text, description } : task
    ));
    setEditingId(null);
    setEditInput('');
    setEditDescInput('');
    setError('');
  }
  function handleEditCancel() {
    setEditingId(null);
    setEditInput('');
    setEditDescInput('');
    setError('');
  }

  // Filtering
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="App">
      <header className="App-header">
      <h1 className="App-title">-----------------------------------</h1>
      <h2 className="App-title" style={{ color: 'purple' }}>Amit Vibing- Context Mgmt demo</h2>
      <h1 className="App-title">-----------------------------------</h1>
      <h1 className="App-title"style={{ color: 'blue' }}>To-Do List</h1>
        <div className="App-count">{activeCount} task{activeCount !== 1 ? 's' : ''} left</div>
      </header>

      {/* New Task Form */}
      {!editingId ? (
        <form onSubmit={handleAddTask} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Task title..."
            aria-label="Task title"
            className="todo-input"
          />
          <input
            type="text"
            value={descInput}
            onChange={e => setDescInput(e.target.value)}
            placeholder="Description (optional)"
            aria-label="Task description"
            className="todo-input"
          />
          <button type="submit" className="todo-add-btn">
            Add
          </button>
        </form>
      ) : (
        <form onSubmit={handleEditSave} className="todo-form">
          <input
            type="text"
            value={editInput}
            onChange={e => setEditInput(e.target.value)}
            placeholder="Edit task title..."
            aria-label="Edit task title"
            className="todo-input"
            autoFocus
          />
          <input
            type="text"
            value={editDescInput}
            onChange={e => setEditDescInput(e.target.value)}
            placeholder="Edit description (optional)"
            aria-label="Edit task description"
            className="todo-input"
          />
          <button type="submit" className="todo-add-btn">
            Save
          </button>
          <button type="button" className="todo-add-btn" onClick={handleEditCancel}>
            Cancel
          </button>
        </form>
      )}
      {error && <div className="error-message">{error}</div>}

      {/* Filter Buttons */}
      <div className="filter-group">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`filter-btn${filter === 'all' ? ' selected' : ''}`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('active')}
          className={`filter-btn${filter === 'active' ? ' selected' : ''}`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={`filter-btn${filter === 'completed' ? ' selected' : ''}`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <TodoList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEditTask}
        editingId={editingId}
        editInput={editInput}
        editDescInput={editDescInput}
        setEditInput={setEditInput}
        setEditDescInput={setEditDescInput}
        onEditSave={handleEditSave}
        onEditCancel={handleEditCancel}
      />

      {/* Empty state */}
      {filteredTasks.length === 0 && (
        <div className="empty-state">No tasks to show.</div>
      )}
    </div>
  );
}

export default App;
