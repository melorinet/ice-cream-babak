// /store/basketStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBasketStore = create(persist((set) => ({
  itemsIceCream: [],
  
     // Add an item to the basket, ensuring no duplicates
     addNoRepeatedItem: (item) => set((state) => {
      // Check if the item already exists in the basket based on 'id' or other unique identifier
      const itemExists = state.itemsIceCream.some(existingItem => existingItem.id === item.id);
  
      // If the item doesn't exist, add it to the basket
      if (!itemExists) {
        return { itemsIceCream: [...state.itemsIceCream, item] };
      }
  
      // Return the state unchanged if the item already exists
      return state;
    }),
    
  // Add an item to the basket
  addItem: (item) => set((state) => ({ itemsIceCream: [...state.itemsIceCream, item] })),
  
  // Update the entire items list
  updateItems: (newItems) => set({ itemsIceCream: newItems }),
  
  // Remove an item from the basket by its id
  removeItem: (id) => set((state) => ({ itemsIceCream: state.itemsIceCream.filter((item) => item.id !== id) })),
  
  // Clear all items from the basket
  clearBasket: () => set({ itemsIceCream: [] }),

    // Remove the entire storage item from localStorage
    resetStorage: () => {
      localStorage.removeItem('basket-storage-IceCream'); 
      set({ itemsIceCream: [] }); // Optionally reset the state too
 },
}),
{
  name: "basket-storage-IceCream", // Name of the storage item in localStorage
  getStorage: () => localStorage, // Specify the storage to use (localStorage)
}
));

export default useBasketStore;
