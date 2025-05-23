import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Временное хранилище данных для имитации базы данных
// В реальном приложении это будет заменено на настоящую базу данных
export const storage = {
  users: [] as any[],
  sceObjects: [] as any[],
  posts: [] as any[],
  
  // Сохранение данных в localStorage
  saveData() {
    try {
      localStorage.setItem('sce_users', JSON.stringify(this.users));
      localStorage.setItem('sce_objects', JSON.stringify(this.sceObjects));
      localStorage.setItem('sce_posts', JSON.stringify(this.posts));
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
    }
  },
  
  // Загрузка данных из localStorage
  loadData() {
    try {
      const users = localStorage.getItem('sce_users');
      const objects = localStorage.getItem('sce_objects');
      const posts = localStorage.getItem('sce_posts');
      
      if (users) this.users = JSON.parse(users);
      if (objects) this.sceObjects = JSON.parse(objects);
      if (posts) this.posts = JSON.parse(posts);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }
};

// Форматирование даты в человекочитаемый вид
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      return 'Некорректная дата';
    }
    
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return 'Ошибка даты';
  }
}

// Генерация уникального ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Имитация отправки email
export function sendVerificationEmail(email: string, token: string) {
  console.log(`Отправка email на ${email} с токеном: ${token}`);
  // В реальном приложении здесь будет код для отправки письма
  
  // Сохраняем токен в локальном хранилище для имитации проверки
  try {
    const verificationTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
    verificationTokens[email] = token;
    localStorage.setItem('verification_tokens', JSON.stringify(verificationTokens));
  } catch (error) {
    console.error('Ошибка сохранения токена верификации:', error);
  }
}

// Проверка верификационного токена
export function verifyEmailToken(email: string, token: string): boolean {
  try {
    const verificationTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
    return verificationTokens[email] === token;
  } catch (error) {
    console.error('Ошибка проверки токена верификации:', error);
    return false;
  }
}
