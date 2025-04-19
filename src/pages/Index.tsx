import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSCE } from '@/contexts/SCEContext';
import { formatDate } from '@/lib/utils';

const Index = () => {
  const { objects, posts } = useSCE();

  // Получаем последние 3 объекта и поста
  const latestObjects = [...objects].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  const latestPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  return (
    <Layout>
      {/* Баннер с предупреждением */}
      <div className="bg-sce-primary text-white p-6 text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            SCE FOUNDATION
          </h1>
          <p className="text-xl">
            Secure. Control. Explore.
          </p>
        </div>
      </div>

      {/* Главная секция с предупреждением */}
      <div className="container mx-auto p-6">
        <div className="sce-warning-box mb-8">
          <p className="text-lg">
            Вы вошли на официальный сайт Фонда SCE. Фонд занимается задержанием, исследованием и контролем аномальных объектов, 
            представляющих угрозу для человечества. Доступ к содержимому этого сайта ограничен и предоставляется только 
            авторизованному персоналу. Несанкционированный доступ или распространение информации будет наказано в соответствии 
            с протоколом безопасности SCE-001.
          </p>
        </div>

        {/* Секция с последними объектами */}
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">
          Последние объекты SCE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {latestObjects.length > 0 ? (
            latestObjects.map((object) => (
              <Card key={object.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="sce-object-number mr-2">SCE-{object.number}</span>
                    {object.name}
                  </CardTitle>
                  <CardDescription>
                    Класс: <span className="font-semibold">{object.class}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{object.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link to={`/objects/${object.id}`}>Читать подробнее</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center p-6 border border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">Объекты SCE пока не добавлены</p>
            </div>
          )}
        </div>

        <div className="text-center mb-10">
          <Button asChild>
            <Link to="/objects">Просмотреть все объекты</Link>
          </Button>
        </div>

        {/* Секция с последними постами */}
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">
          Последние материалы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </span>
                  <Button asChild variant="outline">
                    <Link to={`/posts/${post.id}`}>Читать</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center p-6 border border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">Материалы пока не добавлены</p>
            </div>
          )}
        </div>

        <div className="text-center mb-10">
          <Button asChild>
            <Link to="/posts">Просмотреть все материалы</Link>
          </Button>
        </div>

        {/* О Фонде SCE */}
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">
          О Фонде SCE
        </h2>
        <div className="prose prose-lg max-w-none mb-10 sce-document">
          <p>
            <strong>Фонд SCE</strong> (Secure, Control, Explore) — международная организация, 
            занимающаяся поиском, содержанием и изучением аномальных объектов, явлений и существ, 
            представляющих угрозу для человечества и нормального функционирования мира.
          </p>
          <p>
            Наша миссия заключается в трех ключевых принципах:
          </p>
          <ul>
            <li><strong>Secure</strong> (Обезопасить) — изолировать аномальные объекты от общества</li>
            <li><strong>Control</strong> (Контролировать) — управлять условиями содержания и минимизировать риски</li>
            <li><strong>Explore</strong> (Исследовать) — изучать природу аномалий для понимания и потенциального применения</li>
          </ul>
          <p>
            Фонд работает в строжайшей секретности, на международном уровне, сотрудничая с правительствами, 
            но оставаясь независимой организацией. Наши операции финансируются из различных источников, 
            включая государственные субсидии, частные пожертвования и коммерческое применение безопасных 
            аномальных технологий под строгим контролем.
          </p>
        </div>
        
        <div className="text-center mb-10">
          <Button asChild>
            <Link to="/about">Узнать больше о Фонде SCE</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
