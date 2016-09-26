import walkRoots from './walker';
import renderTree from './renderer';
import styles from './styles';

let renderer;

window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
  inject(r) {
    renderer = r;
  }
}

document.head.innerHTML += styles;

export default function visualize(opts) {
  renderTree(walkRoots(renderer.Mount._instancesByReactRootID), opts);
}
