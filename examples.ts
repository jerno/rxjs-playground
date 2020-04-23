import { Observable, of, interval } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators'

export const examples: any = {};

addExample(
  "Merge Observables",
  () => {
    const ticks$ = interval(1000);
    const data$ = of('one', 'two', 'three');

    const result = ticks$.pipe(
      take(4),
      mergeMap(tick => data$.pipe(
        map(data => `${data} - ${tick}`)
      )),
    );

    return result;
  },
  'Creates two observables, merges them and subscribe (log the result).',
);

addExample(
  "Custom Observable with complete",
  () => {
    const source = Observable.create(observer => {
      observer.next(1);
      observer.complete();
    });

    return source;
  },
  'Creates a custom observable, emit a value and subscribe (log the result).',
  'Note that the source has been "completed"'
);

addExample(
  "Custom Observable",
  () => {
    const source = Observable.create(observer => {
      observer.next(1);
    });

    return source;
  },
  'Creates a custom observable, emit a value and subscribe (log the result).',
  'Note that observer is still waiting for new values after the first value arrives. This is how Observables should work. If we would like to terminate it, we can either "complete" the source, or unsubscribe by the observer.'
);

addExample(
  "Basic Observable",
  () => {
    const source = of("World").pipe(map(x => `Hello ${x}!`));

    return source;
  },
  'Creates a simple observable from a string, do a mapping and subscribe (log the result).',
);


function addExample(name: string, run: any, description?: string, explanation?: string) {
  examples[name] = {
    name,
    description,
    run,
    explanation,
  };
}