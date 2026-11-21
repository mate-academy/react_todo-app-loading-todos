import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const Header = ({ todos }: { todos: Todo[] }) => (
  <header className="todoapp__header">
    {/* ця кнопка має мати клас `active`, лише якщо всі завдання виконано */}
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: todos.length === todos.filter(todo => todo.completed).length,
      })}
      data-cy="ToggleAllButton"
    />

    {/* Додайте завдання під час надсилання форми */}
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
