
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useuidStore = create(persist((set) => ({
  MeloUid: "",
  
  // Add an item to the basket
  addUId: (id) => set({MeloUid:id}),
  

  // Clear all items from the basket
  clearUId: () => set({ MeloUid:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('Melouid-storage'); 
        set({ MeloUid: "" }); // Optionally reset the state too
   },
}),
{
    name: "Melouid-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useuidStore;
