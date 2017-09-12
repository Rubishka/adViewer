/**
 * Created by rubi on 26/03/2017.
 */

angular.module('Services', [])
    .service('adService', ['$http', '$q', function ($http, $q) {   ///////////////////service/////////////////////

        this.getallADs = function (adsName, templateLink) {
            var deferred = $q.defer();
            console.log("TL: "+templateLink);
            //var adsName="1";
//    $http.get('/api/ads/get'+ '?adsName=' + adsName+ '&templateLink=' + templateLink + '&*')
            $http.get('/api/ads/get'+ '?adsName=' + adsName)

                .success(function(data) {
                    console.log("success");
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject({data: data, status: status});
                });

            return deferred.promise;
        };

        this.insertNewAD = function (tamplate,name,line,day,fromHour,toHour,fromDate,toDate,screen) {
            console.log("service:"+name);
            $http.post('/api/newAD/',{tamplate:tamplate , name: name,line: line, day:day ,fromHour: fromHour,
                toHour: toHour ,fromDate: fromDate ,toDate: toDate,screen: screen})
                .success(function(data) {

                });
        };

/*        this.insertNewAD = function (tamplate,name,line,day,fromHour,toHour,fromDate,toDate,screen) {
            console.log("service:"+name);
            $http.post('/api/newAD',{tamplate:tamplate , name: name,line: line, day:day ,fromHour: fromHour,
                toHour: toHour ,fromDate: fromDate ,toDate: toDate,screen: screen})
                .success(function(data) {

                });
        };;*/

        this.delete = function (id) {
            $http.get('/api/delete/' + '?id=' + id).success(function (data) {
                console.log('id')

            });
        };
        /*
        this.getallADs = function (adsName, templateLink) {
            var deferred = $q.defer();
            console.log("TL: "+templateLink);
            //var adsName="1";
        //    $http.get('/api/ads/get'+ '?adsName=' + adsName+ '&templateLink=' + templateLink + '&*')
                $http.get('/api/ads/get'+ '?adsName=' + '1'+ '&templateLink=' + 'A' )

            .success(function(data) {
                    console.log("success");
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                   deferred.reject({data: data, status: status});
                });

            return deferred.promise;
        };
        */

        this.getStats = function () {
            var deferred = $q.defer();
                console.log("service!");
            $http.get('/api/stats/get')
                .success(function(data) {
                    console.log("success");
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    console.log("error");
                    deferred.reject({data: data, status: status});
                });

            return deferred.promise;
        };


 /*       this.insertAD = function (tamplate, Name, line,day,fromHour,toHour,fromDate,toDate,screen) {
            var topID = collection.count + 1;
            var AD = new AdvertisingStructure();
            return $http.get(serviceBase + 'checkUnique/' + id + '?property=' + property + '&value=' + escape(value)).then(

              //  AD.adsID = topID;
            AD.templateLink = tamplate;
            AD.adsName = Name;
            AD.AddLine(line);
            AD.Frames.AddDay(day);

            AD.Frames.fromHour = fromHour;
            AD.Frames.toHour = toHour;

            AD.Frames.fromDate = fromDate;
            AD.Frames.toDate = toDate;
            AD.AddScreen(screen);


        };*/



    }]);


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
