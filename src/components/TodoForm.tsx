import { useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';

interface Props {
  todos: Todo[];
  onAddTodo: (todo: Todo) => Promise<void>;
  handleError: (error: string) => void;
}

export const TodoForm: React.FC<Props> = ({
  todos,
  onAddTodo,
  handleError,
}) => {
  const [todo, setTodo] = useState('');

  const handleInput = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    handleError('');
    setTodo(evnt.target.value);
  };

  const resetForm = () => {
    setTodo('');
  };

  const handleSubmit = async (evnt: React.FormEvent<HTMLFormElement>) => {
    evnt.preventDefault();

    if (!todo.trim()) {
      handleError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: todo,
      completed: false,
    };

    try {
      await onAddTodo(newTodo);
      resetForm();
    } catch (error) {
      handleError('Unable to add a todo');
    }
  };

  return (
    <>
      {todos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={handleInput}
        />
      </form>
    </>
  );
};
