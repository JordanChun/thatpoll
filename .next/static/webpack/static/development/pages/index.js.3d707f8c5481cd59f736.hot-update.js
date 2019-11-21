webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/PollCard.js":
/*!********************************!*\
  !*** ./components/PollCard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Button */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Dropdown */ "./node_modules/react-bootstrap/esm/Dropdown.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _components_CompactOptionsToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/CompactOptionsToggle */ "./components/CompactOptionsToggle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Report__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Report */ "./components/Report.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;










function redirectToPoll(e, slug) {
  next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push("/poll/".concat(slug));
}

var PollCard = function PollCard(props) {
  return __jsx("div", {
    className: "poll-card-container",
    key: props.poll.url,
    onClick: function onClick(e) {
      return redirectToPoll(e, props.poll.url);
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: {
      pathname: '/poll',
      query: {
        slug: props.poll.url
      }
    },
    as: "/poll/".concat(props.poll.url)
  }, __jsx("a", null, __jsx("h6", {
    className: "poll-card-title"
  }, props.poll.title))), __jsx("hr", null), __jsx("div", {
    className: "poll-card-desc"
  }, props.poll.desc.length > 0 ? __jsx("p", null, props.poll.desc) : __jsx("i", null, "No Description")), __jsx("hr", null), __jsx("div", {
    className: "poll-card-actions"
  }, __jsx("div", null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: {
      pathname: '/poll',
      query: {
        slug: props.poll.url
      }
    },
    as: "/poll/".concat(props.poll.url)
  }, __jsx("a", null, __jsx(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    variant: "grey-blue",
    size: "sm"
  }, "View Poll"))), __jsx("div", {
    className: "poll-stat",
    style: {
      lineHeight: '2.5',
      marginLeft: '0.75rem'
    }
  }, __jsx("span", null, props.poll.totalVotes, " votes \u2022 ", props.poll.dateCreated))), __jsx("div", {
    className: "poll-card-actions-options",
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, __jsx("div", null, __jsx(_Report__WEBPACK_IMPORTED_MODULE_9__["ReportButton"], {
    urlref: props.poll.url
  })), __jsx("div", {
    className: "poll-card-actions-compact"
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    alignRight: true
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"].Toggle, {
    as: _components_CompactOptionsToggle__WEBPACK_IMPORTED_MODULE_6__["default"],
    id: "dropdown-custom-components"
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faEllipsisV"]
  })), __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"].Menu, null, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__["default"].Item, null, __jsx(_Report__WEBPACK_IMPORTED_MODULE_9__["ReportButtonDropdown"], {
    urlref: props.poll.url
  }))))))));
};

PollCard.propTypes = {
  poll: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (PollCard);

/***/ })

})
//# sourceMappingURL=index.js.3d707f8c5481cd59f736.hot-update.js.map