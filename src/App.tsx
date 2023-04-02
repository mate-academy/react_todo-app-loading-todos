/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { getTodos, addTodo } from './api/todos';
import { Login } from './Login';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter/Filter';
import { NewTodo } from './components/NewTodo/NewTodo';

const USER_ID = 6846;

export const App: React.FC = () => {
  const [task, setTask] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const [error, setError] = useState<string>();

  const errorElement = useRef<HTMLDivElement>(null);

  const [isSubmit, setIsSubmit] = useState(false);

  // filter

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const loadTodos = async () => {
    try {
      await getTodos(USER_ID).then(res => setTodos(res));
    } catch {
      setError('unable to get todos');
    }
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    setIsSubmit(true);
    event.preventDefault();

    if (task === '') {
      setError("Title can't be empty");
    }

    if (task) {
      addTodo({
        id: 0,
        userId: USER_ID,
        title: task,
        completed: false,
      });
    }

    setTask('');

    setTimeout(() => loadTodos(), 300);
  };

  useEffect(() => {
    loadTodos();
  }, [localStorage.getItem('email')]);

  useEffect(() => {
    const timer = setTimeout(() => {
      errorElement.current?.classList.add('hidden');
    }, 3000);

    return () => {
      clearTimeout(timer);
      errorElement.current?.classList.remove('hidden');
      setIsSubmit(false);
    };
  }, [error, isSubmit]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (!localStorage.getItem('email')) {
    return <Login />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-1">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          handleSubmit={handleSubmit}
          handleTodoChange={handleTodoChange}
          task={task}
        />

        <Filter todos={todos} />
      </div>

      {
        error
        && (
          <div
            className={cn(
              'notification',
              'is-danger',
              'is-light',
              'has-text-weight-normal',
            )}
            ref={errorElement}
          >
            <button
              type="button"
              className="delete"
              onClick={() => setError('')}
            />

            {
              error
            }
          </div>
        )
      }
    </div>
  );
};
