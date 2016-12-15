import './sidebar-item.scss';
import React from 'react';

/**
 * SidebarItem component
 * @return {React.Component}
 */
export default function SidebarItem({
    isSpecial, choosen, device, onSidebarItemClick, ...props
}) {
  return isSpecial ? <a
    className="b-sidebar-item b-sidebar-item--special"
    {...props}/> : (
    <a
      className={'b-sidebar-item'
        + (choosen ? ' b-sidebar-item--choosen' : '')}
      onClick={onSidebarItemClick}
      {...props}>
      {device.name} <i className="b-speed">{device.speed || 0}km/h</i>
    </a>
  );
}
