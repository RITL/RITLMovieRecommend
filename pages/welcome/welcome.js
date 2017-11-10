Page({
    // "#405f80"
  /**
   * 页面的初始数据
   */
  data: {
    
  },


  onTextTap: function(){
    //   console.log("on text tap");
  },

  onTap: function (){
    //   console.log("on tap");
        wx.navigateTo({//进行导航跳转，进入导航的子视图
            url: "../posts/posts",
        }); 

        // wx.redirectTo({//没有返回按钮，同级界面进行跳转
        //     url: "../posts/posts",
        // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log("welcome onhide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("welcome unload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})