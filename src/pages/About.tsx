import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldIcon, BookOpenIcon, BeakerIcon } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-sce-primary pb-2">
          О Фонде SCE
        </h1>

        <div className="sce-document mb-10">
          <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
          <p className="mb-6">
            <strong>Фонд SCE</strong> (Secure, Control, Explore) — международная организация, 
            занимающаяся поиском, содержанием и изучением аномальных объектов, явлений и существ, 
            представляющих угрозу для человечества и нормального функционирования мира.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-sce-primary/10 p-3 rounded-full mb-4">
                    <ShieldIcon className="h-8 w-8 text-sce-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure (Обезопасить)</h3>
                  <p>Изолировать аномальные объекты от общества и предотвратить угрозы, которые они могут представлять.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-sce-primary/10 p-3 rounded-full mb-4">
                    <BeakerIcon className="h-8 w-8 text-sce-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Control (Контролировать)</h3>
                  <p>Управлять условиями содержания аномальных объектов и минимизировать риски их воздействия.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-sce-primary/10 p-3 rounded-full mb-4">
                    <BookOpenIcon className="h-8 w-8 text-sce-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Explore (Исследовать)</h3>
                  <p>Изучать природу аномалий для понимания их происхождения и потенциального применения на благо человечества.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">История Фонда</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Фонд SCE был основан в начале XX века группой ученых и государственных деятелей из разных стран, 
                которые столкнулись с необъяснимыми явлениями, не поддающимися научному объяснению того времени.
              </p>
              <p>
                После нескольких крупных инцидентов, связанных с аномальными объектами, которые привели к
                многочисленным жертвам, было принято решение о создании международной организации, 
                способной эффективно обнаруживать, содержать и изучать подобные аномалии.
              </p>
              <p>
                За десятилетия своего существования Фонд SCE разработал сложную систему классификации, 
                протоколов содержания и исследования, а также создал глобальную сеть объектов и баз 
                для выполнения своей миссии.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">Классификация объектов</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Фонд SCE классифицирует аномальные объекты по нескольким категориям, основываясь 
                на уровне угрозы, сложности содержания и понимания их природы:
              </p>
              <ul>
                <li><strong>Безопасный</strong> — объекты, которые могут быть надежно содержаны и не представляют значительной угрозы.</li>
                <li><strong>Евклид</strong> — объекты, требующие особых условий содержания и представляющие потенциальную опасность.</li>
                <li><strong>Кетер</strong> — исключительно опасные объекты, сложные для содержания или непредсказуемые в своем поведении.</li>
                <li><strong>Таумиэль</strong> — редкая классификация для объектов, используемых Фондом для содержания других аномалий.</li>
                <li><strong>Нейтрализованный</strong> — объекты, которые утратили свои аномальные свойства или были уничтожены.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-sce-primary pb-2">Структура организации</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Фонд SCE имеет сложную иерархическую структуру, включающую различные отделы и уровни доступа:
            </p>
            <ul>
              <li><strong>Совет O5</strong> — высший руководящий орган Фонда, состоящий из 13 человек с максимальным уровнем допуска.</li>
              <li><strong>Администрация</strong> — отвечает за управление объектами, персоналом и ресурсами Фонда.</li>
              <li><strong>Исследовательский департамент</strong> — занимается изучением аномалий и разработкой новых технологий.</li>
              <li><strong>Служба содержания</strong> — отвечает за безопасное содержание и контроль аномальных объектов.</li>
              <li><strong>Мобильные оперативные группы</strong> — специализированные подразделения для выполнения полевых операций.</li>
              <li><strong>Служба безопасности</strong> — обеспечивает защиту объектов Фонда и пресекает утечки информации.</li>
            </ul>
          </div>
        </div>

        <div className="sce-warning-box mb-10">
          <p className="text-lg">
            Информация, представленная на данном сайте, является конфиденциальной и предназначена
            только для авторизованного персонала Фонда SCE. Несанкционированное распространение
            данных о деятельности Фонда и содержащихся объектах строго запрещено и преследуется
            по внутренним протоколам безопасности.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
