import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const exists = get().wishlist.find((item) => item.id === product.id);
        if (exists) {
          set({
            wishlist: get().wishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            wishlist: [...get().wishlist, product],
          });
        }
      },

      isInWishlist: (productId) =>
        get().wishlist.some((item) => item.id === productId),
    }),
    {
      name: 'wishlist-storage', // nombre de la key en localStorage
      skipHydration: true,      // 👈 igual que en tu cartStore
    }
  )
);
