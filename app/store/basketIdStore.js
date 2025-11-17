
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usebasketIdStore = create(persist((set) => ({
  IceCreamBasketId: "",
  
  // Add an item to the basket
  addIceCreamBasketId: (id) => set({IceCreamBasketId:id}),
  

  // Clear all items from the basket
  clearIceCreamBasketId: () => set({ IceCreamBasketId:"" }),

  // Remove the entire storage item from localStorage
  resetStorage: () => {
    localStorage.removeItem('IceCreamBasketId-storage'); 
        set({ IceCreamBasketId: "" }); // Optionally reset the state too
   },
}),
{
    name: "IceCreamBasketId-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usebasketIdStore;
