import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './TodoApp.scss';
import { Filter } from '../Filter/Filter';
import { Todo } from '../Todo/Todo';
import { client } from '../../utils/fetchClient';
import { TodoType } from '../../types/TodoType';

type Props = {
  userId: number;
};

function filterTodos(todo: TodoType, todoFilter: string) {
  switch (todoFilter) {
    case '':
      return true;

    case 'active':
      return !todo.completed;

    case 'completed':
      return todo.completed;

    default:
      throw new Error('Undefined error');
  }
}

export const TodoApp: React.FC<Props> = ({ userId }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [todoFilter, setTodoFilter] = useState('');

  useEffect(() => {
    setErrorMessage('');

    client.get<TodoType[]>(`/todos?userId=${userId}`)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = [...todos].filter(todo => (
    filterTodos(todo, todoFilter)
  ));

  // function addTodo(title: string) {
  //   setTodos(currentTodos => {
  //     const nextId = Math.max(0, ...currentTodos.map(todo => todo.id));
  //     const id = nextId + 1;

  //     return [...currentTodos, {
  //       id, userId, title, completed: false,
  //     }];
  //   });
  //   setNewTitle('');
  // }

  // function deleteTodo(todoId: number) {
  //   setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* eslint-disable-next-line */}
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            {/* onSubmit={() => addTodo(newTitle)} */}
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
            />
          ))}
        </section>

        {(todos.length > 0) && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            <Filter todoFilter={todoFilter} handleFilter={setTodoFilter} />
            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
