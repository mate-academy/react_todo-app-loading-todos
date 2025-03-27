import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { NewTodoForm } from '../NewTodoForm';

type Props = {
  todos: Todo[];
  changeAllIsComplated: () => void;
  addTodo: (title: string) => void;
  setNewError: (newErrorMessage: string) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  changeAllIsComplated,
  addTodo,
  setNewError,
}) => {
  // console.log('render header');

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => changeAllIsComplated()}
        />
      )}

      <NewTodoForm addTodo={addTodo} setNewError={setNewError} />
    </header>
  );
};
