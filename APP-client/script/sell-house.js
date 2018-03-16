apiready = function(){

};

//点击我要出租获取表单信息
$('#send-rent-house').on('click',function(){
  var title = $('#title').val(),
      area = $('#area').val(),
      floor = $('#floor').val(),
      rent_money = $('#rent_money').val(),
      house_type = $('#house_type').val(),
      towards = $('#towards').val(),
      accomplish_date = $('#accomplish_date').val(),
      decoration = $('input[name = "decoration"]:checked').val(),
      release_phone = $('#release_phone').val(),
      release_name = $('#release_name').val(),
      pay_way = $('#pay_way').val(),
      rent_way = $('#rent_way').val(),
      description = $('#description').val(),
      slider_pic = [];
      var imgArr = $('#pic').find('img');
      //前台校验
      if(title == ''){
        api.toast({
            msg: '标题不能为空',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(release_name == ''){
        api.toast({
            msg: '请填写联系人姓名',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(release_phone))){
        api.toast({
            msg: '手机号格式不正确',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(imgArr.length <= 0){
        api.toast({
            msg: '上传图片最少一张',
            duration: 800,
            location: 'middle'
        });
        return;
      }
      for(var i=0; i<imgArr.length; i++){
        var newFile = convertBase64UrlToBlob(imgArr[i].src)
        slider_pic.push(newFile);
      }
      var oMyForm = new FormData();
      oMyForm.append("title", title);
      oMyForm.append("area", area);
      oMyForm.append("floor", floor);
      oMyForm.append("rent_money", rent_money);
      oMyForm.append("house_type", house_type);
      oMyForm.append("towards", towards);
      oMyForm.append("accomplish_date", accomplish_date);
      oMyForm.append("decoration", decoration);
      oMyForm.append("release_phone", release_phone);
      oMyForm.append("release_name", release_name);
      oMyForm.append("pay_way", pay_way);
      oMyForm.append("rent_way", rent_way);
      oMyForm.append("description", description);
      //存放图片数组
      for(var i=0; i<slider_pic.length; i++){
        oMyForm.append('slider_pic'+ i, slider_pic[i]);
      }
      $.ajax({
        url : window.reqUrl + '/submitRentHose',
        type : 'post',
        dataType : 'json',
        cache : false,  //不需要缓存
        processData : false,    //不需要进行数据转换
        contentType : false,	 //默认数据传输方式是application,改为false，编程multipart
        data : oMyForm,
        success : function(data){
          console.log(JSON.stringify(data));
          if(data.errCode == 1){
            api.toast({
                msg: '提交房源信息成功',
                duration: 800,
                location: 'middle'
            });
            var timer = setTimeout(function(){
              window.location.reload();
              var js = 'location.reload();';
               api.execScript({
                   frameName: 'frame0',
                   script: js
               });
            },800);
          }else{
            api.toast({
                msg: data.errMsg,
                duration: 800,
                location: 'middle'
            });
          }
        },error : function(err){
          console.log(JSON.stringify(err));
          api.toast({
              msg: '发布房源失败',
              duration: 800,
              location: 'middle'
          });
        }
      });
});


//点击发布二手房源获取表单信息
$('#send-second-house').on('click',function(){
  var title = $('#title').val(),
      area = $('#area').val(),
      floor = $('#floor').val(),
      total_money = $('#total_money').val(),
      house_type = $('#house_type').val(),
      towards = $('#towards').val(),
      accomplish_date = $('#accomplish_date').val(),
      decoration = $('input[name = "decoration"]:checked').val(),
      release_phone = $('#release_phone').val(),
      release_name = $('#release_name').val(),
      pay_way = $('#pay_way').val(),
      description = $('#description').val(),
      slider_pic = [];
      var imgArr = $('#pic').find('img');
      //前台校验
      if(title == ''){
        api.toast({
            msg: '标题不能为空',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(release_name == ''){
        api.toast({
            msg: '请填写联系人姓名',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(release_phone))){
        api.toast({
            msg: '手机号格式不正确',
            duration: 800,
            location: 'middle'
        });
        return;
      }else if(imgArr.length <= 0){
        api.toast({
            msg: '上传图片最少一张',
            duration: 800,
            location: 'middle'
        });
        return;
      }
      for(var i=0; i<imgArr.length; i++){
        var newFile = convertBase64UrlToBlob(imgArr[i].src)
        slider_pic.push(newFile);
      }
      var oMyForm = new FormData();
      oMyForm.append("title", title);
      oMyForm.append("area", area);
      oMyForm.append("floor", floor);
      oMyForm.append("total_money", total_money);
      oMyForm.append("house_type", house_type);
      oMyForm.append("towards", towards);
      oMyForm.append("accomplish_date", accomplish_date);
      oMyForm.append("decoration", decoration);
      oMyForm.append("release_phone", release_phone);
      oMyForm.append("release_name", release_name);
      oMyForm.append("pay_way", pay_way);
      oMyForm.append("description", description);
      //存放图片数组
      for(var i=0; i<slider_pic.length; i++){
        oMyForm.append('slider_pic'+ i, slider_pic[i]);
      }
      $.ajax({
        url : window.reqUrl + '/submitSecondHose',
        type : 'post',
        dataType : 'json',
        cache : false,  //不需要缓存
        processData : false,    //不需要进行数据转换
        contentType : false,	 //默认数据传输方式是application,改为false，编程multipart
        data : oMyForm,
        success : function(data){
          console.log(JSON.stringify(data));
          if(data.errCode == 1){
            api.toast({
                msg: '提交房源信息成功',
                duration: 800,
                location: 'middle'
            });
            var timer4 = setTimeout(function(){
              window.location.reload();
            },800);
          }else{
            api.toast({
                msg: data.errMsg,
                duration: 800,
                location: 'middle'
            });
          }
        },error : function(err){
          console.log(err);
          api.toast({
              msg: '发布房源失败',
              duration: 800,
              location: 'middle'
          });
        }
      });
});


/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *         用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){

    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/png'});
}

var time;
function FnOpenTime(){
  var UICalendar = api.require('UICalendar');
  UICalendar.open({
      rect: {
          x: 0,
          y: 200,
          w: api.frameWidth,
          h: 340
      },
      styles: {
          bg: 'rgba(255,255,255,1)',
          week: {
              weekdayColor: '#3b3b3b',
              weekendColor: '#a8d400',
              size: 12
          },
          date: {
              color: '#3b3b3b',
              selectedColor: '#fff',
              selectedBg: '#a8d500',
              size: 12
          },
          today: {
              color: 'rgb(230,46,37)',
              bg: ''
          },
          specialDate: {
              color: '#a8d500',
                  bg: 'widget://image/a.png'
              }
          },
          specialDate: [{
              date: '2015-06-01'
          }],
          switchMode: 'vertical',
          fixedOn: api.frameName,
          fixed: false
      }, function(ret, err) {
          if(ret.eventType == "special" || ret.eventType == "normal"){
                time = ret.year +"-"+ ret.month + "-" +ret.day;
                $('#time').attr("placeholder",time);
                // var date = ret.year + "年" + ret.month + "月" + ret.day + "日";
                // var choose_day = $api.byId("choose_day");
                // $api.val(choose_day, date);
                UICalendar.close();
          } else {
          }
      });
    }
    function OpenFnPic(){
      api.actionSheet({
          title: '上传图片',
          cancelTitle: '取消',
          buttons: ['拍照','从手机相册选择']
      }, function(ret, err) {
          if (ret) {
              getPicture(ret.buttonIndex);
          }
      });

}
function getPicture(sourceType) {
  if(sourceType==1){ // 拍照
      api.getPicture({
          sourceType: 'camera',
          encodingType: 'png',
          mediaValue: 'pic',
          allowEdit: true,
          destinationType: 'base64',
          quality: 100,
          saveToPhotoAlbum: true
      }, function(ret, err) {
          if (ret) {
            var Src = ret.base64Data;
            if(Src == ''){
              return;
            }
            $("#pic").append('<img src = "'+Src+'" class = "photos_item">');
          }else {
              console.log(JSON.stringify(err));
              api.toast({
                  msg: '选择图片出错',
                  duration: 500,
                  location: 'middle'
              });

          }
      });
  }
  else if(sourceType==2){ // 从相册中选择
      api.getPicture({
              sourceType: 'library',
              encodingType: 'png',
              mediaValue: 'pic',
              destinationType: 'base64',
              quality: 100
          }, function(ret, err) {
              if (ret) {
                var Src = ret.base64Data;
                if(Src == ''){
                  return;
                }
                $("#pic").append('<img src = "'+Src+'" class = "photos_item">');
              } else {
                api.toast({
                    msg: '选择图片失败',
                    duration: 800,
                    location: 'middle'
                });
              }
      });
  }
}
