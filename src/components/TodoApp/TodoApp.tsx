import {
  useContext, useMemo, useState,
} from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';
import { ErrorMessage } from '../ErrorMessage';
import { TodoItem } from '../TodoItem';
import { Header } from '../Header';
import { Footer } from '../Footer';

function filterTodos(todos: Todo[], filterOpitons: FilterOptions) {
  switch (filterOpitons) {
    case FilterOptions.Active:
      return todos.filter(({ completed }) => !completed);

    case FilterOptions.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return [...todos];
  }
}

export const TodoApp = () => {
  const {
    errorMessage: contextErrorMessage,
    filterOptions,
    todos,
    dispatch,
  } = useContext(TodosContext);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState(contextErrorMessage);
  const filteredTodos = useMemo(() => filterTodos(todos, filterOptions),
    [todos, filterOptions]);

  const handleErrorHiding = () => {
    if (errorMessage) {
      if (contextErrorMessage) {
        dispatch({
          type: TodoAction.SetError,
          errorMessage: '',
        });
      }

      setErrorMessage('');
    }
  };

  if (contextErrorMessage && errorMessage !== contextErrorMessage) {
    setErrorMessage(contextErrorMessage);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          setTempTodo={setTempTodo}
          tempTodo={tempTodo}
          setErrorMessage={setErrorMessage}
        />

        <TodoList todos={filteredTodos} />

        {tempTodo
          && (
            <TodoItem todo={tempTodo} isLoading />
          )}

        {!!todos.length
          && (
            <Footer />
          )}
      </div>

      <ErrorMessage
        isErrorShown={!!errorMessage}
        errorMessage={errorMessage}
        onErrorHiding={handleErrorHiding}
      />

    </div>
  );
};
