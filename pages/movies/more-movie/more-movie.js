// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

    data: {
        navigateTitle: "",
        movies : {}
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

            case "Top250":
                baseUrl += '/v2/movie/top250';
             break;
        }

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

        this.setData({
            movies: movies
        })
    },
})