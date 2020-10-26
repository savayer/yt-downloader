window.addEventListener('load', () => {
  const $topLevelButtons = document.querySelector('#menu-container')
  const serverURL = 'https://yt.savayer.space'
  if ($topLevelButtons) {
    let buttonMp4 = document.createElement('button')
    buttonMp4.classList.add('downloader')
    buttonMp4.innerHTML = 'mp4'
    buttonMp4.addEventListener('click', async () => {
      try {
        const response = await fetch(`${serverURL}/video?url=${window.location.href}`)
        if (!response.ok) {
          const errorMessage = await response.text()
          alert(errorMessage)
        } else if (response.status === 200) {
          createLink(`${serverURL}/video?url=${window.location.href}`)
        }
      } catch (e) {
        console.error(e)
      }
    })

    let buttonMp3 = document.createElement('button')
    buttonMp3.classList.add('downloader')
    buttonMp3.innerHTML = 'mp3'
    buttonMp3.addEventListener('click', async () => {
      try {
        const response = await fetch(`${serverURL}/audio?url=${window.location.href}`)
        if (!response.ok) {
          const errorMessage = await response.text()
          alert(errorMessage)
        } else if (response.status === 200) {
          createLink(`${serverURL}/audio?url=${window.location.href}`)
        }
      } catch (e) {
        console.error(e)
      }
    })
    $topLevelButtons.insertAdjacentElement('afterbegin', buttonMp4)
    $topLevelButtons.insertAdjacentElement('afterbegin', buttonMp3)
  }

  function createLink (url) {
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', '');
    a.click();
  }
})