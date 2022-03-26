import http, { IncomingMessage, ServerResponse } from "http";
import { type } from "os";

const cheerio = require("cheerio")
const axios = require("axios")


const PORT = 3001;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if(req.url === '/api/url' && req.method === 'POST') {
        try {
            let body = "";
            req.on('data', (chunks) => {
                body += chunks.toString()
            })
            req.on('end', () => {
                const url = JSON.parse(body)
                if(url) {
                    interface Obj {
                        title: any,
                        description: any,
                        imageUrl: any
                    }

                    let scrapeData: Obj = {
                        title: "",
                        description: "",
                        imageUrl: ""
                    }

                    axios(url).then((response: { data: any; }) => {
                        const $ = cheerio.load(response.data);
                        let title = $('meta[property="og:title"]').attr("content") || $('title').text() ||
                        $('meta[name="title"]').attr('content');
                        let description = $('meta[property="og:description"]').attr('content') ||
                        $('meta[name="description"]').attr('content');
                        let imageUrl = $('meta[property="og:image"]').attr('content') ||
                        $('meta[property="og:image:url"]').attr('content');
                        
                        console.log(title, description, imageUrl)

                        scrapeData.title = title;
                        scrapeData.description = description;
                        scrapeData.imageUrl = imageUrl;

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            title,
                            description,
                            imageUrl
                        }, null, ""))
                    })
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Incorrect Web Url.' }, null, ""))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
})

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
