// Define dimensions
var width = 960,
    height = 600;

// Set the projection
var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2]);

// Define path generator
var path = d3.geoPath()
    .projection(projection);

// Define color scale
var color = d3.scaleQuantize()
.range(["#67000d", "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2", "#fff5f0"]);


// Create SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    svg.append("text")
    .attr("x", width / 2)             // Position it at the center of the SVG width
    .attr("y", 30)                    // A bit of padding from the top
    .attr("text-anchor", "middle")    // Ensures the text is centered at the given x position
    .attr("font-size", "24px")        // Adjust font size as needed
    .attr("font-weight", "bold")      // Make it bold
    .text("Super Market Accessibility in the US");

// Load the GeoJSON data
d3.json("./cartography/counties.geojson").then(function(us) {
  
    // Load your data here, for example from a CSV
    // Here's a dummy example using d3.csv:
    
    d3.csv("median_scores.csv").then(function(data) {
        const medianScores = {};    

        data.forEach(function(d) {
            const id = d.State + "_" + d.County;
            medianScores[id] = +d.median_sas_score;
        });

        // Update the color domain based on your dataset's range
        color.domain([
            d3.min(data, d => d.median_sas_score),
            d3.max(data, d => d.median_sas_score)
        ]);

        // Draw the counties with the appropriate colors
        svg.selectAll("path")
            .data(us.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                const id = statecode[d.properties.STATEFP] + "_" + d.properties.NAME + " County";
                return medianScores[id] ? color(medianScores[id]) : "#ccc";
            });
    });
});


const statecode = {
"01": "Alabama",
"31": "Nebraska",
"02": "Alaska",
"32": "Nevada",
"04": "Arizona",
"33": "New Hampshire",
"05": "Arkansas",
"34": "New Jersey",
"06": "California",
"35": "New Mexico",
"08": "Colorado",
"36": "New York",
"09": "Connecticut",
"37": "North Carolina",
"10": "Delaware",
"38": "North Dakota",
"11": "District of Columbia",
"39": "Ohio",
"12": "Florida",
"40": "Oklahoma",
"13": "Georgia",
"41": "Oregon",
"15": "Hawaii",
"42": "Pennsylvania",
"16": "Idaho",
"72": "Puerto Rico",
"17": "Illinois",
"44": "Rhode Island",
"18": "Indiana",
"45": "South Carolina",
"19": "Iowa",
"46": "South Dakota",
"20": "Kansas",
"47": "Tennessee",
"21": "Kentucky",
"48": "Texas",
"22": "Louisiana",
"49": "Utah",
"23": "Maine",
"50": "Vermont",
"24": "Maryland",
"51": "Virginia",
"25": "Massachusetts",
"78": "Virgin Islands",
"26": "Michigan",
"53": "Washington",
"27": "Minnesota",
"54": "West Virginia",
"28": "Mississippi",
"55": "Wisconsin",
"29": "Missouri",
"56": "Wyoming",
"30"	 	 	 : "Montana",
}