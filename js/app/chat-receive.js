;(function($){

	var $chatContainer = $('#J-chatRecordContainer'),
		intervalTime = 200,
		ajaxUrl,

		MAX_CHAT_RECORD_SIZE = 4,


		faceImgRoot,
		// faceReg = new RegExp("/:@@|/:hug|/::\\)|/::~|/::B|/::\\||/:8-\\)|/::\\<|/::\\$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:–b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::\\>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:\\<@|/:@\\>|/::-O|/:\\>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:\\<W\\>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li", "g");
		faceReg = new RegExp("/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::\\$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY", "g")
	;
	ajaxUrl = $chatContainer.data('ajaxUrl');
	faceImgRoot = $chatContainer.data('faceRoot');


	function getChatContent(){
		$.ajax({
			url: ajaxUrl,
			type: 'POST',
			dataType: 'json',
			success: function(result){
				var chatData = result.rst.chatInfo;
				if(chatData){
					removeFirstChatRecord();
					appendChatRecord(chatData);
				}
			},
			error: function(err){
			}
		});
	}

	function removeFirstChatRecord(){
		var $chatRecords = $chatContainer.find('li');
		if($chatRecords.size() < MAX_CHAT_RECORD_SIZE ){
			return;
		}
		$chatContainer.find('li').eq(0).remove();
	}

	function replaceFaceSign(msg){
		return msg.replace(faceReg, function(sign){
			return '<img class="chat-face" src="'+ faceImgRoot + WX_FACE[sign]+'.png"></img>'
		});
		// return msg;
	}

	function appendChatRecord(data){
		var chatRecordItem = [],
			chatMsg = data.message
		;
		chatRecordItem.push('<li class="chat-item chat-item__insert">');
			chatRecordItem.push('<div class="card-light card-light__ver card-light__chat-left"></div>');
			chatRecordItem.push('<div class="card-light card-light__ver card-light__chat-right"></div>');
			chatRecordItem.push('<div class="card-light card-light__hor card-light__chat-top"></div>');
			chatRecordItem.push('<div class="card-light card-light__hor card-light__chat-bottom"></div>');
			chatRecordItem.push('<div class="chat-item--left">');
				chatRecordItem.push('<div class="chat-avatar employee-avatar"><img src="'+data.userHead+'"></div>');
				chatRecordItem.push('<div class="chat-name">'+data.nikeName+'：</div>');
			chatRecordItem.push('</div>');

			chatRecordItem.push('<div class="chat-item--right">');
				chatRecordItem.push('<div class="chat-content">'+replaceFaceSign(chatMsg)+'</div>');
			chatRecordItem.push('</div>');
		chatRecordItem.push('</li>');
		$chatContainer.append(chatRecordItem.join(''))
	}



    window.setTimeout(function(){
		chatInitRecords.forEach(function(data){
			appendChatRecord(data);
		});
    	doRecord();
    }, 100)



    function doRecord(){
	    window.setTimeout(function(){
			getChatContent();
			doRecord();
		}, 1000);
    }
    // doRecord()

}(Zepto));