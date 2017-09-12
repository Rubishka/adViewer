

var adsArray = Array();
var loopFailed = 0;


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function ToDate (str) {

    var parts = str.split("/");
    var dt = new Date(parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10));


    return dt;

};

function IsAdsValid (frameTime) {


    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var fromDate = ToDate(frameTime.fromDate);
    var toDate = ToDate(frameTime.toDate);

    //DateCompare
    if (currentDate < fromDate || currentDate > toDate) return false;

    //Day Compare
    if (frameTime.dayArray[currentDate.getDay()] == 0) return false;

    //Time Compare
    if (currentHour < parseInt(frameTime.fromHour) || currentHour >= parseInt(frameTime.toHour)) return false;

    return true;


};


var UtilsClient = function() {
this.InstallTemplate = function (elm) {
    if (elm.templateLink === undefined || elm.templateLink.length == 0) return "Please Add Templates";

    var current = this;

    $.ajax({
        type: "GET",
        url: elm.templateLink,
        dataType: "html",
        success: function (response) {
            var html = current.ParseTemplate(response,elm);
            $("#ads-container").append("<div id=\"ads-" + elm.adsID + "\" class=\"ads-item\" style=\"display:none;\">" + html + "</div>");
            current.ClearUnUsedElements(elm);
        }
    });


};
this.ParseTemplate = function (htmlTemplate,elm) {

    for (var property in elm) {
        if (property == "lines") continue;
        htmlTemplate = htmlTemplate.replace("~" + property + "~", elm[property]);
    }

    //Lines
    for (index in elm.lines) {
        var lineIndex = parseInt(index) + 1;
        htmlTemplate = htmlTemplate.replace("~line" + lineIndex + "~", elm.lines[index]);
        index++;
    }


    return htmlTemplate;
}
this.ClearUnUsedElements = function (elm) {

    //Clear Lines
    for (var i = elm.lines.length; i < 10; i++) {
        $("#ads-" + elm.adsID + " .line:eq(" + i + ")").hide();
    }
    //
    var current = elm;
    for (var i = 1; i <= 5; i++) {
        if (elm["pic" + i] === 'undefined' || elm["pic" + i].length == 0) $("#ads-" + elm.adsID + " #pic" + i).remove();
    }


};
};



$(function () {


    var screen  = getUrlVars()['screen'];

    if (screen==undefined || screen ==null) {
        $("body").html("Set screen=1 int the url");
        return 0;
    }
    $("h1").text("Screen number " + screen);


    $.ajax({
        type: "GET",
        url: "api/?screen=" + screen,
        dataType: "json",
        success: function (response) {

            adsArray = response;
            CallBackStart();

        }
    });





});


function CallBackStart()
{
    var utilsClient = new UtilsClient();
    //Install Templates
    for (var i = 0; i < adsArray.length; i++) {
        utilsClient.InstallTemplate(adsArray[i]);
    }

    setTimeout(function () {

        $("#loader").hide();
        SchedulerAds(0);

    }, 1000)
}

function SchedulerAds(index)
{
    var adsDuration = adsArray[index].duration;
    var adsID = adsArray[index].adsID;
    if (!IsAdsValid(adsArray[index].Frames))
    {
        loopFailed++;
        if (loopFailed >= adsArray.length) {

            console.log("No Ads to Show - Wait 5min")
            
            //Start to check after 5 min
            setTimeout(function () {
                SchedulerAds(0);
            }, 300000);

            return 0;//Exit from the current Recursive
        }
       
        if (index >= adsArray.length - 1) return SchedulerAds(0);
        else return SchedulerAds(index + 1);
    }

    loopFailed = 0;

    $(".ads-item").hide();
    $("#ads-" + adsID).fadeIn(500);

        setTimeout(function () {
            if (index >= adsArray.length-1) return SchedulerAds(0);
            else return SchedulerAds(index + 1);

        }, adsDuration * 1000);
  

}



 