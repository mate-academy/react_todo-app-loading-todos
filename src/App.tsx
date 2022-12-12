/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosFooter } from './components/TodosComponents/TodosFooter';
import { TodosHeader } from './components/TodosComponents/TodosHeader';
import { TodosList } from './components/TodosComponents/TodosList';
import { FilterValues } from './types/FilterValues';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<FilterValues>(FilterValues.ALL);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id).then(setTodos);
    }
  }, []);

  const onFilterByCompleted = (todoStatus: FilterValues) => {
    setTodoFilter(todoStatus);
  };

  let visibleTodos = [...todos];

  if (todoFilter !== FilterValues.ALL) {
    visibleTodos = visibleTodos
      .filter(completedTodo => {
        switch (todoFilter) {
          case (FilterValues.ACTIVE):
            return completedTodo.completed === true;

          case (FilterValues.COMPLETED):
            return completedTodo.completed === false;

          default:
            return 0;
        }
      });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader newTodoField={newTodoField} />
        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodosList todos={visibleTodos} />
            </section>

            <TodosFooter
              todos={visibleTodos}
              onFilterByCompleted={onFilterByCompleted}
              todoFilter={todoFilter}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
        hidden
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
