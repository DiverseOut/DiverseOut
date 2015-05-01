// ourApp.directive("piechartModal", function(){
//   return {
//     templateUrl: "/partials/piechart-modal.html"
//   };
// });

ourApp.directive('d3piechart', function() {
    var d = {};

      d.restrict = 'E';
      d.template = '<div></div>';
      d.replace = true;
      d.scope = { dataset : '=' };

      d.link = function($scope, element, attrs) {
        $scope.$watch('dataset', function() {
          //Width and height
          var w = 250;
          var h = 250;
          var dataset = $scope.dataset;
          var outerRadius = w / 2;
          var innerRadius = 0;
          var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

          var pie = d3.layout.pie()
            .value(function(d){return d.value;})

          //Easy colors accessible via ordinal scale
          var color = d3.scale.category20();

          //Clears the previous content
          jQuery(element).html('');

          //Create SVG element
          var svg = d3.select(jQuery(element).get(0))
            .append("svg")
            .attr("class", "pie_circle")
            .attr("width", w)
            .attr("height", h);

          //Set up groups
          var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

          //Draw arc paths
          arcs.append("path")
            .attr("fill", function(d,i) {
              return color(i);
            })
            .attr("d", arc);

          //Labels
          // arcs.append("text")
          //   .attr("transform", function(d) {
          //     return "translate(" + arc.centroid(d) + ")";
          //   })
          //   .attr("text-anchor", "middle")
          //     .text(function(d, i) {
          //       if (dataset[i].value > 0) {return dataset[i].attribute_title};
          //   });
/////////
        var legend = d3.select(jQuery(element).get(0)).append("svg")
            .attr("class", "legend")
            // .attr("width", 100)
            // .attr("height", 100)
          .selectAll("g")
            .data(dataset)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d,i) {
              return color(i);
            });

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d.attribute_title + ": " + d.value; });

/////////
        }, true);

      };

      return d;

});
