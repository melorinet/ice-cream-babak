
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usephoneNumStore = create(persist((set) => ({
  MelophoneNum: "",
  
  // Add an item to the basket
  addPhoneNum: (num) => set({MelophoneNum:num}),
  

  // Clear all items from the basket
  clearPhoneNum: () => set({ MelophoneNum:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('MelophoneNum-storage'); 
        set({ MelophoneNum: "" }); // Optionally reset the state too
   },
}),
{
    name: "MelophoneNum-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usephoneNumStore;
