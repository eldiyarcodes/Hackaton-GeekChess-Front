import {type FC } from 'react';
import classNames from 'classnames';
import {type ReactNode } from 'react';
import styles from './MultiContainer.module.scss';

export type TMultiContainerProps = {
    children: ReactNode;
    className?: string;
}

export const MultiContainer: FC<TMultiContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};