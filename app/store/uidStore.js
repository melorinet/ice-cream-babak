
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useuidStore = create(persist((set) => ({
  Uid: "",
  
  // Add an item to the basket
  addUId: (id) => set({Uid:id}),
  

  // Clear all items from the basket
  clearUId: () => set({ Uid:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('IceCreamuid-storage'); 
        set({ Uid: "" }); // Optionally reset the state too
   },
}),
{
    name: "IceCreamuid-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useuidStore;
