import { useDispatchContext, useStateContext } from './GlobalStateProvider';
import * as todoService from '../api/todos';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { title, todos } = useStateContext();
  const dispatch = useDispatchContext();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_TITLE',
      payload: e.target.value,
    });
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (title.trim() === '') {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Title should not be empty',
        });

        return;
      }

      todoService
        .addTodo(title.trim())
        .then(todo => {
          dispatch({
            type: 'ADD_TODO',
            payload: todo,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Unable to add a todo',
          });
        })
        .finally(() => {
          dispatch({
            type: 'SET_TITLE',
            payload: '',
          });
        });
    }
  };

  const handleOnUpdateTodo = (todo: Todo) => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        id: todo.id,
        loading: true,
      },
    });
    todoService
      .updateTodo(todo)
      .then(updatedTodo => {
        dispatch({
          type: 'UPDATE_TODO',
          payload: updatedTodo,
        });
      })
      .catch(() => {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Unable to update a todo',
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: {
            id: todo.id,
            loading: false,
          },
        });
      });
  };
  //eslint-disable-next-line
  const handleOnToggleAllTodos = (todos: Todo[]) => {
    todos.forEach(todo => {
      const updatedTodos = {
        ...todo,
        completed: !todo.completed,
      };

      handleOnUpdateTodo(updatedTodos);
    });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => handleOnToggleAllTodos(todos)}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleAddTodo}
        />
      </form>
    </header>
  );
};
