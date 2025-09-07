const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get(['/', '/index.html', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    console.log(req);
});

app.get(['/new-page.html', '/new-page'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(['/old-page.html', '/old-page'], (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default
});

// Route handlers
app.get(['/hello', 'hello.html'], (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
});

app.get('/*splat', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));