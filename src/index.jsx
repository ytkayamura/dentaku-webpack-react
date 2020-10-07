import React, { Component } from "react";
import ReactDOM from "react-dom";

class NumBtn extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const { n, onNumClick } = this.props;
    onNumClick(n);
  };

  render() {
    const { n } = this.props;
    return <button onClick={this.onClick}>{n}</button>;
  }
}

const OpeBtn = ({ c, onClick }) => <button onClick={onClick}>{c}</button>;

const Result = ({ result }) => {
  return (
    <div>
      <span>{result}</span>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultValue: 0, // 結果 兼 左辺
      inputValue: 0,
      showingResult: false,
      operator: "",
      seqOpe: false, // 演算キー連続入力
      afterResult: false,
    };
  }
  onNumClick = (n) => {
    const state = this.state;
    this.setState({
      inputValue: state.afterResult ? n : state.inputValue * 10 + n,
      showingResult: false,
      seqOpe: false,
      afterResult: false,
    }); // 再描画
  };
  culc = () => {
    const state = this.state;
    switch (state.operator) {
      case "+":
        return state.resultValue + state.inputValue;
      case "-":
        return state.resultValue - state.inputValue;
      case "*":
        return state.resultValue * state.inputValue;
      case "/":
        return (1.0 * state.resultValue) / state.inputValue;
      default:
        return state.inputValue;
    }
  };
  setOpe = (operator) => {
    const state = this.state;
    this.setState({
      resultValue: state.seqOpe ? state.resultValue : this.culc(),
      inputValue: 0,
      showingResult: true,
      operator,
      seqOpe: true,
      afterResult: false,
    }); // 再描画
  };
  plus = () => {
    this.setOpe("+");
  };
  minus = () => {
    this.setOpe("-");
  };
  multi = () => {
    this.setOpe("*");
  };
  div = () => {
    this.setOpe("/");
  };
  result = () => {
    this.setState({
      resultValue: this.culc(),
      inputValue: this.culc(),
      showingResult: true,
      operator: "",
      seqOpe: false,
      afterResult: true,
    }); // 再描画
  };
  clear = () => {
    this.setState({
      resultValue: 0,
      inputValue: 0,
      showingResult: true,
      operator: "",
      seqOpe: false,
      afterResult: false,
    }); // 再描画
  };
  render = () => {
    const state = this.state;
    const result = state.showingResult ? state.resultValue : state.inputValue;
    return (
      <div>
        <Result result={result} />
        <div>
          {[1, 2, 3].map((n) => (
            <NumBtn n={n} key={n} onNumClick={this.onNumClick} />
          ))}
          <OpeBtn onClick={this.plus} c={"+"} />
        </div>
        <div>
          {[4, 5, 6].map((n) => (
            <NumBtn n={n} key={n} onNumClick={this.onNumClick} />
          ))}
          <OpeBtn onClick={this.minus} c={"-"} />
        </div>
        <div>
          {[7, 8, 9].map((n) => (
            <NumBtn n={n} key={n} onNumClick={this.onNumClick} />
          ))}
          <OpeBtn onClick={this.multi} c={"*"} />
        </div>
        <div>
          <NumBtn n={0} key={0} onNumClick={this.onNumClick} />
          <OpeBtn onClick={this.clear} c={"C"} />
          <OpeBtn onClick={this.result} c={"="} />
          <OpeBtn onClick={this.div} c={"/"} />
        </div>
      </div>
    );
  };
}

/*
 * 初期処理
 */
ReactDOM.render(<App />, document.getElementById("app"));
