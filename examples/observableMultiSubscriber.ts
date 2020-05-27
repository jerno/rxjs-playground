import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const observableMultiSubscriberExample = {
  name: "Observable with multiple subscriber",
  run: (ctx) => {
    const runner = new ObservableMultiSubscriberExample(ctx);
    const source = Observable.create(observer => {
      observer.next(runner.performHeavyConstruction());
    }).pipe(
      map(x => runner.performHeavyTransformation(x))
    );

    ctx.observable$ = source;

    return source;
  },
  interactions: [
    {
      label: "Subscribe with oberserver",
      run: (ctx) => {
        ctx.doSubscribe(
          ctx.observable$,
          value => ctx.logger.log(value)
        );
      }
    }
  ],
  description:
    "Creates a custom observable producing a \"heavy operation\", pipes the value using a \"heavy operation\" and subscribe (log the result).",
  explanation:
    'Note that the \"heavy operation\" is calculated each time a new observer subscribes.'
}

class ObservableMultiSubscriberExample {
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
  }

  public performHeavyConstruction() {
    const x = 3;

    this.ctx.logger.log(`Performing heavy construction: ${x}`);

    return x;
  }

  public performHeavyTransformation(x) {
    const y = x * x;
    this.ctx.logger.log(`Performing heavy transformation: ${x} -> ${y}`);

    return y;
  }
}
