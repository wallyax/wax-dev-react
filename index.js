// index.js
import { runWaxLogic } from './src/waxHelper';

export default function runWax(
  _React,
  _ReactDOM,
  _waxConfig = {},
  _conf = {},
  _context,
  _logger
) {
  return runWaxLogic(_React, _ReactDOM, _waxConfig, _conf, _context);
}
