'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useReviewStore } from '@/store/reviewStore';
import { useQuestionStore } from '@/store/questionStore';
import { useSettingsStore } from '@/store/settingsStore';

/**
 * Componente para hidratar los stores de Zustand con persist
 * Solo se ejecuta en el cliente para evitar errores de SSR
 */
export default function StoreHydration() {
  useEffect(() => {
    // Hidratar stores solo en el cliente
    if (typeof window !== 'undefined') {
      useCartStore.persist.rehydrate();
      useWishlistStore.persist.rehydrate();
      useReviewStore.persist.rehydrate();
      useQuestionStore.persist.rehydrate();
      useSettingsStore.persist.rehydrate();
    }
  }, []);

  return null;
}
