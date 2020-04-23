import { of } from "rxjs";
import { map } from "rxjs/operators";

export const basicObservableExample = {
  name: "Basic Observable",
  run: () => {
    const source = of("World").pipe(map(x => `Hello ${x}!`));

    return source;
  },
  description:
    "Creates a simple observable from a string, do a mapping and subscribe (log the result)."
}