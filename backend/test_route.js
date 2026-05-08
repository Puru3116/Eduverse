const express = require('express');
const app = express();

const router = express.Router();

router.put('/:id', (req, res) => {
    res.json({ route: '/:id', id: req.params.id });
});

router.put('/:id/password', (req, res) => {
    res.json({ route: '/:id/password', id: req.params.id });
});

app.use('/students', router);

const request = require('http').request;

const server = app.listen(0, () => {
    const port = server.address().port;
    const req = request(`http://localhost:${port}/students/123/password`, { method: 'PUT' }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Response:', data);
            server.close();
        });
    });
    req.end();
});
