import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// Schema: { id: string, title: string, notes?: string, completed: boolean, createdAt: number }
const STORAGE_KEY = 'todos';

// PUBLIC_INTERFACE
function App() {
  /** Main application for the Todo list with CRUD and localStorage persistence. */
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [theme, setTheme] = useState('light');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage on todos change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Ignore storage errors
    }
  }, [todos]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Derived counts
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    return { total, completed };
  }, [todos]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle between light and dark visual themes. */
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const addTodo = (title, notes) => {
    /** Add a new todo with basic validation. */
    const clean = (title || '').trim();
    if (!clean) return;
    const newTodo = {
      id: cryptoRandomId(),
      title: clean,
      notes: (notes || '').trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  // PUBLIC_INTERFACE
  const updateTodo = (id, patch) => {
    /** Update a todo by id with the provided patch object. */
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    /** Remove a todo by id with optimistic UI update and localStorage persistence. */
    setTodos(prev => {
      const next = prev.filter(t => t.id !== id);
      return next;
    });

    if (editingId === id) setEditingId(null);

    // Try to persist to localStorage and revert if it fails
    try {
      const next = (todos || []).filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // Revert UI and notify user
      setTodos(prev => {
        // If we previously removed, re-add from latest persisted or from in-memory fallback
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
          }
        } catch {
          // ignore parse errors
        }
        // Fallback: re-insert item if we can find it in current closure scope
        const removed = (todos || []).find(t => t.id === id);
        if (removed) return [removed, ...prev];
        return prev;
      });
      // Basic error message, minimal intrusive
      // eslint-disable-next-line no-alert
      alert('Failed to delete the todo due to a storage error. Please try again.');
    }
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    /** Toggle completion state of a todo by id. */
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // PUBLIC_INTERFACE
  const startEditing = (id) => {
    /** Begin editing a todo by id. */
    setEditingId(id);
  };

  // PUBLIC_INTERFACE
  const cancelEditing = () => {
    /** Cancel edit mode. */
    setEditingId(null);
  };

  const editingTodo = todos.find(t => t.id === editingId) || null;

  return (
    <div className="app-root">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        stats={stats}
      />

      <main className="main-content">
        <section className="panel form-panel" aria-label="Add or edit todo">
          <TodoForm
            key={editingTodo ? editingTodo.id : 'new'}
            initialTodo={editingTodo}
            onCancel={cancelEditing}
            onSubmit={(data) => {
              if (editingTodo) {
                updateTodo(editingTodo.id, {
                  title: data.title.trim(),
                  notes: (data.notes || '').trim(),
                });
                setEditingId(null);
              } else {
                addTodo(data.title, data.notes);
              }
            }}
          />
        </section>

        <section className="panel list-panel" aria-label="Todo list">
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={startEditing}
          />
        </section>
      </main>
    </div>
  );
}

function cryptoRandomId() {
  // Create a reasonably unique id without external deps
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default App;
