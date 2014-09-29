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
	var reg = new RegExp("^@" + screen_name + "[ 　]+(.+[^ 　])[ 　]+(.+)");
	var match = data.text.match(reg);
	if(match){
		var command = match[1];
		switch(command){
			//名前変更
			case 'update_name':
				//厄介対策　命名から@を削除
				newname = match[2].replace(/[@＠]/g, "");
				newname = newname.slice(0,20);
				if(newname === 'reset'){
					newname = defaultName;
				}
				tw.post('account/update_profile', { name: newname	}, function(err, rep) {
					var message = '.@' + data.user.screen_name + ' さんにより 『' + newname + '』になりました!';
					tw.post('statuses/update', { status: message, in_reply_to_status_id: data.id_str }, function(err, rep) {
					});
				});
			break;
		}
	}
});