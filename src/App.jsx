import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, setDarkMode } from './store/slices/themeSlice';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageSkeleton from './components/common/PageSkeleton';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Users = lazy(() => import('./pages/Users'));
const Posts = lazy(() => import('./pages/Posts'));
const Albums = lazy(() => import('./pages/Albums'));
const Contact = lazy(() => import('./pages/Contact'));
const Todos = lazy(() => import('./pages/Todos'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch(setDarkMode(JSON.parse(savedDarkMode)));
    }
  }, [dispatch]);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    dispatch(toggleDarkMode());
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <Router>
      <div className={`flex flex-col min-h-screen bg-white dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
        <ErrorBoundary>
          <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
          <main className="flex-grow">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts/*" element={<Posts />} />
                <Route path="/albums/*" element={<Albums />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;

