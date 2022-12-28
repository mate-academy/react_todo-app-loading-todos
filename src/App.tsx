/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { AddTodo } from './components/AddTodo';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async (id: number) => {
      try {
        const todoFromServer = await getTodos(id);

        setTodos(todoFromServer);
      } catch (error) {
        setHasError(true);
      }
    };

    if (user) {
      loadTodos(user.id);
    }
  }, []);

  const addTodo = (title: string) => {
    setTodos(todos.concat([{
      title,
      id: +new Date(),
      completed: false,
      userId: 1,
    }]));
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <AddTodo
            addTodo={addTodo}
            newTodoField={newTodoField}
          />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              onDelete={removeTodo}
            />
            <Footer
              todos={todos}
            />
          </>
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
