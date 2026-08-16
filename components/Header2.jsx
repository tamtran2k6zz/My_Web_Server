import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/Header.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=58174d7e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/workspace/src/components/Header.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { Sparkles } from "/node_modules/.vite/deps/lucide-react.js?v=58174d7e";
export function Header({ t, totalQuestions }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "mt-6 grid gap-4 lg:grid-cols-[1.5fr_0.9fr] lg:items-end", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur", children: [
        /* @__PURE__ */ jsxDEV(Sparkles, { className: "h-4 w-4" }, void 0, false, {
          fileName: "/home/workspace/src/components/Header.jsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: t.headerSubtitle }, void 0, false, {
          fileName: "/home/workspace/src/components/Header.jsx",
          lineNumber: 28,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/workspace/src/components/Header.jsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl", children: t.headerTitle }, void 0, false, {
        fileName: "/home/workspace/src/components/Header.jsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/workspace/src/components/Header.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl shadow-slate-950/30", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300", children: "Tổng số câu trong hệ thống" }, void 0, false, {
        fileName: "/home/workspace/src/components/Header.jsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-2 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-bold text-white", children: totalQuestions }, void 0, false, {
            fileName: "/home/workspace/src/components/Header.jsx",
            lineNumber: 39,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs uppercase tracking-[0.28em] text-slate-400", children: "Questions" }, void 0, false, {
            fileName: "/home/workspace/src/components/Header.jsx",
            lineNumber: 40,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/workspace/src/components/Header.jsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/20", children: "Ready to learn" }, void 0, false, {
          fileName: "/home/workspace/src/components/Header.jsx",
          lineNumber: 42,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/workspace/src/components/Header.jsx",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/workspace/src/components/Header.jsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/workspace/src/components/Header.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
_c = Header;
var _c;
$RefreshReg$(_c, "Header");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/workspace/src/components/Header.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/workspace/src/components/Header.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBT1U7Ozs7Ozs7Ozs7Ozs7Ozs7QUFQVixTQUFTQSxnQkFBZ0I7QUFFbEIsZ0JBQVNDLE9BQU8sRUFBRUMsR0FBR0MsZUFBZSxHQUFHO0FBQzVDLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDJEQUNiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsc0lBQ2I7QUFBQSwrQkFBQyxZQUFTLFdBQVUsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE2QjtBQUFBLFFBQzdCLHVCQUFDLFVBQU1ELFlBQUVFLGtCQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBd0I7QUFBQSxXQUYxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBR0E7QUFBQSxNQUNBLHVCQUFDLFFBQUcsV0FBVSxrRkFDWEYsWUFBRUcsZUFETDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxTQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FRQTtBQUFBLElBRUEsdUJBQUMsU0FBSSxXQUFVLG9HQUNiO0FBQUEsNkJBQUMsT0FBRSxXQUFVLDBCQUF5QiwwQ0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFnRTtBQUFBLE1BQ2hFLHVCQUFDLFNBQUksV0FBVSw2Q0FDYjtBQUFBLCtCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsaUNBQWlDRiw0QkFBaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBK0Q7QUFBQSxVQUMvRCx1QkFBQyxTQUFJLFdBQVUsc0RBQXFELHlCQUFwRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE2RTtBQUFBLGFBRi9FO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLDBHQUF3Ryw4QkFBdkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUUE7QUFBQSxTQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FXQTtBQUFBLE9BdEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F1QkE7QUFFSjtBQUFDRyxLQTNCZUw7QUFBTSxJQUFBSztBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsiU3BhcmtsZXMiLCJIZWFkZXIiLCJ0IiwidG90YWxRdWVzdGlvbnMiLCJoZWFkZXJTdWJ0aXRsZSIsImhlYWRlclRpdGxlIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiSGVhZGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGFya2xlcyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCdcblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcih7IHQsIHRvdGFsUXVlc3Rpb25zIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgZ3JpZCBnYXAtNCBsZzpncmlkLWNvbHMtWzEuNWZyXzAuOWZyXSBsZzppdGVtcy1lbmRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzIwIGJnLWN5YW4tNDAwLzEwIHB4LTQgcHktMiB0ZXh0LXNtIHRleHQtY3lhbi0yMDAgYmFja2Ryb3AtYmx1clwiPlxuICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICA8c3Bhbj57dC5oZWFkZXJTdWJ0aXRsZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwibWF4LXctM3hsIHRleHQtNHhsIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHNtOnRleHQtNXhsIGxnOnRleHQtNnhsXCI+XG4gICAgICAgICAge3QuaGVhZGVyVGl0bGV9XG4gICAgICAgIDwvaDI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLXdoaXRlLzUgcC01IGJhY2tkcm9wLWJsdXIteGwgc2hhZG93LXhsIHNoYWRvdy1zbGF0ZS05NTAvMzBcIj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTMwMFwiPlThu5VuZyBz4buRIGPDonUgdHJvbmcgaOG7hyB0aOG7kW5nPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgZmxleCBpdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtd2hpdGVcIj57dG90YWxRdWVzdGlvbnN9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLVswLjI4ZW1dIHRleHQtc2xhdGUtNDAwXCI+UXVlc3Rpb25zPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJnLWVtZXJhbGQtNDAwLzEwIHB4LTMgcHktMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZW1lcmFsZC0zMDAgcmluZy0xIHJpbmctZW1lcmFsZC00MDAvMjBcIj5cbiAgICAgICAgICAgIFJlYWR5IHRvIGxlYXJuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLCJmaWxlIjoiL2hvbWUvd29ya3NwYWNlL3NyYy9jb21wb25lbnRzL0hlYWRlci5qc3gifQ==