import React from 'react';

interface IEmptyStateProps {
  message: string;
}

const EmptyState = (props: IEmptyStateProps) => (
  <div className="EmptyState">
    <span>{props.message}</span>
  </div>
);

export default EmptyState;
