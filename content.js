// content.js
$(function(){
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('nmtstyles.css');

  $("a[href^='mailto:']").on("click", function(){
    (document.head||document.documentElement).appendChild(style);
    event.preventDefault();
    var mailaddress = $(this).attr('href').substring(7);
    var mailhref = "mailto:" + mailaddress;
    $(this).unbind('click');
    $(this).attr('href', '');

    var copy = '<a data-clipboard-text="' + mailaddress + '"style="cursor: pointer !important; text-decoration: none !important; color: black !important; border: 1px solid black !important; border-radius: 15px; !important; transition: color .15s ease-in !important; background-color: white !important; padding: .25rem .5rem !important; margin-right: 1rem !important;" id="copyToClip">Copy to clipboard</a>'
    var open = '<a href="' + mailhref + '" id="openDefault"><span style="cursor: pointer !important; text-decoration: none !important; color: black !important; border: 1px solid black !important; border-radius: 15px; !important; transition: color .15s ease-in !important; background-color: white !important; padding: .25rem .5rem !important; margin-right: 1rem !important;">Open default</span></a>';
    var heading = '<h2 style="font-size: 1rem !important; margin-bottom: 0 !important; text-align: center !important">NoMailto:</h2>'
    var messageText = '<h1 class="modal" style="font-size: 1.55rem !important; text-align: center !important; font-weight: 300 !important; margin: 0 0 1rem 0 !important;">Whoa! That\'s a mailto:</h1>';
    var everything = heading + messageText + copy + open;
    var contain = '<div id="dang" style="margin: 0 auto !important; text-align: center !important; padding-bottom: 2rem !important;">' + everything + '</div>';
    var message = $(contain).insertBefore(this);

    $('#dang').modal();
    new Clipboard('#copyToClip');

    $(this).bind('click', function(){
      event.preventDefault();
      $('#dang').modal();
      new Clipboard('#copyToClip');
    });

  });

});
