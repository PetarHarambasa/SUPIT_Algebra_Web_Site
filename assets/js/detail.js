const bgThumbnail = "#bg-thumbnail";

function getNews(id) {
    let response = $.ajax({
        type: "GET",
        dataType: "json", 
        async: false,
        url: "./db/news.json", 
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    return response.responseJSON.find(x => x.id == id);
}

function appendInformation(info) {
    
    $(bgThumbnail).css("background-image", `url('assets/media/news/${info.thumbnail}')`);
    $("#title").html(info.title);
    $("#subtitle").html(info.subtitle);
    $("#description").html(info.description);

    if(info.images != null) {
        $("#images").html("");
        info.images.forEach(el => {
            $("#images").append(`
            <div class="el position-relative p-1">
                <a href="assets/media/news/${el}" data-fancybox="images"><img class="thumbnail-image" src="assets/media/news/${el}"/></a>
            </div>
            `);
        });
    } else {
        $("#images").remove();
    }

    if(info.videos != null) {
        info.videos.forEach(el => {
            $("#videos").html(`
            <video class="w-100" controls>
                <source src="assets/media/video/${el}" type="video/mp4" />
            </video>
            `);
        });
    } else {
        $("#videos").remove();
    }

}

$(function(){ 
    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        const id = urlParams.get('id')
        let news = getNews(id);
        console.log(news)
        if(!news) {
            throw Error();
        }

        appendInformation(news);
    } catch (error) {
        window.location.replace("/");
    }
});