import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Runner } from "./Runner";

export const subjectPipeMultiSubscriberExample = {
  name: "Subject|transform with multiple subscriber",
  run: (ctx) => {
    const runner = new Runner(ctx);
    const source = new Subject();

    const pipedSource = source.pipe(
      map((x) => runner.performHeavyTransformation(x))
    );

    ctx.runner = runner;
    ctx.source$ = pipedSource;
    return pipedSource;
  },
  interactions: [
    {
      label: "Publish a value",
      run: (ctx) => {
        ctx.source$.next(ctx.runner.performHeavyConstruction());
      },
    },
    {
      label: "Subscribe +",
      run: (ctx) => {
        ctx.doSubscribe(ctx.source$);
      },
    },
  ],
  description:
    'Creates a custom observable producing a "heavy operation", pipes the value using a "heavy operation" and subscribe (log the result).',
  explanation:
    'Note that the "heavy operation" is calculated each time a new observer subscribes.',
  interactive: "You can push a new value to the Subject using the «Publish a value» button. Also, you can manage subscribtions on the observable using the «Subscribe+ » and «Unubscribe- »."
};
