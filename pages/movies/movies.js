Page({
    // RESTFul API JSON
    // SOAP XML WSDL

    onLoad: (event)=>{
        wx.request({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            header: {
                'Content-Type' : 'application/xml'
            },
            data:{

            },
            success:(res)=>{
                console.log(res);
            },

            fail:(error)=>{
                console.log(error);
            },

            complete:()=>{

            },
        })
    }
})