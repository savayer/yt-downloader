window.addEventListener('load', () => {
  const $topLevelButtons = document.querySelector('#menu-container')
  const serverURL = 'https://yt.savayer.space/downloadmp4?url='
  if ($topLevelButtons) {
    let buttonMp4 = document.createElement('button')
    // let buttonMp3 = document.createElement('button')
    buttonMp4.classList.add('downloader')
    buttonMp4.innerHTML = 'mp4'
    buttonMp4.addEventListener('click', async () => {
      const response = await fetch(`${serverURL}${window.location.href}`)
      if (response.status == 200) {
        const a = document.createElement('a');
        a.href = `${serverURL}${window.location.href}`;
        a.setAttribute('download', '');
        a.click();
      } else if(res.status == 400) {
        alert('Invalid url');
      }
    })
    $topLevelButtons.insertAdjacentElement('afterbegin', buttonMp4)
  }
})