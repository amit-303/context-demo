import React from 'react';

function TodoItem({ id, text, description, completed, onToggle, onDelete, onEdit, isEditing, editInput, editDescInput, setEditInput, setEditDescInput, onEditSave, onEditCancel }) {
  if (isEditing) {
    return (
      <form onSubmit={onEditSave} role="form" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 4, padding: '8px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', border: '1px solid #eee', transition: 'background 0.2s', marginBottom: 8 }}>
        <input
          type="text"
          value={editInput}
          onChange={e => setEditInput(e.target.value)}
          placeholder="Edit task title..."
          aria-label="Edit task title"
          className="todo-input"
          style={{ flex: 1, marginRight: 8 }}
          autoFocus
        />
        <input
          type="text"
          value={editDescInput}
          onChange={e => setEditDescInput(e.target.value)}
          placeholder="Edit description (optional)"
          aria-label="Edit task description"
          className="todo-input"
          style={{ flex: 2, marginRight: 8 }}
        />
        <button type="submit" className="todo-add-btn" style={{ marginRight: 4 }}>
          Save
        </button>
        <button type="button" className="todo-add-btn" onClick={onEditCancel}>
          Cancel
        </button>
      </form>
    );
  }
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 4,
      padding: '8px 12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      border: '1px solid #eee',
      transition: 'background 0.2s',
      cursor: 'pointer',
      opacity: completed ? 0.6 : 1
    }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        style={{ marginRight: 12 }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: completed ? 'line-through' : 'none',
          color: completed ? '#888' : '#222',
          fontWeight: 500
        }}
      >
        {text}
        {description && (
          <span style={{ display: 'block', fontWeight: 400, fontSize: '0.97em', color: '#666', marginTop: 2 }}>{description}</span>
        )}
      </span>
      <button
        onClick={onEdit}
        aria-label="Edit task"
        style={{
          background: 'none',
          border: 'none',
          color: '#3498db',
          fontSize: 18,
          marginLeft: 8,
          cursor: 'pointer',
          borderRadius: 4,
          padding: 4,
          transition: 'background 0.2s'
        }}
        title="Edit"
      >
        &#9998;
      </button>
      <button
        onClick={onDelete}
        aria-label="Delete task"
        style={{
          background: 'none',
          border: 'none',
          color: '#e74c3c',
          fontSize: 18,
          marginLeft: 8,
          cursor: 'pointer',
          borderRadius: 4,
          padding: 4,
          transition: 'background 0.2s'
        }}
        title="Delete"
      >
        &#x2715;
      </button>
    </div>
  );
}

export default TodoItem;
