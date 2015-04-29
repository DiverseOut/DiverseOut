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
          var w = 300;
          var h = 300;
          var dataset = $scope.dataset;
          var outerRadius = w / 2;
          var innerRadius = 0;
          var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

          var pie = d3.layout.pie()
            .value(function(d){return d.value;})

          //Easy colors accessible via a 10-step ordinal scale
          var color = d3.scale.category10();

          //Clears the previous content
          jQuery(element).html('');

          //Create SVG element
          var svg = d3.select(jQuery(element).get(0))
            .append("svg")
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
          arcs.append("text")
            .attr("transform", function(d) {
              return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
              .text(function(d, i) {
                if (dataset[i].value > 0) {return dataset[i].attribute_title};
            });
        }, true);

      };

      return d;

});
