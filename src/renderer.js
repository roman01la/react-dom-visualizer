import d3 from 'd3';

export default function renderTree(data, {
  selector,
  width = 600,
  height = 300,
  displayLabels = true,
  treeConfig = {}
 }) {

  var vis = d3.select(selector)
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("transform", "translate(0, 30)");

  var treeRoot = d3.layout.tree().size([treeConfig.width || 300, treeConfig.height || 150]);
  var nodes = treeRoot.nodes(data);

  vis.selectAll("pathlink")
    .data(treeRoot.links(nodes))
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", d3.svg.diagonal())

  var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

  node.append("svg:circle")
    .attr("fill", (node) => getNodeColor(node.type))
    .attr("r", (node) => node.type === 'Composite' ? 6 : 4);

  if (displayLabels) {
    node.append("svg:text")
    .attr("dx", 8)
    .attr("dy", 3)
    .attr("fill", (node) => getNodeColor(node.type))
    .attr('font-family', 'sans-serif')
    .attr('font-size', 13)
    .text((d) => '<'+d.name+'>'+(Object.keys(d.props).length ? ' props: ' + JSON.stringify(d.props) : '')+(d.state ? ' state: ' + JSON.stringify(d.state) : ''));
  }

}

function getNodeColor(type) {
  if (type === 'Native') {
    return '#666'
  }
  if (type === 'Composite') {
    return 'red'
  }
  return '#000'
}
