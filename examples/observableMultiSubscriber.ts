import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Runner } from "./Runner";

export const observableMultiSubscriberExample = {
  name: "Observable with multiple subscriber",
  run: (ctx) => {
    const runner = new Runner(ctx);
    const source = Observable.create((observer) => {
      observer.next(runner.performHeavyConstruction());
    }).pipe(map((x) => runner.performHeavyTransformation(x)));

    ctx.observable$ = source;
    return source;
  },
  interactions: [
    {
      label: "Subscribe +",
      run: (ctx) => {
        ctx.doSubscribe(ctx.observable$, (value) => ctx.logger.log(value));
      },
    },
  ],
  description:
    'Creates a custom observable producing a "heavy operation", pipes the value using a "heavy operation" and subscribe (log the result).',
  explanation:
    'Note that the "heavy operation" is calculated each time a new observer subscribes.',
  interactive: "You can subscribe to the observable one more time with an other observer."
};
