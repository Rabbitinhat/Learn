$(function(){
    var $category = $('ul li:gt(5):not(:last)');

    $category.hide();
    var $toggleBtn = $('div.showmore > a');
    $toggleBtn.click(function(){
    if($category.is(":visible")){
        $category.hide();
        $(this).find('span')
            .css("background-color", "")
            .text('显示全部品牌');
            $('ul li').removeClass("promoted");
        
    }else{
        $category.show();
        $(this).find('span')
            .css("background-color", "red")
            .text("显示精简品牌");
        $('ul li').filter(":contains('佳能'), :contains('尼康'), :contains('奥林巴斯')")
            .addClass("promoted");
    }
    return false;
    })
})