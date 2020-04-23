import { Subject } from "rxjs";

export const simpleSubjectExample = {
  name: "Simple Subject with delayed value",
  init: () => {
    const subject$ = new Subject<number>();
    return {
      subject$,
      n: 0
    };
  },
  run: ctx => {
    const result = ctx.subject$;

    window.setTimeout(() => {
      ctx.subject$.next("Delayed value");
    }, 2000);

    return result;
  },
  interactions: [
    {
      label: "Publish a value",
      run: ctx => {
        ctx.subject$.next(`User generated value ${++ctx.n}`);
      }
    }
  ],
  description:
    "Creates a Subject, publishes a single value (2s later) and subscribe (log the result).",
  interactive: "You can push a new value to the Subject using the «Publish a value» button"
}