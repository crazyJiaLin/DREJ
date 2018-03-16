apiready = function(){
  //请求租房推荐
  api.ajax({
      url: window.reqUrl + '/rentRec',
      method: 'post',
  },function(ret, err){
      if (ret) {
          // console.log( JSON.stringify( data ) );
          if(ret.errCode != 1){
            api.toast({
                msg: '获取租房推荐信息失败',
                duration: 500,
                location: 'middle'
            });
            return;
          }
          //插入数据
          insertRecDOM($('.rent_rec_wrapper .silder_wrap'), ret.list);
      } else {
          api.toast({
              msg: '获取租房推荐信息失败',
              duration: 500,
              location: 'middle'
          });
          return;
      }
  });
  api.ajax({
      url: window.reqUrl + '/secondRec',
      method: 'post',
  },function(ret, err){
      if (ret) {
          if(ret.errCode != 1){
            api.toast({
                msg: '获取二手房推荐信息失败',
                duration: 500,
                location: 'middle'
            });
            return;
          }
          //插入数据
          insertRecDOM($('.second_hand_rec_wrapper .silder_wrap'), ret.list);
      } else {
          // console.log( JSON.stringify( err ) );
          api.toast({
              msg: '获取二手房推荐信息失败',
              duration: 500,
              location: 'middle'
          });
          return;
      }
  });

  function insertRecDOM($insertBox,data){
    var recDOM = [];
    for(var i=0; i<data.length; i++){
      var tempDOMArr = [
        '<li class="house_box" id="'+ data[i].id +'">',
          '<img src="'+window.reqUrl + data[i].title_pic+'" alt="'+ data[i].title +'">',
          '<div class="rec_title">',
            '<span>'+ data[i].title +'</span>',
          '</div>',
        '</li>'
      ];
      recDOM.push(tempDOMArr.join(''));
    }
    // console.log(recDOM.toString());
    $insertBox.css('width',170*data.length).html(recDOM.join(''));
    // console.log($insertBox.find('li').length);
    var aLi = $insertBox.find('.house_box');
    for(var i=0; i<aLi.length; i++){
      var imgUrl = $(aLi[i]).find('img')[0].src;
      $(aLi[i]).css('background-image', 'url("'+ imgUrl +'")');
    }
  }


  //点击租房推荐
  $('.rent_rec_wrapper').on('click','.house_box',function(){
    //详情id
    var queryId = $(this).attr('id');
    //打开详情页
    api.openWin({
        name: 'show-rent-detail',
        url: './show-rent-detail.html',
        pageParam: {
            detailId: queryId
        }
    });
  });
  //点击二手房推荐
  $('.second_hand_rec_wrapper').on('click','.house_box',function(){
    api.openWin({
        name: 'show-second-detail',
        url: './show-second-detail.html',
        pageParam: {
            detailID: 'cjldetailID'
        }
    });
  });

  var slide = new auiSlide({  //主页轮播图
      container:document.getElementById("aui-slide"),
      "height":160,
      "speed":600,
      "autoPlay" : 5000,
      "pageShow":true,
      "pageStyle":'dot',
      "loop":true,
      'dotPosition':'center'
  });
};

function fnOpenRentSearch(){
  api.openWin({
      name: 'rent_search',
      url: './search01.html'
  });
}

function fnOpenSecondSearch(){
  api.openWin({
      name: 'second_search',
      url: './search02.html'
  });
}
function fnOpenNewSearch(){
  api.openWin({
      name: 'new_search',
      url: './search03.html'
  });
}

function fnOpenSellHouse(){
  api.openWin({
      name: 'sell_house',
      url: './sell_house.html'
  });
}
function fnOpenLoan(){
  api.openWin({
      name: 'loan',
      url: './loan.html'
  });
}

function fnOpenHouseValue(){
  api.openWin({
      name: 'house_value',
      url: './house_value.html'
  });
}

function fnOpenRentOut(){
  api.openWin({
      name: 'rent-house',
      url: './rent-house.html'
  });
}
function fnOpenMap(){
  api.openWin({
      name: 'map',
      url: './map.html'
  });
}

function fnOpenHouseEncyclopedia(){
  api.openWin({
      name: 'house_encyclopedia',
      url: './house_encyclopedia.html'
  });
}
