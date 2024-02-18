import React from 'react';
import { TodoList } from './components/main/TodoList';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Store } from '../../Store';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <Store>
        <Header />
        <TodoList />
        <Footer />
        <ErrorNotification />
      </Store>
    </div>
  );
};
