import { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { FilterTypes } from '../../types/enums';
import { Filter } from './Filter';
import { deleteTodos } from '../../api/todos';

type Props = {
  filterBy: FilterTypes;
  setFilterBy: (filterBy: FilterTypes) => void;
  todos: Todo[];
  setLoading: React.Dispatch<React.SetStateAction<number[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  setLoading,
  todos,
  setTodos,
}) => {
  const [isAnyTodoCompleted, setIsAnyTodoCompleted] = useState(false);

  const onDelete = (completedTodos: Todo[]) => {
    completedTodos.map(completedTodo => {
      setLoading(prev => [...prev, completedTodo.id]);

      deleteTodos(completedTodo.id)
        .then(() =>
          setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== completedTodo.id),
          ),
        )
        .finally(() => setLoading([]));
    });
  };

  useEffect(() => {
    if (todos.some(todo => todo.completed === true)) {
      setIsAnyTodoCompleted(true);
    }
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(item => !item.completed).length} items left
      </span>

      <Filter filterBy={filterBy} setFilterBy={setFilterBy} />

      <button
        type="button"
        className={'todoapp__clear-completed'}
        disabled={isAnyTodoCompleted === false}
        data-cy="ClearCompletedButton"
        onClick={() => onDelete(todos.filter(todo => todo.completed === true))}
      >
        Clear completed
      </button>
    </footer>
  );
};
