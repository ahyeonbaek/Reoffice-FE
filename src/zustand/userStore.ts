import { Reservation, User } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userState {
  user: User | null;
  isLoggedIn: boolean;

  setUser: (user: User) => void;
  updateUser: (updates: Partial<Omit<User, "id">>) => void;
  logout: () => void;

  addReservation: (reservation: Reservation) => void;
  updateReservation: (
    updates: Partial<Omit<Reservation, "id">> & { id: string }
  ) => void;
  deleteReservation: (reservation: Reservation) => void;
}

export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: true }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      logout: () => set({ user: null, isLoggedIn: false }),

      addReservation: (reservation) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                reservations: [...(state.user.reservations || []), reservation],
              }
            : null,
        })),
      updateReservation: (updates) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                reservations: state.user.reservations?.map((r) =>
                  r.id === updates.id ? { ...r, ...updates } : r
                ),
              }
            : null,
        })),
      deleteReservation: (reservation) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                reservations: state.user.reservations?.filter(
                  (r) => r.id !== reservation.id
                ),
              }
            : null,
        })),
    }),
    { name: "userStorage" }
  )
);

export default useUserStore;
