var Twit = require('twit');
//自身のスクリーンネーム
var screen_name = '';

var tw = new Twit({
	consumer_key: '',
	consumer_secret : '',
	access_token : '',
	access_token_secret : ''
});

var stream = tw.stream('user');
stream.on('tweet', function(data) {
	//「@~~~ update_name ****」のツイートに反応
	var reg = new RegExp("^@" + screen_name + "[ 　]update_name[ 　]+(.+)");
	var newname = data.text.match(reg);
	if(newname !== null){
		//厄介対策　命名から@を削除
		newname = newname[1].replace(/@/g, "");
		newname = newname.slice(0,20);
		tw.post('account/update_profile', { name: newname	}, function(err, rep) {
			var message = '.@' + data.user.screen_name + ' さんにより 『' + newname + '』になりました!';
			tw.post('statuses/update', { status: message, in_reply_to_status_id: data.id_str }, function(err, rep) {
			});
		});
	};
});
