import classNames from 'classnames';

type Props = {
  title: string;
  id: number;
  handleFiltering: (title: string, id: number) => void;
  isActive: boolean;
  setStatusId: (
    value: React.SetStateAction<{
      id: number;
      isActive: boolean;
    }>,
  ) => void;
};

export const FilterButtons: React.FC<Props> = ({
  title,
  handleFiltering,
  id,
  isActive,
}) => {
  return (
    <a
      href="#/"
      data-cy={`FilterLink${title}`}
      className={classNames('filter__link', { selected: isActive })}
      onClick={() => handleFiltering(title, id)}
    >
      {title}
    </a>
  );
};
