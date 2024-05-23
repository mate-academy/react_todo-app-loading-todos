import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, postTodo } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType, HandleErrors } from './components/HandleErrors/HandleErros';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('load');
        setTimeout(() => setError('load'), 3000);
      });
  }, []);

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  const addTodo = (newTodoTitle: string) => {
    setLoader(true);
    postTodo({ title: newTodoTitle, userId: USER_ID, completed: false })
      .then(newTodo => {
        setTodos(copyTodos => [...copyTodos, newTodo]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
          return todo;
        default:
          return true;
      }
    });
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} addTodo={addTodo} />

        {todos && <TodoList todos={filteredTodos} />}

        <Footer todos={todos} addFilter={setFilter} filter={filter} />

        {loader && <Loader />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <HandleErrors errorType={isError} onClose={handleCloseError} />
    </div>
  );
};
