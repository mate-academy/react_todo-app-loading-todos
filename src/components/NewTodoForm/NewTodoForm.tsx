import React, { useContext, useEffect, useRef } from 'react';
import { TodoData } from '../../api/todos';
import { AuthContext } from '../Auth/AuthContext';

interface Props {
  todoTitle: string,
  setTitle: (newTitle: string) => void,
  onAdd: (todo: TodoData) => void,
}

export const NewTodoForm: React.FC<Props> = ({
  todoTitle,
  setTitle,
  onAdd,
}) => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      completed: false,
      userId: user?.id,
    };

    onAdd(newTodo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
    </form>
  );
};
