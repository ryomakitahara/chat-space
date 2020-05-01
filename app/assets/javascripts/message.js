$(function(){

  function buildHTML(message) {
    if ( message.image ) {
      var html =
        `<div class="main__message--list__content" data-message-id=${message.id}>
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
        `<div class="main__message--list__content" data-message-id=${message.id}>
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

  var reloadMessages = function() {
    var last_message_id = $('.main__message--list__content:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__message--list').append(insertHTML);
        $('.main__message--list').animate({ scrollTop: $('.main__message--list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});