import { effect, Ref, stop } from "@vue/reactivity";
import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { traverseRefs } from "./traverse";

export const useVueRefs = <T>(items: Array<Ref<T>>) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const runner = effect(() => traverseRefs(items), {
      scheduler() {
        forceUpdate();
      },
    });

    return () => stop(runner);
  }, [items, forceUpdate]);
};
