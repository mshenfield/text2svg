'use strict'

var paper = Raphael(10, 50, 2000, 500);
paper.fill = "black";
var circles = [];
var glows = [];

var centerX = 250,
    centerY = 250,
    numCircles = 60,
    distance = 100,
    frames = 10,
    radiusMin = 5,
    radiusVar = 10,
    KERNING = 40,
    SPREAD = 30

init();
setInterval(update, 400);

function init() {
    var paths = ['M937 -454L412 -454L320 -240Q286 -161 286 -122Q286 -91 315.5 -67.5Q345 -44 443 -37L443 0L16 0L16 -37Q101 -52 126 -76Q177 -124 239 -271L716 -1387L751 -1387L1223 -259Q1280 -123 1326.5 -82.5Q1373 -42 1456 -37L1456 0L921 0L921 -37Q1002 -41 1030.5 -64Q1059 -87 1059 -120Q1059 -164 1019 -259L937 -454M909 -528L679 -1076L443 -528L909 -528Z',
  'M420 -635L420 -240Q420 -112 448 -81Q486 -37 563 -37L615 -37L615 0L34 0L34 -37L85 -37Q171 -37 208 -93Q228 -124 228 -240L228 -1116Q228 -1244 201 -1275Q162 -1319 85 -1319L34 -1319L34 -1356L531 -1356Q713 -1356 818 -1318.5Q923 -1281 995 -1192Q1067 -1103 1067 -981Q1067 -815 957.5 -711Q848 -607 648 -607Q599 -607 542 -614Q485 -621 420 -635M420 -692Q473 -682 514 -677Q555 -672 584 -672Q688 -672 763.5 -752.5Q839 -833 839 -961Q839 -1049 803 -1124.5Q767 -1200 701 -1237.5Q635 -1275 551 -1275Q500 -1275 420 -1256L420 -692Z',
  'M1384 0L1022 0L563 -634Q512 -632 480 -632Q467 -632 452 -632.5Q437 -633 421 -634L421 -240Q421 -112 449 -81Q487 -37 563 -37L616 -37L616 0L35 0L35 -37L86 -37Q172 -37 209 -93Q230 -124 230 -240L230 -1116Q230 -1244 202 -1275Q163 -1319 86 -1319L35 -1319L35 -1356L529 -1356Q745 -1356 847.5 -1324.5Q950 -1293 1021.5 -1208.5Q1093 -1124 1093 -1007Q1093 -882 1011.5 -790Q930 -698 759 -660L1039 -271Q1135 -137 1204 -93Q1273 -49 1384 -37L1384 0M421 -697Q440 -697 454 -696.5Q468 -696 477 -696Q671 -696 769.5 -780Q868 -864 868 -994Q868 -1121 788.5 -1200.5Q709 -1280 578 -1280Q520 -1280 421 -1261L421 -697Z',
  'M632 -37L632 0L51 0L51 -37L99 -37Q183 -37 221 -86Q245 -118 245 -240L245 -1116Q245 -1219 232 -1252Q222 -1277 191 -1295Q147 -1319 99 -1319L51 -1319L51 -1356L632 -1356L632 -1319L583 -1319Q500 -1319 462 -1270Q437 -1238 437 -1116L437 -240Q437 -137 450 -104Q460 -79 492 -61Q535 -37 583 -37L632 -37Z',
  'M1174 -375L1207 -368L1091 0L41 0L41 -37L92 -37Q178 -37 215 -93Q236 -125 236 -241L236 -1116Q236 -1243 208 -1275Q169 -1319 92 -1319L41 -1319L41 -1356L655 -1356L655 -1319Q547 -1320 503.5 -1299Q460 -1278 444 -1246Q428 -1214 428 -1093L428 -241Q428 -158 444 -127Q456 -106 481 -96Q506 -86 637 -86L736 -86Q892 -86 955 -109Q1018 -132 1070 -190.5Q1122 -249 1174 -375Z',
  'M535 -141L535 -640L37 -640L37 -722L535 -722L535 -1219L615 -1219L615 -722L1115 -722L1115 -640L615 -640L615 -141L535 -141Z',
  'M838 0L314 -1141L314 -235Q314 -110 341 -79Q378 -37 458 -37L506 -37L506 0L34 0L34 -37L82 -37Q168 -37 204 -89Q226 -121 226 -235L226 -1121Q226 -1211 206 -1251Q192 -1280 154.5 -1299.5Q117 -1319 34 -1319L34 -1356L418 -1356L910 -295L1394 -1356L1778 -1356L1778 -1319L1731 -1319Q1644 -1319 1608 -1267Q1586 -1235 1586 -1121L1586 -235Q1586 -110 1614 -79Q1651 -37 1731 -37L1778 -37L1778 0L1202 0L1202 -37L1250 -37Q1337 -37 1372 -89Q1394 -121 1394 -235L1394 -1141L871 0L838 0Z',
  'M937 -454L412 -454L320 -240Q286 -161 286 -122Q286 -91 315.5 -67.5Q345 -44 443 -37L443 0L16 0L16 -37Q101 -52 126 -76Q177 -124 239 -271L716 -1387L751 -1387L1223 -259Q1280 -123 1326.5 -82.5Q1373 -42 1456 -37L1456 0L921 0L921 -37Q1002 -41 1030.5 -64Q1059 -87 1059 -120Q1059 -164 1019 -259L937 -454M909 -528L679 -1076L443 -528L909 -528Z',
  'M836 -751L1127 -317Q1248 -137 1306.5 -89.5Q1365 -42 1455 -37L1455 0L873 0L873 -37Q931 -38 959 -49Q980 -58 993.5 -76.5Q1007 -95 1007 -114Q1007 -137 998 -160Q991 -177 943 -248L713 -596L429 -232Q384 -174 375 -154.5Q366 -135 366 -114Q366 -82 393 -61Q420 -40 496 -37L496 0L15 0L15 -37Q66 -42 103 -58Q165 -84 221 -128Q277 -172 349 -263L669 -667L402 -1058Q293 -1217 217 -1266.5Q141 -1316 42 -1319L42 -1356L669 -1356L669 -1319Q589 -1316 559.5 -1293Q530 -1270 530 -1242Q530 -1205 578 -1134L786 -823L1027 -1128Q1069 -1182 1078.5 -1202Q1088 -1222 1088 -1243Q1088 -1264 1076 -1280Q1061 -1301 1038 -1309.5Q1015 -1318 943 -1319L943 -1356L1424 -1356L1424 -1319Q1367 -1316 1331 -1301Q1277 -1278 1232 -1239Q1187 -1200 1105 -1095L836 -751Z'];

    var letterOffset = 50;
    $.each(paths, function (i, path) {
        var totalLetterLength = Raphael.getTotalLength(path);

        var increment = totalLetterLength / numCircles;

        var maxX = 0;
        for (var i = 0; i < numCircles; i++) {
            var point = Raphael.getPointAtLength(path, i * increment);

            var x = point.x / 7 + letterOffset;

            maxX = Math.max(maxX, x);

            createCircle(x, (point.y / 5) + 400, randomRadius());
        }

        letterOffset = maxX + KERNING;
    });
}

// Utils / helper functions
function randomRadius() {
    return Math.random() * radiusVar + radiusMin;
}

function createCircle(x, y, radius) {
    var circle = paper.circle(x, y, radius);

    circle.originalPoint = {
        cx: x,
        cy: y
    };
    var color = randomColor() // defined in davidmerfield/randomColor
    circle.attr("fill", color);
    circle.attr("stroke", color);
    // glows.push(circle.glow());
    circles.push(circle);
}

function elasticNewLocation(circle) {
    var moveX = randomSpread();
    var moveY = randomSpread();
    return {
        cx: circle.originalPoint.cx + moveX,
        cy: circle.originalPoint.cy + moveY
    }
}

function randomSpread() {
    return SPREAD * Math.random() - SPREAD / 2;
}

function update() {
    var i;
    for (i = 0; i < circles.length; i++) {
        var circle = circles[i];
        // var glow = glows[i];

        var newLocation = elasticNewLocation(circle);
        var animation = Raphael.animation(newLocation, 400, "easeInOut");

        // glow.animate(animation);
        circle.animate(animation);
    }
}