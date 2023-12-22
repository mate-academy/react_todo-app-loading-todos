import React, { useContext } from 'react';
import { Header } from './Header/Header';
import { ErrorMessages } from './ErrorMessages/ErrorMessages';
import { TodoList } from './TodoList/TodoList';
import { Footer } from './Footer/Footer';
import { TodosContext } from './TododsContext/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>

      <ErrorMessages />
    </div>
  );
};
