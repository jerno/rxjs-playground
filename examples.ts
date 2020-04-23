import { Observable, Subject, of, interval, from } from "rxjs";
import { map, mergeMap, take, tap, switchMap } from "rxjs/operators";

interface Example {
  name: string;

  init?: any;
  run: any;
  interactions?: any[];

  description?: string;
  explanation?: string;
  interactive?: string;
}

export const examples: { [name: string]: Example } = {};

addExample({
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
});

addExample({
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
});

addExample({
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
});

addExample({
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
});

addExample({
  name: "Custom Observable with complete",
  run: () => {
    const source = Observable.create(observer => {
      observer.next(1);
      observer.complete();
    });

    return source;
  },
  description:
    "Creates a custom observable, emit a value and subscribe (log the result).",
  explanation: 'Note that the source has been "completed"'
});

addExample({
  name: "Custom Observable",
  run: () => {
    const source = Observable.create(observer => {
      observer.next(1);
    });

    return source;
  },
  description:
    "Creates a custom observable, emit a value and subscribe (log the result).",
  explanation:
    'Note that observer is still waiting for new values after the first value arrives. This is how Observables should work. If we would like to terminate it, we can either "complete" the source, or unsubscribe by the observer.'
});

addExample({
  name: "Basic Observable",
  run: () => {
    const source = of("World").pipe(map(x => `Hello ${x}!`));

    return source;
  },
  description:
    "Creates a simple observable from a string, do a mapping and subscribe (log the result)."
});

function addExample(example: Example) {
  examples[example.name] = {
    ...example,
    interactions: example.interactions || []
  };
}
