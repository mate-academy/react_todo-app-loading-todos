import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { TodoFooter } from '../TodoHeader/TodoFooter';
import { TodoMain } from '../TodoMain/TodoMain';
import { Filter } from '../../enums/Filter';

type Props = {
  todos: Todo[]
};
const Content: React.FC<Props> = React.memo(({ todos }) => {
  const [filter, setFilter] = useState(Filter.All);

  const filteredList = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.All:
      default:
        return todos;
    }
  }, [filter, todos]);

  const allTasksAreCompleted = todos.every(todo => todo.completed);
  const someTaskIsCompleted = todos.some(todo => todo.completed);
  const countOfActiveTodos = todos.reduce((count, todo) => {
    if (!todo.completed) {
      return count + 1;
    }

    return count;
  }, 0);

  return (
    <div className="todoapp__content">
      <TodoHeader activeButton={allTasksAreCompleted} />

      {!!todos.length && <TodoMain todos={filteredList} />}

      {!!todos.length && (
        <TodoFooter
          showClearButton={someTaskIsCompleted}
          filter={filter}
          itemsCount={countOfActiveTodos}
          setFilter={setFilter}
        />
      )}
    </div>
  );
});

export { Content };
