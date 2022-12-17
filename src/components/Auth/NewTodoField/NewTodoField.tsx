import React, { useContext, useState } from 'react';
import { Todo } from '../../../types/Todo';
import { AuthContext } from '../AuthContext';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[];
};

export const NewTodoField: React.FC<Props> = ({
  newTodoField,
  setTodos,
  todos,
}) => {
  const user = useContext(AuthContext);
  const [value, setValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setValue(e.target.value);

  const handleClickEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();

    const maxTodoId: number = todos.length
      ? [...todos].sort((current, prev) => prev.id - current.id)[0].id
      : 0;

    const newTodo: Todo = {
      id: maxTodoId + 1,
      userId: user?.id || 0,
      title: value,
      completed: false,
    };

    setTodos((currentTodos) => [
      newTodo,
      ...currentTodos,
    ]);
  };

  return (
    <form>
      <input
        value={value}
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyDown={handleClickEnter}
      />
    </form>
  );
};
