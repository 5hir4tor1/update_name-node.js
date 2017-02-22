const twitter = require('twitter'),
      confu = require('confu');
	  screen_name = 'albNo273';
	  defaultName = 'Albireo';

const conf = confu('.', 'config', 'key.json');
const client = new twitter({
	consumer_key: conf.test.cons_key,
	consumer_secret: conf.test.cons_sec,
	access_token_key: conf.test.acc_token,
	access_token_secret: conf.test.acc_token_sec
});

console.log('starting update_name for @' + screen_name);
client.stream('statuses/filter', { track: screen_name }, function (stream) {
	stream.on('data', function (tweet) {
		const text = tweet.text,
			  reg = new RegExp("^@" + screen_name + "[ 　]update_name[ 　](.+)"),
			  res = text.match(reg);

		if (res) {
			let newname = res[1].replace(/[@＠]/g, "").slice(0, 20);
			if (newname === 'reset') {
				newname = defaultName;
			}

			client.post('account/update_profile', { name: newname }, function (err, rep) {
				if (!err) {
					const message = '.@' + tweet.user.screen_name + ' さんにより 『' + newname + '』になりました!';
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