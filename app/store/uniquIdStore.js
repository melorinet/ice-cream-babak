
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUniquIdStore = create(persist((set) => ({
  uniqId: "",
  
  // Add an item to the basket
  addId: (id) => set({uniqId:id}),
  

  // Clear all items from the basket
  clearUniqId: () => set({ uniqId:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('unique-id-storage'); 
        set({ uniqId: "" }); // Optionally reset the state too
   },
}),
{
    name: "unique-id-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useUniquIdStore;
