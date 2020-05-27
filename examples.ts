import { Example } from "./example";

export const examples: { [name: string]: Example } = {};

import { subjectPipeMulticastMultiSubscriberExample } from "./examples/subjectPipeMulticastMultiSubscriber";
addExample(subjectPipeMulticastMultiSubscriberExample);

import { subjectPipeMultiSubscriberExample } from "./examples/subjectPipeMultiSubscriber";
addExample(subjectPipeMultiSubscriberExample);

import { subjectMultiSubscriberExample } from "./examples/subjectMultiSubscriber";
addExample(subjectMultiSubscriberExample);

import { observableMultiSubscriberExample } from "./examples/observableMultiSubscriber";
addExample(observableMultiSubscriberExample);

import { switchMapExample } from "./examples/switchMap";
addExample(switchMapExample);

import { limitedSubjectExample } from "./examples/subjectLimited";
addExample(limitedSubjectExample);

import { simpleSubjectExample } from "./examples/subjectSimple";
addExample(simpleSubjectExample);

import { mergeMapExample } from "./examples/mergeMap";
addExample(mergeMapExample);

import { observableCompleteExample } from "./examples/observableComplete";
addExample(observableCompleteExample);

import { customObservableExample } from "./examples/observableCustom";
addExample(customObservableExample);

import { basicObservableExample } from "./examples/observableBasic";
addExample(basicObservableExample);

function addExample(example: Example) {
  examples[example.name] = {
    ...example,
    interactions: example.interactions || [],
  };
}
