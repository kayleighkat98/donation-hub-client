import LoginForm from './NewForm';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe("NewForm", () => {
    it("form renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<BrowserRouter><NewForm /></BrowserRouter>, div);
    });
  });
