// https://github.com/facebook/react-devtools

export default function getComponentData(element) {
  var children = null;
  var props = null;
  var state = null;
  var context = null;
  var updater = null;
  var name = null;
  var type = null;
  var key = null;
  var ref = null;
  var text = null;
  var publicInstance = null;
  var nodeType = 'Native';

  if (typeof element !== 'object') {
    nodeType = 'Text';
    text = element + '';
  } else if (element._currentElement === null || element._currentElement === false) {
    nodeType = 'Empty';
  } else if (element._renderedComponent) {
    nodeType = 'NativeWrapper';
    children = [element._renderedComponent];
    props = element._instance.props;
    state = element._instance.state;
    context = element._instance.context;
    if (context && Object.keys(context).length === 0) {
      context = null;
    }
  } else if (element._renderedChildren) {
    children = childrenList(element._renderedChildren);
  } else if (element._currentElement && element._currentElement.props) {
    children = element._currentElement.props.children;
  }

  if (!props && element._currentElement && element._currentElement.props) {
    props = element._currentElement.props;
  }

  if (element._currentElement != null) {
    type = element._currentElement.type;
    if (element._currentElement.key) {
      key = String(element._currentElement.key);
    }
    ref = element._currentElement.ref;
    if (typeof type === 'string') {
      name = type;
    } else if (element.getName) {
      nodeType = 'Composite';
      name = element.getName();
      if (element._renderedComponent && element._currentElement.props === element._renderedComponent._currentElement) {
        nodeType = 'Wrapper';
      }
      if (name === null) {
        name = 'No display name';
      }
    } else if (typeof element._stringText === 'string') {
      nodeType = 'Text';
      text = element._stringText;
    } else {
      name = type.displayName || type.name || 'Unknown';
    }
  }

  if (element._instance) {
    var inst = element._instance;
    updater = {
      setState: inst.setState && inst.setState.bind(inst),
      forceUpdate: inst.forceUpdate && inst.forceUpdate.bind(inst),
      setInProps: inst.forceUpdate && setInProps.bind(null, element),
      setInState: inst.forceUpdate && setInState.bind(null, inst),
      setInContext: inst.forceUpdate && setInContext.bind(null, inst),
    };
    publicInstance = inst;
    if (inst._renderedChildren) {
      children = childrenList(inst._renderedChildren);
    }
  }

  return {
    nodeType,
    type,
    key,
    ref,
    name,
    props,
    state,
    context,
    children,
    text,
    updater,
    publicInstance,
  };
}

function setInProps(internalInst, path, value) {
  var element = internalInst._currentElement;
  internalInst._currentElement = {
    ...element,
    props: copyWithSet(element.props, path, value),
  };
  internalInst._instance.forceUpdate();
}

function setInState(inst, path, value) {
  setIn(inst.state, path, value);
  inst.forceUpdate();
}

function setInContext(inst, path, value) {
  setIn(inst.context, path, value);
  inst.forceUpdate();
}

function setIn(obj, path, value) {
  var last = path.pop();
  var parent = path.reduce((obj_, attr) => obj_ ? obj_[attr] : null, obj);
  if (parent) {
    parent[last] = value;
  }
}

function childrenList(children) {
  var res = [];
  for (var name in children) {
    res.push(children[name]);
  }
  return res;
}
