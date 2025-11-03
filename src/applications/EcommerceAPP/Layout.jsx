import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const isAuthed = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login', { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Product App</h1>
        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              <button
                onClick={() => navigate('/products')}
                className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Products
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
}
