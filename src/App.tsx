import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import Error from './components/Error/Error';
import TodoFooter from './components/Todo/TodoFooter';
import TodoForm from './components/Todo/TodoForm';
import TodoList from './components/Todo/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const getTodosFromServer = async () => {
    if (!user) {
      return;
    }

    try {
      const result = await getTodos(user.id);

      setTodos(result);
    } catch {
      setError(true);
      setErrorText('Unable to load todos');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            aria-label="Add todo"
            type="button"
            className="todoapp__toggle-all active"
          />
          <TodoForm newTodoField={newTodoField} />
        </header>
        {todos && <TodoList todos={visibleTodos} /> }
        {!!todos.length
          && (
            <TodoFooter
              setVisibleTodos={setVisibleTodos}
              visibleTodos={visibleTodos}
              todos={todos}
            />
          )}
      </div>

      <Error error={error} setError={setError} errorText={errorText} />
    </div>
  );
};
