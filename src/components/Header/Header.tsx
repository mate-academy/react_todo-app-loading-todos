import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { createTodo, getTodos, updateComplete } from '../../api/todos';
import { Error, Filter, Todo } from '../../types/Todo';
import { filterTodos } from '../../utils/helpers';

type Props = {
  userId: number;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Filter;
  setHasError: (value: Error) => void;
};

export const Header: React.FC<Props> = ({
  userId,
  todos,
  setTodos,
  filter,
  setHasError,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const isBtnActive = todos.every(todo => todo.completed);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Omit<Todo, 'id'> = {
      title: todoTitle,
      completed: false,
      userId,
    };

    createTodo(newTodo).then(() => {
      getTodos(userId)
        .then(data => {
          const newTodos = filterTodos(filter, data);

          setTodos(newTodos);
          setTodoTitle('');
        });
    })
      .catch(() => {
        setHasError(Error.Add);
      });
  };

  const togglerAllCompleteHandler = () => {
    todos.forEach(todo => {
      updateComplete(todo.id, { completed: !isBtnActive })
        .then(() => {
          setTodos(todos.map(t => ({
            ...t,
            completed: !isBtnActive,
          })));
        })
        .catch(() => {
          setHasError(Error.Update);
        });
    });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        /* eslint-disable-next-line */
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isBtnActive,
          })}
          onClick={togglerAllCompleteHandler}
        />
      )}

      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
