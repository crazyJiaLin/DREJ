//固定搜素条件详情选择容器高度
var winHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
// console.log(winHeight);
var conditionDetailHeight = (winHeight-81)+'px';
$('.condition-detail-wrapper').css('height',conditionDetailHeight);
$('.search-results-wrapper').css('height',conditionDetailHeight);


//搜索框焦点事件绑定
$('#search-input').on('focus',function(){
  $('.go-search').addClass('active');
});
$('#search-input').on('blur',function(){
  $('.go-search').removeClass('active');
});

var curIndex = -1;
//搜索条件点击事件绑定
$('.condition-wrapper').on('click','.search-condition',function(){
  if(curIndex == $(this).index()){  //说明点击本次索引
    hideConditionWrapper();
    return;
  }
  curIndex = $(this).index();  //获取当前索引,修改全局变量
  $(this).addClass('active').siblings('.search-condition').removeClass('active'); //给当前按钮添加类名
  $('.condition-detail-wrapper').addClass('active');  //搜索详情容器显示
  $('.condition-detail-block').eq(curIndex).css('display','block').siblings('.condition-detail-block').css('display','none');
  //整体显示后，让显示框动画显示
  var timer = setTimeout(function(){
    $('.condition-detail-block').addClass('active');
  },10);
});
//点击搜索条件切换样式事件
$('.condition-detail-wrapper').on('click','.condition-detail-block ul li',function(){
  $(this).addClass('active').siblings('li').removeClass('active');
  hideConditionWrapper();
});

//点击阴影部分隐藏高级搜索
$('.condition-detail-wrapper').on('click',function(ev){
  ev = ev || window.event;
  if(ev.target.className == 'condition-detail-wrapper active'){
    hideConditionWrapper();
  }
});

//点击更多模块中的条件
$('.condition-detail-more-wrapper').on('click','.condition-option li',function(){
  $(this).addClass('active').siblings('li').removeClass('active');
});
//点击重置按钮，重置筛选条件
$('.go-reset-btn').on('click',function(){
  var $optionWrappers =   $('.condition-detail-more-wrapper').find('.condition-option');  //获取更多模块中的筛选条件块的集合
  for(var i=0; i<$optionWrappers.length; i++){
    $optionWrappers.eq(i).find('li').eq(0).addClass('active').siblings('li').removeClass('active');
  }
});
//点击确认按钮
$('.go-confirm-btn').on('click',function(){
  hideConditionWrapper();
  //在这里进行ajax请求
});

function hideConditionWrapper(){
  $('.condition-detail-block').removeClass('active');
  var timer1 = setTimeout(function(){
    $('.condition-detail-wrapper').removeClass('active');
    $('.search-condition').eq(curIndex).removeClass('active');
    curIndex = -1;
  },400);
}
