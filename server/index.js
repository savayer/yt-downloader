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

		const data = await ytdl.getBasicInfo(url, {format: 'mp4'})
		const title = rus_to_latin(data.videoDetails.title.replace(/\s/g, "_")) || 'audio'

		if (data.player_response.playabilityStatus.status === 'OK') {
			res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
			ytdl(url, {
				format: 'mp3',
				filter: 'audioonly',
			}).pipe(res)
		} else {
			res.status(400).send(data.player_response.playabilityStatus.reason)
		}
	} catch (err) {
		res.send('error')
	}
});

app.get('/video', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		const data = await ytdl.getBasicInfo(url)
		const title = rus_to_latin(data.videoDetails.title.replace(/\s/g, "_")) || 'video'

		if (data.player_response.playabilityStatus.status === 'OK') {
			res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
			ytdl(url, { format: 'mp4' }).pipe(res);
		} else {
			res.status(400).send(data.player_response.playabilityStatus.reason)
		}
	} catch (err) {
		res.send('error')
	}
});

function rus_to_latin ( str ) {
	const ru = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
		'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
		'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
		'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
		'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
	}, n_str = [];

	str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

	for ( let i = 0; i < str.length; ++i ) {
		n_str.push(
			ru[ str[i] ]
			|| ru[ str[i].toLowerCase() ] === undefined && str[i]
			|| ru[ str[i].toLowerCase() ].toUpperCase()
		);
	}

	return n_str.join('');
}