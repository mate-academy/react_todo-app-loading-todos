import { useContext } from 'react';
import { Footer } from '../Footer/Footer';
import { TodosList } from '../TodosList/TodosList';
import { ErrorComponent } from '../errorComponent/ErrorComponent';
import { TodosContext } from '../../contexts/TodosContext';
import { prepareTodosList } from '../../services/prepareTodosList';
import { Header } from '../Header/Header';

export const TodoApp = () => {
  const { todos, filterField } = useContext(TodosContext);
  const preparedTodosList = prepareTodosList(todos, filterField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length
          && <TodosList todos={preparedTodosList} />}

        {!!todos.length
          && <Footer />}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorComponent />
    </div>
  );
};
