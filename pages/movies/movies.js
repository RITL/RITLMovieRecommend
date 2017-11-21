var app = getApp();

Page({
    // RESTFul API JSON ****需了解****
    // SOAP XML WSDL

    data:{
        inTheaters:{},
        comingSoon:{},
        top250:{}
    },

    onLoad: function(option) {

        // 基础的url
        var baseUrl = app.globalData.doubanBase;
        //热映
        var in_theatersUrl = baseUrl + '/v2/movie/in_theaters';
        //即将
        var comingSoonUrl = baseUrl + '/v2/movie/coming_soon';
        //top 250
        var top250Url = baseUrl + '/v2/movie/top250';

        this.getMovieListData(in_theatersUrl,'inTheaters');
        this.getMovieListData(comingSoonUrl,'comingSoon');
        this.getMovieListData(top250Url,'top250');
    },

    getMovieListData: function (url, key) {

        var that = this;
        wx.request({
            url: url,
            header: {
                'Content-Type': 'application/xml'
            },

            data: {
                'count' : '3'
            },

            success: function(res) {
                console.log(res);
                that.processDoubanData(res.data,key);
            },

            fail: (error) => {
                console.log(error);
            },

            complete: () => {

            },
        })
    },

    processDoubanData: function(moviesDouban ,key) {
            var movies = [];

            // 遍历 对标题进行出处理
            for(var idx in moviesDouban.subjects){

                var subject = moviesDouban.subjects[idx];
                var title = subject.title;
                if(title.length >= 6){
                    title = title.substring(0,6) + "...";
                }

                var temp = {
                    title : title,
                    average : subject.rating.average,
                    coverageUrl:subject.images.large,
                    movieId:subject.id
                }

                movies.push(temp);
            }

            var readyData = {};
            readyData[key] = {
                movies: movies,
            };
            this.setData(readyData);
    },
})