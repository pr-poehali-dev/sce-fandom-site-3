import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  token: z.string().min(1, 'Введите токен подтверждения'),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyEmail: React.FC = () => {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      token,
    },
  });

  React.useEffect(() => {
    // Автоматическая верификация, если есть email и токен в URL
    if (email && token) {
      handleVerification(email, token);
    }
  }, [email, token]);

  const handleVerification = async (email: string, token: string) => {
    try {
      const success = await verifyEmail(email, token);
      
      if (success) {
        toast({
          title: 'Email подтвержден',
          description: 'Теперь вы можете войти в систему',
        });
        navigate('/login');
      } else {
        toast({
          title: 'Ошибка подтверждения',
          description: 'Неверный email или токен подтверждения',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка подтверждения',
        description: 'Произошла ошибка при подтверждении email',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    await handleVerification(values.email, values.token);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Подтверждение Email</CardTitle>
            <CardDescription>
              Введите email и код подтверждения, который был отправлен на вашу почту
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
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Токен подтверждения</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите токен из письма" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-sce-primary hover:bg-sce-primary/90">
                  Подтвердить Email
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-sm text-muted-foreground">
              После подтверждения email вы сможете{' '}
              <a href="/login" className="text-sce-primary hover:underline">
                войти в систему
              </a>
            </span>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
