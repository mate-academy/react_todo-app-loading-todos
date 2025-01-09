import classNames from "classnames"
import React, { useState } from "react";
import { Todo } from "../../types/Todo";
import { postTodo, updateTodo, USER_ID } from "../../api/todos";

type Props = {
    todos: Todo[];
    setIsLoading: (newValue: boolean) => void
    setTodos: (updater: ((todos: Todo[]) => Todo[]) | Todo[]) => void;
    setError: (newError: string) => void
}

export const Header: React.FC <Props>= ({todos, setIsLoading, setTodos, setError}) => {
    const [query, setQuery] = useState('');

    const onToggle = () => {
        const allCompleted = todos.every(todo => todo.completed);
    
        const updatedTodos = todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        }));
    
        setIsLoading(true);
    
        Promise.all(
          updatedTodos.map(todo =>
            updateTodo(todo.id, { completed: todo.completed })
          ),
        )
          .then(() => {
            setTodos(updatedTodos);
          })
          .catch(() => setError('cannot togle todos'))
          .finally(() => setIsLoading(false));
      };
    
      const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newTodo = {
          userId: USER_ID,
          title: query,
          completed: false,
        };
    
        setIsLoading(true);
        postTodo(newTodo)
          .then((createdTodo: Todo) => {
            setTodos(currentTodos => [...currentTodos, createdTodo]);
            setQuery('');
          })
          .catch(() => setError('cannot add todo'))
          .finally(() => setIsLoading(false));
      };

    return (
        <header className="todoapp__header">
                  <button
                    type="button"
                    className={classNames('todoapp__toggle-all', {
                      active: todos.every(todo => todo.completed),
                    })}
                    data-cy="ToggleAllButton"
                    onClick={onToggle}
                  />
        
                  <form onSubmit={event => onSubmit(event)}>
                    <input
                      data-cy="NewTodoField"
                      type="text"
                      className="todoapp__new-todo"
                      placeholder="What needs to be done?"
                      value={query}
                      onChange={event => setQuery(event.target.value)}
                    />
                  </form>
                </header>
    )
}