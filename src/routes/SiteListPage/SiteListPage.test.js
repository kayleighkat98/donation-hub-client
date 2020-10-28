import SiteListPage from './SiteListPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("SiteListPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><SiteListPage /></BrowserRouter>, div);
  });
});