/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useTodoContext } from './context/TodosProvider';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  const {
    todos,
  } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {
          todos.length > 0 && (
            <>
              <TodoList />
              <Footer />
            </>
          )
        }

      </div>

      <Error />
    </div>
  );
};
