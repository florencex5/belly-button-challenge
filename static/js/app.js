// URL address
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// DROPDOWN MENU
function init() {

    //Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
    
        //Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
    
        //Prepare a variable for id names array
        let names = data.names;

        //Iterate over id names array
        names.forEach(name => {
            dropdownMenu.append("option").text(name).property("value");
        });
    
        // Set up a new variable for first element
        let sample = names[0];
    
        // Call the functions
        barchart(sample);
        bubble(sample);
        demographic(sample);
        gauge(sample);
    });
}


// BAR CHART
function barchart(sample) {

    //Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);

        //Prepare a variable for samples objects
        let samplesData = data.samples;

        //Filter data by using id 
        let result = samplesData.filter(item => item.id == sample)
    
        // Set up a new variable for first object
        let result1 = result[0]

        //Prepare data array for displaying top 10 OTUs
        let traceData = [{
            x: result1.sample_values.slice(0,10).reverse(),
            y: result1.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: result1.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", traceData);

    });
};

// BUBBLE CHART
function bubble(sample) {

    //Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);

        //Prepare a variable for samples array
        let samplesData = data.samples;

        //Filter data by using id 
        let result = samplesData.filter(item => item.id == sample)
    
        // Set up a new variable for first object
        let result1 = result[0]

        //Prepare data array
        let traceData = [{
            x: result1.otu_ids,
            y: result1.sample_values,
            text: result1.otu_labels,
            mode: "markers",
            marker: {
                size: result1.sample_values,
                color: result1.otu_ids,
            }
        }];

        // Add the name of x-axis
        let layout = {
            xaxis: {title: "OTU ID"}
        };

        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bubble", traceData,layout);

    });
};

// DEMOGRAPHIC GRAPH
function demographic(sample) {

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
    
    // Prepare a variable for metadata array
     let rows = data.metadata;
    
    // Filter data by using id 
     let result = rows.filter(item => item.id == sample)
    
    // Set up a new variable for first object
     let result1 = result[0]
    
     // Clear existing metadata content before appending new data
     d3.select("#sample-metadata").html("");
    
    // Use object.keys() to return an array of a given object and then 
    // iterate through that array based on keys in order to append keys and values into element "sample-metatdata"
    
    Object.keys(result1).forEach(key => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${result1[key]}`);
        });
    
    });
}

// GAUGE GRAPH
function gauge(sample) {

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
    
    // Prepare a variable for metadata array
     let rows = data.metadata;
    
    // Filter data by using id 
     let result = rows.filter(item => item.id == sample)
    
    // Set up a new variable for first object
     let result1 = result[0]
    
    //Prepare data array

    let traceData = [{
        type: "indicator",
        mode: "gauge+number",
        value: result1.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 20 } },
        gauge: {
          axis: { range: [null, 9]},
          bar: { color: "darkblue" },
          steps: [
            { range: [0,3], color: "rgb(179,235,232)"},
            { range: [3,6], color: "rgb(148,216,212)"},
            { range: [6,9], color: "rgb(113,203,198)"},
          ],
               },
    }];

    // Use Plotly to plot the data in a bar chart
    Plotly.newPlot("gauge", traceData);

    });
}

// Update all related charts/graphs when an option is changed 
function optionChanged(sample) {
    barchart(sample);
    bubble(sample);
    demographic(sample);
    gauge(sample);
}

init();

