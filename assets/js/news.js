const htmlNews = "#newsContainer";
let news = [];

function getNews() {
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

    return response.responseJSON;
}

function generateNewsDiv(info) {
    console.log(info);
    return `
    <div class="col-md-3 animate__animated animate__zoomIn">
    <a href="news-detial.html?id=${info.id}" class="d-flex justify-content-center">
      <div
        class="circle-news"
        style="background-image: url('assets/media/news/${info.thumbnail}')"
      >
        <div class="w-100">
          <h3 id="title">${info.date}</h3>
          <p id="description">${info.title}</p>
        </div>
      </div>
    </a>
  </div>
    `;
}


function appendData(news) {
    news.forEach(el => {
        $(htmlNews).append(generateNewsDiv(el));
    });
}

$(function(){ 
    let news = getNews();
    appendData(news);
});
