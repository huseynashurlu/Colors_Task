// App.tsx
import { FC, Fragment, useState, useCallback } from 'react';
import './style.css';
import Item from './components/Item/Item';

interface ListItem {
  name: string;
  color: string;
  selected: boolean;
}

export const App: FC<{ items: ListItem[] }> = ({ items: originalItems = [] }) => {
  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);
  const [items, setItems] = useState<ListItem[]>(originalItems);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleItemClick = useCallback(
    (clickedItem: ListItem) => {
      setSelectedItems((prevItems) => {
        const index = prevItems.findIndex((item) => item.name === clickedItem.name);

        if (index !== -1) {
          const updatedItems = [...prevItems];
          updatedItems.splice(index, 1);
          return updatedItems;
        } else {
          return [...prevItems, { ...clickedItem, selected: true }];
        }
      });
    },
    []
  );

  // Bütün elementləri seçmək üçün metod
  const handleSelectAll = useCallback(() => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.length === items.length) {
        return [];
      } else {
        return items.map((item) => ({ ...item, selected: true }));
      }
    });
  }, [items]);

  // Axtarış üçün metod
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase());
    const filteredItems = originalItems.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setItems(filteredItems);
  }, [originalItems]);

  // Axtarışın nəticəsini təmizləmək üçün metod
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setItems(originalItems);
  }, [originalItems]);

  return (
    <Fragment>
      <div style={{display:"flex",justifyContent: "space-between",padding: "20px 0"}}>
      <div>
        <button className='List_toggle_button' onClick={handleSelectAll}>
          {selectedItems.length === items.length ? 'Unselect All' : 'Select All'}
        </button>
      </div>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>
      </div>
      <div className='List_selected_items_name'>
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => <span key={item.name}>{item.name}</span>)
        ) : (
          'No items...'
        )}
      </div>
      <ul className='List'>
        {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            color={item.color}
            selected={selectedItems.some((selectedItem) => selectedItem.name === item.name)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </ul>
    </Fragment>
  );
};
