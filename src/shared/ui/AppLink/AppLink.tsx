import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';
import styles from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {}

export const AppLink = ({ children, to, className, ...otherProps }: AppLinkProps) => (
    <Link to={to} className={clsx(styles['app-link'], className)} {...otherProps}>
        {children}
    </Link>
);
