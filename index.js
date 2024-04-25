const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('media'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
		res.sendFile(__dirname + '/site/index.html');
});

app.get('/api/posts', (req, res) => {
		const postsPath = path.join(__dirname, 'posts.json');
		const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
		res.json(posts);
});

app.get('/post', (req, res) => {
		res.sendFile(__dirname + '/site/post.html');
});

app.get('/ect/style.css', (req, res) => {
		res.sendFile(__dirname + '/site/style.css');
});

app.get('/ect/search.css', (req, res) => {
		res.sendFile(__dirname + '/site/search.css');
});


app.get('/paste', (req, res) => {
		res.sendFile(__dirname + '/site/paste.html');
});


const formsDirectory = path.join(__dirname, 'txt');
const txtFiles = fs.readdirSync(formsDirectory).filter(file => path.extname(file) === '.txt');

txtFiles.forEach(file => {
		const fileNameWithoutExtension = path.basename(file, path.extname(file));
		const endpoint = `/text/${fileNameWithoutExtension}`;

		app.get(endpoint, (req, res) => {
				const filePath = path.join(formsDirectory, file);
				const fileContents = fs.readFileSync(filePath, 'utf8');
				res.send(fileContents);
		});
});

app.listen(port, () => {
		console.log(`The site is running on port ${port}!`);
});
