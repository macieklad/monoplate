// If this is inlined into route files split by tanstack router,
// vite eror will be thrown that react refresh plugin is added before tanstack
export const preamble = {
  type: "module",
  children: `import RefreshRuntime from "/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true`,
};
