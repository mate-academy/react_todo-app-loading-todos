import React, { useState } from "react";
import { addTodos } from "../../api/todos";
import { Todo } from "../../types/Todo";
import { TodoFromServer } from "../../types/TodoFromServer";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const todoData: TodoFromServer = {
  userId: 11853,
  completed: false,
  title: '',
};

export const Header: React.FC<Props> = ({ setTodos }) => {
  const [titleTodo, setTitleTodo] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    todoData.title = titleTodo;

    addTodos(todoData)
      .then(data => {
        return setTodos((currentTodos) => [...currentTodos, data])
      })
      .finally(() => setTitleTodo(''));
  }

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={titleTodo}
          onChange={event => setTitleTodo(event.target.value)}
        />
      </form>
    </header>
  )
}
