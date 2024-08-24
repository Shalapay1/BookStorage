
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import { createContext } from 'react';
import BookStore from './store/BookStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    book: new BookStore()
  }}>
    <App />
  </Context.Provider>
);

