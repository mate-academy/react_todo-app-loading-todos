import React, {
  ChangeEvent,
  Dispatch, FormEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Loader } from './Loader';
import { Todo } from '../types/Todo';
import { patchTodo } from '../api/todos';

type Props = {
  todos: Todo[];
  filterMode: string;
  editTitle: string;
  updateInputHandler: (todo: Todo) => void;
  removeHandler: (todo: Todo) => void;
  newTodoField: RefObject<HTMLInputElement>;
  onChangeEditInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setTodoSelected: Dispatch<SetStateAction<number>>;
  todoSelected: number;
  setIsShowEditInput: (value: boolean
  | ((prevVar: boolean) => boolean)) => void;
};

export const TodosList: React.FC<Props> = ({
  todos,
  filterMode,
  editTitle,
  updateInputHandler,
  removeHandler,
  newTodoField,
  onChangeEditInput,
  setTodos,
  setIsShowEditInput,
  setTodoSelected,
  todoSelected,
}) => {
  const [newUpdateTodo, setNewUpdateTodo] = useState<Todo>();

  const updateCompleted = async (todo: Todo) => {
    const updTodo = await patchTodo({
      ...todo,
      completed: !todo.completed,
    });

    setTodoSelected(0);
    setNewUpdateTodo(updTodo);
  };

  useEffect(() => {
    setTodos(todos.map(todo => (
      todo.id === newUpdateTodo?.id ? newUpdateTodo : todo
    )));
  }, [newUpdateTodo]);

  const filterTodos = () => {
    switch (filterMode) {
      case 'active':
        return todos.filter(todo => todo.completed);
      case 'complete':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const onBlurSubmit = (todo: Todo) => {
    setTodos(todos.map(t => (t.id === todo.id
      ? { ...todo, editMode: false } : t)));

    setIsShowEditInput(false);
  };

  const onSubmitEdit = async (e: FormEvent<HTMLFormElement>, todo: Todo) => {
    e.preventDefault();

    const editTodo: Todo = { ...todo, title: editTitle };

    const result = await patchTodo(editTodo);

    if (result) {
      setTodos(todos.map(t => (t.id === todo.id
        ? {
          ...todo,
          editMode: false,
          title: editTodo.title,
        } : t)));
    } else {
      // eslint-disable-next-line no-console
      console.warn('Error');

      return;
    }

    setIsShowEditInput(false);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      { filterTodos().map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed && 'completed'}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked
              onClick={() => {
                setTodoSelected(todo.id);
                updateCompleted(todo);
              }}
            />
          </label>
          { todo.editMode && (
            <form onSubmit={(e) => {
              onSubmitEdit(e, todo);
            }}
            >
              <input
                ref={newTodoField}
                className="todo__title-field"
                data-cy="NewTodoField"
                type="text"
                value={editTitle}
                onBlur={() => onBlurSubmit(todo)}
                onChange={onChangeEditInput}
              />
            </form>
          ) }
          { !todo.editMode && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                updateInputHandler(todo);
              }}
            >
              { todo.title }
            </span>
          ) }
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
            onClick={() => {
              removeHandler(todo);
            }}
          >
            ×
          </button>

          { todoSelected === todo.id ? <Loader /> : '' }

        </div>
      )) }
    </section>
  );
};
