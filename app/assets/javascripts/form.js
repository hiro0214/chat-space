$(document).on('turbolinks:load', function(){

  const searchResult = $("#user-search-result");

  function appendName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    searchResult.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
                </div>`;
    searchResult.append(html);
  }

  const userResult = $(".chat-group-users.js-add-user");
  
  function appendUser(user_id,name) {
    var html =`<div id='chat-group-users'>
                <div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    userResult.append(html);
  }


  $("#user-search-field").on("keyup", function(){
    var input = $(this).val();
    
    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })

    .done(function(data){
      $("#user-search-result").empty();
      if (data.length !== 0) {
        data.forEach(function(data){
          appendName(data)
        });
      }else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
  });
  
  $(document).on("click",".user-search-add",function(){
    $("#chat-group-users").val();
    var user_id = $(this).data("user-id");
    var name = $(this).data("user-name");
    appendUser(user_id,name);
    $(this).parent().remove();
  });

  $(document).on("click",".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});