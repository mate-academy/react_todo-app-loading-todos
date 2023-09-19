import { useContext } from 'react';
import classNames from 'classnames';
import { Filter } from '../Filter/Filter';
import { NewTodo } from '../NewTodo/NewTodo';
import { TodoList } from '../TodoList/TodoList';
import {
  TodosContext,
} from '../TodosContextProvider/TodosContextProvider';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);
  const areAllTodosCompleted = todos.every(({ completed }) => completed);

  // const handleToggleAll = () => {
  //   setTodos(prevTodos => prevTodos.map(todo => ({
  //     ...todo, completed: !areAllTodosCompleted,
  //   }))).then(
  //     client.patch<Todo[]>(`todos?userId=${USER_ID}`, todos),
  //   );
  // };

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this buttons is active only if there are some active todos */}
        {/* eslint-disable */}
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            'active': areAllTodosCompleted,
          })}
        />
        {/* eslint-enable */}

        {/* Add a todo on form submit */}
        <NewTodo />
      </header>

      <TodoList />

      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer">
        <span className="todo-count">
          3 items left
        </span>

        {/* Active filter should have a 'selected' class */}
        <Filter />

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
