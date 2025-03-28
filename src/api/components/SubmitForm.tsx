import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../todos';
interface Props {
  inputClassName: string;

  todos?: Todo[];
  onAddTodo?: (todo: Todo) => void;

  updateTodo?: Todo;
  setIsUpdate?: (val: boolean) => void;
  onUpdateTodo?: (todo: Todo) => void;
  onDelete?: (id: number) => void;
}

export const SubmitForm: React.FC<Props> = ({
  todos,
  onAddTodo,
  updateTodo,
  setIsUpdate,
  onUpdateTodo,
  inputClassName,
  onDelete,
}) => {
  const [inputQuery, setInputQuery] = useState(updateTodo?.title || '');

  const isUpdate = updateTodo && setIsUpdate && onUpdateTodo && onDelete;
  const isAdd = todos && onAddTodo;

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isUpdate) {
      if (inputQuery.trim()) {
        const updatedTodo = {
          id: updateTodo.id,
          userId: USER_ID,
          title: inputQuery,
          completed: updateTodo.completed,
        };

        onUpdateTodo(updatedTodo);
      } else {
        onDelete(updateTodo.id);
      }

      setIsUpdate(false);
    }

    if (isAdd) {
      if (!inputQuery.trim()) {
        return;
      }

      const newTodo = {
        id: isFinite(Math.max(...todos.map(todo => todo.id)) + 1)
          ? Math.max(...todos.map(todo => todo.id)) + 1
          : +Math.random().toFixed(16).slice(2),
        userId: USER_ID,
        title: inputQuery,
        completed: false,
      };

      onAddTodo(newTodo);
      setInputQuery('');
    }
  };

  const handleOnBlur = () => {
    if (isUpdate) {
      if (inputQuery.trim()) {
        const updatedTodo = {
          id: updateTodo.id,
          userId: USER_ID,
          title: inputQuery,
          completed: updateTodo.completed,
        };

        onUpdateTodo(updatedTodo);
      } else {
        onDelete(updateTodo.id);
      }

      setIsUpdate(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        onBlur={handleOnBlur}
        data-cy="NewTodoField"
        type="text"
        value={inputQuery}
        onChange={event => setInputQuery(event.target.value)}
        className={inputClassName}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
