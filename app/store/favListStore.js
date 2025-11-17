// /store/basketStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usefavListStore = create(persist((set) => ({
  FavItems: [],
  
  // Add an item to the basket
  addFavItem: (item) => set((state) => ({ items: [...state.items, item] })),
  
  // Update the entire items list
  updatefavItems: (newItems) => set({ items: newItems }),
  
  // Remove an item from the basket by its id
  removeFavItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  
  // Clear all items from the basket
  clearFavBasket: () => set({ items: [] }),

    // Remove the entire storage item from localStorage
    resetStorage: () => {
      localStorage.removeItem('faves-storage'); 
      set({ items: [] }); // Optionally reset the state too
 },
}),
{
  name: "faves-storage", // Name of the storage item in localStorage
  getStorage: () => localStorage, // Specify the storage to use (localStorage)
}
));

export default usefavListStore;
