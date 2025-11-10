import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address, PaymentMethod, Order } from '@/types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (addressId: string, address: Partial<Address>) => void;
  removeAddress: (addressId: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  updatePaymentMethod: (methodId: string, method: Partial<PaymentMethod>) => void;
  removePaymentMethod: (methodId: string) => void;
  addOrder: (order: Order) => void;
}

// Usuario de ejemplo para desarrollo
const mockUser: User = {
  id: '1',
  email: 'usuario@example.com',
  firstName: 'Usuario',
  lastName: 'Demo',
  phone: '+57 300 123 4567',
  addresses: [
    {
      id: '1',
      fullName: 'Usuario Demo',
      street: 'Carrera 7 #12-34',
      city: 'Bogotá',
      state: 'Cundinamarca',
      postalCode: '110111',
      country: 'Colombia',
      phone: '+57 300 123 4567',
      isDefault: true,
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      cardLastFour: '4242',
      cardBrand: 'Visa',
      expiryDate: '12/25',
      isDefault: true,
    },
  ],
  wishlist: [],
  orders: [],
  createdAt: new Date(),
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulación de login - en producción conectar con API real
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, address],
            },
          };
        });
      },

      updateAddress: (addressId, address) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) =>
                addr.id === addressId ? { ...addr, ...address } : addr
              ),
            },
          };
        });
      },

      removeAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.filter((addr) => addr.id !== addressId),
            },
          };
        });
      },

      addPaymentMethod: (method) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: [...state.user.paymentMethods, method],
            },
          };
        });
      },

      updatePaymentMethod: (methodId, method) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: state.user.paymentMethods.map((m) =>
                m.id === methodId ? { ...m, ...method } : m
              ),
            },
          };
        });
      },

      removePaymentMethod: (methodId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: state.user.paymentMethods.filter((m) => m.id !== methodId),
            },
          };
        });
      },

      addOrder: (order) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              orders: [order, ...state.user.orders],
            },
          };
        });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
