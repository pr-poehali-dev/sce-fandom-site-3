import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSCE } from '@/contexts/SCEContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/types';
import { ShieldIcon, FileTextIcon, UsersIcon } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { objects, posts } = useSCE();

  // Если пользователь не авторизован или не админ, перенаправляем на главную
  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-sce-primary pb-2">
          Панель администратора
        </h1>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="objects">Объекты</TabsTrigger>
            <TabsTrigger value="posts">Материалы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="mr-2 h-5 w-5 text-sce-primary" />
                    Объекты SCE
                  </CardTitle>
                  <CardDescription>
                    Управление объектами Фонда
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Всего объектов: <strong>{objects.length}</strong></p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/objects">Управление объектами</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileTextIcon className="mr-2 h-5 w-5 text-sce-primary" />
                    Материалы
                  </CardTitle>
                  <CardDescription>
                    Управление материалами Фонда
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Всего материалов: <strong>{posts.length}</strong></p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/posts">Управление материалами</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UsersIcon className="mr-2 h-5 w-5 text-sce-primary" />
                    Пользователи
                  </CardTitle>
                  <CardDescription>
                    Управление пользователями
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/users">Управление пользователями</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="objects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление объектами SCE</CardTitle>
                <CardDescription>
                  Создавайте, редактируйте и удаляйте объекты SCE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full md:w-auto bg-sce-primary hover:bg-sce-primary/90">
                  <Link to="/admin/objects/create">Создать новый объект SCE</Link>
                </Button>
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <Link to="/objects">Просмотреть все объекты</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление материалами</CardTitle>
                <CardDescription>
                  Создавайте, редактируйте и удаляйте материалы Фонда
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full md:w-auto bg-sce-primary hover:bg-sce-primary/90">
                  <Link to="/admin/posts/create">Создать новый материал</Link>
                </Button>
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <Link to="/posts">Просмотреть все материалы</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
