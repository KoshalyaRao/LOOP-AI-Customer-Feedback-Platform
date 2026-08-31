"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/themes/route";
exports.ids = ["app/api/themes/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fthemes%2Froute&page=%2Fapi%2Fthemes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthemes%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fthemes%2Froute&page=%2Fapi%2Fthemes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthemes%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_HP_gemini_antigravity_scratch_loop_app_app_api_themes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/themes/route.ts */ \"(rsc)/./app/api/themes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/themes/route\",\n        pathname: \"/api/themes\",\n        filename: \"route\",\n        bundlePath: \"app/api/themes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity\\\\scratch\\\\loop-app\\\\app\\\\api\\\\themes\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_gemini_antigravity_scratch_loop_app_app_api_themes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/themes/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ0aGVtZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnRoZW1lcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnRoZW1lcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Qy5nZW1pbmklNUNhbnRpZ3Jhdml0eSU1Q3NjcmF0Y2glNUNsb29wLWFwcCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSFAlNUMuZ2VtaW5pJTVDYW50aWdyYXZpdHklNUNzY3JhdGNoJTVDbG9vcC1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2tDO0FBQy9HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG9vcC1hcHAvPzdiMDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcLmdlbWluaVxcXFxhbnRpZ3Jhdml0eVxcXFxzY3JhdGNoXFxcXGxvb3AtYXBwXFxcXGFwcFxcXFxhcGlcXFxcdGhlbWVzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS90aGVtZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90aGVtZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3RoZW1lcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXC5nZW1pbmlcXFxcYW50aWdyYXZpdHlcXFxcc2NyYXRjaFxcXFxsb29wLWFwcFxcXFxhcHBcXFxcYXBpXFxcXHRoZW1lc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdGhlbWVzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fthemes%2Froute&page=%2Fapi%2Fthemes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthemes%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/themes/route.ts":
/*!*********************************!*\
  !*** ./app/api/themes/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n\n\n\nasync function GET(req) {\n    try {\n        const sessionUser = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.requireWorkspaceSession)();\n        if (!sessionUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { workspaceId } = sessionUser;\n        const themes = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.theme.findMany({\n            where: {\n                workspaceId\n            },\n            include: {\n                feedback: {\n                    include: {\n                        feedback: true\n                    }\n                }\n            },\n            orderBy: {\n                name: \"asc\"\n            }\n        });\n        const now = new Date();\n        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);\n        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);\n        const formattedThemes = themes.map((theme)=>{\n            const allFeedbackItems = theme.feedback.map((ft)=>ft.feedback);\n            const totalCount = allFeedbackItems.length;\n            let posCount = 0;\n            let negCount = 0;\n            let neuCount = 0;\n            let currentPeriodCount = 0;\n            let prevPeriodCount = 0;\n            allFeedbackItems.forEach((f)=>{\n                if (f.sentiment === \"POS\") posCount++;\n                else if (f.sentiment === \"NEG\") negCount++;\n                else neuCount++;\n                const fTime = new Date(f.createdAt).getTime();\n                if (fTime >= thirtyDaysAgo.getTime()) {\n                    currentPeriodCount++;\n                } else if (fTime >= sixtyDaysAgo.getTime()) {\n                    prevPeriodCount++;\n                }\n            });\n            const posPercent = totalCount > 0 ? Math.round(posCount / totalCount * 100) : 0;\n            const negPercent = totalCount > 0 ? Math.round(negCount / totalCount * 100) : 0;\n            // Spike & Trend calculation\n            let trend = \"stable\";\n            let isSpike = false;\n            if (prevPeriodCount === 0) {\n                trend = currentPeriodCount > 2 ? \"up\" : \"stable\";\n            } else {\n                const growth = (currentPeriodCount - prevPeriodCount) / prevPeriodCount;\n                if (growth > 0.25) trend = \"up\";\n                else if (growth < -0.25) trend = \"down\";\n                else trend = \"stable\";\n                if (growth >= 0.40 && currentPeriodCount >= 5) {\n                    isSpike = true;\n                }\n            }\n            return {\n                id: theme.id,\n                name: theme.name,\n                description: theme.description,\n                color: theme.color,\n                createdAt: theme.createdAt,\n                feedbackCount: totalCount,\n                posCount,\n                negCount,\n                neuCount,\n                posPercent,\n                negPercent,\n                trend,\n                isSpike\n            };\n        });\n        // Sort by feedbackCount descending\n        formattedThemes.sort((a, b)=>b.feedbackCount - a.feedbackCount);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(formattedThemes);\n    } catch (error) {\n        console.error(\"Themes GET error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error fetching themes\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUEsRUFBRUgsYUFBYSxHQUFHRSxFQUFFRixhQUFhO1FBRWhFLE9BQU9qRCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDaUI7SUFDM0IsRUFBRSxPQUFPaEIsT0FBWTtRQUNuQjhDLFFBQVE5QyxLQUFLLENBQUMscUJBQXFCQTtRQUNuQyxPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBK0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2xvb3AtYXBwLy4vYXBwL2FwaS90aGVtZXMvcm91dGUudHM/NDlmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyByZXF1aXJlV29ya3NwYWNlU2Vzc2lvbiB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9kYic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvblVzZXIgPSBhd2FpdCByZXF1aXJlV29ya3NwYWNlU2Vzc2lvbigpO1xuICAgIGlmICghc2Vzc2lvblVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHsgd29ya3NwYWNlSWQgfSA9IHNlc3Npb25Vc2VyO1xuXG4gICAgY29uc3QgdGhlbWVzID0gYXdhaXQgZGIudGhlbWUuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHsgd29ya3NwYWNlSWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgZmVlZGJhY2s6IHtcbiAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBmZWVkYmFjazogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHsgbmFtZTogJ2FzYycgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdGhpcnR5RGF5c0FnbyA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgLSAzMCAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgIGNvbnN0IHNpeHR5RGF5c0FnbyA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgLSA2MCAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkVGhlbWVzID0gdGhlbWVzLm1hcCgodGhlbWUpID0+IHtcbiAgICAgIGNvbnN0IGFsbEZlZWRiYWNrSXRlbXMgPSB0aGVtZS5mZWVkYmFjay5tYXAoKGZ0KSA9PiBmdC5mZWVkYmFjayk7XG4gICAgICBjb25zdCB0b3RhbENvdW50ID0gYWxsRmVlZGJhY2tJdGVtcy5sZW5ndGg7XG5cbiAgICAgIGxldCBwb3NDb3VudCA9IDA7XG4gICAgICBsZXQgbmVnQ291bnQgPSAwO1xuICAgICAgbGV0IG5ldUNvdW50ID0gMDtcblxuICAgICAgbGV0IGN1cnJlbnRQZXJpb2RDb3VudCA9IDA7XG4gICAgICBsZXQgcHJldlBlcmlvZENvdW50ID0gMDtcblxuICAgICAgYWxsRmVlZGJhY2tJdGVtcy5mb3JFYWNoKChmKSA9PiB7XG4gICAgICAgIGlmIChmLnNlbnRpbWVudCA9PT0gJ1BPUycpIHBvc0NvdW50Kys7XG4gICAgICAgIGVsc2UgaWYgKGYuc2VudGltZW50ID09PSAnTkVHJykgbmVnQ291bnQrKztcbiAgICAgICAgZWxzZSBuZXVDb3VudCsrO1xuXG4gICAgICAgIGNvbnN0IGZUaW1lID0gbmV3IERhdGUoZi5jcmVhdGVkQXQpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKGZUaW1lID49IHRoaXJ0eURheXNBZ28uZ2V0VGltZSgpKSB7XG4gICAgICAgICAgY3VycmVudFBlcmlvZENvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoZlRpbWUgPj0gc2l4dHlEYXlzQWdvLmdldFRpbWUoKSkge1xuICAgICAgICAgIHByZXZQZXJpb2RDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcG9zUGVyY2VudCA9IHRvdGFsQ291bnQgPiAwID8gTWF0aC5yb3VuZCgocG9zQ291bnQgLyB0b3RhbENvdW50KSAqIDEwMCkgOiAwO1xuICAgICAgY29uc3QgbmVnUGVyY2VudCA9IHRvdGFsQ291bnQgPiAwID8gTWF0aC5yb3VuZCgobmVnQ291bnQgLyB0b3RhbENvdW50KSAqIDEwMCkgOiAwO1xuXG4gICAgICAvLyBTcGlrZSAmIFRyZW5kIGNhbGN1bGF0aW9uXG4gICAgICBsZXQgdHJlbmQ6ICd1cCcgfCAnZG93bicgfCAnc3RhYmxlJyA9ICdzdGFibGUnO1xuICAgICAgbGV0IGlzU3Bpa2UgPSBmYWxzZTtcblxuICAgICAgaWYgKHByZXZQZXJpb2RDb3VudCA9PT0gMCkge1xuICAgICAgICB0cmVuZCA9IGN1cnJlbnRQZXJpb2RDb3VudCA+IDIgPyAndXAnIDogJ3N0YWJsZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBncm93dGggPSAoY3VycmVudFBlcmlvZENvdW50IC0gcHJldlBlcmlvZENvdW50KSAvIHByZXZQZXJpb2RDb3VudDtcbiAgICAgICAgaWYgKGdyb3d0aCA+IDAuMjUpIHRyZW5kID0gJ3VwJztcbiAgICAgICAgZWxzZSBpZiAoZ3Jvd3RoIDwgLTAuMjUpIHRyZW5kID0gJ2Rvd24nO1xuICAgICAgICBlbHNlIHRyZW5kID0gJ3N0YWJsZSc7XG5cbiAgICAgICAgaWYgKGdyb3d0aCA+PSAwLjQwICYmIGN1cnJlbnRQZXJpb2RDb3VudCA+PSA1KSB7XG4gICAgICAgICAgaXNTcGlrZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHRoZW1lLmlkLFxuICAgICAgICBuYW1lOiB0aGVtZS5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogdGhlbWUuZGVzY3JpcHRpb24sXG4gICAgICAgIGNvbG9yOiB0aGVtZS5jb2xvcixcbiAgICAgICAgY3JlYXRlZEF0OiB0aGVtZS5jcmVhdGVkQXQsXG4gICAgICAgIGZlZWRiYWNrQ291bnQ6IHRvdGFsQ291bnQsXG4gICAgICAgIHBvc0NvdW50LFxuICAgICAgICBuZWdDb3VudCxcbiAgICAgICAgbmV1Q291bnQsXG4gICAgICAgIHBvc1BlcmNlbnQsXG4gICAgICAgIG5lZ1BlcmNlbnQsXG4gICAgICAgIHRyZW5kLFxuICAgICAgICBpc1NwaWtlLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIFNvcnQgYnkgZmVlZGJhY2tDb3VudCBkZXNjZW5kaW5nXG4gICAgZm9ybWF0dGVkVGhlbWVzLnNvcnQoKGEsIGIpID0+IGIuZmVlZGJhY2tDb3VudCAtIGEuZmVlZGJhY2tDb3VudCk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZm9ybWF0dGVkVGhlbWVzKTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RoZW1lcyBHRVQgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnU2VydmVyIGVycm9yIGZldGNoaW5nIHRoZW1lcycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInJlcXVpcmVXb3Jrc3BhY2VTZXNzaW9uIiwiZGIiLCJHRVQiLCJyZXEiLCJzZXNzaW9uVXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIndvcmtzcGFjZUlkIiwidGhlbWVzIiwidGhlbWUiLCJmaW5kTWFueSIsIndoZXJlIiwiaW5jbHVkZSIsImZlZWRiYWNrIiwib3JkZXJCeSIsIm5hbWUiLCJub3ciLCJEYXRlIiwidGhpcnR5RGF5c0FnbyIsImdldFRpbWUiLCJzaXh0eURheXNBZ28iLCJmb3JtYXR0ZWRUaGVtZXMiLCJtYXAiLCJhbGxGZWVkYmFja0l0ZW1zIiwiZnQiLCJ0b3RhbENvdW50IiwibGVuZ3RoIiwicG9zQ291bnQiLCJuZWdDb3VudCIsIm5ldUNvdW50IiwiY3VycmVudFBlcmlvZENvdW50IiwicHJldlBlcmlvZENvdW50IiwiZm9yRWFjaCIsImYiLCJzZW50aW1lbnQiLCJmVGltZSIsImNyZWF0ZWRBdCIsInBvc1BlcmNlbnQiLCJNYXRoIiwicm91bmQiLCJuZWdQZXJjZW50IiwidHJlbmQiLCJpc1NwaWtlIiwiZ3Jvd3RoIiwiaWQiLCJkZXNjcmlwdGlvbiIsImNvbG9yIiwiZmVlZGJhY2tDb3VudCIsInNvcnQiLCJhIiwiYiIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/themes/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getAuthSession: () => (/* binding */ getAuthSession),\n/* harmony export */   requireWorkspaceSession: () => (/* binding */ requireWorkspaceSession)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email and password required\");\n                }\n                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_3__.db.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    },\n                    include: {\n                        workspace: true\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.passwordHash);\n                if (!isValid) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    role: user.role,\n                    workspaceId: user.workspaceId,\n                    workspaceName: user.workspace.name\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.workspaceId = user.workspaceId;\n                token.workspaceName = user.workspaceName;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.workspaceId = token.workspaceId;\n                session.user.workspaceName = token.workspaceName;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"loop-super-secret-jwt-key-2026\"\n};\nasync function getAuthSession() {\n    return await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n}\nasync function requireWorkspaceSession() {\n    const session = await getAuthSession();\n    if (!session || !session.user) {\n        return null;\n    }\n    return session.user;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDSTtBQUNwQztBQUNBO0FBR3ZCLE1BQU1JLGNBQStCO0lBQzFDQyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1RSLDJFQUFtQkEsQ0FBQztZQUNsQlMsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1DLE9BQU8sTUFBTWYsdUNBQUVBLENBQUNlLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUNwQ0MsT0FBTzt3QkFBRVIsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztvQkFDbENTLFNBQVM7d0JBQUVDLFdBQVc7b0JBQUs7Z0JBQzdCO2dCQUVBLElBQUksQ0FBQ0osTUFBTTtvQkFDVCxNQUFNLElBQUlELE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1NLFVBQVUsTUFBTXJCLHVEQUFjLENBQUNTLFlBQVlJLFFBQVEsRUFBRUcsS0FBS08sWUFBWTtnQkFDNUUsSUFBSSxDQUFDRixTQUFTO29CQUNaLE1BQU0sSUFBSU4sTUFBTTtnQkFDbEI7Z0JBRUEsT0FBTztvQkFDTFMsSUFBSVIsS0FBS1EsRUFBRTtvQkFDWGhCLE1BQU1RLEtBQUtSLElBQUk7b0JBQ2ZFLE9BQU9NLEtBQUtOLEtBQUs7b0JBQ2pCZSxNQUFNVCxLQUFLUyxJQUFJO29CQUNmQyxhQUFhVixLQUFLVSxXQUFXO29CQUM3QkMsZUFBZVgsS0FBS0ksU0FBUyxDQUFDWixJQUFJO2dCQUNwQztZQUNGO1FBQ0Y7S0FDRDtJQUNEb0IsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFZCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmMsTUFBTU4sRUFBRSxHQUFHUixLQUFLUSxFQUFFO2dCQUNsQk0sTUFBTUwsSUFBSSxHQUFHLEtBQWNBLElBQUk7Z0JBQy9CSyxNQUFNSixXQUFXLEdBQUcsS0FBY0EsV0FBVztnQkFDN0NJLE1BQU1ILGFBQWEsR0FBRyxLQUFjQSxhQUFhO1lBQ25EO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU0zQixTQUFRLEVBQUVBLE9BQU8sRUFBRTJCLEtBQUssRUFBRTtZQUM5QixJQUFJQSxTQUFTM0IsUUFBUWEsSUFBSSxFQUFFO2dCQUN4QmIsUUFBUWEsSUFBSSxDQUFTUSxFQUFFLEdBQUdNLE1BQU1OLEVBQUU7Z0JBQ2xDckIsUUFBUWEsSUFBSSxDQUFTUyxJQUFJLEdBQUdLLE1BQU1MLElBQUk7Z0JBQ3RDdEIsUUFBUWEsSUFBSSxDQUFTVSxXQUFXLEdBQUdJLE1BQU1KLFdBQVc7Z0JBQ3BEdkIsUUFBUWEsSUFBSSxDQUFTVyxhQUFhLEdBQUdHLE1BQU1ILGFBQWE7WUFDM0Q7WUFDQSxPQUFPeEI7UUFDVDtJQUNGO0lBQ0E0QixRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWUsSUFBSTtBQUN6QyxFQUFFO0FBRUssZUFBZUM7SUFDcEIsT0FBTyxNQUFNckMsMkRBQWdCQSxDQUFDSTtBQUNoQztBQUVPLGVBQWVrQztJQUNwQixNQUFNakMsVUFBVSxNQUFNZ0M7SUFDdEIsSUFBSSxDQUFDaEMsV0FBVyxDQUFDQSxRQUFRYSxJQUFJLEVBQUU7UUFDN0IsT0FBTztJQUNUO0lBQ0EsT0FBT2IsUUFBUWEsSUFBSTtBQVFyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2xvb3AtYXBwLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uLCBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICdAL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW1haWwgYW5kIHBhc3N3b3JkIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSxcbiAgICAgICAgICBpbmNsdWRlOiB7IHdvcmtzcGFjZTogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JlZGVudGlhbHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JlZGVudGlhbHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSBhcyBVc2VyUm9sZSxcbiAgICAgICAgICB3b3Jrc3BhY2VJZDogdXNlci53b3Jrc3BhY2VJZCxcbiAgICAgICAgICB3b3Jrc3BhY2VOYW1lOiB1c2VyLndvcmtzcGFjZS5uYW1lLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgICB0b2tlbi53b3Jrc3BhY2VJZCA9ICh1c2VyIGFzIGFueSkud29ya3NwYWNlSWQ7XG4gICAgICAgIHRva2VuLndvcmtzcGFjZU5hbWUgPSAodXNlciBhcyBhbnkpLndvcmtzcGFjZU5hbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZDtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgPSB0b2tlbi5yb2xlIGFzIFVzZXJSb2xlO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkud29ya3NwYWNlSWQgPSB0b2tlbi53b3Jrc3BhY2VJZCBhcyBzdHJpbmc7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS53b3Jrc3BhY2VOYW1lID0gdG9rZW4ud29ya3NwYWNlTmFtZSBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCB8fCAnbG9vcC1zdXBlci1zZWNyZXQtand0LWtleS0yMDI2Jyxcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdXRoU2Vzc2lvbigpIHtcbiAgcmV0dXJuIGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWlyZVdvcmtzcGFjZVNlc3Npb24oKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRBdXRoU2Vzc2lvbigpO1xuICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBzZXNzaW9uLnVzZXIgYXMge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcm9sZTogVXNlclJvbGU7XG4gICAgd29ya3NwYWNlSWQ6IHN0cmluZztcbiAgICB3b3Jrc3BhY2VOYW1lOiBzdHJpbmc7XG4gIH07XG59XG4iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJkYiIsImF1dGhPcHRpb25zIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaW5jbHVkZSIsIndvcmtzcGFjZSIsImlzVmFsaWQiLCJjb21wYXJlIiwicGFzc3dvcmRIYXNoIiwiaWQiLCJyb2xlIiwid29ya3NwYWNlSWQiLCJ3b3Jrc3BhY2VOYW1lIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiZ2V0QXV0aFNlc3Npb24iLCJyZXF1aXJlV29ya3NwYWNlU2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst db = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRTlDLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsS0FDWEYsZ0JBQWdCRyxNQUFNLElBQ3RCLElBQUlKLHdEQUFZQSxDQUFDO0lBQ2ZLLEtBQUtDLEtBQXlCLEdBQWdCO1FBQUM7UUFBUztRQUFTO0tBQU8sR0FBRyxDQUFTO0FBQ3RGLEdBQUc7QUFFTCxJQUFJQSxJQUF5QixFQUFjTCxnQkFBZ0JHLE1BQU0sR0FBR0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb29wLWFwcC8uL2xpYi9kYi50cz8xZGYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgZGIgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbiAgfSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gZGI7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsImRiIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/uuid","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fthemes%2Froute&page=%2Fapi%2Fthemes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthemes%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5C.gemini%5Cantigravity%5Cscratch%5Cloop-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();