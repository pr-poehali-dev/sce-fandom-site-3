import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ShieldAlertIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <ShieldAlertIcon className="h-24 w-24 text-sce-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Доступ запрещен</h1>
          <div className="sce-warning-box mb-8">
            <p className="text-lg">
              Запрашиваемая страница не существует или у вас недостаточно прав для доступа к ней.
              Данный инцидент будет зарегистрирован службой безопасности Фонда SCE.
            </p>
          </div>
          <p className="mb-8 text-muted-foreground">
            Код ошибки: 404<br />
            Уровень доступа: Недостаточный
          </p>
          <Button asChild className="bg-sce-primary hover:bg-sce-primary/90">
            <Link to="/">Вернуться на главную страницу</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
