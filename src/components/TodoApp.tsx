import React, { useContext } from 'react';
import { Error } from './Error';
import { Footer } from './Footer';
import { Form } from './Form';
import { TodoList } from './TodoList';
import { TodoContext } from '../TodoProvider';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Form />
        {todos.length !== 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>

      <Error />
    </div>
  );
};
