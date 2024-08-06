import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    element: ReactNode
}

export const ProtectedLoginRoute = ({ element }: Props) => {
    const token = sessionStorage.getItem('token2')?.length === 36;
    return token ? <Navigate to="/" /> : element;
};
