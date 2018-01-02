/*
* @Author: Marte
* @Date:   2017-12-27 09:44:38
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-02 11:36:19
*/

'use strict';
/*直播流地址
 *fluid是否响应式
 *preload是否自动播放
 *'rtmp://live.hkstv.hk.lxdns.com/live/hks'
 *Player                         #视频播放器
 * PosterImage                #封面图片
 * textTrackDisplay           #文本轨道显示（字幕，标题，章节标题）
 * textTrackSettings          #文本轨道设置
 * loadingSpinner             #加载指示
 * bigPlayButton              #大播放按钮
 * errorDisplay               #错误显示
 * controlBar                 #控制工具栏
 * playToggle             #播放暂停按钮
 * fullscreenToggle       #全屏按钮
 * currentTimeDisplay     #当前时间显示
 * remainingTimeDisplay   #剩余时间显示
 * progressControl        #进度控制
 * loadProgressBar    #加载进度条
 * playProgressBar    #已播放控制条
 * mouseDisplay       #进度条上的鼠标位置显示
 * volumeControl          #音量控制
 * volumeBar          #音量控制条
 * volumeLevel    #音量
 * muteToggle             #静音按钮
 * mediaLoader                #视频加载器
 **/

// 引入css样式star
// function addCssByLink(url){
//     var doc=document;
//     var link=doc.createElement("link");
//     link.setAttribute("rel", "stylesheet");
//     link.setAttribute("type", "text/css");
//     link.setAttribute("href", url);

//     var heads = doc.getElementsByTagName("head");
//     if(heads.length)
//         heads[0].appendChild(link);
//     else
//         doc.documentElement.appendChild(link);
// }

// addCssByLink("http://openapi.9dcj.com/css/9d_ksplayer.min.css")
// 引入css样式end
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
        // 优化 当播放器样式没加载完全的时候 在盒子里插入第一个子元素 当做封面，请求成功后隐藏
        $(container).prepend("<img class='img_bg' src="+c.poster+" width=600px; height=337px; alt='' />");
        // 请求流地址
        $.ajax({
            url:c.url,
            data:{"url_roomid":c.url_roomid},
            type:"GET",
            dataType: 'JSONP',
            jsonp:"callback",
            success:function(redata){
                // 只有播放器依赖件加载成功后再执行播放器实例化
                // 动态引入js
                 $.ajax({
                    url: "http://openapi.9dcj.com/js/9d_ksplayer.min.js",
                    type: 'GET',
                    cache:true,
                    dataType:"script",
                    success: function(){
                            s.vedio(redata.result.rtmp,redata.code);
                            $('.img_bg').hide();
                    }
                });
            }
        })
        // 播放器的配置
        s.vedio=function (a,b){
             if(b==200){
                $('#example-video>source').attr('src',a);
             }
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
        }
        // 封装的一些方法
        s.fun=function(){
            alert('ssss')
        }
        // 检测flash是否开启start
        s.flashDetection= function (a){
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
            // var s = "";
            if (!fls.f){

                $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="video_9d.prototype.flashTiph()">×</div><p class="flash-tips-text">您尚未安装flash或者未开启，无法正常播放，请点击<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
            } else{

            }
        }
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
        s.flashCreate=function flashCreate (a) {
            if (window.ActiveXObject || "ActiveXObject" in window){
                    var isIE = !-[1,];
                    if(isIE){
                        try{
                            var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                            // alert('安装了Flash');
                        }
                        catch(e){
                        $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="video_9d.prototype.flashTiph()">×</div><p  class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
                        }
                    }
                    else {
                        try{
                            var swf2 = navigator.plugins['Shockwave Flash'];
                            if(swf2 == undefined && hasFlashs()==false){
                            $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="video_9d.prototype.flashTiph()">×</div>    <p class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
                            }
                            else {
                            // alert('安装了Flash');
                            }
                        }
                        catch(e){
                            $(a).append('<div class="flash-version-tips"><div class="flash-tips-cover"></div><div class="flash-tips-close" onclick="video_9d.prototype.flashTiph()">×</div>    <p class="flash-tips-text">您未安装flashplayer，无法观看直播！请点此下载<a href="https://www.adobe.com/go/getflashplayer" target="_blank" class="flash-get-link">安装 / 开启</a></p><p class="flash-tips-text">（安装完成后，请重启浏览器）</p></div>');
                        }
                    }
            }
        };
        /*ie的ActiveX没打开*/
        s.flashCreate(container);
        s.flashDetection(container);
        // 检测flash是否开启end

        // 关闭提示开启flash的提示
        video_9d.prototype.flashTiph=function(){
           $('.flash-version-tips').fadeOut();
        }




 }
// 不需要配置的方法
 video_9d.prototype.addCssByLink=function(url){
    var doc=document;
    var link=doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if(heads.length)
        heads[0].appendChild(link);
    else
        doc.documentElement.appendChild(link);
 }
video_9d.prototype.addCssByLink("http://openapi.9dcj.com/css/9d_ksplayer.min.css");


// 控制台版权提示
    console.log('www.9dcj.com'+'%c9度财经版权所有 ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:3em;');

