import { useState } from 'react'
import { useInitData, useThemeParams } from '@vkruglikov/react-telegram-web-app'
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import BlogList from './BlogList.jsx';
import BlogDetail from './BlogDetail.jsx';
import News from './News.jsx'
import NewsList from './NewsList.jsx'
import MatrixBackground from './MatrixBackground.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function MaterialIcon({ name, active }) {
  return (
    <span
      className={
        'material-symbols-outlined' + (active ? ' active-icon' : '')
      }
      style={{ fontSize: 32 }}
    >
      {name}
    </span>
  )
}

// Bottom Navigation Bar
function BottomNav() {
  const location = useLocation()
  const navItems = [
    { to: '/profile', name: 'account_box', label: 'Profile' },
    { to: '/WebApp', name: 'home', label: 'Home' },
    { to: '/wallet', name: 'newsmode', label: 'Blog' },
    { to: '/more', name: 'more_vert', label: 'More' },
  ]
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={location.pathname === item.to ? 'nav-link active' : 'nav-link'}
        >
          <MaterialIcon name={item.name} active={location.pathname === item.to} />
        </Link>
      ))}
    </nav>
  )
}

function More() {
  return (
    <div className="page-content">
      <NewsList />
    </div>
  );
}

function RequireAuth({ children }) {
  // Replace with your real auth logic (e.g., Telegram initData or localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('nexcoin_logged_in'));
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [count, setCount] = useState(0)
  const initDataUnsafe = useInitData();
  const themeParams = useThemeParams();
  const location = useLocation();

  // Hide BottomNav on login and signup pages
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <MatrixBackground />
      </div>
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/WebApp"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/wallet"
            element={
              <RequireAuth>
                <BlogList />
              </RequireAuth>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <RequireAuth>
                <BlogDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/more"
            element={
              <RequireAuth>
                <More />
              </RequireAuth>
            }
          />
          <Route
            path="/news/:id"
            element={
              <RequireAuth>
                <News />
              </RequireAuth>
            }
          />
        </Routes>
        {!hideNav && <BottomNav />}
      </div>
    </>
  )
}

export default App
