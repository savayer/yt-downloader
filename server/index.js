const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 9090;

app.use(cors());

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});

app.get('/', (req, res) => {      
  res.send('yt downloader');
});

app.get('/audio', async (req, res, next) => {
	try {
		const url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		const title = await ytdl.getBasicInfo(url) || 'audio'

		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).pipe(res)

	} catch (err) {
		console.error(err);
	}
});

app.get('/video', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		const title = await ytdl.getBasicInfo(url) || 'video'

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, { format: 'mp4' }).pipe(res);
	} catch (err) {
		console.error(err);
	}
});