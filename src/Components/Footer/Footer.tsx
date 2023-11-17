import { useState } from "react";
import { getCompletedTodos } from "../../api/todos"
import { Errors } from "../../types/Errors"
import { Status } from "../../types/Status"
import { Todo } from "../../types/Todo";
import { TodosFilter } from "../TodosFilter"
import { USER_ID } from "../../App";

type Props = {
  filterStatus: Status,
  setFilterStatus: React.Dispatch<React.SetStateAction<Status>>,
  setError: React.Dispatch<React.SetStateAction<Errors | null>>
}

export const Footer: React.FC<Props> = ({ filterStatus, setFilterStatus, setError }) => {
  const [completed, setCompleted] = useState<Todo[]>([]);

  getCompletedTodos(USER_ID)
    .then(setCompleted)
    .catch(() => setError(Errors.LoadError));

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      <TodosFilter
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
        setError={setError}
      />

      {completed.length > 0 && <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>}
    </footer>
  )
}
