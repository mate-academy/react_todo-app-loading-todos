import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from './Footer';
import { TodoList } from './TodoList';
import * as Interaction from '../api/todos';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  setError: (str: string) => void;
};

enum UpdateAll {
  completed = 'completed',
  active = 'active',
}

export const TodoApp: React.FC<Props> = ({ setError }) => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [editing, setEditing] = useState<Todo | null>(null);
  const [loadingTodo, setLoadingTodo] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [todosFormServer, setTodosFormServer] = useState<Todo[] | null>(null);
  const [updateAllTodos, setUpdateAllTodo] = useState<UpdateAll>(
    UpdateAll.completed,
  );

  const updateList = useCallback(() => {
    Interaction.getTodos()
      .then((serverTodos: Todo[] | null) => {
        setTodos(serverTodos);
        setTodosFormServer(serverTodos);
      })
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        setEditing(null);
        setLoadingTodo(false);
        setValue('');
        setActiveTodo(null);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, [setError]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  const addTodo = useCallback(
    (val: string) => {
      if (val) {
        setLoadingTodo(true);
        const newData: Omit<Todo, 'id'> = {
          userId: Interaction.USER_ID,
          title: val,
          completed: false,
        };

        Interaction.addTodo(newData)
          .catch(() => {
            setError('Unable to add a todo');
          })
          .finally(() => {
            updateList();
          });
      } else {
        setError('Title should not be empty');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    },
    [updateList, setError],
  );

  const updateTodo = useCallback(
    (newData: Todo) => {
      setLoadingTodo(true);
      Interaction.updateTodo(newData)
        .then(() => {})
        .catch(() => {
          setError('Unable to update a todo');
        })
        .finally(() => {
          updateList();
        });
    },
    [updateList, setError],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setLoadingTodo(true);
      Interaction.deleteTodo(id)
        .then(() => {})
        .catch(() => {
          setError('Unable to delete a todo');
        })
        .finally(() => {
          updateList();
        });
    },
    [updateList, setError],
  );

  const allUpdateList = useCallback(
    (oldTodos: Todo[] | null) => {
      if (oldTodos) {
        if (updateAllTodos === UpdateAll.completed) {
          oldTodos.map(todo => {
            if (todo.completed === false) {
              updateTodo({ ...todo, completed: true });
            }
          });
          setUpdateAllTodo(UpdateAll.active);
        } else {
          oldTodos.map(todo => {
            if (todo.completed === true) {
              updateTodo({ ...todo, completed: false });
            }
          });
          setUpdateAllTodo(UpdateAll.completed);
        }
      }
    },
    [updateAllTodos, updateTodo],
  );

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {todos && todos.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: updateAllTodos === UpdateAll.active,
            })}
            data-cy="ToggleAllButton"
            onClick={() => {
              allUpdateList(todosFormServer);
            }}
          />
        )}

        {/* Add a todo on form submit */}
        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo(value);
          }}
        >
          <input
            data-cy="NewTodoField"
            type="text"
            autoFocus
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      </header>

      {todos && (
        <TodoList
          todos={todos}
          updateTodo={prev => updateTodo(prev)}
          deleteTodo={prev => deleteTodo(prev)}
          editing={editing}
          setEditing={prev => setEditing(prev)}
          loadingTodo={loadingTodo}
          setActiveTodo={prev => setActiveTodo(prev)}
          activeTodo={activeTodo}
        />
      )}

      {todosFormServer && todosFormServer.length > 0 && (
        <Footer
          todosFormServer={todosFormServer}
          setTodos={prev => setTodos(prev)}
          updateList={() => updateList()}
          deleteTodo={prev => deleteTodo(prev)}
        />
      )}
    </div>
  );
};
