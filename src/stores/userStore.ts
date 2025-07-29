import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface AuthUser {
  typ: string;
  name: string;
  sub: string;
  email: string;
  profile: string;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
        Cookies.set("authToken", JSON.stringify(user)); 
      },

      logout: () => {
        Cookies.remove("authToken");
        set({ user: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
