  
import DashboardPage from './DashboardPage.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("DashboardPage", () => {
    it("form renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<BrowserRouter><DashboardPage /></BrowserRouter>, div);
    });
  });