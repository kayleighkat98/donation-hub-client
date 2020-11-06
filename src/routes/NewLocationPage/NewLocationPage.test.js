import NewLocationPage from './NewLocationPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("NewLocationPage", () => {
    it("form renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<BrowserRouter><NewLocationPage /></BrowserRouter>, div);
    });
  });
