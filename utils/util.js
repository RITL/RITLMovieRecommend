/// 转换星级数组
function convertToStarsArray(stars){
    var num = stars.toString().substring(0,1);
    var array = [];
    for (var i = 1; i <=5 ; i++){
        if (i <= num){
            array.push(1);

        }else {
            array.push(0);
        }
    }
    return array;
}

/// 网络请求封装
function http(url, callBack, paramter = {},method='GET') {

    var that = this;
    wx.request({
        url: url,
        method: method,
        header: {
            'Content-Type': 'application/xml'
        },
        data: paramter,

        success: function (res) {
            callBack(res.data);
        },

        fail: (error) => {
            console.log(error);
        },
    })
}


module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http,
}