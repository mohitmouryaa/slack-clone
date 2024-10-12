import { atom, useAtom } from "jotai";

const modalState = atom(false);

export default function useCreateWorkspaceModal() {
  return useAtom(modalState);
}
