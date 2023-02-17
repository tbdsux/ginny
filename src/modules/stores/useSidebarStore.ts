import { create } from "zustand";

interface SidebarManagerProps {
  open: boolean;
  toggle: () => void;
}

const useSidebarStore = create<SidebarManagerProps>()((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open })),
}));

export default useSidebarStore;
