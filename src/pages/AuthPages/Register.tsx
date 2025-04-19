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
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const success = await register(values.username, values.email, values.password);
      
      if (success) {
        toast({
          title: 'Регистрация успешна',
          description: 'Проверьте вашу почту для подтверждения аккаунта',
        });
        navigate('/verify');
      } else {
        toast({
          title: 'Ошибка регистрации',
          description: 'Пользователь с таким email уже существует',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: 'Произошла ошибка при попытке регистрации',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
            <CardDescription>
              Создайте аккаунт для доступа к SCE Foundation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя пользователя</FormLabel>
                      <FormControl>
                        <Input placeholder="agent007" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Подтверждение пароля</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-sce-primary hover:bg-sce-primary/90">
                  Зарегистрироваться
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-sce-primary hover:underline">
                Войти
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
