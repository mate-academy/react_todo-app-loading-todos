/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { Todos } from "./todos";

import * as todoService from "../api/todos";
import { TodoFooter } from "./todoFooter";
import { TodosContext } from "../services/Store";

const USER_ID = 116;

export const TodoApp: React.FC = () => {
  const {
    todos,
    filteredTodos,
    setTodos,
    isSubmiting,
    setIsSubmiting,
    loadErrorMessage,
    setLoadErrorMessage,
    isHidden,
    setIsHidden,
    allTodosButton,
    setAllTodosButton,
  } = useContext(TodosContext);

  const [title, setTitle] = useState("");

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const loadTodos = async () => {
    try {
      const todosFromServer = await todoService.getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setLoadErrorMessage("Unable to load todos");
      setIsHidden(false);
    } finally {
      setTimeout(() => {
        setIsHidden(true);
        setLoadErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  });

  function reset() {
    setTitle("");
  }

  const OnSubmit = (Eltitle: string): Promise<void> => {
    const createdTodo = {
      userId: USER_ID,
      title: Eltitle,
      completed: false,
      disabled: false,
    };

    setIsSubmiting(true);

    return todoService
      .addTodo(createdTodo)
      .then((newTodo) => {
        const copiedTodos = [...filteredTodos];
        const newTodos = copiedTodos.concat(newTodo);

        setTodos(newTodos);
      })
      .catch((error) => {
        setLoadErrorMessage("Unable to add a todo");
        setIsHidden(false);
        throw error;
      })
      .finally(() => {
        setIsSubmiting(false);
        setTimeout(() => {
          setIsHidden(true);
          setLoadErrorMessage("");
        }, 3000);
        reset();
      });
  };

  function handleSubmit() {
    OnSubmit(title);
  }

  const activeTodos = todos.every((todo) => todo.completed);

  const handleAllTodosButton = () => {
    setAllTodosButton(!allTodosButton);

    let copiedTodos = [...todos];

    if (allTodosButton || activeTodos) {
      copiedTodos = [...todos].map((todo) => {
        const todoItem = todo;

        todoItem.completed = false;

        return todoItem;
      });
    } else {
      copiedTodos = [...todos].map((todo) => {
        const todoItem = todo;

        todoItem.completed = true;

        return todoItem;
      });
    }

    setTodos(copiedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              className={cn("todoapp__toggle-all", {
                active: activeTodos,
              })}
              data-cy="ToggleAllButton"
              onClick={handleAllTodosButton}
            />
          )}

          <form method="POST" action="api/todos">
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              disabled={isSubmiting}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && title.trim().length > 0) {
                  event.preventDefault();
                  handleSubmit();
                } else if (event.key === "Enter" && title.trim().length === 0) {
                  event.preventDefault();
                  setIsHidden(false);
                  setLoadErrorMessage("Title shouldn't be empty");
                  setTimeout(() => {
                    setIsHidden(true);
                    setLoadErrorMessage("");
                  }, 3000);
                }
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <>
            <Todos />
            {todos.length > 0 && <TodoFooter />}
          </>
        </section>
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          "notification is-danger is-light has-text-weight-normal",
          { hidden: isHidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {loadErrorMessage}
        {/* <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
