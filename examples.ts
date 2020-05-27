import { Example } from './example';
import { Observable, Subject, of, interval, from } from "rxjs";
import { map, mergeMap, take, tap, switchMap } from "rxjs/operators";


export const examples: { [name: string]: Example } = {};

import { observableMultiSubscriberExample } from './examples/observableMultiSubscriber';
addExample(observableMultiSubscriberExample);

import { switchMapExample } from './examples/switchMap';
addExample(switchMapExample);

import { limitedSubjectExample } from './examples/subjectLimited';
addExample(limitedSubjectExample);

import { simpleSubjectExample } from './examples/subjectSimple';
addExample(simpleSubjectExample);

import { mergeMapExample } from './examples/mergeMap';
addExample(mergeMapExample);

import { observableCompleteExample } from './examples/observableComplete';
addExample(observableCompleteExample);

import { customObservableExample } from './examples/observableCustom';
addExample(customObservableExample);

import { basicObservableExample } from './examples/observableBasic';
addExample(basicObservableExample);

function addExample(example: Example) {
  examples[example.name] = {
    ...example,
    interactions: example.interactions || []
  };
}
