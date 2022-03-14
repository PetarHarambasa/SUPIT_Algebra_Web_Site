const subheader = "#subheader";

$(function(){
    setTimeout(() => {
        console.log($(subheader))
        $(subheader).load("../../partials/_subheader.html"); 
    }, 100);
});