import { of, interval, from } from "rxjs";
import { map, mergeMap, take } from "rxjs/operators";

export const mergeMapExample = {
  name: "Merge Observables",
  run: () => {
    const ticks$ = interval(1000);
    const data$ = of("one", "two", "three");

    const result = ticks$.pipe(
      take(4),
      mergeMap(tick => data$.pipe(map(data => `${data} - ${tick}`)))
    );

    return result;
  },
  description:
    "Creates two observables. One with 3 different values and an other generating number each 1s (Stops after 4 values), merges them and subscribe (log the result)."
}