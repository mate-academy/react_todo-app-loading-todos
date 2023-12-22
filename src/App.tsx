import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Notification } from './components/Notifications';
import { useShowErrorMesege } from
  './components/ErrorContext/useShowErrorMesege';
import { Footer } from './components/Footer';
import { FilterBy } from './types/Filter';
import { TodoList } from './components/TodoList';
import { filterTodo } from './helpers/filterTodo';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';

const USER_ID = 12065;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const showError = useShowErrorMesege();
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  useEffect(
    (): void => {
      getTodos(USER_ID)
        .then(setTodos)
        .catch(error => showError('load todos', error));
    }, [showError],
  );

  const celectFilterTodo = useCallback(
    (
      todosFromServer: Todo[],
      optionByFilter: FilterBy,
    ) => filterTodo(todosFromServer, optionByFilter),
    [],
  );

  const preparedTodos = useMemo(
    () => celectFilterTodo(todos, filterBy),
    [celectFilterTodo, todos, filterBy],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={preparedTodos} />

        {todos.length > 0 && (
          <Footer filterBy={filterBy} todos={todos} setFilterBy={setFilterBy} />
        )}

      </div>

      <Notification />
    </div>
  );
};
