var twitter = require('twitter');
var confu = require('confu');
var screen_name = 'albNo273';
var defaultName = 'Albireo';

var conf = confu('.', 'config', 'key.json');
var client = new twitter({
	consumer_key: conf.test.cons_key,
	consumer_secret: conf.test.cons_sec,
	access_token_key: conf.test.acc_token,
	access_token_secret: conf.test.acc_token_sec
});

console.log('starting update_name for @' + screen_name);
client.stream('statuses/filter', { track: screen_name }, function (stream) {
	stream.on('data', function (tweet) {
		var text = tweet.text;
		var reg = new RegExp("^@" + screen_name + "[ 　]update_name[ 　](.+)");
		var res = text.match(reg);

		if (res) {
			var newname = res[1].replace(/[@＠]/g, "");
			newname = newname.slice(0, 20);
			if (newname === 'reset') {
				newname = defaultName;
			}

			client.post('account/update_profile', { name: newname }, function (err, rep) {
				if (!err) {
					var message = '.@' + tweet.user.screen_name + ' さんにより 『' + newname + '』になりました!';
					client.post('statuses/update', { status: message, in_reply_to_status_id: tweet.id_str }, function (err, rep) {
						if (!err)
							console.log('Tweet succeeded.');
						else
							console.log(err);
					});
				} else
					console.log(err);
			});
		}
	});


	stream.on('error', function (error) {
		console.log(error);
	});
});