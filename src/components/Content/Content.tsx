import { useEffect, useMemo, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Todo } from '../../types/Todo';
import { ErrorCode } from '../../types/ErrorCode';
import * as todoService from '../../api/todos';
import { Filters } from '../../types/Filters';

type Props = {
  onShowError: (errorCode: Exclude<ErrorCode, null>) => void;
  onClearError: () => void;
};

function getPreparedTodos(
  currentTodos: Todo[],
  active: Todo[],
  completed: Todo[],
  filter: Filters,
): Todo[] {
  let preparedTodos: Todo[] = [];

  switch (filter) {
    case Filters.Active:
      preparedTodos = active;
      break;

    case Filters.Completed:
      preparedTodos = completed;
      break;

    case Filters.All:
    default:
      preparedTodos = [...currentTodos];
  }

  return preparedTodos;
}

export const Content: React.FC<Props> = ({ onShowError, onClearError }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.All);

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => onShowError('load_failed'));
  }, [onShowError]);

  const todosActive: Todo[] = useMemo(
    () => todos.filter(todo => todo.completed === false),
    [todos],
  );
  const todosCompleted: Todo[] = useMemo(
    () => todos.filter(todo => todo.completed === true),
    [todos],
  );

  function handleStatusUpdate(id: number, completed: boolean) {
    const previousTodos = todos;

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: completed } : todo,
      ),
    );

    todoService
      .updateTodoStatus({ id, completed }) // .updateTodoStatus(id, completed) - коли передаємо не деструктурований обʼєкт
      .then(() => {})
      .catch(() => {
        // якщо помилка — повертаємо попередній стан і показуємо помилку
        setTodos(previousTodos);
        onShowError('update_failed');

        setTimeout(() => {
          onClearError();
        }, 3000);
      });
  }

  function handleFilterUpdate(filter: Filters) {
    setCurrentFilter(filter);
  }

  const visibleTodos = useMemo(
    () => getPreparedTodos(todos, todosActive, todosCompleted, currentFilter),
    [todos, todosActive, todosCompleted, currentFilter],
  );

  return (
    <div className="todoapp__content">
      <Header
      // onShowError={onShowError}
      // onClearError={onClearError}
      />
      <Main
        todos={visibleTodos}
        // onShowError={onShowError}
        // onClearError={onClearError}
        onStatusUpdate={handleStatusUpdate}
      />
      {/* Hide the footer if there are no todos */}
      {todos.length !== 0 && (
        <Footer
          currentFilter={currentFilter}
          todosActive={todosActive}
          todosCompleted={todosCompleted}
          onFilterChange={handleFilterUpdate}
        />
      )}
    </div>
  );
};
