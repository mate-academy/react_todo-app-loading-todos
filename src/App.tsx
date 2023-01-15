/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{
  useContext,
  useEffect,
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
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

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

  const remainingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'Completed':
        return todo.completed;

      case 'Active':
        return !todo.completed;

      default:
        return true;
    }
  });

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
