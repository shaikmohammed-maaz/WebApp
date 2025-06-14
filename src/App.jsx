import { useState } from 'react'
import { useInitData, useThemeParams, MainButton } from '@vkruglikov/react-telegram-web-app'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import ComingSoon from './ComingSoon.jsx'
import Wallet from './Wallet.jsx'
import Mining from './Mining.jsx'
import News from './News.jsx'

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
    { to: '/mining', name: 'data_exploration', label: 'Mining' },
    { to: '/wallet', name: 'wallet', label: 'Wallet' },
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
      <ComingSoon />
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const initDataUnsafe = useInitData();
  const themeParams = useThemeParams();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/WebApp" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/more" element={<More />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
