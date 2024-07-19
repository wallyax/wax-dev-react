let restoreFunctions = [];

export default function after(host, name, cb) {
  const originalFn = host[name];
  let restoreFn;

  if (originalFn) {
    host[name] = function (...args) {
      originalFn.apply(this, args);
      cb(host);
    };
    restoreFn = function () {
      host[name] = originalFn;
    };
  } else {
    host[name] = function () {
      cb(host);
    };
    restoreFn = function () {
      delete host[name];
    };
  }

  restoreFunctions.push(restoreFn);
}

after.restorePatchedMethods = function () {
  restoreFunctions.forEach(restoreFn => restoreFn());
  restoreFunctions = [];
};
