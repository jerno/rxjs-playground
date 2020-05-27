import { examples } from "./examples";
import { Subscription } from "rxjs";

(<any>window).unsubscribeAll = () => {
  logTask("Unsubscribe all");
  for (let subscription of subscriptions) {
    subscription.unsubscribe();
  }
  logStatuses();
};

(<any>window).statusAll = () => {
  logStatuses();
};

const subscriptions: Subscription[] = [];

for (let key in examples) {
  let div = document.createElement("div");
  const exampleId = (new Date()).getTime();
  div.classList.add(`example-${exampleId}`);

  let title = document.createElement("h2");
  title.innerHTML = key;
  div.append(title);

  if (examples[key].description) {
    let textElement = document.createElement("p");
    textElement.style.cssText = "color: grey;";
    textElement.innerHTML = examples[key].description;
    div.append(textElement);
  }

  if (examples[key].explanation) {
    let textElement = document.createElement("p");
    textElement.style.cssText = "color: green;";
    textElement.innerHTML = examples[key].explanation;
    div.append(textElement);
  }

  if (examples[key].interactive) {
    let textElement = document.createElement("p");
    textElement.style.cssText = "color: blue;";
    textElement.innerHTML = `This example is interactive: ${examples[key].interactive}`;
    div.append(textElement);
  }

  let ctx;

  const logger = {
    log: (args) => console.log(`│   ├── [Info]`, ...args),
    logAs: (t, args) => console.log(`│   ├── [${t}]`, ...args),
    logSub: (level, args) => {
      const subLevels = "│   ".repeat(level + 1);
      console.log(`${subLevels}├── [Info]`, ...args);
    },
  };

  const subscribtionHelper = {
    doSubscribe: (obs$) => {
      console.log(`│   │   ├── [Info] New subscriber`);
      const s = obs$.subscribe(
        (value) => console.log(`│   │   ├── [Output] ${value}`),
        (error) => console.log(`│   │   ├── [Error] ${error}`),
        () => /**/ console.log(`│   │   └── Exited`)
      );
      subscriptions.push(s);
      logStatuses();
    },
    doPopSubscribtion: () => {
      console.log(`│   │   ├── [Info] Remove a subscriber`);
      const s = subscriptions.pop();
      s ? s.unsubscribe() : null;
      logStatuses();
    }
  };

  const buildContext = () => ({
    ...(examples[key].init || noop)(),
    ...subscribtionHelper,
    logger,
  });

  let btn = document.createElement("button");
  btn.innerHTML = `Run scenario`;
  btn.onclick = () => {
    logTask(key);
    debugger;

    ctx = buildContext();
    const observable = examples[key].run(ctx);
    for(let element of Array.from(document.querySelectorAll(`.example-${exampleId} button.interaction`))) {
      (element as any).disabled = false;
    }

    const s = observable.subscribe(
      (value) => console.log(`│   ├── [Output] ${value}`),
      (error) => console.log(`│   ├── [Error] ${error}`),
      () => /**/ console.log(`│   └── Exited`)
    );
    subscriptions.push(s);
    logStatuses();
  };
  div.append(btn);

  if (examples[key].interactions) {
    div.append(" | interactions: ");
  }

  for (let interaction of examples[key].interactions) {
    let btnInteraction = document.createElement("button");
    btnInteraction.innerHTML = interaction.label;
    btnInteraction.disabled = true;
    btnInteraction.classList.add('interaction');
    btnInteraction.style.cssText =
      "background-color: #0000ff82;border: 1px solid #0000ff69;";
    btnInteraction.onclick = () => {
      interaction.run(ctx);
    };
    div.append(btnInteraction);
  }

  document.getElementById("examples").append(div);
}

function logStatuses() {
  console.log(`│       (${status()})`);
}

function logTask(taskName: string) {
  console.log(`├── Running: ${taskName}`);
}

function status() {
  const open = subscriptions.filter((s) => !s.closed);
  const stopped = subscriptions.filter((s) => s.isStopped);
  return `${open.length} Open, ${stopped.length} Stopped, ${subscriptions.length} Total`;
}

function noop() {}
