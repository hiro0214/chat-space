$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var img = (message.image.url !== null) ? `<img src="${message.image.url}">` : "";
    var html =`<div class="message_lists">
                <div class="message_info">
                  <p class="message_name">${message.name}</p>
                  <p class="message_data">${message.data}</p>
                  </div>
                <div class="message_comment">
                  ${message.content}
                  ${img}
                </div>
              </div>`
    return html;
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
        var html = buildHTML(data);
     $(".message").append(html);
     $("form")[0].reset();
     $(".message").animate({scrollTop: $(".message")[0].scrollHeight} , 0);
    })
    .fail(function(){
      alert("メッセージを入力してください");
    })
    .always(function(){
      $(".form_send").prop("disabled",false);
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $(".message_lists").data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = "";
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $(".message").append(insertHTML);
        $(".message").animate({scrollTop: $(".message")[0].scrollHeight} , 0);
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
    };
  }
  setInterval(reloadMessages, 5000);
});
