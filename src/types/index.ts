export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  isEmailVerified: boolean;
}

export enum UserRole {
  ADMIN = "ADMIN",
  RESEARCHER = "RESEARCHER",
  CONTAINMENT_SPECIALIST = "CONTAINMENT_SPECIALIST",
  FIELD_AGENT = "FIELD_AGENT",
  READER = "READER"
}

export interface SCEObject {
  id: string;
  number: string;
  name: string;
  class: SCEClass;
  containmentProcedures: string;
  description: string;
  additionalNotes?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export enum SCEClass {
  SAFE = "Безопасный",
  EUCLID = "Евклид",
  KETER = "Кетер",
  THAUMIEL = "Таумиэль",
  NEUTRALIZED = "Нейтрализованный"
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  category: PostCategory;
}

export enum PostCategory {
  NEWS = "Новости",
  RESEARCH = "Исследования",
  FIELD_REPORT = "Полевой отчет",
  ANNOUNCEMENT = "Объявление"
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
