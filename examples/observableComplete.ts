import { Observable } from "rxjs";

export const observableCompleteExample = {
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
}