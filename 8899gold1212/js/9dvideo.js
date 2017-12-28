/*
* @Author: Marte
* @Date:   2017-12-27 09:44:38
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-28 15:36:41
*/

'use strict';

/*直播流地址
 *fluid是否响应式
 *preload是否自动播放
 *'rtmp://live.hkstv.hk.lxdns.com/live/hks'
 *Player                         #视频播放器
 * PosterImage                #封面图片
 * TextTrackDisplay           #文本轨道显示（字幕，标题，章节标题）
 * TextTrackSettings          #文本轨道设置
 * LoadingSpinner             #加载指示
 * BigPlayButton              #大播放按钮
 * ErrorDisplay               #错误显示
 * ControlBar                 #控制工具栏
 *     PlayToggle             #播放暂停按钮
 *     FullscreenToggle       #全屏按钮
 *     CurrentTimeDisplay     #当前时间显示
 *     RemainingTimeDisplay   #剩余时间显示
 *     ProgressControl        #进度控制
 *         LoadProgressBar    #加载进度条
 *         PlayProgressBar    #已播放控制条
 *         MouseDisplay       #进度条上的鼠标位置显示
 *     VolumeControl          #音量控制
 *         VolumeBar          #音量控制条
 *             VolumeLevel    #音量
 *     MuteToggle             #静音按钮
 * MediaLoader                #视频加载器
 **/

 var video_9d=function(container,params){
        var s = this;
        $(container).append("<video id='example-video'  class='video-js mobile-first-skin' controls  > <source src='' type='rtmp/flv'></video>");
        var defaults={
            url:null,
            url_roomid:null,
            poster:null,
            playToggle:false
        }
        var c = $.extend(defaults,params);
            // console.log(c.poster)
        // 请求流地址
        $.ajax({
            url:c.url,
            data:{"url_roomid":c.url_roomid},
            type:"GET",
            dataType: 'JSONP',
            jsonp:"callback",
            success:function(redata){
                s.vedio(redata.result.rtmp);
            }
        })
        // 播放器的配置
        s.vedio=function (a){
             // console.log(c.poster)
            $('#example-video>source').attr('src',a);
            var player = ksplayer('example-video',{
                language: 'zh-CN',
                autoHeight: true,
                autoWidth: true,
                width:100,
                height:100,
                fluid: true,  //响应式
                bigPlayButton: false,
                controls:true,
                autoplay:true,
                errorDisplay:false,
                PlayToggle:false,
                poster: c.poster,
                controlBar: {
                    progressControl:false,
                    playToggle:c.playToggle,
                    remainingTimeDisplay:false
                }
            });
             player.on('pause', function(){
            return false;
        });
        }

        // 封装的一些方法
        s.fun=function(){
            // alert('ssss')
        }

        // 检测flash是否开启
            /*ie的ActiveX没打开*/
flashCreate(container);
flashDetection(container);
         function flashDetection(a){
            function flashChecker() {
                var hasFlash = 0; //是否安装了flash
                var flashVersion = 0; //flash版本
                if (document.all) {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (swf) {
                      hasFlash = 1;
                      VSwf = swf.GetVariable("$version");
                      flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                    }
                } else {
                    if (navigator.plugins && navigator.plugins.length > 0) {
                      var swf = navigator.plugins["Shockwave Flash"];
                      if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                          if (isNaN(parseInt(words[i]))) continue;
                          flashVersion = parseInt(words[i]);
                        }
                      }
                    }
                }
                return { f: hasFlash, v: flashVersion };
            }
            var fls = flashChecker();
            var s = "";
            if (!fls.f){
            $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="flashTiph()">×</div><p class="flash-tips-text">您尚未安装flash或者未开启，无法正常播放，请点击<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
            } else{

            }
        }
        // function flashTiph(){
        //     $('.flash-version-tips').fadeOut();
        // }
        function hasFlashs(){
            if (navigator.plugins && navigator.plugins.length && navigator.plugins['Shockwave Flash']) {
                return true;
            } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
                return mimeType && mimeType.enabledPlugin;
            } else {
                try {
                    var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    return true;
                } catch (e) {}
            }
            return false;
        }

    // ie的ActiveX没打开
    function flashCreate (a) {
        if (window.ActiveXObject || "ActiveXObject" in window){
        var isIE = !-[1,];
        if(isIE){
            try{
                var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                // alert('安装了Flash');
            }
            catch(e){
                 $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="flashTiph()">×</div><p class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
            }
        }
        else {
            try{
                var swf2 = navigator.plugins['Shockwave Flash'];
                if(swf2 == undefined && hasFlashs()==false){
                     $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="flashTiph()">×</div><p class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
                }
                else {
                    // alert('安装了Flash');
                }
            }
            catch(e){
                $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="flashTiph()">×</div><p class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
            }
        }
    }
    };
































 }


// 不需要配置的方法
function flashTiph(){
            $('.flash-version-tips').fadeOut();
 }

