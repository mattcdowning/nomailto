$(function() {
  ;(function() {
    const $mailto = $("a[href^='mailto:']")

    if ($mailto.length > 0) {
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = chrome.extension.getURL('nmtstyles.css')
      document.head.appendChild(style)

      $mailto.on('click', function(e) {
        e.preventDefault()
        const that = this
        const mailaddress = $(this)
          .attr('href')
          .substring(7)
        const mailhref = `mailto:${mailaddress}`
        const copy = `
          <div tabindex="0" id="nmt">
            <h1 class="heading">NoMailto:</h1>
            <h2 class="copy">Whoa! That's a mailto:</h2>
            <button data-clipboard-text="${mailaddress}" class="copy-btn" id="copyToClip">Copy to clipboard</button>
            <a href="${mailhref}" id="openDefault">Open default</a>
            <div class="copied-container">
              <p class="copied">Copied!</p>
            </div>
          </div>
        `

        if ($('#nmt').length === 0) {
          $(copy).insertBefore(this)
        }

        $('#nmt')
          .modal()
          .focus()

        $(document).on('keydown', '#nmt', function(e) {
          if (e.keyCode === 27) {
            that.focus()
          }
        })

        $('.close-modal').on('click', function() {
          that.focus()
        })

        $('#copyToClip').on('click', function() {
          $('.copied').fadeIn()
          setTimeout(() => {
            $('.copied').fadeOut()
            $(this).focus()
          }, 1000)
        })

        new Clipboard('#copyToClip')

        const theModal = document.getElementById('nmt')
        const focusableEls = theModal.querySelectorAll('a[href], button')
        const firstFocusableEl = theModal
        const lastFocusableEl = focusableEls[focusableEls.length - 1]
        const KEYCODE_TAB = 9

        theModal.addEventListener('keydown', function(e) {
          const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB
          if (!isTabPressed) {
            return
          }
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus()
              e.preventDefault()
            }
          } else if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus()
            e.preventDefault()
          }
        })
      })
    }
  })()
})
