import { Ref } from "@vue/reactivity";
import { isArray, isObject } from "@vue/shared";

export interface ReactiveObject {
  [key: string]: Record<any, any>;
}

export function traverse(value: ReactiveObject, seen = new Set()) {
  if (!isObject(value) || seen.has(value)) return value;

  seen.add(value);

  if (isArray(value)) {
    for (let i = 0; i < value.length; i++) traverse(value[i], seen);
  } else {
    for (const key of Object.keys(value)) traverse(value[key], seen);
  }
  return value;
}

export function traverseRefs<T>(
  value: Array<Ref<T>>,
  seen: Set<unknown> = new Set()
) {
  if (!isObject(value) || seen.has(value)) return value;
  seen.add(value);
  for (let i = 0; i < value.length; i++) traverseRef(value[i], seen);
  return value;
}

export function traverseRef<T>(value: Ref<T>, seen: Set<unknown>) {
  if (!isObject(value) || seen.has(value)) return value.value;
  seen.add(value.value);
  return value.value;
}
