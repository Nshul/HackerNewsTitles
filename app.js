const express = require('express');
const fs = require('fs');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

app.get('/scrape',(req,res,next)=>{
    let url = 'https://news.ycombinator.com';

    request(url,(err,response,html)=>{
        if(err){
            console.log(err);
        }else{
            console.log("response code:"+response.statusCode);
            const $ = cheerio.load(html);
            var title = '<ul>';

            $('a.storylink').each((i,element)=>{
                title += '<li>';
                title += element.children[0].data;
                title +='</li>';
            });
            title +='</ul>';
            console.log(title);
            res.send(title);
        }
    })
});

app.listen(8040, function () {
    console.log("Server started on http://localhost:8040");
});