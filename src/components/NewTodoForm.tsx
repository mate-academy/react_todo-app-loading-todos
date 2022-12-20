import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoData } from '../api/todos';
import { AuthContext } from './Auth/AuthContext';

interface Props {
  onAdd: (todo: TodoData) => void,
}

export const NewTodoForm: React.FC<Props> = ({ onAdd }) => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isWarningShown, setIsWarningShown] = useState(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoTitle.trim()) {
      const newTodo = {
        title: newTodoTitle.trim(),
        completed: false,
        userId: user?.id,
      };

      onAdd(newTodo);
      setNewTodoTitle('');
    } else {
      setIsWarningShown(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => {
            setNewTodoTitle(event.target.value);
            setIsWarningShown(false);
          }}
        />
      </form>
      {isWarningShown && (
        <p>
          Please, enter the correct title for your todo.
        </p>
      )}
    </>

  );
};
