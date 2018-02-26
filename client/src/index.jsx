import React from 'react';
import ReactDom from 'react-dom';

const title = 'Minimal React Webpack Babel Setup';

// ReactDom.render(
//   <div>{title}</div>,
//   document.getElementById('app')
// );

const sum = function(a, b) {
  console.log(a);
  return a + b;
}

export default sum;
