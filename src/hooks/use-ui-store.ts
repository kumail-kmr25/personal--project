import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UiState = {
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      darkMode: false,
      mobileMenuOpen: false,
      setDarkMode: (darkMode) => set({ darkMode }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: 'kumail-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ darkMode: state.darkMode }),
    },
  ),
);
