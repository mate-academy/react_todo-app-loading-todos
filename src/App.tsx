import { FC, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterStatusEnum } from './types/Status.enum';
import { ErrorsEnum } from './types/Error.enum';
import { filterTodos } from './utils/filterTodos';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';

export const App: FC = () => {
  const [filterStatus, setFilterStatus] = useState(FilterStatusEnum.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorsEnum | null>(null);

  const loadTodos = async () => {
    try {
      const responseTodos = await getTodos();

      setTodos(responseTodos);
    } catch {
      setError(ErrorsEnum.LoadTodos);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = filterTodos(todos, filterStatus);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const todosCount = todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onError={setError} />

        <TodoList todos={filteredTodos} />

        {todosCount > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
          />
        )}
      </div>

      <Notification error={error} onSetError={setError} />
    </div>
  );
};
