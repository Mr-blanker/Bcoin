(function (t) {
    "use strict";
    var plusBus = function bus(setting) {
        this.version = "1.0.1";
        this.options = this.merge({
            barStyle: "dark",
            barBackground: '#ffffff'
        }, setting || {});
        this.setStatusBarStyle(this.options.barStyle, this.options.barBackground);
        this.openBackButton()
        this.share.getServices()
        t.shares = t.shares||null;
    }
    plusBus.prototype.merge = function (t, e) {
        for (var o in e) {
            t[o] = e[o]
        }
        return t
    };
    plusBus.prototype.checkPlusStatus = function () {
        if (!window.plus) {
            throw new Error('plus未挂载window！！！');
        }
    }
    plusBus.prototype.setStatusBarStyle = function (barStyle, barBackground) {
        this.checkPlusStatus()
        plus.navigator.setStatusBarStyle(barStyle);
        plus.navigator.setStatusBarBackground(barBackground);
    }
    plusBus.prototype.openBackButton = function () {
        this.checkPlusStatus()
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function () {
            webview.canBack(function (e) {
                if (e.canBack) {
                    webview.back();
                } else {
                    webview.close();
                }
            })
        });
    }
    plusBus.prototype.openUrlOnBrowser = function (url) {
        this.checkPlusStatus()
        plus.runtime.openURL(url, function (err) {
            console.log(err);
            alert('调用手机浏览器失败！！！');
        })
    }
    plusBus.prototype.share = {
        getServices: function () {
            plus.share.getServices(function (s) {
                t.shares = s;
            }, function (e) {
                alert("获取分享服务列表失败：" + e.message);
            });
        },
        shareAction: function(s,shareInfo) {
            if (!s) {
                return;
            }
            if (s.authenticated) {
                this.shareMessage(s,shareInfo);
            } else {
                s.authorize(shareMessage, function (e) {
                    alert("未进行认证");
                });
            }
        },
        shareMessage: function (s,shareInfo){
            s.send({
                    content:shareInfo.msg,
                    href:shareInfo.url,
                    thumbs:[shareInfo.imgUrl],
                    extra:{scene:shareInfo.type}
                }, function(){
                alert("分享成功！");
            },function(e){
                alert("分享失败："+e.message);
            });
        }
    }

    if (typeof require === "function" && typeof module === "object" && module && typeof exports === "object" && exports) module.exports = plusBus;
    else if (typeof define === "function" && define["amd"]) define(function () {
        return plusBus
    });
    else t["plusBus"] = t["plusBus"] || plusBus
})(window || this);

document.addEventListener("plusready", function () {
    var _plusBus = new plusBus()
    if (!window.$plusBus) {
        window.$plusBus = _plusBus
    }
}, false);