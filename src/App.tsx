/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessages } from './components/ErrorMessages';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/Filter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [
    filterStatus,
    setFilterStatus,
  ] = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setError('Can\'t load todos');
        });
    }
  }, []);

  const remainingTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.All:
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0
          && (
            <Footer
              remainingTodos={remainingTodos}
              completedTodos={completedTodos}
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
            />
          )}
      </div>

      <ErrorMessages error={error} setError={setError} />
    </div>
  );
};
