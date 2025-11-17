
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useoffIdStore = create(persist((set) => ({
  offIceCreamId: "",
  
  // Add an item to the basket
  addoffIceCreamId: (id) => set({offIceCreamId:id}),
  

  // Clear all items from the basket
  clearoffIceCreamId: () => set({ offIceCreamId:"" }),

  // Remove the entire storage item from localStorage
  resetStorageoffId: () => {
    localStorage.removeItem('offIceCreamId-id-storage'); 
        set({ offIceCreamId: "" }); // Optionally reset the state too
   },
}),
{
    name: "offIceCreamId-id-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useoffIdStore;
