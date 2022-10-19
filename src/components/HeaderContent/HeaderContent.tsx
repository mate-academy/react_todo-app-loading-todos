import React, { useState } from 'react';
import classNames from 'classnames';
import { createTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  userId: number;
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
  setErrorType: (errorType: string) => void;
};

export const HeaderContent: React.FC<Props>
  = ({
    newTodoField,
    userId,
    setTodos,
    todos,
    setErrorType,
  }) => {
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const setAllCompleted = () => {
      setErrorType('');

      if (todos.every((todo) => todo.completed)) {
        setTodos(todos.map((todo) => {
          return {
            ...todo,
            completed: false,
          };
        }));
      } else {
        setTodos(todos.map((todo: Todo) => {
          return {
            ...todo,
            completed: true,
          };
        }));
      }
    };

    const handleNewTodoTitleChange
      = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(event.target.value);
      };

    const handleNewTodoTitleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (newTodoTitle.trim() === '') {
        setErrorType(ErrorType.empty);
      } else {
        try {
          createTodo(userId, newTodoTitle)
            .then((todo) => {
              setTodos([...todos, todo]);
              setNewTodoTitle('');
            });
        } catch (error) {
          setErrorType(ErrorType.create);
        }

        if (newTodoField.current) {
          newTodoField.current.focus();
        }
      }
    };

    return (
      <header className="todoapp__header">
        <button
          aria-label="Toggle all todos"
          data-cy="ToggleAllButton"
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: todos.every((todo: Todo) => todo.completed) },
          )}
          onClick={setAllCompleted}
        />

        <form onSubmit={(event) => {
          handleNewTodoTitleSubmit(event);
        }}
        >
          <input
            value={newTodoTitle}
            data-cy="NewTodoField"
            type="text"
            ref={newTodoField}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => {
              handleNewTodoTitleChange(event);
            }}
          />
        </form>
      </header>
    );
  };
