// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

    data: {
        navigateTitle: "",
        movies : [],
        requestUrl:"",
        totalCount : 0,
    },

    onLoad: function (options) {
        var category = options.category;

        wx.setNavigationBarTitle({
            title: category,
        })

        // 基础的url
        var baseUrl = app.globalData.doubanBase;

        switch (category) {
            case "正在热映": 
                baseUrl += '/v2/movie/in_theaters';
            break;

            case "即将上映": 
                baseUrl += '/v2/movie/coming_soon';
            break;

            case "豆瓣Top250":
                baseUrl += '/v2/movie/top250';
             break;
        }

        this.setData({
            requestUrl: baseUrl,   
        })

        util.http(baseUrl, this.processDoubanData);
    },


    processDoubanData:function (data){
        var movies = [];

        // 遍历 对标题进行出处理
        for (var idx in data.subjects) {

            var subject = data.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }

            var temp = {
                title: title,
                average: subject.rating.average,
                stars: util.convertToStarsArray(subject.rating.stars),
                coverageUrl: subject.images.large,
                movieId: subject.id
            }

            movies.push(temp);
        }

        var movies_temp = this.data.movies;
        movies_temp = movies_temp.concat(movies);

        var totalCount = this.data.totalCount;
        totalCount += 20;

        this.setData({
            movies: movies_temp,
            totalCount: totalCount     
        })
    },


    onScrollLower:function(event){
        console.log('可以加载更多啦');
        //获得拼接url
        var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";

        util.http(nextUrl, this.processDoubanData);
    },
})