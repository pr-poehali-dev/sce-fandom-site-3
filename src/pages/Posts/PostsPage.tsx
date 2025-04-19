import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useSCE } from '@/contexts/SCEContext';
import { PostCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/utils';
import { FileTextIcon } from 'lucide-react';

const PostsPage: React.FC = () => {
  const { posts } = useSCE();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Фильтрация постов
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Материалы Фонда SCE</h1>
          <div className="text-2xl">
            Всего: {posts.length}
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Поиск по названию или содержанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {Object.values(PostCategory).map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Список постов */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-sce-primary/10 text-sce-primary text-xs font-medium rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <span>Автор: {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/posts/${post.id}`}>Читать полностью</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 border border-dashed rounded-lg">
            <FileTextIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Материалы не найдены</h3>
            <p className="text-muted-foreground">
              {posts.length === 0
                ? "В базе данных пока нет материалов"
                : "Не найдено материалов, соответствующих заданным критериям"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostsPage;