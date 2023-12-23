import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TododsContext/TodosContext';
import { addTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const {
    todos, setTodos, setErrorMessage, USER_ID,
  } = useContext(TodosContext);

  const handleChangeTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleChangeToggle = () => {
    const completedValue = todos.some(todo => !todo.completed);

    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        completed: completedValue,
      };
    });

    setTodos(updatedTodos);
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (todoTitle.trim() === '') {
        setErrorMessage('Title should not be empty');
      } else {
        addTodo({
          title: todoTitle,
          completed: false,
          userId: USER_ID,
        }).then((newTodo: Todo) => {
          setTodos(currentTodos => [...currentTodos, newTodo]);
        }).catch(() => setErrorMessage('Unable to add a todo'));

        setTodoTitle('');
      }
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={handleChangeToggle}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleChangeTodoTitle}
          onKeyUp={handlePressEnter}
        />
      </form>
    </header>
  );
};
