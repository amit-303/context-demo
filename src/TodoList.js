import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggle, onDelete, onEdit, editingId, editInput, editDescInput, setEditInput, setEditDescInput, onEditSave, onEditCancel }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: 8 }}>
          <TodoItem
            id={task.id}
            text={task.text}
            description={task.description}
            completed={task.completed}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task.id)}
            isEditing={editingId === task.id}
            editInput={editInput}
            editDescInput={editDescInput}
            setEditInput={setEditInput}
            setEditDescInput={setEditDescInput}
            onEditSave={onEditSave}
            onEditCancel={onEditCancel}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
