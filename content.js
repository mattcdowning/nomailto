// content.js
$(function() {
  var style = document.createElement('link')
  style.rel = 'stylesheet'
  style.type = 'text/css'
  style.href = chrome.extension.getURL('nmtstyles.css')

  $("a[href^='mailto:']").on('click', function() {
    ;(document.head || document.documentElement).appendChild(style)
    event.preventDefault()
    var mailaddress = $(this)
      .attr('href')
      .substring(7)
    var mailhref = 'mailto:' + mailaddress

    var copy =
      '<button data-clipboard-text="' +
      mailaddress +
      '"style="cursor: pointer !important; text-decoration: none !important; color: black !important; border: 1px solid black !important; border-radius: 15px; !important; transition: color .15s ease-in !important; background-color: white !important; padding: .25rem .5rem !important; margin-right: 1rem !important;" id="copyToClip">Copy to clipboard</button>'
    var open =
      '<a href="' +
      mailhref +
      '" id="openDefault"><span style="cursor: pointer !important; text-decoration: none !important; color: black !important; border: 1px solid black !important; border-radius: 15px; !important; transition: color .15s ease-in !important; background-color: white !important; padding: .25rem .5rem !important; margin-right: 1rem !important;">Open default</span></a>'
    var heading =
      '<h2 style="font-size: 1rem !important; margin-bottom: 0 !important; text-align: center !important">NoMailto:</h2>'
    var messageText =
      '<h1 class="modal" style="font-size: 1.55rem !important; text-align: center !important; font-weight: 300 !important; margin: 0 0 1rem 0 !important;">Whoa! That\'s a mailto:</h1>'
    var everything = heading + messageText + copy + open
    var contain =
      '<div tabindex="0" id="dang" style="margin: 0 auto !important; text-align: center !important; padding-bottom: 2rem !important;">' +
      everything +
      '</div>'
    var message = $(contain).insertBefore(this)

    $('#dang')
      .modal()
      .focus()

    new Clipboard('#copyToClip')

    function trapFocus(element, namespace) {
      var focusableEls = element.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        ),
        firstFocusableEl = $('#dang'),
        lastFocusableEl = focusableEls[focusableEls.length - 1],
        KEYCODE_TAB = 9
      element.addEventListener('keydown', function(e) {
        var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

        if (!isTabPressed) {
          return
        }

        if (e.shiftKey) {
          /* shift + tab */ if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus()
            e.preventDefault()
          }
        } /* tab */ else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus()
            e.preventDefault()
          }
        }
      })
    }
    var theModal = $('#dang')[0]
    trapFocus(theModal)
  })
})
