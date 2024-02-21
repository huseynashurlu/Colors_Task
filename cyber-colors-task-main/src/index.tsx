import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { items } from './data/data';
import { App } from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App items={items} />
  </StrictMode>
);
