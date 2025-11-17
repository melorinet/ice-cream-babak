
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usebasketUserCode = create(persist((set) => ({
  IceCreamBasketUserCode: 0,
  
  // Add an item to the basket
  addIceCreamBasketUserCode: (id) => set({IceCreamBasketUserCode:id}),
  

  // Clear all items from the basket
  clearIceCreamBasketUserCode: () => set({ IceCreamBasketUserCode:"" }),

  // Remove the entire storage item from localStorage
  resetStorageIceCream: () => {
    localStorage.removeItem('IceCreamBasketUserCode-storage'); 
        set({ IceCreamBasketUserCode: "" }); // Optionally reset the state too
   },
}),
{
    name: "IceCreamBasketUserCode-storage", // Name of the storage item in localStorage
    getStorage: () => localStorage, // Specify the storage to use (localStorage)
  }
));

export default usebasketUserCode;
