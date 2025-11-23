
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usetokenStore = create(persist((set) => ({
  Melotoken: "",
  
  // Add an item to the basket
  addToken: (Melotoken) => set({Melotoken:Melotoken}),
  

  // Clear all items from the basket
  clearToken: () => set({ Melotoken:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('Melotoken-storage'); 
        set({ Melotoken: "" }); // Optionally reset the state too
   },
}),
{
    name: "Melotoken-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usetokenStore;
