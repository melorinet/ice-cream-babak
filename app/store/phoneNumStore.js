
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usephoneNumStore = create(persist((set) => ({
  phoneNum: "",
  
  // Add an item to the basket
  addPhoneNum: (num) => set({phoneNum:num}),
  

  // Clear all items from the basket
  clearPhoneNum: () => set({ phoneNum:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('phoneNum-storage'); 
        set({ phoneNum: "" }); // Optionally reset the state too
   },
}),
{
    name: "phoneNum-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usephoneNumStore;
