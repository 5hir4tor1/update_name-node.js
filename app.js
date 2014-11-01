var Twit = require('twit')
var screen_name = '';
var defaultName = '';

var tw = new Twit({
	consumer_key: '',
	consumer_secret : '',
	access_token : '',
	access_token_secret : ''
});

var stream = tw.stream('user');
console.log('starting update_name for @' + screen_name);
stream.on('tweet', function(data) {
	//XSS対策
	var text = escape(data.text);
	var reg = new RegExp("^@" + screen_name + "[ 　](update_.+?)[ 　](.+)");
	var match = text.match(reg);
	if(match){
		var command = match[1];
		switch(command){
			//名前変更
			case 'update_name':
				//厄介対策　命名から@を削除
				var newname = match[2].replace(/[@＠]/g, "");
				newname = newname.slice(0,20);
				if(newname === 'reset'){
					newname = defaultName;
				}
				var message = '.@' + data.user.screen_name + ' さんにより 『' + newname + '』になりました!';
				console.log(message)
				tw.post('account/update_profile', { name: newname	}, function(err, rep) {
					var message = '.@' + data.user.screen_name + ' さんにより 『' + newname + '』になりました!';
					tw.post('statuses/update', { status: message, in_reply_to_status_id: data.id_str }, function(err, rep) {
					});
				});
			break;
			//？？？な実装
			case 'update_kanojo':
				//厄介対策　命名から@を削除
				var newkanojo = match[2].replace(/[@＠]/g, "");
				tw.post('account/update_profile', { location: "彼女：" + newkanojo }, function(err, rep) {
					var message = '@' + data.user.screen_name + ' ' + screen_name + 'の彼女が　' + newkanojo + '　さんになりました!';
					console.log(message)
					tw.post('statuses/update', { status: message, in_reply_to_status_id: data.id_str }, function(err, rep) {
					});
				});
			break;
		}
	}
});