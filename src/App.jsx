import { useState } from 'react'
import { useInitData, useThemeParams } from '@vkruglikov/react-telegram-web-app'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import BlogList from './BlogList.jsx';
import BlogDetail from './BlogDetail.jsx';
import News from './News.jsx'
import NewsList from './NewsList.jsx'
import MatrixBackground from './MatrixBackground.jsx';

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

function App() {
  const [count, setCount] = useState(0)
  const initDataUnsafe = useInitData();
  const themeParams = useThemeParams();

  return (
    <Router>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <MatrixBackground />
      </div>
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/WebApp" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/more" element={<More />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
