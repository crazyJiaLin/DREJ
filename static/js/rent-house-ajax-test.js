$('.submit-rent-house').on('click',function(){
    console.log(this);
    $.ajax({
        type: 'post',
        url : '/submitRentHose',
        dataType : 'json',
        data : {
            house : '123'
        }
    }).done(function(data){
        console.log(data);
    }).fail(function(err){
        console.log(err);
    });
});