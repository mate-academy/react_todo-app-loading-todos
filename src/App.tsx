import { TodoHeader } from './Components/Header/TodoHeader/TodoHeader';
import { TodoMain } from './Components/Main/TodoMain/TodoMain';
import { ErrorNotification } from
  './Components/ErrorNotification/ErrorNotification';
import { useTodoContext } from './Context/Context';
import { TodoFooter } from './Components/Footer/TodoFooter/TodoFooter';

export const App: React.FC = () => {
  const { renderedTodos } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoHeader />
      <div className="todoapp__content">
        <TodoMain />

        {renderedTodos.length !== 0 && <TodoFooter />}
      </div>
      <ErrorNotification />
    </div>
  );
};
