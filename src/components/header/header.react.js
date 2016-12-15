import './header.scss';
import React from 'react';

/**
 * Header component
 * @return {React.Component}
 */
export default function Header({active, onBurgerClick}) {
  let className = 'b-header';
  className = active ? `${className} ${className}--active` : className;
  return (
    <header className="b-header-wrapper">
        <div className={className}>
          <div className="b-logo">
            <div className="b-logo__text">glonass</div>
          </div>
          <a className="b-burger" onClick={onBurgerClick}>
              <span className="b-burger__symbol">&#x2630;</span>
          </a>
        </div>
    </header>
  );
}
