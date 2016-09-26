import getData from './extractor';

export default function walkRoots(roots) {
  var tree = {};
  for (var name in roots) {
    walkNode(roots[name], tree);
  }
  return tree;
}

function walkNode(element, tree) {
  var data = getData(element);
  if (data.nodeType !== 'Wrapper') {
    var { key, ref, children, ...props } = data.props;
    tree.name = data.name;
    tree.type = data.nodeType;
    tree.props = props;
    tree.state = data.state;
    tree.children = [];
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((el) => {
        tree.children.push(walkNode(el, {}));
      });
    }
    return tree;
  } else {
    return walkNode(data.children[0], tree);
  }
}
