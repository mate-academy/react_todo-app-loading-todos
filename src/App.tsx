/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { UserWarning } from './components/UserWarning/UserWarning';
import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';
import { closeNotification } from './utils/closeNotification';
import { prepareTodo } from './utils/prepareTodo';

const USER_ID = 6337;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState('');

  const activeTodos = todos
    .filter(todo => !todo.completed);
  const hasActiveTodos = activeTodos.length > 0;
  const howManyActiveTodosLeft = activeTodos.length;

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (error) {
      setIsError(true);
      closeNotification(setIsError, false, 3000);
      throw new Error(`There is an error: ${error}`);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const preparedTodos = useMemo(() => {
    return prepareTodo(todos, filterBy);
  }, [todos, filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          hasActiveTodos={hasActiveTodos}
          title={title}
          onTitleChange={setTitle}
        />

        {!!todos.length && (
          <>
            <TodoList todos={preparedTodos} />
            <Footer
              howManyActiveTodosLeft={howManyActiveTodosLeft}
              filterBy={filterBy}
              onFilterBy={setFilterBy}
            />
          </>
        )}
      </div>

      <Notification isError={isError} onIsError={setIsError} />
    </div>
  );
};
