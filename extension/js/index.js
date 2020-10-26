window.addEventListener('load', () => {
  const $topLevelButtons = document.querySelector('#menu-container')
  const serverURL = 'https://yt.savayer.space'
  if ($topLevelButtons) {
    let buttonMp4 = document.createElement('button')
    buttonMp4.classList.add('downloader')
    buttonMp4.innerHTML = 'mp4'
    buttonMp4.addEventListener('click', async () => {
      const response = await fetch(`${serverURL}/video?url=${window.location.href}`)
      if (response.status === 200) {
        createLink(`${serverURL}/video?url=${window.location.href}`)
      } else if(res.status === 400) {
        alert('Invalid url');
      }
    })

    let buttonMp3 = document.createElement('button')
    buttonMp3.classList.add('downloader')
    buttonMp3.innerHTML = 'mp3'
    buttonMp3.addEventListener('click', async () => {
      const response = await fetch(`${serverURL}/audio?url=${window.location.href}`)
      if (response.status === 200) {
        createLink(`${serverURL}/audio?url=${window.location.href}`)
      } else if(res.status === 400) {
        alert('Invalid url');
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