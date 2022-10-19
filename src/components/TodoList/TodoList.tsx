import React, { useState } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (todos: (Todo[] | ((prevTodos: Todo[]) => Todo[]))) => void;
  filterType: string;
  setErrorType: (errorType: string) => void;
};

export const TodoList: React.FC<Props>
  = ({
    todos,
    setTodos,
    filterType,
    setErrorType,
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    let filteredTodos = [];

    const temp = {
      id: 0,
      title: '',
    };

    switch (filterType) {
      case FilterType.completed:
        filteredTodos = todos.filter((todo) => todo.completed);
        break;

      case FilterType.active:
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return (
      <section className="todoapp__main" data-cy="TodoList">
        <TransitionGroup>
          {filteredTodos.map((todo: Todo) => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={300}
                classNames="item"
              >
                <TodoItem
                  todos={todos}
                  todo={todo}
                  setTodos={setTodos}
                  key={todo.id}
                  setErrorType={setErrorType}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </CSSTransition>
            );
          })}

          {isLoading && (
            <CSSTransition
              key={0}
              timeout={300}
              classNames="item"
            >
              <div
                data-cy="Todo"
                className="todo"
                key={temp.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>
                <span data-cy="TodoTitle" className="todo__title">
                  {temp.title}
                </span>
                <div
                  data-cy="TodoLoader"
                  className="modal overlay is-active"
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </section>
    );
  };
