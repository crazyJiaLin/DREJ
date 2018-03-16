//给输入框绑定事件
$('.login_input').on('keyup',function(){
  showClearBtn(this);
});

// 给清空按钮绑定事件
$('.login_content').on('click','.aui-icon-close',function(){
  //如果当前按钮显示状态，则给对应本行的input框内容清空，并去隐藏按钮
  if($api.hasCls(this,'active')){
    var needClearInput = $api.first($api.closest(this, '.info_row'));
    needClearInput.value = '';
    $api.removeCls(this, 'active');
  }
});
//input框有内容时显示本行清空按钮
function showClearBtn(that){
  //获取对应本行的清除btn
  var $clearBtn = $(that).parents('.info_row').find('.aui-icon-close');
  // 根据内容选择是否显示btn
  if(that.value != ''){
    $clearBtn.addClass('active');
  }else{
    $clearBtn.removeClass('active');
  }
}

// 打开页面
function openRegestWin(){
  api.openWin({
      name: 'regest',
      url: './regest.html'
  });
}
function openResetPsw(){
  var mobile = $api.dom('.mobile').value;
  api.openWin({
      name: 'resetPWD',
      url: './reset-password.html',
      pageParam: {
          mobile: mobile
      }
  });
}

// 关闭页面
function closeLoginWin(){
  api.closeWin({
    name: 'login'
  });
}
function closeRegestWin(){
  api.closeWin({
      name: 'regest'
  });
}

function closeResetWin(){
  api.closeWin({
      name: 'resetPWD'
  });
}
