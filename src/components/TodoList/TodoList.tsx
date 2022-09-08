import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { DispatchContext, StateContext } from '../../providers/StateContext';

import { patchTodo, PatchTodoData } from '../../api/todos';

import { EAction } from '../../types/Action.enum';
import { EFilterBy } from '../../types/FilterBy.enum';
import { ITodo } from '../../types/Todo.interface';
import { ETodoAnimation } from '../../types/TodoAnimation.enum';
import { ITodoAnimation } from '../../types/TodoAnimation.interface';

export const TodoList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    todos,
    loaders,
    filterBy,
    animations,
  } = useContext(StateContext);

  const [visibleTodos, setVisibleTodos] = useState<ITodo[]>([]);

  const saveTodo = useCallback((todoId: number, data: PatchTodoData) => {
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

  useEffect(() => {
    const animateTodos: ITodoAnimation[] = [];
    const showTodos = todos
      .filter(todo => {
        const isVisibleNow = visibleTodos
          .some(vTodo => vTodo.id === todo.id);

        switch (filterBy) {
          case EFilterBy.COMPLETED:
            animateTodos.push({
              id: todo.id,
              state: todo.completed && isVisibleNow
                ? ETodoAnimation.OPEN
                : ETodoAnimation.CLOSE,
            });

            return todo.completed;
          case EFilterBy.ACTIVE:
            animateTodos.push({
              id: todo.id,
              state: !todo.completed && isVisibleNow
                ? ETodoAnimation.OPEN
                : ETodoAnimation.CLOSE,
            });

            return !todo.completed;
          case EFilterBy.ALL:
          default:
            animateTodos.push({
              id: todo.id,
              state: isVisibleNow
                ? ETodoAnimation.OPEN
                : ETodoAnimation.CLOSE,
            });

            return true;
        }
      });

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

  // eslint-disable-next-line no-console
  console.log('TodoList re-render');

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
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
