import React, { createContext, useContext, useEffect, useState } from 'react';
import { SCEObject, SCEClass, Post, PostCategory } from '@/types';
import { generateId, storage } from '@/lib/utils';
import { useAuth } from './AuthContext';

interface SCEContextType {
  objects: SCEObject[];
  posts: Post[];
  getObjectById: (id: string) => SCEObject | undefined;
  getPostById: (id: string) => Post | undefined;
  createObject: (object: Omit<SCEObject, 'id' | 'author' | 'createdAt' | 'updatedAt'>) => Promise<SCEObject | undefined>;
  updateObject: (id: string, object: Partial<SCEObject>) => Promise<boolean>;
  deleteObject: (id: string) => Promise<boolean>;
  createPost: (post: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'>) => Promise<Post | undefined>;
  updatePost: (id: string, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  isLoading: boolean;
}

const SCEContext = createContext<SCEContextType | undefined>(undefined);

export const SCEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [objects, setObjects] = useState<SCEObject[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Загружаем данные при инициализации
    storage.loadData();
    setObjects(storage.sceObjects);
    setPosts(storage.posts);
    setIsLoading(false);
  }, []);

  const getObjectById = (id: string): SCEObject | undefined => {
    return objects.find(obj => obj.id === id);
  };

  const getPostById = (id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  const createObject = async (
    objectData: Omit<SCEObject, 'id' | 'author' | 'createdAt' | 'updatedAt'>
  ): Promise<SCEObject | undefined> => {
    if (!user || user.role !== 'ADMIN') {
      return undefined;
    }

    const now = new Date().toISOString();
    const newObject: SCEObject = {
      id: generateId(),
      author: user.username,
      createdAt: now,
      updatedAt: now,
      ...objectData
    };

    // Добавляем объект в хранилище
    storage.sceObjects.push(newObject);
    storage.saveData();
    
    // Обновляем состояние
    setObjects(prev => [...prev, newObject]);
    
    return newObject;
  };

  const updateObject = async (id: string, objectData: Partial<SCEObject>): Promise<boolean> => {
    if (!user || user.role !== 'ADMIN') {
      return false;
    }

    const index = storage.sceObjects.findIndex(obj => obj.id === id);
    if (index === -1) {
      return false;
    }

    const updatedObject = {
      ...storage.sceObjects[index],
      ...objectData,
      updatedAt: new Date().toISOString()
    };

    storage.sceObjects[index] = updatedObject;
    storage.saveData();
    
    // Обновляем состояние
    setObjects(prev => prev.map(obj => obj.id === id ? updatedObject : obj));
    
    return true;
  };

  const deleteObject = async (id: string): Promise<boolean> => {
    if (!user || user.role !== 'ADMIN') {
      return false;
    }

    const index = storage.sceObjects.findIndex(obj => obj.id === id);
    if (index === -1) {
      return false;
    }

    storage.sceObjects.splice(index, 1);
    storage.saveData();
    
    // Обновляем состояние
    setObjects(prev => prev.filter(obj => obj.id !== id));
    
    return true;
  };

  const createPost = async (
    postData: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'>
  ): Promise<Post | undefined> => {
    if (!user || user.role !== 'ADMIN') {
      return undefined;
    }

    const now = new Date().toISOString();
    const newPost: Post = {
      id: generateId(),
      author: user.username,
      createdAt: now,
      updatedAt: now,
      ...postData
    };

    // Добавляем пост в хранилище
    storage.posts.push(newPost);
    storage.saveData();
    
    // Обновляем состояние
    setPosts(prev => [...prev, newPost]);
    
    return newPost;
  };

  const updatePost = async (id: string, postData: Partial<Post>): Promise<boolean> => {
    if (!user || user.role !== 'ADMIN') {
      return false;
    }

    const index = storage.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    const updatedPost = {
      ...storage.posts[index],
      ...postData,
      updatedAt: new Date().toISOString()
    };

    storage.posts[index] = updatedPost;
    storage.saveData();
    
    // Обновляем состояние
    setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
    
    return true;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    if (!user || user.role !== 'ADMIN') {
      return false;
    }

    const index = storage.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    storage.posts.splice(index, 1);
    storage.saveData();
    
    // Обновляем состояние
    setPosts(prev => prev.filter(post => post.id !== id));
    
    return true;
  };

  return (
    <SCEContext.Provider
      value={{
        objects,
        posts,
        getObjectById,
        getPostById,
        createObject,
        updateObject,
        deleteObject,
        createPost,
        updatePost,
        deletePost,
        isLoading
      }}
    >
      {children}
    </SCEContext.Provider>
  );
};

export const useSCE = (): SCEContextType => {
  const context = useContext(SCEContext);
  if (context === undefined) {
    throw new Error('useSCE must be used within a SCEProvider');
  }
  return context;
};
