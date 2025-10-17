import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem represents a single todo row with actions.
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className={`item ${todo.completed ? 'completed' : ''}`}>
      <input
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'completed'}`}
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="item-content">
        <p className="item-title" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </p>
        {todo.notes ? <p className="item-notes">{todo.notes}</p> : null}
      </div>
      <div className="item-actions">
        <button className="btn btn-ghost" onClick={() => onEdit(todo.id)} aria-label={`Edit ${todo.title}`}>
          Edit
        </button>
        <button className="btn btn-secondary" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.title}`}>
          Delete
        </button>
      </div>
    </div>
  );
}
