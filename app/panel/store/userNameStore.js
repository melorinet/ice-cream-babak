
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useuserNameStore = create(persist((set) => ({
  MelouserName: "",
  
  // Add an item to the basket
  addUserName: (uname) => set({MelouserName:uname}),
  

  // Clear all items from the basket
  clearUserName: () => set({ MelouserName:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('MelouserName-storage'); 
        set({ MelouserName: "" }); // Optionally reset the state too
   },
}),
{
    name: "MelouserName-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default useuserNameStore;
