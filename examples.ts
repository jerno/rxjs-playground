import { Example } from './example';

import { switchMapExample } from './examples/switchMap';
import { limitedSubjectExample } from './examples/subjectLimited';
import { simpleSubjectExample } from './examples/subjectSimple';
import { mergeMapExample } from './examples/mergeMap';
import { observableCompleteExample } from './examples/observableComplete';
import { customObservableExample } from './examples/observableCustom';
import { basicObservableExample } from './examples/observableBasic';

import { Observable, Subject, of, interval, from } from "rxjs";
import { map, mergeMap, take, tap, switchMap } from "rxjs/operators";


export const examples: { [name: string]: Example } = {};

addExample(switchMapExample);
addExample(limitedSubjectExample);
addExample(simpleSubjectExample);
addExample(mergeMapExample);
addExample(observableCompleteExample);
addExample(customObservableExample);
addExample(basicObservableExample);

function addExample(example: Example) {
  examples[example.name] = {
    ...example,
    interactions: example.interactions || []
  };
}
