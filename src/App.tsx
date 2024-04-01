import React from 'react';

import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { TodoCreatingForm } from './components/TodoCreatingForm';
import { ErrorNotification } from './components/ErrorNotification';
import { Loader } from './components/Loader';
import { useTodos } from './components/TodosProvider';

export const App: React.FC = () => {
  const { todos, isLoading, errorMessage } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoCreatingForm />

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading && <Loader />}

          {!isLoading && !errorMessage && <TodoList />}
        </section>
        {todos.length > 0 && <Footer />}
      </div>

      <ErrorNotification />
    </div>
  );
};

export default App;
