import './workspace.scss';
import React from 'react';

/**
 * Workspace component
 * @return {React.Component}
 */
export default function Workspace({children, ...props}) {
  return <div className="b-workspace" {...props}>{children}</div>;
}
