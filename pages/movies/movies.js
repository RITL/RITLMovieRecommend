var app = getApp();

Page({
    // RESTFul API JSON ****需了解****
    // SOAP XML WSDL

    onLoad: function(option) {

        // 基础的url
        var baseUrl = app.globalData.doubanBase;
        //热映
        var in_theatersUrl = baseUrl + '/v2/movie/in_theaters';
        //即将
        var comingSoonUrl = baseUrl + '/v2/movie/coming_soon';
        //top 250
        var top250Url = baseUrl + '/v2/movie/top250';

        this.getMovieListData(in_theatersUrl);
        this.getMovieListData(comingSoonUrl);
        this.getMovieListData(top250Url);
    },

    getMovieListData: (url)=> {
        
        wx.request({
            url: url,
            header: {
                'Content-Type': 'application/xml'
            },
            data: {
                'count' : '3'
            },
            success: (res) => {
                console.log(res);
            },

            fail: (error) => {
                console.log(error);
            },

            complete: () => {

            },
        })
    },
})