import { Subject } from "rxjs";
import { take } from "rxjs/operators";


export const limitedSubjectExample = {
  name: "Simple Subject limited to 4",
  init: () => {
    const subject$ = new Subject<number>();
    return {
      subject$,
      n: 0
    };
  },
  run: ctx => {
    const result = ctx.subject$.pipe(take(4));

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
    "Creates a Subject and subscribe (log the result). Stops after 4 values.",
  interactive: "You can push a new value to the Subject using the «Publish a value» button"
}