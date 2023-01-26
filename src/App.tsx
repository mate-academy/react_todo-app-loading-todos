/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilted';

import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [todosFilter, setTodosFilter] = useState(TodosFilter.All);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  const filteredTodos = useMemo(() => {
    switch (todosFilter) {
      case TodosFilter.Active:
        return todos.filter(todo => !todo.completed);
      case TodosFilter.Completed:
        return todos.filter(todo => todo.completed);
      case TodosFilter.All:
      default:
        return todos.filter(todo => todo);
    }
  }, [todos, todosFilter]);

  const activeTodosAmount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => showError('Cant load todos'));
    }
  }, [user?.id]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {
          todos.length !== 0 && (
            <>
              <TodoList todos={filteredTodos} />
              <Footer
                activeTodosAmount={activeTodosAmount}
                onTodoChange={setTodosFilter}
              />
            </>
          )
        }
      </div>

      {
        errorMessage && (
          <ErrorMessage message={errorMessage} onClose={clearErrorMessage} />
        )
      }
    </div>
  );
};
