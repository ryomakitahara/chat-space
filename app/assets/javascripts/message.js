$(function(){

  function buildHTML(message) {
    if ( message.image ) {
      var html =
        `<div class="main__message--list__content">
          <div class="main__message--list__name">
            ${ message.user_name }
            <div class="main__message--list__name__time">
              ${ message.created_at }
            </div>
          </div>
          <div class="main__message--list__messages">
            <p class="lower-message__content">
              ${ message.content }
            </p>
            <img class="lower-message__image", src="${ message.image }">
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="main__message--list__content">
          <div class="main__message--list__name">
            ${ message.user_name }
            <div class="main__message--list__name__time">
              ${ message.created_at }
            </div>
          </div>
          <div class="main__message--list__messages">
            <p class="lower-message__content">
              ${ message.content }
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
       $('.main__message--list').append(html);
       $('form')[0].reset();
       $('.main__message--list').animate({ scrollTop: $('.main__message--list')[0].scrollHeight});
       $('.submit--btn').prop("disabled", false);
       
     })
     .fail(function(){
       alert("メッセージ送信に失敗しました");
     });
  })
});

