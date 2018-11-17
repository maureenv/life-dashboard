const express = require('express')
const next = require('next')
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();


nextApp.prepare()
    .then(() => {
        const server = express();
        server.get('/recipes/:id', (req, res) => {
            axios
                .get('http://127.0.0.1:3001')
                .then(response => {
                    const queryParams = { id: req.params.id }
                    nextApp.render(req, res, "/recipe", queryParams )
                })
                .catch(reason => console.log(reason))
        })
        server.get("*", (req, res) => {
            return nextHandle(req, res)
        });

        server.listen(port, (err) => {
            if (err) {
              console.log(err, 'THE ERROR')
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`)
        });
    });
