import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList shows a collection of todo items or an empty state.
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="empty" role="status" aria-live="polite">
        No todos yet. Add your first one to get started!
      </div>
    );
  }

  return (
    <div className="list" role="list">
      {todos.map(t => (
        <div key={t.id} role="listitem">
          <TodoItem todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}
