import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const formSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        toast({
          title: 'Авторизация успешна',
          description: 'Добро пожаловать в Фонд SCE',
        });
        navigate('/');
      } else {
        toast({
          title: 'Ошибка авторизации',
          description: 'Неверный email или пароль, либо ваш email не подтвержден',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка авторизации',
        description: 'Произошла ошибка при попытке входа',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
            <CardDescription>
              Введите свои учетные данные для доступа к SCE Foundation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@sce.org" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-sce-primary hover:bg-sce-primary/90">
                  Войти
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              <span>Нет аккаунта? </span>
              <Link to="/register" className="text-sce-primary hover:underline">
                Зарегистрироваться
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              <Link to="/verify" className="text-sce-primary hover:underline">
                Подтвердить email
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
