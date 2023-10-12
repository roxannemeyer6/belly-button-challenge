//note: I had assistance from the TAs Mark and Paveen as well as the Instructor Eli for the homework. I also used several of
//our in class activites as guidance, in particular activity 14.3.2, 14.3.9 and 14.3.10
//1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
//used lesson 14.3.1 for reference
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function init() {
  // Promise Pending
  const dataPromise = d3.json(url);
  console.log("Data Promise: ", dataPromise);
//pull in metadata and selector. data.names variable. for loop for change
function displayMetadata(metadata) {
  const metadataContainer = d3.select("#selDataset");
  metadataContainer.html("");
  Object.entries(metadata).forEach(([key, value]) => {
      metadataContainer.append("p").text(`${key}: ${value}`);
  });
  };
};
//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//Use sample_values as the values for the bar chart.
//Use otu_ids as the labels for the bar chart.
//Use otu_labels as the hovertext for the chart.
//While the samples seemed to already be in order from a random sample,
//I did splice and sort just in case they were not
function createBarChart(data) {
const sampleValues = data.sample_values.slice(0, 10).reverse();
const otuIds = data.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
const otuLabels = data.otu_labels.slice(0, 10).reverse();
let trace1 = {
    x: sampleValues,
    y: otuIds,
    hovertext: otuLabels,
    type: "bar",
    orientation: "h",
  };
let layout = {
title: "top 10 OTUs found in the selected individual"
};
Plotly.newPlot("bar", [trace1], layout);
}
// 3. Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
function createBubbleChart(data) {
  var trace2 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      marker: {
          color: data.otu_ids,
          size: data.sample_values
      }
  };
  var dataTrace2 = [trace2];
  var layout2 = {
      title: 'Bubble Chart',
      showlegend: true,
  };
  Plotly.newPlot("bubble", dataTrace2, layout2);
}
function init() {
d3.json(url).then(function(data) {
  console.log(data);
  const dropdown = d3.select("#selDataset");
  data.names.forEach(sample => {
      dropdown.append("option").attr("value", sample).text(sample);
  });
  const initialSample = data.names[0];
  const sampleData = data.samples.find(sample => sample.id === initialSample);
  const metadata = data.metadata.find(item => item.id == initialSample);
  createBarChart(sampleData);
  createBubbleChart(sampleData);
  displayMetadata(metadata);
  dropdown.on("change", function() {
      const selectedSample = d3.select(this).property("value");
      const newSampleData = data.samples.find(sample => sample.id === selectedSample);
      const newMetadata = data.metadata.find(item => item.id == selectedSample);
      createBarChart(newSampleData);
      createBubbleChart(newSampleData);
      displayMetadata(newMetadata);
  });
});
}
init();