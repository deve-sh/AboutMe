function isFunction(obj) {
  return typeof obj == "function" || false;
}

function isObject(obj) {
  let type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
}

export function disableReactDevTools() {
  // Ensure the React Developer Tools global hook exists
  if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    return;
  }

  const NO_OP = () => {};

  // Replace all global hook properties with a no-op function or a null value
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
    )
      ? NO_OP
      : null;
  }
}
