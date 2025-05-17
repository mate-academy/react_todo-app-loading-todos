import { Todo } from '../types/Todo';
import { Filter } from '../App';

import { TodoItem } from '../components/TodoItem';

type Props = {
  todos: Todo[];
  isTodoEditing: boolean;
  selectedPostId: number;
  setIsTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilter: Filter;
};

export const TodoList: React.FC<Props> = ({
  todos,
  isTodoEditing,
  selectedPostId,
  setIsTodoEditing,
  setSelectedPostId,
  selectedFilter,
}) => {
  let todosCopy: Todo[] = [];

  switch (selectedFilter) {
    case Filter.all:
      todosCopy = [...todos];
      break;

    case Filter.active:
      todosCopy = [...todos].filter(todo => !todo.completed);
      break;

    case Filter.completed:
      todosCopy = [...todos].filter(todo => todo.completed);
      break;

    default:
      todosCopy = [...todos];
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosCopy.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            isTodoEditing={isTodoEditing}
            selectedPostId={selectedPostId}
            setIsTodoEditing={setIsTodoEditing}
            setSelectedPostId={setSelectedPostId}
          />
        );
      })}
    </section>
  );
};
