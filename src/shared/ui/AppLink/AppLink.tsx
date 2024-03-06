import { Link, LinkProps } from 'react-router-dom';

interface AppLinkProps extends LinkProps {}

export const AppLink = ({ children, to, ...otherProps }: AppLinkProps) => (
    <Link to={to} {...otherProps}>
        {children}
    </Link>
);
