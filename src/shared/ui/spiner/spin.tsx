import type { FC } from 'react';
import classes from './spin.module.scss';

export const Spin: FC = () => {
  return <span className={classes.loader}></span>;
};
