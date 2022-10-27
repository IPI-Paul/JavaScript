/*
  Author: Paul I Ighofose
  Description: First ever JavaScript Factory Module
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ipi = global.ipi || {}));
  })(this, (function (exports) { 'use strict';
  
  var version = "0.0.1";

  // import ReactDOM from 'react-dom';

  function Hook() {
    const State = {
      set current(state) {
        if(this.states.find(d => d.obj === state.obj) === undefined) {
          this.states.push({obj: state.obj, state: state.state});
        } else {
          this.states.find(d => d.obj === state.obj).state = state.state;
        }
      },
      states: []
    };
    
    return (initialState) => {
      if(State.states.find(d => d.obj === initialState.obj) === undefined) {
        State.current = {obj: initialState.obj, state: initialState.state};
      }
      return ([
        State.states.find(d => d.obj === initialState.obj).state,
      (newState) => {
        State.current = {obj: newState.obj, state: newState.state};
        ReactDOM.render(window.App(), window.rootElement);
      }
    ])}
  }

  function Hook$1() {  
    const ref = React.createRef();
    return (el) => {
      if(ref && !ref.current) {
        ref.current = el;
      }
      return ref;
    }
  }

  exports.useState = new Hook();
  exports.useRef = new Hook$1();
  exports.default = {
    useState: new Hook(),
    useRef: new Hook$1()
  };
  
  Object.defineProperty(exports, '__esModule', { value: true });
}));