import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, AuthState } from '@/types';
import { generateId, sendVerificationEmail, verifyEmailToken, storage } from '@/lib/utils';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (email: string, token: string) => Promise<boolean>;
  getCurrentUser: () => User | null;
  updateUserRole: (userId: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Загружаем данные пользователей
    storage.loadData();
    
    // Проверяем авторизацию при загрузке
    const checkAuth = () => {
      try {
        const userJson = localStorage.getItem('current_user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setState({ user, isAuthenticated: true, isLoading: false });
        } else {
          setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        localStorage.removeItem('current_user');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = storage.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user && user.isEmailVerified) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('current_user', JSON.stringify(userWithoutPassword));
        setState({ user: userWithoutPassword, isAuthenticated: true, isLoading: false });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Проверяем, существует ли уже пользователь с таким email
      if (storage.users.some(u => u.email === email)) {
        return false;
      }
      
      const isFirstUser = storage.users.length === 0;
      
      // Генерируем верификационный токен
      const verificationToken = generateId();
      
      const newUser = {
        id: generateId(),
        username,
        email,
        password, // В реальном приложении пароль должен быть хеширован
        role: isFirstUser ? UserRole.ADMIN : UserRole.READER,
        createdAt: new Date().toISOString(),
        isEmailVerified: false
      };
      
      // Добавляем пользователя в хранилище
      storage.users.push(newUser);
      storage.saveData();
      
      // Отправляем письмо для верификации
      sendVerificationEmail(email, verificationToken);
      
      return true;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('current_user');
      setState({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };

  const verifyEmail = async (email: string, token: string): Promise<boolean> => {
    try {
      if (verifyEmailToken(email, token)) {
        // Находим пользователя и обновляем статус верификации
        const userIndex = storage.users.findIndex(u => u.email === email);
        if (userIndex !== -1) {
          storage.users[userIndex].isEmailVerified = true;
          storage.saveData();
          
          // Если пользователь уже вошел, обновляем его статус
          if (state.user?.email === email) {
            const updatedUser = { ...state.user, isEmailVerified: true };
            localStorage.setItem('current_user', JSON.stringify(updatedUser));
            setState({ ...state, user: updatedUser });
          }
          
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Ошибка при верификации email:', error);
      return false;
    }
  };

  const getCurrentUser = (): User | null => {
    return state.user;
  };

  const updateUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
    try {
      // Только администраторы могут менять роли пользователей
      if (state.user?.role !== UserRole.ADMIN) {
        return false;
      }

      const userIndex = storage.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        storage.users[userIndex].role = role;
        storage.saveData();
        
        // Если это текущий пользователь, обновляем его данные
        if (state.user?.id === userId) {
          const updatedUser = { ...state.user, role };
          localStorage.setItem('current_user', JSON.stringify(updatedUser));
          setState({ ...state, user: updatedUser });
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Ошибка при обновлении роли пользователя:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        verifyEmail,
        getCurrentUser,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};