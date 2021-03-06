var client = require('../lib/beanstalk_client').Client;

client.connect('127.0.0.1:11300', function(err, conn) {
  var job_data = {"data": {"name": "node-beanstalk-client"}};
  conn.put(0, 0, 1, JSON.stringify(job_data), function(err, job_id) {
    console.log('put job: ' + job_id);

    conn.reserve(function(err, job_id, job_json) {
      console.log('got job: ' + job_id);
      console.log('got job data: ' + job_json);
      console.log('module name is ' + JSON.parse(job_json).data.name);
      conn.destroy(job_id, function(err) {
	console.log('destroyed job');
      });
    });

  });
});
