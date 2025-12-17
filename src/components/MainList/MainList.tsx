import type { MainListType } from '../../types/MainListType';
import { MainItem } from '../MainItem/MainItem';
export const MainList = ({
  shownTodos,
  onUpdate,
  editFieldVal,
  onEditFieldVal,
  editInputVal,
  onEditInputVal,
  onEditHandle,
  onDelete,
  loadId,
  onLoadId,
  load,
  inputMainFocus,
}: MainListType) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {shownTodos.map(item => (
        <MainItem
          key={item.id}
          shownTodos={item}
          onUpdate={onUpdate}
          editFieldVal={editFieldVal}
          onEditFieldVal={onEditFieldVal}
          editInputVal={editInputVal}
          onEditInputVal={onEditInputVal}
          onEditHandle={onEditHandle}
          onDelete={onDelete}
          loadId={loadId}
          onLoadId={onLoadId}
          inputMainFocus={inputMainFocus}
        />
      ))}
      {load && <div className="loader" />}
    </section>
  );
};
