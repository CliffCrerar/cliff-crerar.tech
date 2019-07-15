/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c72de2d2d2884e447276";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app.ts")(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/content/content.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/content/content.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".content-container {\\n  position: relative;\\n  min-height: 100vh;\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: space-around;\\n  align-content: stretch;\\n  align-items: Center; }\\n  .content-container section {\\n    min-width: 414px; }\\n    .content-container section.page-subject {\\n      flex: 1;\\n      padding: 0 10vw; }\\n    .content-container section.page-options {\\n      padding: 0 10vw;\\n      flex: 1; }\\n\\n/*\\n\\nAlfa Slab One\\n*Allerta Stencil\\nAveria Libre\\n*DM Sans\\n*DM Serif Display\\nDamion\\n*Days One\\n*Khand\\n*Mitr\\nSquada One\\n\\n\\nEncode Sans\\nNanum Gothic\\nProsto One\\nQuicksand\\nRacing Sans One\\n\\n*/\\n.subject .name {\\n  font-family: Racing Sans One;\\n  font-size: 3em;\\n  letter-spacing: 5px; }\\n  .subject .name span {\\n    color: #f44336; }\\n\\n.subject .position {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: flex-start;\\n  align-items: center; }\\n  .subject .position img {\\n    height: 100%;\\n    width: auto;\\n    margin: 0 5px 0 0; }\\n  .subject .position div {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: flex-start; }\\n\\n.subject h2,\\n.subject h3,\\n.subject h4 {\\n  font-family: Khand; }\\n\\n.options {\\n  position: absolute;\\n  top: 0;\\n  left: 30px;\\n  display: flex;\\n  align-items: center; }\\n  .options h1 {\\n    font-size: 2.5em; }\\n  .options ul {\\n    display: flex;\\n    align-items: center;\\n    list-style: none; }\\n    .options ul li {\\n      margin: 10px;\\n      padding: 10px; }\\n      .options ul li a {\\n        font-size: 2em;\\n        font-family: Oswald; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/content/content.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/splitview/split.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/splitview/split.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".skewdiv {\\n  position: absolute;\\n  width: 60%;\\n  height: 100vh;\\n  transform-origin: top left;\\n  transform: skew(-15deg);\\n  z-index: 0; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/splitview/split.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/*\\n\\nAlfa Slab One\\nAllerta Stencil\\nAveria Libre\\nDM Sans\\nDM Serif Display\\nDamion\\nDays One\\nKhand\\nMitr\\nSquada One\\n\\n*/\\nhtml,\\nbody {\\n  box-sizing: border-box;\\n  padding: 0;\\n  margin: 0;\\n  min-height: 100vh;\\n  height: auto;\\n  width: 100vw;\\n  overflow: hidden;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale; }\\n\\nh1,\\nh2,\\nh3 {\\n  margin: 0; }\\n\\nh1 {\\n  font-family: Racing Sans One;\\n  font-size: 2em;\\n  text-shadow: 1px 1px 3px black;\\n  color: #FFFFFF; }\\n\\nh2,\\nh3 {\\n  text-shadow: 1px 1px 3px black;\\n  color: #EDEDED; }\\n\\nh4 {\\n  text-shadow: 1px 1px 3px black;\\n  color: #EDEDED; }\\n\\na {\\n  text-decoration: none;\\n  color: #f44336; }\\n\\np {\\n  color: #EDEDED;\\n  font-family: Oswald;\\n  text-shadow: 1px 1px 2px black; }\\n\\nhr {\\n  text-shadow: 1px 1px 3px black;\\n  color: #EDEDED; }\\n\\nmain {\\n  background: #ffffff23; }\\n\\n.skewdiv {\\n  background: #121212ef; }\\n\\n.btn {\\n  font-size: 1em;\\n  padding: 7px 30px;\\n  background: #f44336;\\n  color: #FFFFFF;\\n  border: solid 1px #FFFFFF;\\n  border-radius: 4px;\\n  font-weight: bold;\\n  animation: 1s ease-in; }\\n  .btn:focus {\\n    outline: none; }\\n  .btn:hover {\\n    background: #FFFFFF;\\n    color: #f44336;\\n    border: solid 1px #f44336; }\\n\\n.disabled {\\n  pointer-events: none;\\n  cursor: not-allowed;\\n  color: grey !important; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/videobg/videobg.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/videobg/videobg.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ \"./node_modules/css-loader/dist/runtime/url-escape.js\");\nvar ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../../public/bg-temp.png */ \"./public/bg-temp.png\"));\n\n// Module\nexports.push([module.i, \".video-iframe {\\n  margin: 0;\\n  position: absolute;\\n  z-index: -1;\\n  right: 0;\\n  min-height: 100vh;\\n  width: 110%; }\\n\\n.makeshift-bg {\\n  position: absolute;\\n  height: 120vh;\\n  width: 120vw;\\n  z-index: -1;\\n  background: url(\" + ___CSS_LOADER_URL___0___ + \") top left/auto 120% no-repeat; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/videobg/videobg.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function escape(url, needQuotes) {\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || needQuotes) {\n    return '\"' + url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') + '\"';\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/url-escape.js?");

/***/ }),

/***/ "./node_modules/markdown/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/markdown/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// super simple module for the most common nodejs use case.\nexports.markdown = __webpack_require__(/*! ./markdown */ \"./node_modules/markdown/lib/markdown.js\");\nexports.parse = exports.markdown.toHTML;\n\n\n//# sourceURL=webpack:///./node_modules/markdown/lib/index.js?");

/***/ }),

/***/ "./node_modules/markdown/lib/markdown.js":
/*!***********************************************!*\
  !*** ./node_modules/markdown/lib/markdown.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Released under MIT license\n// Copyright (c) 2009-2010 Dominic Baggott\n// Copyright (c) 2009-2010 Ash Berlin\n// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)\n\n/*jshint browser:true, devel:true */\n\n(function( expose ) {\n\n/**\n *  class Markdown\n *\n *  Markdown processing in Javascript done right. We have very particular views\n *  on what constitutes 'right' which include:\n *\n *  - produces well-formed HTML (this means that em and strong nesting is\n *    important)\n *\n *  - has an intermediate representation to allow processing of parsed data (We\n *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).\n *\n *  - is easily extensible to add new dialects without having to rewrite the\n *    entire parsing mechanics\n *\n *  - has a good test suite\n *\n *  This implementation fulfills all of these (except that the test suite could\n *  do with expanding to automatically run all the fixtures from other Markdown\n *  implementations.)\n *\n *  ##### Intermediate Representation\n *\n *  *TODO* Talk about this :) Its JsonML, but document the node names we use.\n *\n *  [JsonML]: http://jsonml.org/ \"JSON Markup Language\"\n **/\nvar Markdown = expose.Markdown = function(dialect) {\n  switch (typeof dialect) {\n    case \"undefined\":\n      this.dialect = Markdown.dialects.Gruber;\n      break;\n    case \"object\":\n      this.dialect = dialect;\n      break;\n    default:\n      if ( dialect in Markdown.dialects ) {\n        this.dialect = Markdown.dialects[dialect];\n      }\n      else {\n        throw new Error(\"Unknown Markdown dialect '\" + String(dialect) + \"'\");\n      }\n      break;\n  }\n  this.em_state = [];\n  this.strong_state = [];\n  this.debug_indent = \"\";\n};\n\n/**\n *  parse( markdown, [dialect] ) -> JsonML\n *  - markdown (String): markdown string to parse\n *  - dialect (String | Dialect): the dialect to use, defaults to gruber\n *\n *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.\n **/\nexpose.parse = function( source, dialect ) {\n  // dialect will default if undefined\n  var md = new Markdown( dialect );\n  return md.toTree( source );\n};\n\n/**\n *  toHTML( markdown, [dialect]  ) -> String\n *  toHTML( md_tree ) -> String\n *  - markdown (String): markdown string to parse\n *  - md_tree (Markdown.JsonML): parsed markdown tree\n *\n *  Take markdown (either as a string or as a JsonML tree) and run it through\n *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.\n **/\nexpose.toHTML = function toHTML( source , dialect , options ) {\n  var input = expose.toHTMLTree( source , dialect , options );\n\n  return expose.renderJsonML( input );\n};\n\n/**\n *  toHTMLTree( markdown, [dialect] ) -> JsonML\n *  toHTMLTree( md_tree ) -> JsonML\n *  - markdown (String): markdown string to parse\n *  - dialect (String | Dialect): the dialect to use, defaults to gruber\n *  - md_tree (Markdown.JsonML): parsed markdown tree\n *\n *  Turn markdown into HTML, represented as a JsonML tree. If a string is given\n *  to this function, it is first parsed into a markdown tree by calling\n *  [[parse]].\n **/\nexpose.toHTMLTree = function toHTMLTree( input, dialect , options ) {\n  // convert string input to an MD tree\n  if ( typeof input ===\"string\" ) input = this.parse( input, dialect );\n\n  // Now convert the MD tree to an HTML tree\n\n  // remove references from the tree\n  var attrs = extract_attr( input ),\n      refs = {};\n\n  if ( attrs && attrs.references ) {\n    refs = attrs.references;\n  }\n\n  var html = convert_tree_to_html( input, refs , options );\n  merge_text_nodes( html );\n  return html;\n};\n\n// For Spidermonkey based engines\nfunction mk_block_toSource() {\n  return \"Markdown.mk_block( \" +\n          uneval(this.toString()) +\n          \", \" +\n          uneval(this.trailing) +\n          \", \" +\n          uneval(this.lineNumber) +\n          \" )\";\n}\n\n// node\nfunction mk_block_inspect() {\n  var util = __webpack_require__(/*! util */ \"./node_modules/util/util.js\");\n  return \"Markdown.mk_block( \" +\n          util.inspect(this.toString()) +\n          \", \" +\n          util.inspect(this.trailing) +\n          \", \" +\n          util.inspect(this.lineNumber) +\n          \" )\";\n\n}\n\nvar mk_block = Markdown.mk_block = function(block, trail, line) {\n  // Be helpful for default case in tests.\n  if ( arguments.length == 1 ) trail = \"\\n\\n\";\n\n  var s = new String(block);\n  s.trailing = trail;\n  // To make it clear its not just a string\n  s.inspect = mk_block_inspect;\n  s.toSource = mk_block_toSource;\n\n  if ( line != undefined )\n    s.lineNumber = line;\n\n  return s;\n};\n\nfunction count_lines( str ) {\n  var n = 0, i = -1;\n  while ( ( i = str.indexOf(\"\\n\", i + 1) ) !== -1 ) n++;\n  return n;\n}\n\n// Internal - split source into rough blocks\nMarkdown.prototype.split_blocks = function splitBlocks( input, startLine ) {\n  input = input.replace(/(\\r\\n|\\n|\\r)/g, \"\\n\");\n  // [\\s\\S] matches _anything_ (newline or space)\n  // [^] is equivalent but doesn't work in IEs.\n  var re = /([\\s\\S]+?)($|\\n#|\\n(?:\\s*\\n|$)+)/g,\n      blocks = [],\n      m;\n\n  var line_no = 1;\n\n  if ( ( m = /^(\\s*\\n)/.exec(input) ) != null ) {\n    // skip (but count) leading blank lines\n    line_no += count_lines( m[0] );\n    re.lastIndex = m[0].length;\n  }\n\n  while ( ( m = re.exec(input) ) !== null ) {\n    if (m[2] == \"\\n#\") {\n      m[2] = \"\\n\";\n      re.lastIndex--;\n    }\n    blocks.push( mk_block( m[1], m[2], line_no ) );\n    line_no += count_lines( m[0] );\n  }\n\n  return blocks;\n};\n\n/**\n *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]\n *  - block (String): the block to process\n *  - next (Array): the following blocks\n *\n * Process `block` and return an array of JsonML nodes representing `block`.\n *\n * It does this by asking each block level function in the dialect to process\n * the block until one can. Succesful handling is indicated by returning an\n * array (with zero or more JsonML nodes), failure by a false value.\n *\n * Blocks handlers are responsible for calling [[Markdown#processInline]]\n * themselves as appropriate.\n *\n * If the blocks were split incorrectly or adjacent blocks need collapsing you\n * can adjust `next` in place using shift/splice etc.\n *\n * If any of this default behaviour is not right for the dialect, you can\n * define a `__call__` method on the dialect that will get invoked to handle\n * the block processing.\n */\nMarkdown.prototype.processBlock = function processBlock( block, next ) {\n  var cbs = this.dialect.block,\n      ord = cbs.__order__;\n\n  if ( \"__call__\" in cbs ) {\n    return cbs.__call__.call(this, block, next);\n  }\n\n  for ( var i = 0; i < ord.length; i++ ) {\n    //D:this.debug( \"Testing\", ord[i] );\n    var res = cbs[ ord[i] ].call( this, block, next );\n    if ( res ) {\n      //D:this.debug(\"  matched\");\n      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )\n        this.debug(ord[i], \"didn't return a proper array\");\n      //D:this.debug( \"\" );\n      return res;\n    }\n  }\n\n  // Uhoh! no match! Should we throw an error?\n  return [];\n};\n\nMarkdown.prototype.processInline = function processInline( block ) {\n  return this.dialect.inline.__call__.call( this, String( block ) );\n};\n\n/**\n *  Markdown#toTree( source ) -> JsonML\n *  - source (String): markdown source to parse\n *\n *  Parse `source` into a JsonML tree representing the markdown document.\n **/\n// custom_tree means set this.tree to `custom_tree` and restore old value on return\nMarkdown.prototype.toTree = function toTree( source, custom_root ) {\n  var blocks = source instanceof Array ? source : this.split_blocks( source );\n\n  // Make tree a member variable so its easier to mess with in extensions\n  var old_tree = this.tree;\n  try {\n    this.tree = custom_root || this.tree || [ \"markdown\" ];\n\n    blocks:\n    while ( blocks.length ) {\n      var b = this.processBlock( blocks.shift(), blocks );\n\n      // Reference blocks and the like won't return any content\n      if ( !b.length ) continue blocks;\n\n      this.tree.push.apply( this.tree, b );\n    }\n    return this.tree;\n  }\n  finally {\n    if ( custom_root ) {\n      this.tree = old_tree;\n    }\n  }\n};\n\n// Noop by default\nMarkdown.prototype.debug = function () {\n  var args = Array.prototype.slice.call( arguments);\n  args.unshift(this.debug_indent);\n  if ( typeof print !== \"undefined\" )\n      print.apply( print, args );\n  if ( typeof console !== \"undefined\" && typeof console.log !== \"undefined\" )\n      console.log.apply( null, args );\n}\n\nMarkdown.prototype.loop_re_over_block = function( re, block, cb ) {\n  // Dont use /g regexps with this\n  var m,\n      b = block.valueOf();\n\n  while ( b.length && (m = re.exec(b) ) != null ) {\n    b = b.substr( m[0].length );\n    cb.call(this, m);\n  }\n  return b;\n};\n\n/**\n * Markdown.dialects\n *\n * Namespace of built-in dialects.\n **/\nMarkdown.dialects = {};\n\n/**\n * Markdown.dialects.Gruber\n *\n * The default dialect that follows the rules set out by John Gruber's\n * markdown.pl as closely as possible. Well actually we follow the behaviour of\n * that script which in some places is not exactly what the syntax web page\n * says.\n **/\nMarkdown.dialects.Gruber = {\n  block: {\n    atxHeader: function atxHeader( block, next ) {\n      var m = block.match( /^(#{1,6})\\s*(.*?)\\s*#*\\s*(?:\\n|$)/ );\n\n      if ( !m ) return undefined;\n\n      var header = [ \"header\", { level: m[ 1 ].length } ];\n      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));\n\n      if ( m[0].length < block.length )\n        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );\n\n      return [ header ];\n    },\n\n    setextHeader: function setextHeader( block, next ) {\n      var m = block.match( /^(.*)\\n([-=])\\2\\2+(?:\\n|$)/ );\n\n      if ( !m ) return undefined;\n\n      var level = ( m[ 2 ] === \"=\" ) ? 1 : 2;\n      var header = [ \"header\", { level : level }, m[ 1 ] ];\n\n      if ( m[0].length < block.length )\n        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );\n\n      return [ header ];\n    },\n\n    code: function code( block, next ) {\n      // |    Foo\n      // |bar\n      // should be a code block followed by a paragraph. Fun\n      //\n      // There might also be adjacent code block to merge.\n\n      var ret = [],\n          re = /^(?: {0,3}\\t| {4})(.*)\\n?/,\n          lines;\n\n      // 4 spaces + content\n      if ( !block.match( re ) ) return undefined;\n\n      block_search:\n      do {\n        // Now pull out the rest of the lines\n        var b = this.loop_re_over_block(\n                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );\n\n        if ( b.length ) {\n          // Case alluded to in first comment. push it back on as a new block\n          next.unshift( mk_block(b, block.trailing) );\n          break block_search;\n        }\n        else if ( next.length ) {\n          // Check the next block - it might be code too\n          if ( !next[0].match( re ) ) break block_search;\n\n          // Pull how how many blanks lines follow - minus two to account for .join\n          ret.push ( block.trailing.replace(/[^\\n]/g, \"\").substring(2) );\n\n          block = next.shift();\n        }\n        else {\n          break block_search;\n        }\n      } while ( true );\n\n      return [ [ \"code_block\", ret.join(\"\\n\") ] ];\n    },\n\n    horizRule: function horizRule( block, next ) {\n      // this needs to find any hr in the block to handle abutting blocks\n      var m = block.match( /^(?:([\\s\\S]*?)\\n)?[ \\t]*([-_*])(?:[ \\t]*\\2){2,}[ \\t]*(?:\\n([\\s\\S]*))?$/ );\n\n      if ( !m ) {\n        return undefined;\n      }\n\n      var jsonml = [ [ \"hr\" ] ];\n\n      // if there's a leading abutting block, process it\n      if ( m[ 1 ] ) {\n        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );\n      }\n\n      // if there's a trailing abutting block, stick it into next\n      if ( m[ 3 ] ) {\n        next.unshift( mk_block( m[ 3 ] ) );\n      }\n\n      return jsonml;\n    },\n\n    // There are two types of lists. Tight and loose. Tight lists have no whitespace\n    // between the items (and result in text just in the <li>) and loose lists,\n    // which have an empty line between list items, resulting in (one or more)\n    // paragraphs inside the <li>.\n    //\n    // There are all sorts weird edge cases about the original markdown.pl's\n    // handling of lists:\n    //\n    // * Nested lists are supposed to be indented by four chars per level. But\n    //   if they aren't, you can get a nested list by indenting by less than\n    //   four so long as the indent doesn't match an indent of an existing list\n    //   item in the 'nest stack'.\n    //\n    // * The type of the list (bullet or number) is controlled just by the\n    //    first item at the indent. Subsequent changes are ignored unless they\n    //    are for nested lists\n    //\n    lists: (function( ) {\n      // Use a closure to hide a few variables.\n      var any_list = \"[*+-]|\\\\d+\\\\.\",\n          bullet_list = /[*+-]/,\n          number_list = /\\d+\\./,\n          // Capture leading indent as it matters for determining nested lists.\n          is_list_re = new RegExp( \"^( {0,3})(\" + any_list + \")[ \\t]+\" ),\n          indent_re = \"(?: {0,3}\\\\t| {4})\";\n\n      // TODO: Cache this regexp for certain depths.\n      // Create a regexp suitable for matching an li for a given stack depth\n      function regex_for_depth( depth ) {\n\n        return new RegExp(\n          // m[1] = indent, m[2] = list_type\n          \"(?:^(\" + indent_re + \"{0,\" + depth + \"} {0,3})(\" + any_list + \")\\\\s+)|\" +\n          // m[3] = cont\n          \"(^\" + indent_re + \"{0,\" + (depth-1) + \"}[ ]{0,4})\"\n        );\n      }\n      function expand_tab( input ) {\n        return input.replace( / {0,3}\\t/g, \"    \" );\n      }\n\n      // Add inline content `inline` to `li`. inline comes from processInline\n      // so is an array of content\n      function add(li, loose, inline, nl) {\n        if ( loose ) {\n          li.push( [ \"para\" ].concat(inline) );\n          return;\n        }\n        // Hmmm, should this be any block level element or just paras?\n        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == \"para\"\n                   ? li[li.length -1]\n                   : li;\n\n        // If there is already some content in this list, add the new line in\n        if ( nl && li.length > 1 ) inline.unshift(nl);\n\n        for ( var i = 0; i < inline.length; i++ ) {\n          var what = inline[i],\n              is_str = typeof what == \"string\";\n          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == \"string\" ) {\n            add_to[ add_to.length-1 ] += what;\n          }\n          else {\n            add_to.push( what );\n          }\n        }\n      }\n\n      // contained means have an indent greater than the current one. On\n      // *every* line in the block\n      function get_contained_blocks( depth, blocks ) {\n\n        var re = new RegExp( \"^(\" + indent_re + \"{\" + depth + \"}.*?\\\\n?)*$\" ),\n            replace = new RegExp(\"^\" + indent_re + \"{\" + depth + \"}\", \"gm\"),\n            ret = [];\n\n        while ( blocks.length > 0 ) {\n          if ( re.exec( blocks[0] ) ) {\n            var b = blocks.shift(),\n                // Now remove that indent\n                x = b.replace( replace, \"\");\n\n            ret.push( mk_block( x, b.trailing, b.lineNumber ) );\n          }\n          else {\n            break;\n          }\n        }\n        return ret;\n      }\n\n      // passed to stack.forEach to turn list items up the stack into paras\n      function paragraphify(s, i, stack) {\n        var list = s.list;\n        var last_li = list[list.length-1];\n\n        if ( last_li[1] instanceof Array && last_li[1][0] == \"para\" ) {\n          return;\n        }\n        if ( i + 1 == stack.length ) {\n          // Last stack frame\n          // Keep the same array, but replace the contents\n          last_li.push( [\"para\"].concat( last_li.splice(1, last_li.length - 1) ) );\n        }\n        else {\n          var sublist = last_li.pop();\n          last_li.push( [\"para\"].concat( last_li.splice(1, last_li.length - 1) ), sublist );\n        }\n      }\n\n      // The matcher function\n      return function( block, next ) {\n        var m = block.match( is_list_re );\n        if ( !m ) return undefined;\n\n        function make_list( m ) {\n          var list = bullet_list.exec( m[2] )\n                   ? [\"bulletlist\"]\n                   : [\"numberlist\"];\n\n          stack.push( { list: list, indent: m[1] } );\n          return list;\n        }\n\n\n        var stack = [], // Stack of lists for nesting.\n            list = make_list( m ),\n            last_li,\n            loose = false,\n            ret = [ stack[0].list ],\n            i;\n\n        // Loop to search over block looking for inner block elements and loose lists\n        loose_search:\n        while ( true ) {\n          // Split into lines preserving new lines at end of line\n          var lines = block.split( /(?=\\n)/ );\n\n          // We have to grab all lines for a li and call processInline on them\n          // once as there are some inline things that can span lines.\n          var li_accumulate = \"\";\n\n          // Loop over the lines in this block looking for tight lists.\n          tight_search:\n          for ( var line_no = 0; line_no < lines.length; line_no++ ) {\n            var nl = \"\",\n                l = lines[line_no].replace(/^\\n/, function(n) { nl = n; return \"\"; });\n\n            // TODO: really should cache this\n            var line_re = regex_for_depth( stack.length );\n\n            m = l.match( line_re );\n            //print( \"line:\", uneval(l), \"\\nline match:\", uneval(m) );\n\n            // We have a list item\n            if ( m[1] !== undefined ) {\n              // Process the previous list item, if any\n              if ( li_accumulate.length ) {\n                add( last_li, loose, this.processInline( li_accumulate ), nl );\n                // Loose mode will have been dealt with. Reset it\n                loose = false;\n                li_accumulate = \"\";\n              }\n\n              m[1] = expand_tab( m[1] );\n              var wanted_depth = Math.floor(m[1].length/4)+1;\n              //print( \"want:\", wanted_depth, \"stack:\", stack.length);\n              if ( wanted_depth > stack.length ) {\n                // Deep enough for a nested list outright\n                //print ( \"new nested list\" );\n                list = make_list( m );\n                last_li.push( list );\n                last_li = list[1] = [ \"listitem\" ];\n              }\n              else {\n                // We aren't deep enough to be strictly a new level. This is\n                // where Md.pl goes nuts. If the indent matches a level in the\n                // stack, put it there, else put it one deeper then the\n                // wanted_depth deserves.\n                var found = false;\n                for ( i = 0; i < stack.length; i++ ) {\n                  if ( stack[ i ].indent != m[1] ) continue;\n                  list = stack[ i ].list;\n                  stack.splice( i+1, stack.length - (i+1) );\n                  found = true;\n                  break;\n                }\n\n                if (!found) {\n                  //print(\"not found. l:\", uneval(l));\n                  wanted_depth++;\n                  if ( wanted_depth <= stack.length ) {\n                    stack.splice(wanted_depth, stack.length - wanted_depth);\n                    //print(\"Desired depth now\", wanted_depth, \"stack:\", stack.length);\n                    list = stack[wanted_depth-1].list;\n                    //print(\"list:\", uneval(list) );\n                  }\n                  else {\n                    //print (\"made new stack for messy indent\");\n                    list = make_list(m);\n                    last_li.push(list);\n                  }\n                }\n\n                //print( uneval(list), \"last\", list === stack[stack.length-1].list );\n                last_li = [ \"listitem\" ];\n                list.push(last_li);\n              } // end depth of shenegains\n              nl = \"\";\n            }\n\n            // Add content\n            if ( l.length > m[0].length ) {\n              li_accumulate += nl + l.substr( m[0].length );\n            }\n          } // tight_search\n\n          if ( li_accumulate.length ) {\n            add( last_li, loose, this.processInline( li_accumulate ), nl );\n            // Loose mode will have been dealt with. Reset it\n            loose = false;\n            li_accumulate = \"\";\n          }\n\n          // Look at the next block - we might have a loose list. Or an extra\n          // paragraph for the current li\n          var contained = get_contained_blocks( stack.length, next );\n\n          // Deal with code blocks or properly nested lists\n          if ( contained.length > 0 ) {\n            // Make sure all listitems up the stack are paragraphs\n            forEach( stack, paragraphify, this);\n\n            last_li.push.apply( last_li, this.toTree( contained, [] ) );\n          }\n\n          var next_block = next[0] && next[0].valueOf() || \"\";\n\n          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {\n            block = next.shift();\n\n            // Check for an HR following a list: features/lists/hr_abutting\n            var hr = this.dialect.block.horizRule( block, next );\n\n            if ( hr ) {\n              ret.push.apply(ret, hr);\n              break;\n            }\n\n            // Make sure all listitems up the stack are paragraphs\n            forEach( stack, paragraphify, this);\n\n            loose = true;\n            continue loose_search;\n          }\n          break;\n        } // loose_search\n\n        return ret;\n      };\n    })(),\n\n    blockquote: function blockquote( block, next ) {\n      if ( !block.match( /^>/m ) )\n        return undefined;\n\n      var jsonml = [];\n\n      // separate out the leading abutting block, if any. I.e. in this case:\n      //\n      //  a\n      //  > b\n      //\n      if ( block[ 0 ] != \">\" ) {\n        var lines = block.split( /\\n/ ),\n            prev = [],\n            line_no = block.lineNumber;\n\n        // keep shifting lines until you find a crotchet\n        while ( lines.length && lines[ 0 ][ 0 ] != \">\" ) {\n            prev.push( lines.shift() );\n            line_no++;\n        }\n\n        var abutting = mk_block( prev.join( \"\\n\" ), \"\\n\", block.lineNumber );\n        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );\n        // reassemble new block of just block quotes!\n        block = mk_block( lines.join( \"\\n\" ), block.trailing, line_no );\n      }\n\n\n      // if the next block is also a blockquote merge it in\n      while ( next.length && next[ 0 ][ 0 ] == \">\" ) {\n        var b = next.shift();\n        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );\n      }\n\n      // Strip off the leading \"> \" and re-process as a block.\n      var input = block.replace( /^> ?/gm, \"\" ),\n          old_tree = this.tree,\n          processedBlock = this.toTree( input, [ \"blockquote\" ] ),\n          attr = extract_attr( processedBlock );\n\n      // If any link references were found get rid of them\n      if ( attr && attr.references ) {\n        delete attr.references;\n        // And then remove the attribute object if it's empty\n        if ( isEmpty( attr ) ) {\n          processedBlock.splice( 1, 1 );\n        }\n      }\n\n      jsonml.push( processedBlock );\n      return jsonml;\n    },\n\n    referenceDefn: function referenceDefn( block, next) {\n      var re = /^\\s*\\[(.*?)\\]:\\s*(\\S+)(?:\\s+(?:(['\"])(.*?)\\3|\\((.*?)\\)))?\\n?/;\n      // interesting matches are [ , ref_id, url, , title, title ]\n\n      if ( !block.match(re) )\n        return undefined;\n\n      // make an attribute node if it doesn't exist\n      if ( !extract_attr( this.tree ) ) {\n        this.tree.splice( 1, 0, {} );\n      }\n\n      var attrs = extract_attr( this.tree );\n\n      // make a references hash if it doesn't exist\n      if ( attrs.references === undefined ) {\n        attrs.references = {};\n      }\n\n      var b = this.loop_re_over_block(re, block, function( m ) {\n\n        if ( m[2] && m[2][0] == \"<\" && m[2][m[2].length-1] == \">\" )\n          m[2] = m[2].substring( 1, m[2].length - 1 );\n\n        var ref = attrs.references[ m[1].toLowerCase() ] = {\n          href: m[2]\n        };\n\n        if ( m[4] !== undefined )\n          ref.title = m[4];\n        else if ( m[5] !== undefined )\n          ref.title = m[5];\n\n      } );\n\n      if ( b.length )\n        next.unshift( mk_block( b, block.trailing ) );\n\n      return [];\n    },\n\n    para: function para( block, next ) {\n      // everything's a para!\n      return [ [\"para\"].concat( this.processInline( block ) ) ];\n    }\n  }\n};\n\nMarkdown.dialects.Gruber.inline = {\n\n    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {\n      var m,\n          res,\n          lastIndex = 0;\n\n      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;\n      var re = new RegExp( \"([\\\\s\\\\S]*?)(\" + (patterns_or_re.source || patterns_or_re) + \")\" );\n\n      m = re.exec( text );\n      if (!m) {\n        // Just boring text\n        return [ text.length, text ];\n      }\n      else if ( m[1] ) {\n        // Some un-interesting text matched. Return that first\n        return [ m[1].length, m[1] ];\n      }\n\n      var res;\n      if ( m[2] in this.dialect.inline ) {\n        res = this.dialect.inline[ m[2] ].call(\n                  this,\n                  text.substr( m.index ), m, previous_nodes || [] );\n      }\n      // Default for now to make dev easier. just slurp special and output it.\n      res = res || [ m[2].length, m[2] ];\n      return res;\n    },\n\n    __call__: function inline( text, patterns ) {\n\n      var out = [],\n          res;\n\n      function add(x) {\n        //D:self.debug(\"  adding output\", uneval(x));\n        if ( typeof x == \"string\" && typeof out[out.length-1] == \"string\" )\n          out[ out.length-1 ] += x;\n        else\n          out.push(x);\n      }\n\n      while ( text.length > 0 ) {\n        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );\n        text = text.substr( res.shift() );\n        forEach(res, add )\n      }\n\n      return out;\n    },\n\n    // These characters are intersting elsewhere, so have rules for them so that\n    // chunks of plain text blocks don't include them\n    \"]\": function () {},\n    \"}\": function () {},\n\n    __escape__ : /^\\\\[\\\\`\\*_{}\\[\\]()#\\+.!\\-]/,\n\n    \"\\\\\": function escaped( text ) {\n      // [ length of input processed, node/children to add... ]\n      // Only esacape: \\ ` * _ { } [ ] ( ) # * + - . !\n      if ( this.dialect.inline.__escape__.exec( text ) )\n        return [ 2, text.charAt( 1 ) ];\n      else\n        // Not an esacpe\n        return [ 1, \"\\\\\" ];\n    },\n\n    \"![\": function image( text ) {\n\n      // Unlike images, alt text is plain text only. no other elements are\n      // allowed in there\n\n      // ![Alt text](/path/to/img.jpg \"Optional title\")\n      //      1          2            3       4         <--- captures\n      var m = text.match( /^!\\[(.*?)\\][ \\t]*\\([ \\t]*([^\")]*?)(?:[ \\t]+([\"'])(.*?)\\3)?[ \\t]*\\)/ );\n\n      if ( m ) {\n        if ( m[2] && m[2][0] == \"<\" && m[2][m[2].length-1] == \">\" )\n          m[2] = m[2].substring( 1, m[2].length - 1 );\n\n        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\\\/ )[0];\n\n        var attrs = { alt: m[1], href: m[2] || \"\" };\n        if ( m[4] !== undefined)\n          attrs.title = m[4];\n\n        return [ m[0].length, [ \"img\", attrs ] ];\n      }\n\n      // ![Alt text][id]\n      m = text.match( /^!\\[(.*?)\\][ \\t]*\\[(.*?)\\]/ );\n\n      if ( m ) {\n        // We can't check if the reference is known here as it likely wont be\n        // found till after. Check it in md tree->hmtl tree conversion\n        return [ m[0].length, [ \"img_ref\", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];\n      }\n\n      // Just consume the '!['\n      return [ 2, \"![\" ];\n    },\n\n    \"[\": function link( text ) {\n\n      var orig = String(text);\n      // Inline content is possible inside `link text`\n      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), \"]\" );\n\n      // No closing ']' found. Just consume the [\n      if ( !res ) return [ 1, \"[\" ];\n\n      var consumed = 1 + res[ 0 ],\n          children = res[ 1 ],\n          link,\n          attrs;\n\n      // At this point the first [...] has been parsed. See what follows to find\n      // out which kind of link we are (reference or direct url)\n      text = text.substr( consumed );\n\n      // [link text](/path/to/img.jpg \"Optional title\")\n      //                 1            2       3         <--- captures\n      // This will capture up to the last paren in the block. We then pull\n      // back based on if there a matching ones in the url\n      //    ([here](/url/(test))\n      // The parens have to be balanced\n      var m = text.match( /^\\s*\\([ \\t]*([^\"']*)(?:[ \\t]+([\"'])(.*?)\\2)?[ \\t]*\\)/ );\n      if ( m ) {\n        var url = m[1];\n        consumed += m[0].length;\n\n        if ( url && url[0] == \"<\" && url[url.length-1] == \">\" )\n          url = url.substring( 1, url.length - 1 );\n\n        // If there is a title we don't have to worry about parens in the url\n        if ( !m[3] ) {\n          var open_parens = 1; // One open that isn't in the capture\n          for ( var len = 0; len < url.length; len++ ) {\n            switch ( url[len] ) {\n            case \"(\":\n              open_parens++;\n              break;\n            case \")\":\n              if ( --open_parens == 0) {\n                consumed -= url.length - len;\n                url = url.substring(0, len);\n              }\n              break;\n            }\n          }\n        }\n\n        // Process escapes only\n        url = this.dialect.inline.__call__.call( this, url, /\\\\/ )[0];\n\n        attrs = { href: url || \"\" };\n        if ( m[3] !== undefined)\n          attrs.title = m[3];\n\n        link = [ \"link\", attrs ].concat( children );\n        return [ consumed, link ];\n      }\n\n      // [Alt text][id]\n      // [Alt text] [id]\n      m = text.match( /^\\s*\\[(.*?)\\]/ );\n\n      if ( m ) {\n\n        consumed += m[ 0 ].length;\n\n        // [links][] uses links as its reference\n        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };\n\n        link = [ \"link_ref\", attrs ].concat( children );\n\n        // We can't check if the reference is known here as it likely wont be\n        // found till after. Check it in md tree->hmtl tree conversion.\n        // Store the original so that conversion can revert if the ref isn't found.\n        return [ consumed, link ];\n      }\n\n      // [id]\n      // Only if id is plain (no formatting.)\n      if ( children.length == 1 && typeof children[0] == \"string\" ) {\n\n        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };\n        link = [ \"link_ref\", attrs, children[0] ];\n        return [ consumed, link ];\n      }\n\n      // Just consume the \"[\"\n      return [ 1, \"[\" ];\n    },\n\n\n    \"<\": function autoLink( text ) {\n      var m;\n\n      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\\.[a-zA-Z]+))>/ ) ) != null ) {\n        if ( m[3] ) {\n          return [ m[0].length, [ \"link\", { href: \"mailto:\" + m[3] }, m[3] ] ];\n\n        }\n        else if ( m[2] == \"mailto\" ) {\n          return [ m[0].length, [ \"link\", { href: m[1] }, m[1].substr(\"mailto:\".length ) ] ];\n        }\n        else\n          return [ m[0].length, [ \"link\", { href: m[1] }, m[1] ] ];\n      }\n\n      return [ 1, \"<\" ];\n    },\n\n    \"`\": function inlineCode( text ) {\n      // Inline code block. as many backticks as you like to start it\n      // Always skip over the opening ticks.\n      var m = text.match( /(`+)(([\\s\\S]*?)\\1)/ );\n\n      if ( m && m[2] )\n        return [ m[1].length + m[2].length, [ \"inlinecode\", m[3] ] ];\n      else {\n        // TODO: No matching end code found - warn!\n        return [ 1, \"`\" ];\n      }\n    },\n\n    \"  \\n\": function lineBreak( text ) {\n      return [ 3, [ \"linebreak\" ] ];\n    }\n\n};\n\n// Meta Helper/generator method for em and strong handling\nfunction strong_em( tag, md ) {\n\n  var state_slot = tag + \"_state\",\n      other_slot = tag == \"strong\" ? \"em_state\" : \"strong_state\";\n\n  function CloseTag(len) {\n    this.len_after = len;\n    this.name = \"close_\" + md;\n  }\n\n  return function ( text, orig_match ) {\n\n    if ( this[state_slot][0] == md ) {\n      // Most recent em is of this type\n      //D:this.debug(\"closing\", md);\n      this[state_slot].shift();\n\n      // \"Consume\" everything to go back to the recrusion in the else-block below\n      return[ text.length, new CloseTag(text.length-md.length) ];\n    }\n    else {\n      // Store a clone of the em/strong states\n      var other = this[other_slot].slice(),\n          state = this[state_slot].slice();\n\n      this[state_slot].unshift(md);\n\n      //D:this.debug_indent += \"  \";\n\n      // Recurse\n      var res = this.processInline( text.substr( md.length ) );\n      //D:this.debug_indent = this.debug_indent.substr(2);\n\n      var last = res[res.length - 1];\n\n      //D:this.debug(\"processInline from\", tag + \": \", uneval( res ) );\n\n      var check = this[state_slot].shift();\n      if ( last instanceof CloseTag ) {\n        res.pop();\n        // We matched! Huzzah.\n        var consumed = text.length - last.len_after;\n        return [ consumed, [ tag ].concat(res) ];\n      }\n      else {\n        // Restore the state of the other kind. We might have mistakenly closed it.\n        this[other_slot] = other;\n        this[state_slot] = state;\n\n        // We can't reuse the processed result as it could have wrong parsing contexts in it.\n        return [ md.length, md ];\n      }\n    }\n  }; // End returned function\n}\n\nMarkdown.dialects.Gruber.inline[\"**\"] = strong_em(\"strong\", \"**\");\nMarkdown.dialects.Gruber.inline[\"__\"] = strong_em(\"strong\", \"__\");\nMarkdown.dialects.Gruber.inline[\"*\"]  = strong_em(\"em\", \"*\");\nMarkdown.dialects.Gruber.inline[\"_\"]  = strong_em(\"em\", \"_\");\n\n\n// Build default order from insertion order.\nMarkdown.buildBlockOrder = function(d) {\n  var ord = [];\n  for ( var i in d ) {\n    if ( i == \"__order__\" || i == \"__call__\" ) continue;\n    ord.push( i );\n  }\n  d.__order__ = ord;\n};\n\n// Build patterns for inline matcher\nMarkdown.buildInlinePatterns = function(d) {\n  var patterns = [];\n\n  for ( var i in d ) {\n    // __foo__ is reserved and not a pattern\n    if ( i.match( /^__.*__$/) ) continue;\n    var l = i.replace( /([\\\\.*+?|()\\[\\]{}])/g, \"\\\\$1\" )\n             .replace( /\\n/, \"\\\\n\" );\n    patterns.push( i.length == 1 ? l : \"(?:\" + l + \")\" );\n  }\n\n  patterns = patterns.join(\"|\");\n  d.__patterns__ = patterns;\n  //print(\"patterns:\", uneval( patterns ) );\n\n  var fn = d.__call__;\n  d.__call__ = function(text, pattern) {\n    if ( pattern != undefined ) {\n      return fn.call(this, text, pattern);\n    }\n    else\n    {\n      return fn.call(this, text, patterns);\n    }\n  };\n};\n\nMarkdown.DialectHelpers = {};\nMarkdown.DialectHelpers.inline_until_char = function( text, want ) {\n  var consumed = 0,\n      nodes = [];\n\n  while ( true ) {\n    if ( text.charAt( consumed ) == want ) {\n      // Found the character we were looking for\n      consumed++;\n      return [ consumed, nodes ];\n    }\n\n    if ( consumed >= text.length ) {\n      // No closing char found. Abort.\n      return null;\n    }\n\n    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );\n    consumed += res[ 0 ];\n    // Add any returned nodes.\n    nodes.push.apply( nodes, res.slice( 1 ) );\n  }\n}\n\n// Helper function to make sub-classing a dialect easier\nMarkdown.subclassDialect = function( d ) {\n  function Block() {}\n  Block.prototype = d.block;\n  function Inline() {}\n  Inline.prototype = d.inline;\n\n  return { block: new Block(), inline: new Inline() };\n};\n\nMarkdown.buildBlockOrder ( Markdown.dialects.Gruber.block );\nMarkdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );\n\nMarkdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );\n\nMarkdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {\n  var meta = split_meta_hash( meta_string ),\n      attr = {};\n\n  for ( var i = 0; i < meta.length; ++i ) {\n    // id: #foo\n    if ( /^#/.test( meta[ i ] ) ) {\n      attr.id = meta[ i ].substring( 1 );\n    }\n    // class: .foo\n    else if ( /^\\./.test( meta[ i ] ) ) {\n      // if class already exists, append the new one\n      if ( attr[\"class\"] ) {\n        attr[\"class\"] = attr[\"class\"] + meta[ i ].replace( /./, \" \" );\n      }\n      else {\n        attr[\"class\"] = meta[ i ].substring( 1 );\n      }\n    }\n    // attribute: foo=bar\n    else if ( /\\=/.test( meta[ i ] ) ) {\n      var s = meta[ i ].split( /\\=/ );\n      attr[ s[ 0 ] ] = s[ 1 ];\n    }\n  }\n\n  return attr;\n}\n\nfunction split_meta_hash( meta_string ) {\n  var meta = meta_string.split( \"\" ),\n      parts = [ \"\" ],\n      in_quotes = false;\n\n  while ( meta.length ) {\n    var letter = meta.shift();\n    switch ( letter ) {\n      case \" \" :\n        // if we're in a quoted section, keep it\n        if ( in_quotes ) {\n          parts[ parts.length - 1 ] += letter;\n        }\n        // otherwise make a new part\n        else {\n          parts.push( \"\" );\n        }\n        break;\n      case \"'\" :\n      case '\"' :\n        // reverse the quotes and move straight on\n        in_quotes = !in_quotes;\n        break;\n      case \"\\\\\" :\n        // shift off the next letter to be used straight away.\n        // it was escaped so we'll keep it whatever it is\n        letter = meta.shift();\n      default :\n        parts[ parts.length - 1 ] += letter;\n        break;\n    }\n  }\n\n  return parts;\n}\n\nMarkdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {\n  // we're only interested in the first block\n  if ( block.lineNumber > 1 ) return undefined;\n\n  // document_meta blocks consist of one or more lines of `Key: Value\\n`\n  if ( ! block.match( /^(?:\\w+:.*\\n)*\\w+:.*$/ ) ) return undefined;\n\n  // make an attribute node if it doesn't exist\n  if ( !extract_attr( this.tree ) ) {\n    this.tree.splice( 1, 0, {} );\n  }\n\n  var pairs = block.split( /\\n/ );\n  for ( p in pairs ) {\n    var m = pairs[ p ].match( /(\\w+):\\s*(.*)$/ ),\n        key = m[ 1 ].toLowerCase(),\n        value = m[ 2 ];\n\n    this.tree[ 1 ][ key ] = value;\n  }\n\n  // document_meta produces no content!\n  return [];\n};\n\nMarkdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {\n  // check if the last line of the block is an meta hash\n  var m = block.match( /(^|\\n) {0,3}\\{:\\s*((?:\\\\\\}|[^\\}])*)\\s*\\}$/ );\n  if ( !m ) return undefined;\n\n  // process the meta hash\n  var attr = this.dialect.processMetaHash( m[ 2 ] );\n\n  var hash;\n\n  // if we matched ^ then we need to apply meta to the previous block\n  if ( m[ 1 ] === \"\" ) {\n    var node = this.tree[ this.tree.length - 1 ];\n    hash = extract_attr( node );\n\n    // if the node is a string (rather than JsonML), bail\n    if ( typeof node === \"string\" ) return undefined;\n\n    // create the attribute hash if it doesn't exist\n    if ( !hash ) {\n      hash = {};\n      node.splice( 1, 0, hash );\n    }\n\n    // add the attributes in\n    for ( a in attr ) {\n      hash[ a ] = attr[ a ];\n    }\n\n    // return nothing so the meta hash is removed\n    return [];\n  }\n\n  // pull the meta hash off the block and process what's left\n  var b = block.replace( /\\n.*$/, \"\" ),\n      result = this.processBlock( b, [] );\n\n  // get or make the attributes hash\n  hash = extract_attr( result[ 0 ] );\n  if ( !hash ) {\n    hash = {};\n    result[ 0 ].splice( 1, 0, hash );\n  }\n\n  // attach the attributes to the block\n  for ( a in attr ) {\n    hash[ a ] = attr[ a ];\n  }\n\n  return result;\n};\n\nMarkdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {\n  // one or more terms followed by one or more definitions, in a single block\n  var tight = /^((?:[^\\s:].*\\n)+):\\s+([\\s\\S]+)$/,\n      list = [ \"dl\" ],\n      i, m;\n\n  // see if we're dealing with a tight or loose block\n  if ( ( m = block.match( tight ) ) ) {\n    // pull subsequent tight DL blocks out of `next`\n    var blocks = [ block ];\n    while ( next.length && tight.exec( next[ 0 ] ) ) {\n      blocks.push( next.shift() );\n    }\n\n    for ( var b = 0; b < blocks.length; ++b ) {\n      var m = blocks[ b ].match( tight ),\n          terms = m[ 1 ].replace( /\\n$/, \"\" ).split( /\\n/ ),\n          defns = m[ 2 ].split( /\\n:\\s+/ );\n\n      // print( uneval( m ) );\n\n      for ( i = 0; i < terms.length; ++i ) {\n        list.push( [ \"dt\", terms[ i ] ] );\n      }\n\n      for ( i = 0; i < defns.length; ++i ) {\n        // run inline processing over the definition\n        list.push( [ \"dd\" ].concat( this.processInline( defns[ i ].replace( /(\\n)\\s+/, \"$1\" ) ) ) );\n      }\n    }\n  }\n  else {\n    return undefined;\n  }\n\n  return [ list ];\n};\n\n// splits on unescaped instances of @ch. If @ch is not a character the result\n// can be unpredictable\n\nMarkdown.dialects.Maruku.block.table = function table (block, next) {\n\n    var _split_on_unescaped = function(s, ch) {\n        ch = ch || '\\\\s';\n        if (ch.match(/^[\\\\|\\[\\]{}?*.+^$]$/)) { ch = '\\\\' + ch; }\n        var res = [ ],\n            r = new RegExp('^((?:\\\\\\\\.|[^\\\\\\\\' + ch + '])*)' + ch + '(.*)'),\n            m;\n        while(m = s.match(r)) {\n            res.push(m[1]);\n            s = m[2];\n        }\n        res.push(s);\n        return res;\n    }\n\n    var leading_pipe = /^ {0,3}\\|(.+)\\n {0,3}\\|\\s*([\\-:]+[\\-| :]*)\\n((?:\\s*\\|.*(?:\\n|$))*)(?=\\n|$)/,\n        // find at least an unescaped pipe in each line\n        no_leading_pipe = /^ {0,3}(\\S(?:\\\\.|[^\\\\|])*\\|.*)\\n {0,3}([\\-:]+\\s*\\|[\\-| :]*)\\n((?:(?:\\\\.|[^\\\\|])*\\|.*(?:\\n|$))*)(?=\\n|$)/,\n        i, m;\n    if (m = block.match(leading_pipe)) {\n        // remove leading pipes in contents\n        // (header and horizontal rule already have the leading pipe left out)\n        m[3] = m[3].replace(/^\\s*\\|/gm, '');\n    } else if (! ( m = block.match(no_leading_pipe))) {\n        return undefined;\n    }\n\n    var table = [ \"table\", [ \"thead\", [ \"tr\" ] ], [ \"tbody\" ] ];\n\n    // remove trailing pipes, then split on pipes\n    // (no escaped pipes are allowed in horizontal rule)\n    m[2] = m[2].replace(/\\|\\s*$/, '').split('|');\n\n    // process alignment\n    var html_attrs = [ ];\n    forEach (m[2], function (s) {\n        if (s.match(/^\\s*-+:\\s*$/))       html_attrs.push({align: \"right\"});\n        else if (s.match(/^\\s*:-+\\s*$/))  html_attrs.push({align: \"left\"});\n        else if (s.match(/^\\s*:-+:\\s*$/)) html_attrs.push({align: \"center\"});\n        else                              html_attrs.push({});\n    });\n\n    // now for the header, avoid escaped pipes\n    m[1] = _split_on_unescaped(m[1].replace(/\\|\\s*$/, ''), '|');\n    for (i = 0; i < m[1].length; i++) {\n        table[1][1].push(['th', html_attrs[i] || {}].concat(\n            this.processInline(m[1][i].trim())));\n    }\n\n    // now for body contents\n    forEach (m[3].replace(/\\|\\s*$/mg, '').split('\\n'), function (row) {\n        var html_row = ['tr'];\n        row = _split_on_unescaped(row, '|');\n        for (i = 0; i < row.length; i++) {\n            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));\n        }\n        table[2].push(html_row);\n    }, this);\n\n    return [table];\n}\n\nMarkdown.dialects.Maruku.inline[ \"{:\" ] = function inline_meta( text, matches, out ) {\n  if ( !out.length ) {\n    return [ 2, \"{:\" ];\n  }\n\n  // get the preceeding element\n  var before = out[ out.length - 1 ];\n\n  if ( typeof before === \"string\" ) {\n    return [ 2, \"{:\" ];\n  }\n\n  // match a meta hash\n  var m = text.match( /^\\{:\\s*((?:\\\\\\}|[^\\}])*)\\s*\\}/ );\n\n  // no match, false alarm\n  if ( !m ) {\n    return [ 2, \"{:\" ];\n  }\n\n  // attach the attributes to the preceeding element\n  var meta = this.dialect.processMetaHash( m[ 1 ] ),\n      attr = extract_attr( before );\n\n  if ( !attr ) {\n    attr = {};\n    before.splice( 1, 0, attr );\n  }\n\n  for ( var k in meta ) {\n    attr[ k ] = meta[ k ];\n  }\n\n  // cut out the string and replace it with nothing\n  return [ m[ 0 ].length, \"\" ];\n};\n\nMarkdown.dialects.Maruku.inline.__escape__ = /^\\\\[\\\\`\\*_{}\\[\\]()#\\+.!\\-|:]/;\n\nMarkdown.buildBlockOrder ( Markdown.dialects.Maruku.block );\nMarkdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );\n\nvar isArray = Array.isArray || function(obj) {\n  return Object.prototype.toString.call(obj) == \"[object Array]\";\n};\n\nvar forEach;\n// Don't mess with Array.prototype. Its not friendly\nif ( Array.prototype.forEach ) {\n  forEach = function( arr, cb, thisp ) {\n    return arr.forEach( cb, thisp );\n  };\n}\nelse {\n  forEach = function(arr, cb, thisp) {\n    for (var i = 0; i < arr.length; i++) {\n      cb.call(thisp || arr, arr[i], i, arr);\n    }\n  }\n}\n\nvar isEmpty = function( obj ) {\n  for ( var key in obj ) {\n    if ( hasOwnProperty.call( obj, key ) ) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction extract_attr( jsonml ) {\n  return isArray(jsonml)\n      && jsonml.length > 1\n      && typeof jsonml[ 1 ] === \"object\"\n      && !( isArray(jsonml[ 1 ]) )\n      ? jsonml[ 1 ]\n      : undefined;\n}\n\n\n\n/**\n *  renderJsonML( jsonml[, options] ) -> String\n *  - jsonml (Array): JsonML array to render to XML\n *  - options (Object): options\n *\n *  Converts the given JsonML into well-formed XML.\n *\n *  The options currently understood are:\n *\n *  - root (Boolean): wether or not the root node should be included in the\n *    output, or just its children. The default `false` is to not include the\n *    root itself.\n */\nexpose.renderJsonML = function( jsonml, options ) {\n  options = options || {};\n  // include the root element in the rendered output?\n  options.root = options.root || false;\n\n  var content = [];\n\n  if ( options.root ) {\n    content.push( render_tree( jsonml ) );\n  }\n  else {\n    jsonml.shift(); // get rid of the tag\n    if ( jsonml.length && typeof jsonml[ 0 ] === \"object\" && !( jsonml[ 0 ] instanceof Array ) ) {\n      jsonml.shift(); // get rid of the attributes\n    }\n\n    while ( jsonml.length ) {\n      content.push( render_tree( jsonml.shift() ) );\n    }\n  }\n\n  return content.join( \"\\n\\n\" );\n};\n\nfunction escapeHTML( text ) {\n  return text.replace( /&/g, \"&amp;\" )\n             .replace( /</g, \"&lt;\" )\n             .replace( />/g, \"&gt;\" )\n             .replace( /\"/g, \"&quot;\" )\n             .replace( /'/g, \"&#39;\" );\n}\n\nfunction render_tree( jsonml ) {\n  // basic case\n  if ( typeof jsonml === \"string\" ) {\n    return escapeHTML( jsonml );\n  }\n\n  var tag = jsonml.shift(),\n      attributes = {},\n      content = [];\n\n  if ( jsonml.length && typeof jsonml[ 0 ] === \"object\" && !( jsonml[ 0 ] instanceof Array ) ) {\n    attributes = jsonml.shift();\n  }\n\n  while ( jsonml.length ) {\n    content.push( render_tree( jsonml.shift() ) );\n  }\n\n  var tag_attrs = \"\";\n  for ( var a in attributes ) {\n    tag_attrs += \" \" + a + '=\"' + escapeHTML( attributes[ a ] ) + '\"';\n  }\n\n  // be careful about adding whitespace here for inline elements\n  if ( tag == \"img\" || tag == \"br\" || tag == \"hr\" ) {\n    return \"<\"+ tag + tag_attrs + \"/>\";\n  }\n  else {\n    return \"<\"+ tag + tag_attrs + \">\" + content.join( \"\" ) + \"</\" + tag + \">\";\n  }\n}\n\nfunction convert_tree_to_html( tree, references, options ) {\n  var i;\n  options = options || {};\n\n  // shallow clone\n  var jsonml = tree.slice( 0 );\n\n  if ( typeof options.preprocessTreeNode === \"function\" ) {\n      jsonml = options.preprocessTreeNode(jsonml, references);\n  }\n\n  // Clone attributes if they exist\n  var attrs = extract_attr( jsonml );\n  if ( attrs ) {\n    jsonml[ 1 ] = {};\n    for ( i in attrs ) {\n      jsonml[ 1 ][ i ] = attrs[ i ];\n    }\n    attrs = jsonml[ 1 ];\n  }\n\n  // basic case\n  if ( typeof jsonml === \"string\" ) {\n    return jsonml;\n  }\n\n  // convert this node\n  switch ( jsonml[ 0 ] ) {\n    case \"header\":\n      jsonml[ 0 ] = \"h\" + jsonml[ 1 ].level;\n      delete jsonml[ 1 ].level;\n      break;\n    case \"bulletlist\":\n      jsonml[ 0 ] = \"ul\";\n      break;\n    case \"numberlist\":\n      jsonml[ 0 ] = \"ol\";\n      break;\n    case \"listitem\":\n      jsonml[ 0 ] = \"li\";\n      break;\n    case \"para\":\n      jsonml[ 0 ] = \"p\";\n      break;\n    case \"markdown\":\n      jsonml[ 0 ] = \"html\";\n      if ( attrs ) delete attrs.references;\n      break;\n    case \"code_block\":\n      jsonml[ 0 ] = \"pre\";\n      i = attrs ? 2 : 1;\n      var code = [ \"code\" ];\n      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );\n      jsonml[ i ] = code;\n      break;\n    case \"inlinecode\":\n      jsonml[ 0 ] = \"code\";\n      break;\n    case \"img\":\n      jsonml[ 1 ].src = jsonml[ 1 ].href;\n      delete jsonml[ 1 ].href;\n      break;\n    case \"linebreak\":\n      jsonml[ 0 ] = \"br\";\n    break;\n    case \"link\":\n      jsonml[ 0 ] = \"a\";\n      break;\n    case \"link_ref\":\n      jsonml[ 0 ] = \"a\";\n\n      // grab this ref and clean up the attribute node\n      var ref = references[ attrs.ref ];\n\n      // if the reference exists, make the link\n      if ( ref ) {\n        delete attrs.ref;\n\n        // add in the href and title, if present\n        attrs.href = ref.href;\n        if ( ref.title ) {\n          attrs.title = ref.title;\n        }\n\n        // get rid of the unneeded original text\n        delete attrs.original;\n      }\n      // the reference doesn't exist, so revert to plain text\n      else {\n        return attrs.original;\n      }\n      break;\n    case \"img_ref\":\n      jsonml[ 0 ] = \"img\";\n\n      // grab this ref and clean up the attribute node\n      var ref = references[ attrs.ref ];\n\n      // if the reference exists, make the link\n      if ( ref ) {\n        delete attrs.ref;\n\n        // add in the href and title, if present\n        attrs.src = ref.href;\n        if ( ref.title ) {\n          attrs.title = ref.title;\n        }\n\n        // get rid of the unneeded original text\n        delete attrs.original;\n      }\n      // the reference doesn't exist, so revert to plain text\n      else {\n        return attrs.original;\n      }\n      break;\n  }\n\n  // convert all the children\n  i = 1;\n\n  // deal with the attribute node, if it exists\n  if ( attrs ) {\n    // if there are keys, skip over it\n    for ( var key in jsonml[ 1 ] ) {\n        i = 2;\n        break;\n    }\n    // if there aren't, remove it\n    if ( i === 1 ) {\n      jsonml.splice( i, 1 );\n    }\n  }\n\n  for ( ; i < jsonml.length; ++i ) {\n    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );\n  }\n\n  return jsonml;\n}\n\n\n// merges adjacent text nodes into a single node\nfunction merge_text_nodes( jsonml ) {\n  // skip the tag name and attribute hash\n  var i = extract_attr( jsonml ) ? 2 : 1;\n\n  while ( i < jsonml.length ) {\n    // if it's a string check the next item too\n    if ( typeof jsonml[ i ] === \"string\" ) {\n      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === \"string\" ) {\n        // merge the second string into the first and remove it\n        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];\n      }\n      else {\n        ++i;\n      }\n    }\n    // if it's not a string recurse\n    else {\n      merge_text_nodes( jsonml[ i ] );\n      ++i;\n    }\n  }\n}\n\n} )( (function() {\n  if ( false ) {}\n  else {\n    return exports;\n  }\n} )() );\n\n\n//# sourceURL=webpack:///./node_modules/markdown/lib/markdown.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/util/node_modules/inherits/inherits_browser.js?");

/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isBuffer(arg) {\n  return arg && typeof arg === 'object'\n    && typeof arg.copy === 'function'\n    && typeof arg.fill === 'function'\n    && typeof arg.readUInt8 === 'function';\n}\n\n//# sourceURL=webpack:///./node_modules/util/support/isBufferBrowser.js?");

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||\n  function getOwnPropertyDescriptors(obj) {\n    var keys = Object.keys(obj);\n    var descriptors = {};\n    for (var i = 0; i < keys.length; i++) {\n      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);\n    }\n    return descriptors;\n  };\n\nvar formatRegExp = /%[sdj%]/g;\nexports.format = function(f) {\n  if (!isString(f)) {\n    var objects = [];\n    for (var i = 0; i < arguments.length; i++) {\n      objects.push(inspect(arguments[i]));\n    }\n    return objects.join(' ');\n  }\n\n  var i = 1;\n  var args = arguments;\n  var len = args.length;\n  var str = String(f).replace(formatRegExp, function(x) {\n    if (x === '%%') return '%';\n    if (i >= len) return x;\n    switch (x) {\n      case '%s': return String(args[i++]);\n      case '%d': return Number(args[i++]);\n      case '%j':\n        try {\n          return JSON.stringify(args[i++]);\n        } catch (_) {\n          return '[Circular]';\n        }\n      default:\n        return x;\n    }\n  });\n  for (var x = args[i]; i < len; x = args[++i]) {\n    if (isNull(x) || !isObject(x)) {\n      str += ' ' + x;\n    } else {\n      str += ' ' + inspect(x);\n    }\n  }\n  return str;\n};\n\n\n// Mark that a method should not be used.\n// Returns a modified function which warns once by default.\n// If --no-deprecation is set, then it is a no-op.\nexports.deprecate = function(fn, msg) {\n  if (typeof process !== 'undefined' && process.noDeprecation === true) {\n    return fn;\n  }\n\n  // Allow for deprecating things in the process of starting up.\n  if (typeof process === 'undefined') {\n    return function() {\n      return exports.deprecate(fn, msg).apply(this, arguments);\n    };\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (process.throwDeprecation) {\n        throw new Error(msg);\n      } else if (process.traceDeprecation) {\n        console.trace(msg);\n      } else {\n        console.error(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n};\n\n\nvar debugs = {};\nvar debugEnviron;\nexports.debuglog = function(set) {\n  if (isUndefined(debugEnviron))\n    debugEnviron = process.env.NODE_DEBUG || '';\n  set = set.toUpperCase();\n  if (!debugs[set]) {\n    if (new RegExp('\\\\b' + set + '\\\\b', 'i').test(debugEnviron)) {\n      var pid = process.pid;\n      debugs[set] = function() {\n        var msg = exports.format.apply(exports, arguments);\n        console.error('%s %d: %s', set, pid, msg);\n      };\n    } else {\n      debugs[set] = function() {};\n    }\n  }\n  return debugs[set];\n};\n\n\n/**\n * Echos the value of a value. Trys to print the value out\n * in the best way possible given the different types.\n *\n * @param {Object} obj The object to print out.\n * @param {Object} opts Optional options object that alters the output.\n */\n/* legacy: obj, showHidden, depth, colors*/\nfunction inspect(obj, opts) {\n  // default options\n  var ctx = {\n    seen: [],\n    stylize: stylizeNoColor\n  };\n  // legacy...\n  if (arguments.length >= 3) ctx.depth = arguments[2];\n  if (arguments.length >= 4) ctx.colors = arguments[3];\n  if (isBoolean(opts)) {\n    // legacy...\n    ctx.showHidden = opts;\n  } else if (opts) {\n    // got an \"options\" object\n    exports._extend(ctx, opts);\n  }\n  // set default options\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\n  if (isUndefined(ctx.colors)) ctx.colors = false;\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\n  return formatValue(ctx, obj, ctx.depth);\n}\nexports.inspect = inspect;\n\n\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\ninspect.colors = {\n  'bold' : [1, 22],\n  'italic' : [3, 23],\n  'underline' : [4, 24],\n  'inverse' : [7, 27],\n  'white' : [37, 39],\n  'grey' : [90, 39],\n  'black' : [30, 39],\n  'blue' : [34, 39],\n  'cyan' : [36, 39],\n  'green' : [32, 39],\n  'magenta' : [35, 39],\n  'red' : [31, 39],\n  'yellow' : [33, 39]\n};\n\n// Don't use 'blue' not visible on cmd.exe\ninspect.styles = {\n  'special': 'cyan',\n  'number': 'yellow',\n  'boolean': 'yellow',\n  'undefined': 'grey',\n  'null': 'bold',\n  'string': 'green',\n  'date': 'magenta',\n  // \"name\": intentionally not styling\n  'regexp': 'red'\n};\n\n\nfunction stylizeWithColor(str, styleType) {\n  var style = inspect.styles[styleType];\n\n  if (style) {\n    return '\\u001b[' + inspect.colors[style][0] + 'm' + str +\n           '\\u001b[' + inspect.colors[style][1] + 'm';\n  } else {\n    return str;\n  }\n}\n\n\nfunction stylizeNoColor(str, styleType) {\n  return str;\n}\n\n\nfunction arrayToHash(array) {\n  var hash = {};\n\n  array.forEach(function(val, idx) {\n    hash[val] = true;\n  });\n\n  return hash;\n}\n\n\nfunction formatValue(ctx, value, recurseTimes) {\n  // Provide a hook for user-specified inspect functions.\n  // Check that value is an object with an inspect function on it\n  if (ctx.customInspect &&\n      value &&\n      isFunction(value.inspect) &&\n      // Filter out the util module, it's inspect function is special\n      value.inspect !== exports.inspect &&\n      // Also filter out any prototype objects using the circular check.\n      !(value.constructor && value.constructor.prototype === value)) {\n    var ret = value.inspect(recurseTimes, ctx);\n    if (!isString(ret)) {\n      ret = formatValue(ctx, ret, recurseTimes);\n    }\n    return ret;\n  }\n\n  // Primitive types cannot have properties\n  var primitive = formatPrimitive(ctx, value);\n  if (primitive) {\n    return primitive;\n  }\n\n  // Look up the keys of the object.\n  var keys = Object.keys(value);\n  var visibleKeys = arrayToHash(keys);\n\n  if (ctx.showHidden) {\n    keys = Object.getOwnPropertyNames(value);\n  }\n\n  // IE doesn't make error fields non-enumerable\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\n  if (isError(value)\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\n    return formatError(value);\n  }\n\n  // Some type of object without properties can be shortcutted.\n  if (keys.length === 0) {\n    if (isFunction(value)) {\n      var name = value.name ? ': ' + value.name : '';\n      return ctx.stylize('[Function' + name + ']', 'special');\n    }\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    }\n    if (isDate(value)) {\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\n    }\n    if (isError(value)) {\n      return formatError(value);\n    }\n  }\n\n  var base = '', array = false, braces = ['{', '}'];\n\n  // Make Array say that they are Array\n  if (isArray(value)) {\n    array = true;\n    braces = ['[', ']'];\n  }\n\n  // Make functions say that they are functions\n  if (isFunction(value)) {\n    var n = value.name ? ': ' + value.name : '';\n    base = ' [Function' + n + ']';\n  }\n\n  // Make RegExps say that they are RegExps\n  if (isRegExp(value)) {\n    base = ' ' + RegExp.prototype.toString.call(value);\n  }\n\n  // Make dates with properties first say the date\n  if (isDate(value)) {\n    base = ' ' + Date.prototype.toUTCString.call(value);\n  }\n\n  // Make error with message first say the error\n  if (isError(value)) {\n    base = ' ' + formatError(value);\n  }\n\n  if (keys.length === 0 && (!array || value.length == 0)) {\n    return braces[0] + base + braces[1];\n  }\n\n  if (recurseTimes < 0) {\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    } else {\n      return ctx.stylize('[Object]', 'special');\n    }\n  }\n\n  ctx.seen.push(value);\n\n  var output;\n  if (array) {\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\n  } else {\n    output = keys.map(function(key) {\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\n    });\n  }\n\n  ctx.seen.pop();\n\n  return reduceToSingleString(output, base, braces);\n}\n\n\nfunction formatPrimitive(ctx, value) {\n  if (isUndefined(value))\n    return ctx.stylize('undefined', 'undefined');\n  if (isString(value)) {\n    var simple = '\\'' + JSON.stringify(value).replace(/^\"|\"$/g, '')\n                                             .replace(/'/g, \"\\\\'\")\n                                             .replace(/\\\\\"/g, '\"') + '\\'';\n    return ctx.stylize(simple, 'string');\n  }\n  if (isNumber(value))\n    return ctx.stylize('' + value, 'number');\n  if (isBoolean(value))\n    return ctx.stylize('' + value, 'boolean');\n  // For some reason typeof null is \"object\", so special case here.\n  if (isNull(value))\n    return ctx.stylize('null', 'null');\n}\n\n\nfunction formatError(value) {\n  return '[' + Error.prototype.toString.call(value) + ']';\n}\n\n\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\n  var output = [];\n  for (var i = 0, l = value.length; i < l; ++i) {\n    if (hasOwnProperty(value, String(i))) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          String(i), true));\n    } else {\n      output.push('');\n    }\n  }\n  keys.forEach(function(key) {\n    if (!key.match(/^\\d+$/)) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          key, true));\n    }\n  });\n  return output;\n}\n\n\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\n  var name, str, desc;\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\n  if (desc.get) {\n    if (desc.set) {\n      str = ctx.stylize('[Getter/Setter]', 'special');\n    } else {\n      str = ctx.stylize('[Getter]', 'special');\n    }\n  } else {\n    if (desc.set) {\n      str = ctx.stylize('[Setter]', 'special');\n    }\n  }\n  if (!hasOwnProperty(visibleKeys, key)) {\n    name = '[' + key + ']';\n  }\n  if (!str) {\n    if (ctx.seen.indexOf(desc.value) < 0) {\n      if (isNull(recurseTimes)) {\n        str = formatValue(ctx, desc.value, null);\n      } else {\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\n      }\n      if (str.indexOf('\\n') > -1) {\n        if (array) {\n          str = str.split('\\n').map(function(line) {\n            return '  ' + line;\n          }).join('\\n').substr(2);\n        } else {\n          str = '\\n' + str.split('\\n').map(function(line) {\n            return '   ' + line;\n          }).join('\\n');\n        }\n      }\n    } else {\n      str = ctx.stylize('[Circular]', 'special');\n    }\n  }\n  if (isUndefined(name)) {\n    if (array && key.match(/^\\d+$/)) {\n      return str;\n    }\n    name = JSON.stringify('' + key);\n    if (name.match(/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)) {\n      name = name.substr(1, name.length - 2);\n      name = ctx.stylize(name, 'name');\n    } else {\n      name = name.replace(/'/g, \"\\\\'\")\n                 .replace(/\\\\\"/g, '\"')\n                 .replace(/(^\"|\"$)/g, \"'\");\n      name = ctx.stylize(name, 'string');\n    }\n  }\n\n  return name + ': ' + str;\n}\n\n\nfunction reduceToSingleString(output, base, braces) {\n  var numLinesEst = 0;\n  var length = output.reduce(function(prev, cur) {\n    numLinesEst++;\n    if (cur.indexOf('\\n') >= 0) numLinesEst++;\n    return prev + cur.replace(/\\u001b\\[\\d\\d?m/g, '').length + 1;\n  }, 0);\n\n  if (length > 60) {\n    return braces[0] +\n           (base === '' ? '' : base + '\\n ') +\n           ' ' +\n           output.join(',\\n  ') +\n           ' ' +\n           braces[1];\n  }\n\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\n}\n\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ \"./node_modules/util/support/isBufferBrowser.js\");\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n\nfunction pad(n) {\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\n}\n\n\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\n              'Oct', 'Nov', 'Dec'];\n\n// 26 Feb 16:19:34\nfunction timestamp() {\n  var d = new Date();\n  var time = [pad(d.getHours()),\n              pad(d.getMinutes()),\n              pad(d.getSeconds())].join(':');\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\n}\n\n\n// log is just a thin wrapper to console.log that prepends a timestamp\nexports.log = function() {\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\n};\n\n\n/**\n * Inherit the prototype methods from one constructor into another.\n *\n * The Function.prototype.inherits from lang.js rewritten as a standalone\n * function (not on Function.prototype). NOTE: If this file is to be loaded\n * during bootstrapping this function needs to be rewritten using some native\n * functions as prototype setup using normal JavaScript does not work as\n * expected during bootstrapping (see mirror.js in r114903).\n *\n * @param {function} ctor Constructor function which needs to inherit the\n *     prototype.\n * @param {function} superCtor Constructor function to inherit prototype from.\n */\nexports.inherits = __webpack_require__(/*! inherits */ \"./node_modules/util/node_modules/inherits/inherits_browser.js\");\n\nexports._extend = function(origin, add) {\n  // Don't do anything if add isn't an object\n  if (!add || !isObject(add)) return origin;\n\n  var keys = Object.keys(add);\n  var i = keys.length;\n  while (i--) {\n    origin[keys[i]] = add[keys[i]];\n  }\n  return origin;\n};\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nvar kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;\n\nexports.promisify = function promisify(original) {\n  if (typeof original !== 'function')\n    throw new TypeError('The \"original\" argument must be of type Function');\n\n  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {\n    var fn = original[kCustomPromisifiedSymbol];\n    if (typeof fn !== 'function') {\n      throw new TypeError('The \"util.promisify.custom\" argument must be of type Function');\n    }\n    Object.defineProperty(fn, kCustomPromisifiedSymbol, {\n      value: fn, enumerable: false, writable: false, configurable: true\n    });\n    return fn;\n  }\n\n  function fn() {\n    var promiseResolve, promiseReject;\n    var promise = new Promise(function (resolve, reject) {\n      promiseResolve = resolve;\n      promiseReject = reject;\n    });\n\n    var args = [];\n    for (var i = 0; i < arguments.length; i++) {\n      args.push(arguments[i]);\n    }\n    args.push(function (err, value) {\n      if (err) {\n        promiseReject(err);\n      } else {\n        promiseResolve(value);\n      }\n    });\n\n    try {\n      original.apply(this, args);\n    } catch (err) {\n      promiseReject(err);\n    }\n\n    return promise;\n  }\n\n  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));\n\n  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {\n    value: fn, enumerable: false, writable: false, configurable: true\n  });\n  return Object.defineProperties(\n    fn,\n    getOwnPropertyDescriptors(original)\n  );\n}\n\nexports.promisify.custom = kCustomPromisifiedSymbol\n\nfunction callbackifyOnRejected(reason, cb) {\n  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).\n  // Because `null` is a special error value in callbacks which means \"no error\n  // occurred\", we error-wrap so the callback consumer can distinguish between\n  // \"the promise rejected with null\" or \"the promise fulfilled with undefined\".\n  if (!reason) {\n    var newReason = new Error('Promise was rejected with a falsy value');\n    newReason.reason = reason;\n    reason = newReason;\n  }\n  return cb(reason);\n}\n\nfunction callbackify(original) {\n  if (typeof original !== 'function') {\n    throw new TypeError('The \"original\" argument must be of type Function');\n  }\n\n  // We DO NOT return the promise as it gives the user a false sense that\n  // the promise is actually somehow related to the callback's execution\n  // and that the callback throwing will reject the promise.\n  function callbackified() {\n    var args = [];\n    for (var i = 0; i < arguments.length; i++) {\n      args.push(arguments[i]);\n    }\n\n    var maybeCb = args.pop();\n    if (typeof maybeCb !== 'function') {\n      throw new TypeError('The last argument must be of type Function');\n    }\n    var self = this;\n    var cb = function() {\n      return maybeCb.apply(self, arguments);\n    };\n    // In true node style we process the callback on `nextTick` with all the\n    // implications (stack, `uncaughtException`, `async_hooks`)\n    original.apply(this, args)\n      .then(function(ret) { process.nextTick(cb, null, ret) },\n            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });\n  }\n\n  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));\n  Object.defineProperties(callbackified,\n                          getOwnPropertyDescriptors(original));\n  return callbackified;\n}\nexports.callbackify = callbackify;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/util/util.js?");

/***/ }),

/***/ "./public/bg-temp.png":
/*!****************************!*\
  !*** ./public/bg-temp.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f0828fd3b4aae75d991f9ba09c23a7a4.png\";\n\n//# sourceURL=webpack:///./public/bg-temp.png?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _splitview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./splitview */ \"./src/splitview/index.ts\");\n/* harmony import */ var _videobg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videobg */ \"./src/videobg/index.ts\");\n/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content */ \"./src/content/index.ts\");\n\n\n\n\n\n\nconst app = document.createElement('main');\n\napp.appendChild(Object(_videobg__WEBPACK_IMPORTED_MODULE_2__[\"default\"])())\napp.appendChild(Object(_splitview__WEBPACK_IMPORTED_MODULE_1__[\"default\"])());\napp.appendChild(Object(_content__WEBPACK_IMPORTED_MODULE_3__[\"default\"])());\n\ndocument.body.appendChild(app);\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/content/content.html":
/*!**********************************!*\
  !*** ./src/content/content.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\\n<section class=\\\"page-subject\\\">\\n    {{page-subject}}\\n</section>\\n<section class=\\\"page-options\\\">\\n    {{page-options}} {{about}}\\n</section>\";\n\n//# sourceURL=webpack:///./src/content/content.html?");

/***/ }),

/***/ "./src/content/content.scss":
/*!**********************************!*\
  !*** ./src/content/content.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./content.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/content/content.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./content.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/content/content.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./content.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/content/content.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/content/content.scss?");

/***/ }),

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! markdown */ \"./node_modules/markdown/lib/index.js\");\n/* harmony import */ var markdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(markdown__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _content_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content.scss */ \"./src/content/content.scss\");\n/* harmony import */ var _content_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_content_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _content_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content.html */ \"./src/content/content.html\");\n/* harmony import */ var _content_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_content_html__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _sub_content_page_subject_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sub-content/page-subject.html */ \"./src/content/sub-content/page-subject.html\");\n/* harmony import */ var _sub_content_page_subject_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sub_content_page_subject_html__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _sub_content_page_options_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sub-content/page-options.html */ \"./src/content/sub-content/page-options.html\");\n/* harmony import */ var _sub_content_page_options_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sub_content_page_options_html__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _sub_content_about_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sub-content/about.md */ \"./src/content/sub-content/about.md\");\n/* harmony import */ var _sub_content_about_md__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sub_content_about_md__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst md = markdown__WEBPACK_IMPORTED_MODULE_0__[\"markdown\"].parse(_sub_content_about_md__WEBPACK_IMPORTED_MODULE_5___default.a)[1][1];\nconsole.log('md: ', md);\n\nconst contentPage = _content_html__WEBPACK_IMPORTED_MODULE_2___default.a\n\t.replace('{{page-subject}}', _sub_content_page_subject_html__WEBPACK_IMPORTED_MODULE_3___default.a)\n\t.replace('{{page-options}}', _sub_content_page_options_html__WEBPACK_IMPORTED_MODULE_4___default.a)\n\t.replace('{{about}}', md);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\tconst container = document.createElement('div');\n\tcontainer.classList.add('content-container');\n\tcontainer.innerHTML = contentPage;\n\treturn container;\n});\n\n//# sourceURL=webpack:///./src/content/index.ts?");

/***/ }),

/***/ "./src/content/sub-content/about.md":
/*!******************************************!*\
  !*** ./src/content/sub-content/about.md ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<h1 id=\\\"about\\\">About</h1>\\n<p>Etiam habebis sem dicantur magna mollis euismod. Sed haec quis possit intrepidus aestimare tellus. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Quam temere in vitiis, legem sancimus haerentia.</p>\\n\";\n\n//# sourceURL=webpack:///./src/content/sub-content/about.md?");

/***/ }),

/***/ "./src/content/sub-content/page-options.html":
/*!***************************************************!*\
  !*** ./src/content/sub-content/page-options.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\\n<div class=\\\"options\\\">\\n    <h1>Links</h1>\\n    <!-- <hr> -->\\n    <ul>\\n        <li><a href=\\\"#\\\" target=\\\"_blank\\\">Resume</a></li>\\n        <li><a href=\\\"#\\\" target=\\\"_blank\\\">Blog</a></li>\\n        <li><a class=\\\"disabled\\\" href=\\\"#\\\" target=\\\"_blank\\\">Porfolio</a></li>\\n        <li><a class=\\\"disabled\\\" href=\\\"#\\\" target=\\\"_blank\\\">Demos</a></li>\\n    </ul>\\n</div>\";\n\n//# sourceURL=webpack:///./src/content/sub-content/page-options.html?");

/***/ }),

/***/ "./src/content/sub-content/page-subject.html":
/*!***************************************************!*\
  !*** ./src/content/sub-content/page-subject.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\\n<div class=\\\"subject\\\">\\n    <h1 class=\\\"name\\\">Cliff <span>Crerar</span></h1>\\n    <!-- <h2>iCode | iBuild | iSolve</h2> -->\\n    <div class=\\\"position\\\">\\n        <image class=\\\"st-logo\\\" src=\\\"https://gateway.c1i44.now.sh/logohalf-size.png\\\" alt=\\\"surtech-logo\\\" />\\n        <div>\\n            <h2>Solutions Architect</h2>\\n            <h3>\\n                <a href=\\\"https://www.surtech.co.za\\\">Surtech Solutions</a>\\n            </h3>\\n        </div>\\n    </div>\\n    <hr>\\n    <h4>iCode | iBuild | iSolve</h4>\\n    <div class=\\\"contact\\\">\\n        <!-- <button class=\\\"btn btn-contact\\\">Contact me</button> -->\\n        <form style=\\\"display: none\\\">\\n            <div class=\\\"input-group\\\">\\n                <label for=\\\"name\\\">Name:</label>\\n                <input name=\\\"name\\\" placeholder=\\\"type name here\\\" type=\\\"text\\\">\\n            </div>\\n            <div class=\\\"input-group\\\">\\n                <label for=\\\"email\\\">Name:</label>\\n                <input name=\\\"email\\\" placeholder=\\\"type email here\\\" type=\\\"email\\\">\\n            </div>\\n            <div class=\\\"input-group\\\">\\n                <label for=\\\"message\\\">Name:</label>\\n                <textarea name=\\\"message\\\" placeholder=\\\"type message here\\\" type=\\\"text\\\"></textarea>\\n            </div>\\n        </form>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./src/content/sub-content/page-subject.html?");

/***/ }),

/***/ "./src/splitview/index.ts":
/*!********************************!*\
  !*** ./src/splitview/index.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _split_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./split.scss */ \"./src/splitview/split.scss\");\n/* harmony import */ var _split_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_split_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _split_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./split.html */ \"./src/splitview/split.html\");\n/* harmony import */ var _split_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_split_html__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\tconst el = document.createElement('div');\n\tel.classList.add('skewdiv');\n\tel.innerHTML = _split_html__WEBPACK_IMPORTED_MODULE_1___default.a;\n\treturn el;\n});\n\n//# sourceURL=webpack:///./src/splitview/index.ts?");

/***/ }),

/***/ "./src/splitview/split.html":
/*!**********************************!*\
  !*** ./src/splitview/split.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\";\n\n//# sourceURL=webpack:///./src/splitview/split.html?");

/***/ }),

/***/ "./src/splitview/split.scss":
/*!**********************************!*\
  !*** ./src/splitview/split.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./split.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/splitview/split.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./split.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/splitview/split.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./split.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/splitview/split.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/splitview/split.scss?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/style.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ }),

/***/ "./src/videobg/index.ts":
/*!******************************!*\
  !*** ./src/videobg/index.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _videobg_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./videobg.scss */ \"./src/videobg/videobg.scss\");\n/* harmony import */ var _videobg_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_videobg_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _videobg_dev_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videobg_dev.html */ \"./src/videobg/videobg_dev.html\");\n/* harmony import */ var _videobg_dev_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videobg_dev_html__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _videobg_prod_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videobg_prod.html */ \"./src/videobg/videobg_prod.html\");\n/* harmony import */ var _videobg_prod_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_videobg_prod_html__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconsole.log('process.env: ', process.env);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n\tconst el = document.createElement('div');\n\tel.classList.add('video-background');\n\tel.innerHTML = _videobg_prod_html__WEBPACK_IMPORTED_MODULE_2___default.a;\n\treturn el;\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/videobg/index.ts?");

/***/ }),

/***/ "./src/videobg/videobg.scss":
/*!**********************************!*\
  !*** ./src/videobg/videobg.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./videobg.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/videobg/videobg.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./videobg.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/videobg/videobg.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./videobg.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/videobg/videobg.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/videobg/videobg.scss?");

/***/ }),

/***/ "./src/videobg/videobg_dev.html":
/*!**************************************!*\
  !*** ./src/videobg/videobg_dev.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\\n<!-- <iframe class=\\\"video-iframe\\\" src=\\\"https://www.youtube-nocookie.com/embed/pely_DpZfOk?controls=0&loop=1&autoplay=1&showinfo=0\\\" frameborder=\\\"0\\\" allow=\\\"accelerometer;loop;controls;info; autoplay; encrypted-media; gyroscope; picture-in-picture\\\" allowfullscreen></iframe> -->\\n<!-- <video class=\\\"video-iframe\\\" muted autoplay loop>\\n  <source src=\\\"https://s3-eu-west-1.amazonaws.com/cdn-aws-infinityarc.tk/videoassets/typing.mp4\\\" type=\\\"video/mp4\\\">\\n  Your browser does not support the video tag.\\n</video> -->\\n<div class=\\\"makeshift-bg\\\"></div>\";\n\n//# sourceURL=webpack:///./src/videobg/videobg_dev.html?");

/***/ }),

/***/ "./src/videobg/videobg_prod.html":
/*!***************************************!*\
  !*** ./src/videobg/videobg_prod.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!DOCTYPE html>\\n<!-- <iframe class=\\\"video-iframe\\\" src=\\\"https://www.youtube-nocookie.com/embed/pely_DpZfOk?controls=0&loop=1&autoplay=1&showinfo=0\\\" frameborder=\\\"0\\\" allow=\\\"accelerometer;loop;controls;info; autoplay; encrypted-media; gyroscope; picture-in-picture\\\" allowfullscreen></iframe> -->\\n<video class=\\\"video-iframe\\\" muted autoplay loop>\\n  <source src=\\\"https://s3-eu-west-1.amazonaws.com/cdn-aws-infinityarc.tk/videoassets/typing.mp4\\\" type=\\\"video/mp4\\\">\\n  Your browser does not support the video tag.\\n</video>\\n<!-- <div class=\\\"makeshift-bg\\\"></div> -->\";\n\n//# sourceURL=webpack:///./src/videobg/videobg_prod.html?");

/***/ })

/******/ });