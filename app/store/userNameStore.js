
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useuserNameStore = create(persist((set) => ({
  userName: "",
  
  // Add an item to the basket
  addUserName: (uname) => set({userName:uname}),
  

  // Clear all items from the basket
  clearUserName: () => set({ userName:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('userName-storage'); 
        set({ userName: "" }); // Optionally reset the state too
   },
}),
{
    name: "userName-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useuserNameStore;
