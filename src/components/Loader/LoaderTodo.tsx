import { FC } from 'react';
interface IProps {
  loading: boolean;
}

export const LoaderTodo: FC<IProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </>
  );
};
