var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var path = require('path');

var adsArray = Array();

var AdvertisingStructure = function () {
    this.screens = Array(0, 0, 0);
    this.adsID = 0;
    this.adsName = "";
    this.lines = Array(); //Until 10
    this.pic1 = "";
    this.pic2 = "";
    this.pic3 = "";
    this.pic4 = "";
    this.pic5 = "";
    this.templateLink = "";
    this.duration = 6;
    this.Frames = new function () {
        this.fromDate = '';
        this.toDate = '';
        this.dayArray = new Array(0,0,0,0,0,0,0);
        this.fromHour = '';
        this.toHour = '';
        this.AddDay = function (day) //1 valid day of the week
        {
            if (day > 0 && day <= 7) this.dayArray[day - 1] = 1;
        }

    };
    this.AddScreen = function (screenID) {
        if (screenID >= 1 && screenID <= this.screens.length) this.screens[screenID - 1] = 1;
    };

    this.ValidScreen = function (screenID) {
        if (screenID <= 0 || screenID > this.screens.length) {
            return false;
        }
        if (this.screens[screenID - 1] == 1)  return true;
        return false;
    };
    this.AddLine = function (line) {
        if (this.lines.length <= 10) this.lines.push(line);
    }
};

var FrameTimeStructer = function () {
    this.fromDate = '';
    this.toDate = '';
    this.dayArray = new Array(0,0,0,0,0,0,0);
    this.fromHour = '';
    this.toHour = '';
    this.AddDay = function (day) //1 valid day of the week
    {
        if (day > 0 && day <= 7) this.dayArray[day - 1] = 1;
    }

};
//=====================


var MongoClient = mongodb.MongoClient;
// Connection URL
var url = "mongodb://localhost:27017/package";
var collection;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    // Get the documents collection
    collection = db.collection('adwares');

    db.dropDatabase(function() {
        // Fetch the collection test
        // Remove all records in collection if any
        collection.remove(function(err, result) {

            var ads1 = new AdvertisingStructure();

            var ads1_frame1;
            var ads1_frame2;

            ads1.templateLink = "templates/templateA.html";
            ads1.adsName = "format1";

            ads1.AddLine("Text number 1");
            ads1.AddLine("Text number 2");
            ads1.AddLine("Text number 3");
            ads1.AddLine("Text number 4");

            ads1.pic1 = "http://fanny-pictures-site.com/wp-content/uploads/2014/11/funny-ads-17_1.jpg";
            ads1.pic2 = "http://www.cutorcopy.com/wp-content/uploads/2013/10/bluetooth.jpg";


            ads1.AddScreen(1);
            ads1.AddScreen(2);
            ads1.Frames.fromDate = "01/01/2016";
            ads1.Frames.toDate = "31/12/2016";


            ads1_frame1 = ads1;
            ads1_frame2 = ads1;

            //Frame 1
            ads1_frame1.adsID = 11;
            ads1_frame1.Frames.AddDay(2);
            ads1_frame1.Frames.fromHour = "06";
            ads1_frame1.Frames.toHour = "12";

            //Frame 2
            ads1_frame2.adsID = 12;
            ads1_frame2.Frames.AddDay(4);
            ads1_frame2.Frames.fromHour = "13";
            ads1_frame2.Frames.toHour = "20";

            //--
            var ads2 = new AdvertisingStructure();
            ads2.adsID = 2;
            ads2.templateLink = "templates/templateB.html";
            ads2.adsName = "format2";

            ads2.AddLine("Text number 1");
            ads2.AddLine("Text number 2");
            ads2.AddLine("Text number 3");
            ads2.AddLine("Text number 4");
            ads2.AddLine("Text number 5");
            ads2.AddLine("Text number 6");
            ads2.AddLine("Text number 7");
            ads2.AddLine("Text number 8");
            ads2.AddLine("Text number 9");
            ads2.AddLine("Text number 10");
            ads2.pic1 = "http://itsfunny.org/wp-content/uploads/2013/06/It-finally-did-it.jpg";
            ads2.AddScreen(1);
            ads2.AddScreen(3);

            ads2.Frames.AddDay(3);
            ads2.Frames.AddDay(4);

            ads2.Frames.fromHour = "10";
            ads2.Frames.toHour = "24";
            ads2.Frames.fromDate = "01/03/2016";
            ads2.Frames.toDate = "31/12/2016";

            //----------------ADS3--------------------------------
            var ads3 = new AdvertisingStructure();
            ads3.adsID = 3;
            ads3.templateLink = "templates/templateC.html";
            ads3.adsName = "format3";
            ads3.Frames.fromHour = "08";
            ads3.Frames.toHour = "22";
            ads3.Frames.fromDate = "01/05/2016";
            ads3.Frames.toDate = "15/06/2016";

            ads3.AddScreen(2);
            ads3.AddScreen(3);

            for (var i = 1; i <= 7; i++)
                ads3.Frames.AddDay(i);

            //----------------ADS4--------------------
            var ads4 = new AdvertisingStructure();
            ads4.adsID = 4;
            ads4.templateLink = "templates/templateA.html";
            ads4.adsName = "format4";
            ads4.AddLine("90% Clearence ");
            ads4.AddLine("ASOS ");
            ads4.Frames.AddDay(1);
            ads4.Frames.fromHour = "15";

            ads4.Frames.toHour = "19";
            ads4.Frames.fromDate = "29/03/2016";
            ads4.Frames.toDate = "15/04/2016";
            ads4.AddScreen(1);


            //----------------ADS5--------------------
            var ads5 = new AdvertisingStructure();
            ads5.adsID = 5;
            ads5.templateLink = "templates/templateB.html";
            ads5.adsName = "frmat5";
            ads5.AddLine("6Pm");
            ads5.AddLine("Text number 1");
            ads5.AddLine("Text number 2");
            ads5.AddLine("Text number 3");
            ads5.AddLine("Text number 4");
            ads5.AddLine("Text number 5");
            ads5.AddLine("Text number 6");
            ads5.pic1 = "http://1.bp.blogspot.com/-rJaDkWHvCAk/UCaTOtdnwiI/AAAAAAAAWYI/ykcxOfLIyWg/s1600/funny+commercial+ads+%25289%2529.jpg";
            ads5.pic2 = "http://funnyneel.com/sites/default/files/images/i/01-2016/1-funny-benches-advertising.preview.jpg";

            ads5.Frames.AddDay(2);
            ads5.Frames.AddDay(3);
            ads5.Frames.AddDay(4);
            ads5.AddScreen(3);
            ads5.Frames.fromHour = "01";
            ads5.Frames.toHour = "23";
            ads5.Frames.fromDate = "01/04/2016"
            ads5.Frames.toDate = "31/04/2016"



            collection.insert([ads1,ads2,ads3,ads4,ads5], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "adwares" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });
        });
    });
});

/* GET home page. */
router.get('/', function(req, res) {
    var screenID = req.query.screen;
    var tempArray = Array();

    if (screenID==1) {
        collection.find({"screens.0": 1}).toArray(function (err, doc) {
            doc.forEach(function (docs) {
                tempArray.push(docs);
            });
            res.send(tempArray);
        });
    }
    if (screenID==2) {
        collection.find({"screens.1": 1}).toArray(function (err, doc) {
            doc.forEach(function (docs) {
                tempArray.push(docs);
            });
            res.send(tempArray);
        });
    }
    if (screenID==3) {
        collection.find({"screens.2": 1}).toArray(function (err, doc) {
            doc.forEach(function (docs) {
                tempArray.push(docs);
            });
            res.send(tempArray);
        });
    }
});


router.post('/ads', function (req, res) {
    var Ads = Array();
    console.log("TL: "+templateLink);
    collection.find({
        "adsName": {$regex : ".*"+req.query.adsName+".*"},
        "templateLink": {$regex : ".*"+req.query.templateLink+".*"}
    }).toArray(function (err, doc) {
        //collection.find({adsName: req.query.adsName}).toArray(function (err, doc) {
        if (err)
            console.error(err);
        doc.forEach(function (docs) {
            Ads.push(docs);
        });
        res.send(Ads);
    });
});


/*
router.get('/ads/get', function (req, res) {
    var Ads = Array();
    console.log("hi!");
    collection.find({"adsName": {$regex : ".*"+req.query.adsName+".*"}}).toArray(function (err, doc) {
    //collection.find({adsName: req.query.adsName}).toArray(function (err, doc) {
        if (err)
            console.error(err);
        doc.forEach(function (docs) {
            Ads.push(docs);
        });
        res.send(Ads);
    });
});*/

router.get('/ads/get', function (req, res) {
    var Ads = Array();
    var templateLink = "";
    console.log("TL: "+req.query.templateLink);
    collection.find({
        "adsName": {$regex : ".*"+req.query.adsName+".*"},
        "templateLink": {$regex : ".*"+templateLink+".*"}
    }).toArray(function (err, doc) {
        //collection.find({adsName: req.query.adsName}).toArray(function (err, doc) {
        if (err)
            console.error(err);
        doc.forEach(function (docs) {
            Ads.push(docs);
        });
        res.send(Ads);
    });
});


router.get('/stats/get', function (req, res) {
    var i=0;
    var adLines= Array();
    var total= [0, 0, 0]
    collection.find().toArray(function (err, doc) {
        if (err)
            console.error(err);
        doc.forEach(function (ad) {
            ad.lines.forEach(function(){
                i++;
            })
            adLines.push(i);
            i=0;
        });
        adLines.forEach(function(adLine){
            if (adLine<3){
                total[0]++;
            }
            else if (adLine<7){
                total[1]++;
            }
            else
                total[2]++;
        })
        /*
        var a= Array();

        collection.aggregate
        (
            [
                {
                    $group : { template : "$templateLink" } } ] )
            .toArray(function (err, doc) {
                if (err)
                    console.error(err);
            doc.forEach(function (ad) {
                a.push(ad);
            });
            res.send(a);
        })
         */
        res.send(total);
    });
    });

router.get('/delete', function (req, res) {
    console.log("id to delete= "+ req.query.id)
    collection.deleteOne({'adsID':parseInt(req.query.id)})
});


router.post('/newAD', function (req, res) {
    var id =collection.totalIndexSize()+1;
    console.log('the new AD id='+id);
    var newad = new AdvertisingStructure();
    newad.adsID = id;
    console.log(id);
    newad.templateLink = reg.body.tamplate;
    newad.adsName = reg.body.name;
    console.log(reg.body.Name);
    newad.AddLine(reg.body.line);
    newad.Frames.AddDay(parseInt(reg.body.day));
    newad.Frames.fromHour = reg.body.fromHour;

    newad.Frames.toHour = reg.body.toHour;
    newad.Frames.fromDate = reg.body.fromDate;
    newad.Frames.toDate = reg.body.toDate;
    newad.AddScreen(parseInt(reg.body.screen));
    console.log(newad);
    collection.insert([newad]);
    res.send(Ads);
});

module.exports = router;
