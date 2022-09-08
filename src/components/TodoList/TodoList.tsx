import { useCallback, useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { DispatchContext, StateContext } from '../../providers/StateContext';

import { patchTodo, PatchTodoData } from '../../api/todos';
import { ActionTypes } from '../../types/ActionTypes';

export const TodoList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, loaders } = useContext(StateContext);

  const saveTodo = useCallback((todoId: number, data: PatchTodoData) => {
    // eslint-disable-next-line no-console
    console.log('saveTodo data', data);

    dispatch({
      type: ActionTypes.SET_LOADER,
      loader: {
        id: todoId,
        on: true,
      },
    });

    patchTodo(todoId, data)
      .then(newTodo => {
        dispatch({
          type: ActionTypes.EDIT_TODO,
          todo: newTodo,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.SET_ERROR,
          error: {
            message: 'Unable to update a todo',
            show: true,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: ActionTypes.SET_LOADER,
          loader: {
            id: todoId,
            on: false,
          },
        });
      });
  }, []);

  // eslint-disable-next-line no-console
  console.log('TodoList re-render');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        const isProcessing = loaders.some(
          loader => loader.id === todo.id && loader.on,
        );

        return (
          <TodoItem
            todo={todo}
            isProcessing={isProcessing}
            onSave={saveTodo}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
