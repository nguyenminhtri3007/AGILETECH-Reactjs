import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import ApplicationComponent from './screens/application.component';
import HomePage from './screens/homepage.component';
import Profile from './screens/profile.component';
import { logout } from './data/services/auth.service';

const RootApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<'home' | 'login' | 'profile'>('home');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('home');
  };
   const handleLogout = async () => {
  try {
    await logout();
  } catch (e) {
    console.error('Logout error:', e);
  }
  setIsLoggedIn(false);
  setPage('home');
};
  const handleProfile = () => {
    setPage('profile');
  };

  if (page === 'login') {
    return <ApplicationComponent onLoginSuccess={handleLoginSuccess} />;
  }
  if (page === 'profile') {
    return <Profile onLogout={handleLogout} />;
  }
  return <HomePage isLoggedIn={isLoggedIn} onSignIn={() => setPage('login')} onLogout={handleLogout} onProfile={handleProfile} />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RootApp />
);

reportWebVitals();
