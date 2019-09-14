$(function(){
  function text(message){
    var html =`<div class="message_lists">
                <div class="message_info">
                  <p class="message_name">${message.name}</p>
                  <p class="message_data">${message.data}</p>
                  </div>
                <div class="message_comment">
                  ${message.content}
                </div>
              </div>`

    return html;
  }
  function text_image(message){
    var html =`<div class="message_lists">
                <div class="message_info">
                  <p class="message_name">${message.name}</p>
                  <p class="message_data">${message.data}</p>
                </div>
                <div class="message_comment">
                ${message.content}<br>
                <img src = "${message.image.url}">
                </div>
              </div>`

    return html;
  }


  $("form").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.image.url == null){
        var html = text(data);
      }else
        var html = text_image(data);
     $(".message").append(html)
     $(".form_message").val('')
     $(".form_image").val('')
     $(".message").animate({scrollTop: $(".message")[0].scrollHeight} , 0);
    })
    .fail(function(){
      alert("error");
    })
  });
});