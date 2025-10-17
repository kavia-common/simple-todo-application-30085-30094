import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component with Ocean Professional gradient and theme toggle.
 */
export default function Header({ theme, onToggleTheme, stats }) {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="Brand">
          <div className="brand-badge" aria-hidden="true" />
          <div>
            <h1 className="title">Simple Todo</h1>
            <p className="subtitle">Ocean Professional • {stats.completed}/{stats.total} completed</p>
          </div>
        </div>
        <div className="header-spacer" />
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
