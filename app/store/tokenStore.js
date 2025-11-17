
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usetokenStore = create(persist((set) => ({
  token: "",
  
  // Add an item to the basket
  addToken: (token) => set({token:token}),
  

  // Clear all items from the basket
  clearToken: () => set({ token:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('IceCreamtoken-storage'); 
        set({ token: "" }); // Optionally reset the state too
   },
}),
{
    name: "IceCreamtoken-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usetokenStore;
