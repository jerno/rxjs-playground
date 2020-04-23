import { Subject, interval } from "rxjs";
import { map, switchMap } from "rxjs/operators";

export const switchMapExample = {
  name: "SwitchMap demonstration",
  init: () => {
    const subject$ = new Subject<number>();
    return {
      subject$,
      n: 0
    };
  },
  run: ctx => {
    const ticks$ = interval(1000);
    const result = ctx.subject$.pipe(
      switchMap((n: number) => ticks$.pipe(
        map((t: number) => n * 100 + t)
      ))
    );

    return result;
  },
  interactions: [
    {
      label: "Change the base value",
      run: ctx => {
        ctx.subject$.next(++ctx.n);
      }
    }
  ],
  description: "Creates a Subject, maps a 1s timer on it and subscribe (log the result).",
  explanation: "By generating a new number, you can see that the original stream – which was still producing values – has been cancelled.",
  interactive: "You can change the base using the «Change the base value» button"
}