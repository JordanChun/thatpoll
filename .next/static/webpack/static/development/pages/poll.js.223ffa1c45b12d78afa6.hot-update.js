webpackHotUpdate("static\\development\\pages\\poll.js",{

/***/ "./pages/_error.js":
/*!*************************!*\
  !*** ./pages/_error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap/Container */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap/Button */ "./node_modules/react-bootstrap/esm/Button.js");






var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;






var ErrorPage =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ErrorPage, _React$Component);

  function ErrorPage() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ErrorPage);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ErrorPage).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ErrorPage, [{
    key: "render",
    value: function render() {
      var response;

      switch (this.props.errorCode) {
        case 200: // Also display a 404 if someone requests /_error explicitly

        case 404:
          response = __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
            pageTitle: "Page Not Found"
          }, __jsx(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_8__["default"], null, __jsx("div", {
            className: "error-container"
          }, __jsx("h4", {
            className: "page-header"
          }, "404 Page Not Found"), __jsx(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__["default"], {
            variant: "grey-blue",
            onClick: function onClick() {
              return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.back();
            }
          }, "Go back"))));
          break;

        case 500:
          response = __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
            pageTitle: "Internal Server Error"
          }, __jsx(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_8__["default"], null, __jsx("div", {
            className: "error-container"
          }, __jsx("h4", {
            className: "page-header"
          }, "500 Internal Server Error"), __jsx(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__["default"], {
            variant: "grey-blue",
            onClick: function onClick() {
              return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.back();
            }
          }, "Go back"))));
          break;

        default:
          response = __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
            pageTitle: "An Error Occured"
          }, __jsx(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_8__["default"], null, __jsx("div", {
            className: "error-container"
          }, __jsx("h4", {
            className: "page-header"
          }, "An error occured while trying to access this page.", this.props.errorCode), __jsx(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_9__["default"], {
            variant: "grey-blue",
            onClick: function onClick() {
              return next_router__WEBPACK_IMPORTED_MODULE_7___default.a.back();
            }
          }, "Go back"))));
      }

      return response;
    }
  }], [{
    key: "propTypes",
    value: function propTypes() {
      return {
        errorCode: react__WEBPACK_IMPORTED_MODULE_5___default.a.PropTypes.number.isRequired
      };
    }
  }, {
    key: "getInitialProps",
    value: function getInitialProps(_ref) {
      var res = _ref.res,
          xhr = _ref.xhr;
      var errorCode = res ? res.statusCode : xhr ? xhr.status : null;
      return {
        errorCode: errorCode
      };
    }
  }]);

  return ErrorPage;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(ErrorPage));

/***/ })

})
//# sourceMappingURL=poll.js.223ffa1c45b12d78afa6.hot-update.js.map