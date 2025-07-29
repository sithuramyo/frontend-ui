import React from 'react'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const AuthLayout: React.FC = () => {
    return (
        <div>
            <Toaster />
            <Outlet />
        </div>
    )
}

export default AuthLayout;
