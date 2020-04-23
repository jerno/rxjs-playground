import { examples } from './examples';

const subscriptions = [];

for(let key in examples) {
  let div = document.createElement('div');

  let title = document.createElement('h2');
  title.innerHTML = key;
  div.append(title);
  
  if(examples[key].description) {
    let description = document.createElement('p');
    description.style.cssText = "color: grey;";
    description.innerHTML = examples[key].description;
    div.append(description);
  }

  if(examples[key].explanation) {
    let explanation = document.createElement('p');
    explanation.style.cssText = "color: green;";
    explanation.innerHTML = examples[key].explanation;
    div.append(explanation);
  }

  let btn = document.createElement('button');
  btn.innerHTML = `Run ${key}`;
  btn.onclick = () => {
    console.log(`├── Running example: ${key}`);

    const s = examples[key].run().subscribe(
      value => console.log(`│   ├── ${value}`),
      error => console.log(`│   ├── [Error] ${error}`),
      () =>    console.log(`│   └── Exited`),
    );
    subscriptions.push(s);
    console.log(`│       (${status()})`);
  };
  div.append(btn);

  document.getElementById('examples').append(div);
}

function status() {
  const open = subscriptions.filter(s => !s.closed);
  const stopped = subscriptions.filter(s => s.isStopped);
  return `${open.length} Open, ${stopped.length} Stopped, ${subscriptions.length} Total`;
}