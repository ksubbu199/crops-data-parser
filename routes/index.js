var express = require('express');
var router = express.Router();

//var $ = require('jquery');
//var $ = require('jquery')(require("jsdom").jsdom().defaultView);
/* GET home page. */

const cheerio = require('cheerio')
//const $ = cheerio.load('<h2 class="title">Hello world</h2>')
var dir = require('node-dir');

router.get('/', function(req, res) {
  //console.log($("<p>heyyy</p>").html());

  //$('h2.title').text('Hello there!')
  //$('h2').addClass('welcome')


//  console.log($.html());
  var fs = require('fs')
var path = require('path')
var crops_folder =  path.join(__dirname, '../crops/');
var cdata={};
dir.readFiles(crops_folder,
  function(err, content, next) {
      if (err) throw err;
      //console.log('content:', content);
      next();
  },
  function(err, files){
      if (err) throw err;
      //console.log('finished reading files:', files);
      phpFiles=[]
      res.writeHead(200, {'Content-Type': 'text/html'});
      for(i=0;i<files.length;i++)
      {
        if(files[i].slice(-3) == 'php')
        {
          //console.log(__dirname);
          filename = files[i]
          //filename = filename.replace('crops/','routes/crops/')
          //console.log(filename)
          //filename = filename.replace(__dirname,'..')
          //console.log(filename)
          phpFiles.push(filename)
        }

      }

      console.log(phpFiles);
      //var data={};
      for(i=0;i<phpFiles.length;i++)
      {
        var filePath = path.join(phpFiles[i]);
        //data[phpFiles[i]]='';

        var data = fs.readFileSync(filePath,'utf-8');

        var $ = cheerio.load(data)
        //console.log($('.row .column p').html());
        var cropData = $('.row .column p').html();

        if(cropData)
        {
          res.write('<h3>'+phpFiles[i]+'</h3>')
          res.write(cropData);
          cropData = cropData.replace('<br>', ' ')
          cdata[phpFiles[i]]=cropData;
        }



      }
      res.end();


      fs.writeFile('myjsonfile.json',JSON.stringify(cdata), 'utf8', function(){
        console.log(cdata);
      });
      //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(data));
      //
      // res.write(data);
      // res.end();

      // fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      //     if (!err) {
      //
      //
      //     } else {
      //         console.log(err);
      //     }
      // });

  });





//    res.render('index', { title: 'Express' });

});

module.exports = router;
