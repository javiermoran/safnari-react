import React from 'react';
import './Dashboard.scss';
import { Typography } from '@material-ui/core';

interface IDashboardItemProps {
  number: number;
  title: string;
}

export default (props: IDashboardItemProps) => (
  <div className="DashboardItem">
    <Typography variant="h2">{props.number}</Typography>
    <Typography variant="h6">{props.title}</Typography>
  </div>
);
