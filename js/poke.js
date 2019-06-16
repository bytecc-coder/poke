$(function () {

    let poke = [];

    let n = 6;

    let colorArr = ['s','h','d','c'];

    let flag = {};

    while(poke.length < 52){
        let index = Math.floor(Math.random() * colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random() * 12 + 1);
        if(!flag[color+'_'+number]){
            poke.push({color,number});
            flag[color+'_'+number] = true;
        }
    }

    let index = -1;
    for(let i = 0; i < n; i++){
        for(let j = 0; j <= i; j++){
            index++;
            let obj = poke[index];
            let lefts = 360 - 50 * i + 110 * j, tops = 70 * i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./img/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .attr('id',i+'_'+j)
                .data('number',obj.number)
                .delay(index * 50)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }

    for(;index<52;index++){
        let obj = poke[index];
        $('<div>').addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./img/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .attr('id','-2_-2')
            .data('number',obj.number)
            .delay(index* 50)
            .animate({left:-60,top:560,opacity:1})
    }
    let first = null;
    $('.box').on('click','.poke',function () {
        let _this = $(this);
        let id  = _this.attr('id').split('_');
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);
        let id1 = (i+1)+'_'+j, id2 = (i+1)+'_'+(j+1);
        if($('#'+id1).length || $('#'+id2).length){
            return;
        }
        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'});
        }
        else{
            $(this).addClass('active').animate({top:'-=30px'})
        }
        if(!first){
            first = _this;
        }else{
            let number1 = first.data('number'),number2 = _this.data('number')
            if(number1 + number2 >= 14){
                $('.active').animate({top:0,left:700,opacity:0},function () {
                    $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=30'},function () {
                    $(this).removeClass('active');
                })
            }
                first = null;
        }

    })
    //切换
    let m = 0;
    $('.rightBtn').on('click',function () {
        $('.left').last().css('zIndex',m++).animate({left:850},function () {
            $(this).removeClass('left').addClass('right')
        })
    })
    $('.leftBtn').on('click',function () {
        $('.right').last().css('zIndex',m++).animate({left:-60},function () {
            $(this).removeClass('right').addClass('left')
        })
    })





})