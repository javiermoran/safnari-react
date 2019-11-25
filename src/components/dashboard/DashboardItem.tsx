import React from 'react';
import { Typography } from '@material-ui/core';
import Loading from '../common/loading/Loading';
import './Dashboard.scss';

interface IDashboardItemProps {
  number: number;
  title: string;
}

export default (props: IDashboardItemProps) => {
  const showNumber = () => {
    if (props.number === undefined || null) {
      return <Loading />;
    }
    return props.number;
  }
  return (
    <div className="DashboardItem">
      <Typography variant="h2">
        {showNumber()}
      </Typography>
      <Typography variant="h6">{props.title}</Typography>
    </div>
  )
};
