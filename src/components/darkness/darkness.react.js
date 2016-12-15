import './darkness.scss';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Darkness component
 * @return {React.Component}
 */
export default function Darkness({active, onBurgerClick}) {
  return (
    <ReactCSSTransitionGroup
      transitionName="darkness"
      transitionAppear={true}
      transitionLeave={true}
      transitionEnterTimeout={600}
      transitionAppearTimeout={600}
      transitionLeaveTimeout={300}>
      { active ? (
          <div
            onClick={onBurgerClick}
            className='b-darkness'>
            <div className="b-darkness__night"/>
          </div>
        ) :
          null
      }
    </ReactCSSTransitionGroup>
  );
}
