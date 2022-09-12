import { EFilterBy } from '../../../types/FilterBy.enum';
import { ITodo } from '../../../types/Todo.interface';
import { ETodoAnimation } from '../../../types/TodoAnimation.enum';
import { ITodoAnimation } from '../../../types/TodoAnimation.interface';

type TFilterFunc = (
  todo: ITodo,
  filterBy: EFilterBy,
  animateTodos: ITodoAnimation[],
  visibleTodos: ITodo[],
) => boolean;

export const filterAndAnimateTodo: TFilterFunc = (
  todo,
  filterBy,
  animateTodos,
  visibleTodos,
) => {
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
};
