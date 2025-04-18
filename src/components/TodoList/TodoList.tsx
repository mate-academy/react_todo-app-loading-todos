import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../App';
import { TodoItem } from '../TodoItem';

type Props = {
  visibleTodos: Todo[];
  isTodoEditing: boolean;
  selectedPostId: number;
  setIsTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilter: Filter;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  isTodoEditing,
  selectedPostId,
  setIsTodoEditing,
  setSelectedPostId,
  selectedFilter,
}) => {
  let todosCopy: Todo[];

  switch (selectedFilter) {
    case Filter.all:
      todosCopy = [...visibleTodos];
      break;

    case Filter.active:
      todosCopy = [...visibleTodos].filter(todo => !todo.completed);
      break;

    case Filter.completed:
      todosCopy = [...visibleTodos].filter(todo => todo.completed);
      break;

    default:
      todosCopy = [...visibleTodos];
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosCopy.map((todo: Todo) => {
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
