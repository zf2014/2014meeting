;(function($){

    "use strict";

    var $win = $(window);

    $.fn.fixed = function(startHeight){
        var $settledContainer = this,
            fixedClassName = 'fixed',
            theLine = startHeight,
            ifFixed = false,
            toFixed,
            setFixedParentHeight
        ;



        toFixed = $.throttle(function(){
            
            var yValue = window.pageYOffset;

            if(yValue > theLine){
                if(!ifFixed){
                    $settledContainer.addClass(fixedClassName);
                    ifFixed = true;
                }
            }else{
                if(ifFixed){
                    $settledContainer.removeClass(fixedClassName);
                    ifFixed = false;
                }
            }

        }, 50);

        setFixedParentHeight = function(){
            $settledContainer.parent().height($settledContainer.height());
        }

        setFixedParentHeight();

        $win.on('scroll', function(evt){
            toFixed();
        });
    };


    $.fn.loadmore = function(relateFormSelector){

        var $moreBtn = $('#J-moreBtn'),
            $moreTarget = this,
            ajaxUrl = $moreBtn.data('ajaxUrl'),
            btnHeight = $moreBtn.height(),
            clientHeight = document.documentElement.clientHeight,
            pointLineTop,
            toLoad,
            isEmpty = false,
            loading = false,

            pageNo = 2,

            ajaxDatas,

            $relateForm = relateFormSelector && $(relateFormSelector)
        ;

        toLoad = $.throttle(function(){

            if(!isEmpty && !loading && !((clientHeight + window.pageYOffset - btnHeight) < pointLineTop)){
                loading = true;

                $moreBtn.text('正在加载中...');

                ajaxDatas = [{
                    name: 'currentPage',
                    value: pageNo
                }];

                if( $relateForm && $relateForm.length ){
                	ajaxDatas = ajaxDatas.concat($relateForm.serializeArray());
                }
                 
                $.ajax({
                    url: ajaxUrl,
                    data: ajaxDatas,
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    success: function(reqData){
                        var moreHtml,
                            reqRst
                        ;
                        if(reqData.code === 0){
                            reqRst = reqData.rst;
                            moreHtml = reqRst.html;
                            if(moreHtml){
                                $moreTarget.append(moreHtml);
                                pageNo = reqRst.currentPage;
                            }else{
                                isEmpty = true;
                                $moreBtn.text('没有更多数据');
                            }
                        }
                        // else{
                        // TODO(异常处理)
                        // }
                        reset();
                        loading = false;
                    }
                });
            }
        }, 100);


        $win.on('scroll', function(evt){
            pointLineTop = $moreBtn.offset().top;
            toLoad();
        });

        function reset(){
            if(isEmpty){
                return;
            }
            $moreBtn.text('更多');
            pointLineTop = $moreBtn.offset().top;
        }
    };

    $.throttle = function(func, wait, options){
        var throttled = false, // 启动状态
            args,
            result,
            thisArg,
            timeoutId = null,
            later,
            last = 0
        ;

        // 可选参数
        options || (options = {});

        later = function() {
            last = options.lead === false ? 0 : new Date;
            timeoutId = null;
            result = func.apply(thisArg, args);
        };
        
        return function() {

            var now, remaining;
            now = new Date;
            args = arguments;
            thisArg = this;

            if(!last && options.lead === false){
              last = now;
            }
            remaining = wait - (now - last);
            
            // 如果已经超过阀值, 执行目标函数
            if (remaining <= 0) {
                clearTimeout(timeoutId);
                timeoutId = null;
                last = now;
                result = func.apply(thisArg, args);
            }
            // 如果未达到阀值, 则必须等待
            // 如果设置tail = false, 那么必须间隔时间必须超过阀值才会被触发
            else if(!timeoutId && options.tail !== false) {
                timeoutId = setTimeout(later, remaining);
            }
            return result;

        };
    };




}(this.Zepto));