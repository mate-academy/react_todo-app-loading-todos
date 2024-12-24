import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../api/todos';
import { ErrorMessage } from '../../App';

interface TodoHeaderProps {
  onError: (error: string) => void;
  onAddTodo: (newTodo: Todo) => void;
  onCompleted: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  onError,
  onAddTodo,
  onCompleted,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleEnteredTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitleTodo = event.target.value;

    setTodoTitle(newTitleTodo);
  };

  const handleAddNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      onError(ErrorMessage.Title);
    } else {
      onAddTodo({
        id: Math.floor(1000000 + Math.random() * 9000000),
        userId: USER_ID,
        title: todoTitle,
        completed: false,
      });
      setTodoTitle('');
    }
  };

  return (
    <header className="todoapp__header" onSubmit={handleAddNewTodo}>
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={onCompleted}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleEnteredTodo}
        />
      </form>
    </header>
  );
};
