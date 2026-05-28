import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

/**
 * AppProvider component to provide global user/session state and role.
 * Syncs state with localStorage for persistence.
 */
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [session, setSession] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ma_user');
      const storedRole = localStorage.getItem('ma_role');
      const storedSession = localStorage.getItem('ma_session');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedRole) setRole(storedRole);
      if (storedSession) setSession(JSON.parse(storedSession));
    } catch (err) {
      // If localStorage is corrupted, clear it
      localStorage.removeItem('ma_user');
      localStorage.removeItem('ma_role');
      localStorage.removeItem('ma_session');
      setUser(null);
      setRole(null);
      setSession(null);
    }
  }, []);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ma_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ma_user');
    }
  }, [user]);

  // Sync role to localStorage
  useEffect(() => {
    if (role) {
      localStorage.setItem('ma_role', role);
    } else {
      localStorage.removeItem('ma_role');
    }
  }, [role]);

  // Sync session to localStorage
  useEffect(() => {
    if (session) {
      localStorage.setItem('ma_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('ma_session');
    }
  }, [session]);

  const login = (userData, userRole, sessionData) => {
    setUser(userData);
    setRole(userRole);
    setSession(sessionData);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setSession(null);
    localStorage.removeItem('ma_user');
    localStorage.removeItem('ma_role');
    localStorage.removeItem('ma_session');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        session,
        setUser,
        setRole,
        setSession,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;