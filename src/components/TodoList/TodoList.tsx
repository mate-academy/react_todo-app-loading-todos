import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { DispatchContext, StateContext } from '../../providers/StateContext';

import { deleteTodo, patchTodo, TPatchTodo } from '../../api/todos';

import { EAction } from '../../types/Action.enum';
import { ITodo } from '../../types/Todo.interface';
import { ETodoAnimation } from '../../types/TodoAnimation.enum';
import { ITodoAnimation } from '../../types/TodoAnimation.interface';
import { filterAndAnimateTodo } from './helpers/filterAndAnimateTodo';

export const TodoList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    todos,
    loaders,
    filterBy,
    animations,
  } = useContext(StateContext);

  const [visibleTodos, setVisibleTodos] = useState<ITodo[]>([]);

  const saveTodo = useCallback((todoId: number, data: TPatchTodo) => {
    dispatch({
      type: EAction.SET_LOADER,
      loader: {
        id: todoId,
        on: true,
      },
    });

    patchTodo(todoId, data)
      .then(newTodo => {
        dispatch({
          type: EAction.EDIT_TODO,
          todo: newTodo,
        });
      })
      .catch(() => {
        dispatch({
          type: EAction.SET_ERROR,
          error: {
            message: 'Unable to update a todo',
            show: true,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: EAction.SET_LOADER,
          loader: {
            id: todoId,
            on: false,
          },
        });
      });
  }, []);

  const removeTodo = useCallback((todoId: number) => {
    dispatch({
      type: EAction.SET_LOADER,
      loader: {
        id: todoId,
        on: true,
      },
    });

    deleteTodo(todoId)
      .then(() => {
        dispatch({
          type: EAction.DELETE_TODO,
          deleteId: todoId,
        });
      })
      .catch(() => {
        dispatch({
          type: EAction.SET_ERROR,
          error: {
            message: 'Unable to delete a todo',
            show: true,
          },
        });
      });
  }, []);

  useEffect(() => {
    const animateTodos: ITodoAnimation[] = [];
    const showTodos = todos
      .filter(todo => filterAndAnimateTodo(
        todo,
        filterBy,
        animateTodos,
        visibleTodos,
      ));

    dispatch({
      type: EAction.SET_ANIMATIONS,
      animations: animateTodos,
    });

    setTimeout(() => {
      setVisibleTodos(showTodos);
    }, 500);
  }, [todos, filterBy]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: EAction.SET_ANIMATIONS,
        animations: [
          ...visibleTodos.map(todo => ({
            id: todo.id,
            state: ETodoAnimation.OPEN,
          })),
        ],
      });
    }, 0);
  }, [visibleTodos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        const isProcessing = loaders.some(
          loader => loader.id === todo.id && loader.on,
        );
        const isVisible = animations.some(
          animation => animation.id === todo.id
            && animation.state === ETodoAnimation.OPEN,
        );

        return (
          <TodoItem
            todo={todo}
            isProcessing={isProcessing}
            isVisible={isVisible}
            onSave={saveTodo}
            onDelete={removeTodo}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
