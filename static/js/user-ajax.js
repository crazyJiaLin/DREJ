$('.update-portrait2').on('click',function(){               
    var base64Data = $('.img-wrapper img')[0].src;
    var newFile = convertBase64UrlToBlob(base64Data);
    console.log(newFile);
    var oMyForm = new FormData();
    oMyForm.append("mobile", '15699555750');
    oMyForm.append("userfile", newFile);
    console.log(newFile);
    $.ajax({
        type : 'POST',
        url : '/uploadPortrait',
        cache : false,  //不需要缓存
        processData : false,    //不需要进行数据转换
        contentType : false, //默认数据传输方式是application,改为false，编程multipart
        data : oMyForm,
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});
/**  
 * 将以base64的图片url数据转换为Blob  
 *  @param urlData  
 * 用url方式表示的base64图片数据  
 */  
function convertBase64UrlToBlob(urlData){  
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);  
    var ia = new Uint8Array(ab);  
    for (var i = 0; i < bytes.length; i++) {  
        ia[i] = bytes.charCodeAt(i);  
    }  
    return new Blob( [ab] , {type : 'image/png'},{name:'123.png'});  
}  
$('.portrait-file').on('change',function(){
    var file = this.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onloadend = function () {
        $('.img-wrapper').html('<img src="'+ reader.result +'" alt="公司简介图片"/>');
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});
$('.update-portrait').on('click',function(){
    var portraitFile = $('.portrait-file')[0].files[0];
    var oMyForm = new FormData();
    oMyForm.append("mobile", '15699555750');
    oMyForm.append("userfile", portraitFile);
    $.ajax({
        type : 'POST',
        url : '/uploadPortrait',
        cache : false,  //不需要缓存
        processData : false,    //不需要进行数据转换
        contentType : false, //默认数据传输方式是application,改为false，编程multipart
        data : oMyForm,
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});
$('.reset-psd').on('click',function(){
    $.ajax({
        type : 'POST',
        url : '/resetPSD',
        data : {
            mobile : '15699555751'
        },
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});
$('.update-psd').on('click',function(){
    $.ajax({
        type : 'POST',
        url : '/updatePSD',
        data : {
            old_password : '456',
            new_password : '456',
            mobile : '15699555751'
        },
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});
$('.login').on('click',function(){
    $.ajax({
        type : 'POST',
        url : '/login',
        data : {
            password : '123',
            mobile : '15699555755'
        },
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});
$('.regest').on('click',function(){
    $.ajax({
        type : 'POST',
        url : '/regest',
        data : {
            username : '15699555750',
            password : '123',
            mobile : '15699555755'
        },
        dataType : 'json'
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});