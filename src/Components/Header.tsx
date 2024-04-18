import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from './TodoContext';
import { todoPattern } from './TodoContext';
import classNames from 'classnames';
import { addTodo, updateTodo } from '../api/todos';

export const Header = () => {
  const {
    todosList,
    setTodosList,
    newTodo,
    setNewTodo,
    setErrorMessage,
    setNewTodosProcessing,
  } = useContext(TodoContext);

  const headerInput = useRef<HTMLInputElement>(null);

  const isAllComplete =
    todosList.length === todosList.filter(todo => todo.completed).length;

  useEffect(() => {
    if (headerInput.current) {
      headerInput.current.focus();
    }
  }, [todosList]);

  const editNewTodo = (event: React.FocusEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setNewTodo({
      ...newTodo,
      title: event.currentTarget.value,
    });
  };

  const resetNewTodo = () => {
    setNewTodo({
      ...todoPattern,
      id: +new Date(),
    });
  };

  const handleSubmitOfNewTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      setNewTodosProcessing(true);

      if (!newTodo.title.trim()) {
        setErrorMessage('Title should not be empty');
      }

      if (!!newTodo.title.trim()) {
        const { title, userId, completed } = newTodo;

        addTodo({
          title: title.trim(),
          completed: completed,
          userId: userId,
        })
          .then(() => {
            setTodosList([...todosList, newTodo]);
          })
          .catch(() => setErrorMessage('Unable to add a todo'))
          .finally(() => {
            resetNewTodo();
            setNewTodosProcessing(false);
          });
      }
    }
  };

  const allCompleteCheck = () => {
    if (!todosList.length) {
      return false;
    }

    return isAllComplete;
  };

  function toggleAll(condition: boolean) {
    todosList.map(todo => {
      const targetTodo = todosList.find(item => item.id === todo.id);

      if (targetTodo) {
        targetTodo.completed = condition;
      }
    });
  }

  const handletoggleAll = () => {
    if (!allCompleteCheck()) {
      toggleAll(true);

      todosList.map(todo =>
        updateTodo({ ...todo })
          .then(() => {
            setTodosList(
              todosList.map(item =>
                item.id === todo.id ? { ...todo, completed: true } : item,
              ),
            );
          })
          .catch(() => setErrorMessage('Unable to update a todos')),
      );
    } else {
      toggleAll(false);

      todosList.map(todo =>
        updateTodo({ ...todo })
          .then(() => {
            setTodosList(
              todosList.map(item =>
                item.id === todo.id ? { ...todo, completed: false } : item,
              ),
            );
          })
          .catch(() => setErrorMessage('Unable to update a todos')),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {!!todosList.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleteCheck(),
          })}
          data-cy="ToggleAllButton"
          onClick={handletoggleAll}
        />
      )}

      <form>
        <input
          ref={headerInput}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo.title}
          onChange={editNewTodo}
          onKeyDown={handleSubmitOfNewTodo}
        />
      </form>
    </header>
  );
};
