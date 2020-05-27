import { Observable } from "rxjs";

export const customObservableExample = {
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
}