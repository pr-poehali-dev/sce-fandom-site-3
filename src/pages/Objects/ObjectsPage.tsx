import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useSCE } from '@/contexts/SCEContext';
import { SCEClass } from '@/types';
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
import { ShieldIcon } from 'lucide-react';

const ObjectsPage: React.FC = () => {
  const { objects } = useSCE();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  
  // Фильтрация объектов
  const filteredObjects = objects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          obj.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' ? true : obj.class === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Объекты SCE</h1>
          <div className="sce-object-number text-2xl">
            Всего: {objects.length}
          </div>
        </div>

        <div className="mb-8 sce-warning-box">
          <p>
            Доступ к информации об объектах SCE строго регламентирован. 
            Несанкционированное распространение данных является нарушением протокола безопасности.
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Поиск по номеру или названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Класс объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все классы</SelectItem>
                {Object.values(SCEClass).map((classType) => (
                  <SelectItem key={classType} value={classType}>{classType}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Список объектов */}
        {filteredObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredObjects.map((object) => (
              <Card key={object.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="mr-2 h-5 w-5 text-sce-primary" />
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
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/objects/${object.id}`}>Подробнее</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 border border-dashed rounded-lg">
            <ShieldIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Объекты не найдены</h3>
            <p className="text-muted-foreground">
              {objects.length === 0
                ? "В базе данных пока нет объектов SCE"
                : "Не найдено объектов, соответствующих заданным критериям"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ObjectsPage;