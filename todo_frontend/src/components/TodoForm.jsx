import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoForm handles creating and editing todos.
 */
export default function TodoForm({ initialTodo = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [notes, setNotes] = useState(initialTodo?.notes || '');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    if (initialTodo) {
      // Move cursor to end when editing
      const el = titleRef.current;
      if (el) {
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    }
  }, [initialTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = (title || '').trim();
    if (!cleanTitle) {
      setError('Please enter a title.');
      return;
    }
    setError('');
    onSubmit({ title: cleanTitle, notes });
    setTitle('');
    setNotes('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (initialTodo && onCancel) onCancel();
    }
    // Enter submits only if focus is inside title or notes (textarea handles new lines)
    if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} aria-label={initialTodo ? 'Edit todo form' : 'Add todo form'}>
      <div className="form-header">
        <h2>{initialTodo ? 'Edit Todo' : 'Add a New Todo'}</h2>
        <p>{initialTodo ? 'Update the fields and press Enter to save, or Esc to cancel.' : 'Enter a title and optional notes.'}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          ref={titleRef}
          className="input"
          type="text"
          placeholder="Title e.g. Buy groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? 'title-error' : undefined}
        />
        <textarea
          className="input textarea"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && (
        <div id="title-error" style={{ color: 'var(--error)', fontSize: 12, marginTop: 6 }}>
          {error}
        </div>
      )}

      <div className="actions">
        <button type="submit" className="btn btn-primary">
          {initialTodo ? 'Save Changes' : 'Add Todo'}
        </button>
        {initialTodo && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
