import {
  memo,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { postTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { TodosContext } from './TodosContext';

const AddTodoForm = memo(() => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const { setTodos, setErrors } = useContext(TodosContext);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodoField.current && user) {
      postTodo(newTodoField.current.value, user.id)
        .then(res => {
          setTodos(prev => [...prev, res as Todo]);
          if (newTodoField.current) {
            newTodoField.current.value = '';
          }
        })
        .catch(() => {
          setErrors(prev => [...prev, 'Unable to delete a todo']);
        });
    }
  };

  return (
    <form onSubmit={e => save(e)}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        aria-label="Add todo item"
      />
    </form>
  );
});

export default AddTodoForm;
