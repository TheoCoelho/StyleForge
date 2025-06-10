import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DesignCreator from './pages/DesignCreator';
import DesignEditor from './pages/DesignEditor';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/design/create"
              element={
                <PrivateRoute>
                  <DesignCreator />
                </PrivateRoute>
              }
            />
            <Route
              path="/design/edit/:id"
              element={
                <PrivateRoute>
                  <DesignEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/design/edit/new"
              element={
                <PrivateRoute>
                  <DesignEditor />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 