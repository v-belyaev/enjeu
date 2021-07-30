import { effect, isReactive, stop } from "@vue/reactivity";
import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { traverse, ReactiveObject } from "./traverse";

export const useVueReactive = <T extends object>(item: T) => {
  const forceUpdate = useForceUpdate();

  if (!isReactive(item)) {
    throw Error("Object is not reactive");
  }

  useEffect(() => {
    const runner = effect(() => traverse(item as ReactiveObject), {
      scheduler() {
        forceUpdate();
      },
    });

    return () => stop(runner);
  }, [forceUpdate, item]);
};
