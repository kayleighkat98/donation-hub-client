import LandingPage from './LandingPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("LandingPage", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<BrowserRouter><LandingPage /></BrowserRouter>, div);
    });
  });