apiready = function(){
  // console.log(JSON.stringify(api.pageParam));
  //通过获取的id查询对应的详情数据

  api.ajax({
      url: window.reqUrl + '/getRentDetailById',
      method: 'post',
      data: {
          values: {
              id: api.pageParam.detailId
          }
      }
  },function(ret, err){
      if (ret) {
          // console.log( JSON.stringify( ret ) );
          if(ret.errCode != 1){
            api.toast({
                msg: '获取租房信息失败',
                duration: 500,
                location: 'middle'
            });
            return;
          }
          updataRentDOM(ret.info);
      } else {
          console.log( JSON.stringify( err ) );
          api.toast({
              msg: '获取租房信息失败',
              duration: 500,
              location: 'middle'
          });
          return;
      }
  });
};

//通过查询数据更新页面
function updataRentDOM(data){
  $('#title').html('<span class="aui-label aui-label-danger aui-margin-r-5">出租</span>'+ data.title);
  $('#rent_money').html(data.rent_money);
  $('.house_type').html(data.house_type);
  $('.area').html(data.area);
  $('.floor').html(data.floor+'楼');
  $('.decoration').html(data.decoration);
  $('.towards').html(data.towards);
  $('.accomplish_date').html(data.accomplish_date);
  $('.description').html(data.description);
  $('.release_phone').html(data.release_phone);
  $('.release_time').html(data.release_time);
  $('.pay_way').html(data.pay_way);
  $('.rent_way').html(data.rent_way);
  //实例化轮播图
  var sliderImgList = data.slider_pic.split(',');
  var sliderArr = [];
  for(var i=0;i<sliderImgList.length;i++){
    // console.log(sliderImgList[i]);
    var tempArr = [
      '<div class="aui-slide-node bg-dark">',
          '<img src="'+ window.reqUrl + sliderImgList[i] +'" alt="详情图片'+ (i+1) +'"/>',
      '</div>'
    ];
    sliderArr.push(tempArr.join(''));
  }

  $('#detail_slider_pic_wrapper').html(sliderArr.join(''));
  //替换img标签为背景图片，优化样式
  var sliderPicArr = $('#detail_slider_pic_wrapper').find('.aui-slide-node');
  for(var j=0; j<sliderPicArr.length; j++){
    var tempImgUrl = $(sliderPicArr[j]).find('img')[0].src;
    // console.log(tempImgUrl);
    $(sliderPicArr[j]).css('background-image','url("'+ tempImgUrl +'")');
  }
  var slide = new auiSlide({
      container:document.getElementById("aui-slide"),
      // "width":300,
      "height":360,
      "speed":300,
      "pageShow":true,
      "pageStyle":'dot',
      "loop":true,
      'dotPosition':'center',
      // currentPage:currentFun
  });


  //绑定打电话事件
  $('.lianxi .aui-icon-phone').on('click',function(){
    api.call({
        type: 'tel_prompt',
        number: data.release_phone
    });
  });
  $('.lianxi .aui-icon-comment').on('click',function(){
    api.sms({
      numbers: [data.release_phone],
      text: ''
  }, function(ret, err) {
      if (ret && ret.status) {
          //已发送
          console.log('已经发送');
      } else {
          //发送失败
          console.log('发送失败');
      }
  });
  });

}
