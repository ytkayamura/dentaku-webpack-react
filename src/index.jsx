import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <div>Hello React</div>
    </div>
  );
};

/*
 * 初期処理
 */
const render = () => ReactDOM.render(<App/>, document.getElementById('app'));
render();

