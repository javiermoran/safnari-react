import React from 'react';
import './EmptyState.scss';

interface IEmptyStateProps {
  message: string;
}

const EmptyState = (props: IEmptyStateProps) => (
  <div className="EmptyState">
    <span>{props.message}</span>
  </div>
);

export default EmptyState;
