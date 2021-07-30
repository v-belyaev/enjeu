import { effect, Ref, stop } from "@vue/reactivity";
import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";

export const useVueRef = <T>(item: Ref<T>) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const runner = effect(() => item.value, {
      scheduler() {
        forceUpdate();
      },
    });

    return () => stop(runner);
  }, [item, forceUpdate]);
};
