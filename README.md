# enjeu

The bridge between @vue/reactivity and react

```TSX
import { FC } from "react";
import { useVueRef, useVueRefs, useVueReactive } from "enjeu";
import { ref, reactive } from "@vue/reactivity";

// Ref's and reactive objects declares ONLY
// outside react functional component
// or in ReactContext
const counter = ref(0);
const store = reactive({
    counter: 0
});
const counters = [ref(0), ref(0)];

const App: FC = () => {
    useVueRef(counter);
    useVueRefs(counters);
    useVueReactive(store);

    return (
      <div>
        <div onClick={() => counter.value += 1}>Ref Counter: { counter.value }</div>
        <div onClick={() => counters[0].value += 1}>Refs Counters: { counters[0].value + " " + counters[1].value }</div>
        <div onClick={() => store.counter += 1}>Reactive counter: { store.counter }</div>
      </div>
    );
}

export default App;
```