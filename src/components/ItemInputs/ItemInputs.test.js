import ItemInputs from './ItemInputs';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("ItemInputs", () => {
    it("form renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<BrowserRouter><ItemInputs /></BrowserRouter>, div);
    });
  });
