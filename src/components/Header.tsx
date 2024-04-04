import cn from 'classnames';
import { Todo } from '../types/Todo';
import { FormEvent, useEffect, useState } from 'react';
import { USER_ID, createTodos } from '../api/todos';
import { ErrorTypes } from '../types/enums';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: (errorMessage: ErrorTypes) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  setErrorMessage,
}) => {
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todos.some(todo => todo.completed === false)) {
      setIsButtonActive(false);
    }
  }, [todos]);

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (title.trim() !== '') {
      createTodos({ userId: USER_ID, completed: false, title })
        .then(() => {
          setTodos((prevTodos: Todo[]) => [
            ...prevTodos,
            {
              id: Math.max(...todos.map(todo => todo.id)) + 1,
              userId: 404,
              title,
              completed: false,
            },
          ]);
        })
        .catch(() => {
          setErrorMessage(ErrorTypes.addErr);
        });

      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isButtonActive === true,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          onSubmit(event);
        }}
        onBlur={event => {
          onSubmit(event);
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
