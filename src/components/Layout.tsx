import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon, LogOutIcon, BookOpenIcon, ShieldIcon, HomeIcon, FileTextIcon, InfoIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Верхняя панель с логотипом и авторизацией */}
      <header className="sce-header text-white p-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="sce-logo text-2xl">
            SCE Foundation
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {user?.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">Профиль</Link>
                  </DropdownMenuItem>
                  {user?.role === 'ADMIN' && (
                    <DropdownMenuItem>
                      <Link to="/admin" className="flex w-full">Панель администратора</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Выход
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost" className="text-white">
                  <Link to="/login">Вход</Link>
                </Button>
                <Button asChild variant="default" className="bg-sce-primary hover:bg-sce-primary/90">
                  <Link to="/register">Регистрация</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Навигационное меню */}
      <nav className="sce-navbar text-white p-2">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className={`flex items-center ${location.pathname === '/' ? 'text-sce-accent font-bold' : ''}`}
              >
                <HomeIcon className="mr-1 h-4 w-4" />
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/objects" 
                className={`flex items-center ${location.pathname.startsWith('/objects') ? 'text-sce-accent font-bold' : ''}`}
              >
                <ShieldIcon className="mr-1 h-4 w-4" />
                Объекты SCE
              </Link>
            </li>
            <li>
              <Link 
                to="/posts" 
                className={`flex items-center ${location.pathname.startsWith('/posts') ? 'text-sce-accent font-bold' : ''}`}
              >
                <FileTextIcon className="mr-1 h-4 w-4" />
                Материалы
              </Link>
            </li>
            <li>
              <Link 
                to="/library" 
                className={`flex items-center ${location.pathname.startsWith('/library') ? 'text-sce-accent font-bold' : ''}`}
              >
                <BookOpenIcon className="mr-1 h-4 w-4" />
                Библиотека
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`flex items-center ${location.pathname.startsWith('/about') ? 'text-sce-accent font-bold' : ''}`}
              >
                <InfoIcon className="mr-1 h-4 w-4" />
                О нас
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Основное содержимое */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Футер */}
      <footer className="sce-footer text-white p-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <span className="sce-logo text-xl">SCE Foundation</span>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/about">О нас</Link>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Условия использования</Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SCE Foundation. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
