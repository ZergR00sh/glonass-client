import './sidebar.scss';
import React from 'react';

/**
 * Sidebar component
 * @return {React.Component}
 */
export default function Sidebar({children, active, onSearch}) {
  const className = 'b-sidebar';
  return (
    <div className={active ? `${className} ${className}--active` : className}>
      <header className="b-sidebar__header">
        <div className="b-search">
          <input
            type="text"
            className="b-search__input"
            placeholder="Search..."
            onChange={({target}) => onSearch(target.value.trim())}
          />
        </div>
      </header>
      <div className="b-sidebar__content">
        <div className="b-sidebar__container">{children}</div>
      </div>
    </div>
  );
}
