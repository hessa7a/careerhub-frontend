
import { createContext, useState, useEffect } from 'react';
import { getUserFromToken, removeToken } from '../lib/helpers/jwt-helpers';
import { currentUser } from '../services/userService';

const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (getUserFromToken()) {
        try {
          const userData = await currentUser();
          setUser(userData);
        } catch (err) {
          removeToken();
          setUser(null);
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const value = { user, setUser, loading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
