/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../context/TodosContext';
import { getActiveTodos } from '../../services/todosService';
import { addTodo, updateTodo } from '../../api/todos';
import { USER_ID } from '../../vars/User';

export const Header: React.FC = () => {
  const {
    todos,
    setTodos,
    setError,
    setErrorTimeout,
  } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleAllHandler = () => {
    if (todos.find(todo => todo.completed === false)) {
      const completedTodos = todos.filter(todo => todo.completed === false);

      Promise.all(completedTodos
        .map(todo => updateTodo({ id: todo.id, completed: true })))
        .then(() => {
          setTodos(todosList => todosList.map(todo => ({
            userId: todo.userId,
            id: todo.id,
            title: todo.title,
            completed: true,
          })));
        });
    } else {
      Promise.all(todos
        .map(todo => updateTodo({ id: todo.id, completed: false })))
        .then(() => {
          setTodos(todosList => todosList.map(todo => ({
            userId: todo.userId,
            id: todo.id,
            title: todo.title,
            completed: false,
          })));
        });
    }
  };

  const submitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (inputValue === '') {
        setError({ message: 'Todo title cannot be empty', isError: true });
        setErrorTimeout();

        return;
      }

      setIsDisabled(true);
      addTodo({ completed: false, title: inputValue, userId: USER_ID })
        .then((addedTodo) => {
          setInputValue('');

          setTodos([
            ...todos,
            addedTodo,
          ]);
        })
        .catch(() => {
          setError({ message: 'Failed to add todo', isError: true });
          setErrorTimeout();
        })
        .finally(() => setIsDisabled(false));
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all',
          { active: getActiveTodos(todos).length !== 0 })}
        data-cy="ToggleAllButton"
        onClick={toggleAllHandler}
      />

      <form>
        <input
          disabled={isDisabled}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={submitHandler}
        />
      </form>
    </header>
  );
};
