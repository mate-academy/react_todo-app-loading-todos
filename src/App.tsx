import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as apiTodos from './api/todos';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoStatus, setTodoStatus] = useState<Status>('All');
  const [submitting, setSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  function resetError() {
    setErrorMessage('');
  }

  async function addTodo(todo: Omit<Todo, 'id'>) {
    try {
      setSubmitting(true);

      setTempTodo({ ...todo, id: 0 });

      const newTodo = await apiTodos.addTodo(todo);

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTitle('');
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      setTimeout(resetError, 3000);
    } finally {
      setTempTodo(null);
      setSubmitting(false);
    }
  }

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      switch (todoStatus) {
        case 'Active':
          return !todo.completed;

        case 'Completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, todoStatus]);

  useEffect(() => {
    apiTodos
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(resetError, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          resetError={resetError}
          addTodo={addTodo}
          completed={completed}
          todos={todos}
          submitting={submitting}
        />

        <TodoList
          todos={filteredTodos}
          setCompleted={setCompleted}
          tempTodo={tempTodo}
        />

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
