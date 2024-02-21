// Item.tsx
import { FC, memo } from 'react';

interface ItemProps {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

const Item: FC<ItemProps> = memo(({ name, color, selected, onClick }) => {
  return (
    <li
      className={`List__item List__item--${color} ${selected ? 'List__item--selected' : ''}`}
      onClick={onClick}
    >
      {name}
    </li>
  );
});

export default Item;
