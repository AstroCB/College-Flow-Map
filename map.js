// Build the map
var width = 1000;
height = 500;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var geoPath = d3.geo.path()
    .projection(projection);

// From data set
var totalLeaving = 260042;
var avgLeavingFactor = 0.02;
var totalCollegePop = 932902;
var avgLeavingPerc = 36.490196078431374;
var avgStayingPerc = 63.509803921568626;

var currentFactor = "leave"; // Default

g.selectAll("path")
    .data(stateshighres.features)
    .enter()
    .append("path")
    .attr("fill", getFill)
    .attr("d", geoPath);

function getFill(d) {
    var name = d.properties.NAME;
    var data = state_data[name];
    var entering = data["entering"].data / totalLeaving - avgLeavingFactor; // 0.02 is "average"
    var enteringFactor = Math.floor(entering * 45 * 255);
    var leaving = (data["leaving"].data.perc - avgLeavingPerc) / 100;
    var leavingFactor = Math.floor(leaving * 5 * 255);
    var staying = (data["in_state"].data.perc - avgLeavingPerc) / 100;
    var stayingFactor = Math.floor(staying * 2 * 255);
    console.log(stayingFactor)
    switch (currentFactor) {
        case "leave":
            return "rgb(" + leavingFactor + ", 0, " + (-1 * leavingFactor) + ")";
            break;
        case "enter":
            return "rgb(" + enteringFactor + ", 0, " + (-1 * enteringFactor) + ")";
            break;
        case "stay":
            return "rgb(" + stayingFactor + ", 0, " + (-1 * stayingFactor) + ")";
            break;
        default:
            console.log("Factor case not recognized");
            return "rgb(0,0,0)";
            break;
    }
}

function toggle() {
    var current = document.getElementById("selection").value;
    currentFactor = current;

    var leavenodes = document.getElementsByClassName("leave-desc");
    var enternodes = document.getElementsByClassName("enter-desc");
    var staynodes = document.getElementsByClassName("stay-desc");
    switch (currentFactor) {
        case "leave":
            setvis(leavenodes, enternodes, staynodes);
            break;
        case "enter":
            setvis(enternodes, leavenodes, staynodes);
            break;
        case "stay":
            setvis(staynodes, enternodes, leavenodes);
            break;
        default:
            console.log("Factor case not recognized");
            break;
    }

    recalc();
}
document.getElementById("selection").addEventListener("change", toggle);

function setvis(vis, invis1, invis2) {
    for (var i = 0; i < vis.length; i++) {
        vis[i].style.display = "block";
    }
    for (var j = 0; j < invis1.length; j++) {
        invis1[j].style.display = "none";
    }
    for (var x = 0; x < invis2.length; x++) {
        invis2[x].style.display = "none";
    }
}

function recalc() {
    g.selectAll("path").remove();
    g.selectAll("path")
        .data(stateshighres.features)
        .enter()
        .append("path")
        .attr("fill", getFill)
        .attr("d", geoPath);
}
// Modal
document.getElementById("help").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
});
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
