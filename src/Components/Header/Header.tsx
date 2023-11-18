import { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import { getTodosByStatus } from "../../api/todos";
import { USER_ID } from "../../App";
import { Errors } from "../../types/Errors";

type Props = {
  setError: React.Dispatch<React.SetStateAction<Errors | null>>,
}

export const Header: React.FC<Props> = ({setError}) => {
  const [active, setActive] = useState<Todo[]>([]);

  useEffect(() => {
    getTodosByStatus(USER_ID, false)
      .then(setActive)
      .catch(() => setError(Errors.LoadError));
  }, [])

  return (
    <header className="todoapp__header">
      {active.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  )
}
