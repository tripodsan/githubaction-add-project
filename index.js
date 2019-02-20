const fs = require('fs');
console.log('hello');

console.log(process.env);


const p = process.env.GITHUB_EVENT_PATH;
console.log('event:')
if (p) {
  const event = fs.readFileSync(p, 'utf-8');
  console.log(event);
}

