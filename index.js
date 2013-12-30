var redis = require('redis');
var redisInfo = require('redis-info');
var producer = require('godot-producer');

var RedisProducer = module.exports = producer(
  function constructor(options) {
    var self = this;

    self.redis = redis.createClient(options.redis);
  },
  function produce() {
    var self = this;

    self.redis.info(function (err, info) {
      var parsed = redisInfo.parse(info);

      self.emit('data', {
        service: 'redis/clients',
        description: 'Clients connected',
        metric: parseInt(parsed.fields.connected_clients, 10)
      });

      self.emit('data', {
        service: 'redis/blocked-clients',
        description: 'Clients waiting for a blocking operation to finish',
        metric: parseInt(parsed.fields.blocked_clients, 10)
      });

      self.emit('data', {
        service: 'redis/rejected-connections',
        description: 'Clients rejected due to limit of clients',
        metric: parseInt(parsed.fields.rejected_connections, 10)
      });

      self.emit('data', {
        service: 'redis/ops-per-sec',
        description: 'Operations per second',
        metric: parseInt(parsed.fields.instantaneous_ops_per_sec, 10)
      });

      self.emit('data', {
        service: 'redis/slaves',
        description: 'Slaves connected',
        metric: parseInt(parsed.fields.connected_slaves, 10)
      });
    });
  }
);
