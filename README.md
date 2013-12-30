# godot-redis
Monitor your Redis, damn it.

## Installation

```bash
npm install godot-redis
```

## Usage
```js
var godot = require('godot');
var RedisProducer = require('godot-redis');

godot.createClient({
  type: 'tcp',
  producers: [
    RedisProducer({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      ttl: 1000
    })
  ]
}).connect(1337);
```
