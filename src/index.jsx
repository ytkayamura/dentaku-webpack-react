import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NumBtn extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {n, onNumClick} = this.props;
    onNumClick(n);
  }

  render() {
    const {n} = this.props;
    return (
      <button onClick={this.onClick}>{n}</button>
    );
  }
}

const OpeBtn = ({ c, onClick }) => (
  <button onClick={onClick}>{c}</button>
);

const Result = ({ result }) => {
  return (
    <div>
     <span>{result}</span>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultValue: 0,  // 結果 兼 左辺
      inputValue: 0,
      showingResult: false,
      culcResult: (state) => state.inputValue,
      seqOpe: false,   // 演算キー連続入力
      afterResult: false,
    };
    this.onNumClick = this.onNumClick.bind(this);
    this.ope = this.ope.bind(this);
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.multi = this.multi.bind(this);
    this.div = this.div.bind(this);
    this.result = this.result.bind(this);
    this.clear = this.clear.bind(this);
  }
  onNumClick(n) {
    const state = this.state;
    const resState = {
      ...state,
      inputValue: state.afterResult ? n: state.inputValue * 10 + n,
      showingResult: false,
      seqOpe: false,
      afterResult: false,
    };
    this.setState(resState);   // 再描画
  }
  ope(func) {
    const state = this.state;
    const resState = {
      ...state,
      resultValue: state.seqOpe ? state.resultValue : state.culcResult(state),
      inputValue: 0,
      showingResult: true,
      culcResult: func,
      seqOpe: true,
      afterResult: false,
    };
    this.setState(resState);   // 再描画
  }
  plus() {
    this.ope(state => state.resultValue + state.inputValue);
  }
  minus() {
    this.ope(state => state.resultValue - state.inputValue);
  }
  multi() {
    this.ope(state => state.resultValue * state.inputValue);
  }
  div() {
    this.ope(state => 1.0 * state.resultValue / state.inputValue);
  }
  result() {
    const state = this.state;
    const resState = {
      ...state,
      resultValue: state.culcResult(state),
      inputValue: state.culcResult(state),
      showingResult: true,
      culcResult: (state) => state.inputValue,
      seqOpe: false,
      afterResult: true,
    };
    this.setState(resState);   // 再描画
  }
  clear() {
    const state = this.state;
    const resState = {
      ...state,
      resultValue: 0,
      inputValue: 0,
      showingResult: true,
      culcResult: (state) => state.inputValue,
      seqOpe: false,
      afterResult: false,
    };
    this.setState(resState);   // 再描画
  }
  render() {
    const state = this.state;
    const result = state.showingResult ? state.resultValue : state.inputValue;
    return (
      <div>
        <Result result={result} />
        <div>
          {[1, 2, 3].map(n => <NumBtn n={n} key={n} onNumClick={this.onNumClick} />)}
          <OpeBtn onClick={this.plus} c={'+'} />
        </div>
        <div>
          {[4, 5, 6].map(n => <NumBtn n={n} key={n} onNumClick={this.onNumClick} />)}
          <OpeBtn onClick={this.minus} c={'-'} />
        </div>
        <div>
          {[7, 8, 9].map(n => <NumBtn n={n} key={n} onNumClick={this.onNumClick} />)}
          <OpeBtn onClick={this.multi} c={'*'} />
        </div>
        <div>
          <NumBtn n={0} key={0} onNumClick={this.onNumClick} />
          <OpeBtn onClick={this.clear} c={'C'} />
          <OpeBtn onClick={this.result} c={'='} />
          <OpeBtn onClick={this.div} c={'/'} />
        </div>
      </div>
    );
  }
};

/*
 * 初期処理
 */
const render = () => ReactDOM.render(<App/>, document.getElementById('app'));
render();

