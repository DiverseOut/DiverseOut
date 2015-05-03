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

          // Function to filter out data <= 0
          var posNum = function(element){
            return element.value > 0
          };

          var dataset = ($scope.dataset).filter(posNum);
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

          //Legend
          var legend = d3.select(jQuery(element).get(0))
            .append("svg")
              .attr("class", "legend")
            .selectAll("g")
              .data(dataset)
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

          legend.append("text")
              .attr("x", 0)
              .attr("y", 12)
              .attr("text-align","center")
              .attr("dy", "0.35em")
              .text(function(d) { return d.percentage + "%" });

          legend.append("rect")
              .attr("x", 50)
              .attr("width", 25)
              .attr("height", 25)
              .style("fill", function(d,i) {
                return color(i);
              });

          legend.append("text")
              .attr("x", 80)
              .attr("y", 12)
              .attr("dy", "0.35em")
              .text(function(d) { return d.attribute_title });

        }, true);

      };

      return d;

});
