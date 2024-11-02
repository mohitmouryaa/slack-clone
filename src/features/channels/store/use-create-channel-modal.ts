import { atom, useAtom } from "jotai";

const modalState = atom(false);

export default function useCreateChannelModal() {
  return useAtom(modalState);
}
