import { log } from "console";
import express  from "express";
import axios from "axios";
import {load } from "cheerio";
import http from 'http';


var app = express();
let data = []; 
const regex = new RegExp(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g);
axios.get('https://oiseaurose.com/carnet-de-voyage/europe/france/')
    .then(res => {
        const $ = load(res.data)
        $('.post').each((index, element) => {
            const header = $(element).find('.post_wrapper').text();
            const date = $(element).find('.post_detail').text();
            const title = $(element).find('h6').text()
            data = [...data,
                {
                    title: title,
                    img:  $(element).find('.post_img img').attr('src'),
                    link: $(element).find('.post_img a').attr('href'),
                    description: header.replace(date, "" ).replace(title,'').replace(/[\t\n]+/gm, ''),
                }
            ]
        });
        console.log(data);

    });
    

const server = http.createServer((req, res) => {
    res.end(data)
});

server.listen(process.env.PORT || 3000);
