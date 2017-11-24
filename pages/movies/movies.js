var util = require('../../utils/util.js');
var app = getApp();

Page({
    // RESTFul API JSON ****需了解****
    // SOAP XML WSDL

    data:{
        inTheaters:{},
        comingSoon:{},
        top250:{},
        containerShow: true,
        searchPanelShow: false,
        searchResult:{}
    },

    onLoad: function(option) {

        // 基础的url
        var baseUrl = app.globalData.doubanBase;
        //热映
        var in_theatersUrl = baseUrl + '/v2/movie/in_theaters?start=0&count=3';
        //即将
        var comingSoonUrl = baseUrl + '/v2/movie/coming_soon?start=0&count=3';
        //top 250
        var top250Url = baseUrl + '/v2/movie/top250?start=0&count=3';

        this.getMovieListData(in_theatersUrl,'inTheaters','正在热映');
        this.getMovieListData(comingSoonUrl,'comingSoon','即将上映');
        this.getMovieListData(top250Url,'top250','豆瓣Top250');
    },

    getMovieListData: function (url, key, categoryTitle) {

        util.http(url,(res)=>{
            this.processDoubanData(res, key, categoryTitle);
        });
    },


    processDoubanData: function(moviesDouban ,key, categoryTitle) {
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
                    stars: util.convertToStarsArray(subject.rating.stars),
                    coverageUrl:subject.images.large,
                    movieId:subject.id
                }

                movies.push(temp);
            }

            var readyData = {};
            readyData[key] = {
                categoryTitle: categoryTitle,
                movies: movies,
            };
            this.setData(readyData);
    },


    onMoreTap: function(event){

        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
        })
    },

    onBindFocus: function(event){
        console.log("onBindFocus");
        this.setData({
            containerShow: false,
            searchPanelShow: true,
            searchResult: {},
        });
    },

    onCancleImgTap: function(event){
        this.setData({
            containerShow: true,
            searchPanelShow: false
        });
    },

    onBindConfirm: function(event){
        //获得文字
        var searchText = event.detail.value;
        var baseUrl = app.globalData.doubanBase;
        var searchUrl = baseUrl + '/v2/movie/search' + '?q=' + searchText;

        this.getMovieListData(searchUrl,'searchResult','')
    },
})