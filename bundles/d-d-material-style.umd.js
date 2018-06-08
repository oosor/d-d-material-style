(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global['d-d-material-style'] = {}),global.core));
}(this, (function (exports,core) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// CommonJS / Node have global context exposed as "global" variable.
	// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
	// the global "global" var for now.
	var __window = typeof window !== 'undefined' && window;
	var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
	    self instanceof WorkerGlobalScope && self;
	var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
	var _root = __window || __global || __self;
	var root_1 = _root;
	// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
	// This is needed when used with angular/tsickle which inserts a goog.module statement.
	// Wrap in IIFE
	(function () {
	    if (!_root) {
	        throw new Error('RxJS could not find any global context (window, self, global)');
	    }
	})();


	var root = {
		root: root_1
	};

	function isFunction(x) {
	    return typeof x === 'function';
	}
	var isFunction_2 = isFunction;


	var isFunction_1 = {
		isFunction: isFunction_2
	};

	var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });


	var isArray = {
		isArray: isArray_1
	};

	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	var isObject_2 = isObject;


	var isObject_1 = {
		isObject: isObject_2
	};

	// typeof any so that it we don't have to cast when comparing a result to the error object
	var errorObject_1 = { e: {} };


	var errorObject = {
		errorObject: errorObject_1
	};

	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject.errorObject.e = e;
	        return errorObject.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	var tryCatch_2 = tryCatch;


	var tryCatch_1 = {
		tryCatch: tryCatch_2
	};

	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	var UnsubscriptionError_2 = UnsubscriptionError;


	var UnsubscriptionError_1 = {
		UnsubscriptionError: UnsubscriptionError_2
	};

	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        this._parent = null;
	        this._parents = null;
	        this._subscriptions = null;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this.closed = true;
	        this._parent = null;
	        this._parents = null;
	        // null out _subscriptions first so any child subscriptions that attempt
	        // to remove themselves from this subscription will noop
	        this._subscriptions = null;
	        var index = -1;
	        var len = _parents ? _parents.length : 0;
	        // if this._parent is null, then so is this._parents, and we
	        // don't have to remove ourselves from any parent subscriptions.
	        while (_parent) {
	            _parent.remove(this);
	            // if this._parents is null or index >= len,
	            // then _parent is set to null, and the loop exits
	            _parent = ++index < len && _parents[index] || null;
	        }
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject.errorObject) {
	                hasErrors = true;
	                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
	                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
	            }
	        }
	        if (isArray.isArray(_subscriptions)) {
	            index = -1;
	            len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var subscription = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                subscription = new Subscription(teardown);
	            case 'object':
	                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
	                    return subscription;
	                }
	                else if (this.closed) {
	                    subscription.unsubscribe();
	                    return subscription;
	                }
	                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
	                    var tmp = subscription;
	                    subscription = new Subscription();
	                    subscription._subscriptions = [tmp];
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        var subscriptions = this._subscriptions || (this._subscriptions = []);
	        subscriptions.push(subscription);
	        subscription._addParent(this);
	        return subscription;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.prototype._addParent = function (parent) {
	        var _a = this, _parent = _a._parent, _parents = _a._parents;
	        if (!_parent || _parent === parent) {
	            // If we don't have a parent, or the new parent is the same as the
	            // current parent, then set this._parent to the new parent.
	            this._parent = parent;
	        }
	        else if (!_parents) {
	            // If there's already one parent, but not multiple, allocate an Array to
	            // store the rest of the parent Subscriptions.
	            this._parents = [parent];
	        }
	        else if (_parents.indexOf(parent) === -1) {
	            // Only add the new parent to the _parents list if it's not already there.
	            _parents.push(parent);
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	var Subscription_2 = Subscription;
	function flattenUnsubscriptionErrors(errors) {
	    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
	}


	var Subscription_1 = {
		Subscription: Subscription_2
	};

	var empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};


	var Observer = {
		empty: empty
	};

	var rxSubscriber = createCommonjsModule(function (module, exports) {

	var Symbol = root.root.Symbol;
	exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	/**
	 * @deprecated use rxSubscriber instead
	 */
	exports.$$rxSubscriber = exports.rxSubscriber;

	});
	var rxSubscriber_1 = rxSubscriber.rxSubscriber;
	var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;

	var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};




	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends$1(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    // HACK(benlesh): To resolve an issue where Node users may have multiple
	                    // copies of rxjs in their node_modules directory.
	                    if (isTrustedSubscriber(destinationOrNext)) {
	                        var trustedSubscriber = destinationOrNext[rxSubscriber.rxSubscriber]();
	                        this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
	                        this.destination = trustedSubscriber;
	                        trustedSubscriber.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    /** @deprecated internal use only */ Subscriber.prototype._unsubscribeAndRecycle = function () {
	        var _a = this, _parent = _a._parent, _parents = _a._parents;
	        this._parent = null;
	        this._parents = null;
	        this.unsubscribe();
	        this.closed = false;
	        this.isStopped = false;
	        this._parent = _parent;
	        this._parents = _parents;
	        return this;
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	var Subscriber_2 = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends$1(SafeSubscriber, _super);
	    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parentSubscriber = _parentSubscriber;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (observerOrNext !== Observer.empty) {
	                context = Object.create(observerOrNext);
	                if (isFunction_1.isFunction(context.unsubscribe)) {
	                    this.add(context.unsubscribe.bind(context));
	                }
	                context.unsubscribe = this.unsubscribe.bind(this);
	            }
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (!_parentSubscriber.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (this._error) {
	                if (!_parentSubscriber.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parentSubscriber, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parentSubscriber.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parentSubscriber.syncErrorValue = err;
	                _parentSubscriber.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        var _this = this;
	        if (!this.isStopped) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (this._complete) {
	                var wrappedComplete = function () { return _this._complete.call(_this._context); };
	                if (!_parentSubscriber.syncErrorThrowable) {
	                    this.__tryOrUnsub(wrappedComplete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    /** @deprecated internal use only */ SafeSubscriber.prototype._unsubscribe = function () {
	        var _parentSubscriber = this._parentSubscriber;
	        this._context = null;
	        this._parentSubscriber = null;
	        _parentSubscriber.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	function isTrustedSubscriber(obj) {
	    return obj instanceof Subscriber || ('syncErrorThrowable' in obj && obj[rxSubscriber.rxSubscriber]);
	}


	var Subscriber_1 = {
		Subscriber: Subscriber_2
	};

	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
	            return nextOrObserver[rxSubscriber.rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber(Observer.empty);
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	var toSubscriber_2 = toSubscriber;


	var toSubscriber_1 = {
		toSubscriber: toSubscriber_2
	};

	var observable = createCommonjsModule(function (module, exports) {

	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.observable = getSymbolObservable(root.root);
	/**
	 * @deprecated use observable instead
	 */
	exports.$$observable = exports.observable;

	});
	var observable_1 = observable.getSymbolObservable;
	var observable_2 = observable.observable;
	var observable_3 = observable.$$observable;

	/* tslint:disable:no-empty */
	function noop() { }
	var noop_2 = noop;


	var noop_1 = {
		noop: noop_2
	};

	/* tslint:enable:max-line-length */
	function pipe() {
	    var fns = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        fns[_i - 0] = arguments[_i];
	    }
	    return pipeFromArray(fns);
	}
	var pipe_2 = pipe;
	/* @internal */
	function pipeFromArray(fns) {
	    if (!fns) {
	        return noop_1.noop;
	    }
	    if (fns.length === 1) {
	        return fns[0];
	    }
	    return function piped(input) {
	        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
	    };
	}
	var pipeFromArray_1 = pipeFromArray;


	var pipe_1 = {
		pipe: pipe_2,
		pipeFromArray: pipeFromArray_1
	};

	/**
	 * A representation of any set of values over any amount of time. This is the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable$$1 = new Observable();
	        observable$$1.source = this;
	        observable$$1.operator = operator;
	        return observable$$1;
	    };
	    /**
	     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
	     *
	     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
	     *
	     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
	     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
	     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
	     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
	     * thought.
	     *
	     * Apart from starting the execution of an Observable, this method allows you to listen for values
	     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
	     * following ways.
	     *
	     * The first way is creating an object that implements {@link Observer} interface. It should have methods
	     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
	     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
	     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
	     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
	     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
	     * be left uncaught.
	     *
	     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
	     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
	     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
	     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
	     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
	     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
	     *
	     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
	     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
	     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
	     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
	     *
	     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
	     * It is an Observable itself that decides when these functions will be called. For example {@link of}
	     * by default emits all its values synchronously. Always check documentation for how given Observable
	     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
	     *
	     * @example <caption>Subscribe with an Observer</caption>
	     * const sumObserver = {
	     *   sum: 0,
	     *   next(value) {
	     *     console.log('Adding: ' + value);
	     *     this.sum = this.sum + value;
	     *   },
	     *   error() { // We actually could just remove this method,
	     *   },        // since we do not really care about errors right now.
	     *   complete() {
	     *     console.log('Sum equals: ' + this.sum);
	     *   }
	     * };
	     *
	     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
	     * .subscribe(sumObserver);
	     *
	     * // Logs:
	     * // "Adding: 1"
	     * // "Adding: 2"
	     * // "Adding: 3"
	     * // "Sum equals: 6"
	     *
	     *
	     * @example <caption>Subscribe with functions</caption>
	     * let sum = 0;
	     *
	     * Rx.Observable.of(1, 2, 3)
	     * .subscribe(
	     *   function(value) {
	     *     console.log('Adding: ' + value);
	     *     sum = sum + value;
	     *   },
	     *   undefined,
	     *   function() {
	     *     console.log('Sum equals: ' + sum);
	     *   }
	     * );
	     *
	     * // Logs:
	     * // "Adding: 1"
	     * // "Adding: 2"
	     * // "Adding: 3"
	     * // "Sum equals: 6"
	     *
	     *
	     * @example <caption>Cancel a subscription</caption>
	     * const subscription = Rx.Observable.interval(1000).subscribe(
	     *   num => console.log(num),
	     *   undefined,
	     *   () => console.log('completed!') // Will not be called, even
	     * );                                // when cancelling subscription
	     *
	     *
	     * setTimeout(() => {
	     *   subscription.unsubscribe();
	     *   console.log('unsubscribed!');
	     * }, 2500);
	     *
	     * // Logs:
	     * // 0 after 1s
	     * // 1 after 2s
	     * // "unsubscribed!" after 2.5s
	     *
	     *
	     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
	     *  Observable.
	     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled.
	     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     * @method subscribe
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this.source);
	        }
	        else {
	            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    Observable.prototype._trySubscribe = function (sink) {
	        try {
	            return this._subscribe(sink);
	        }
	        catch (err) {
	            sink.syncErrorThrown = true;
	            sink.syncErrorValue = err;
	            sink.error(err);
	        }
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
	                PromiseCtor = root.root.Rx.config.Promise;
	            }
	            else if (root.root.Promise) {
	                PromiseCtor = root.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            // Must be declared in a separate statement to avoid a RefernceError when
	            // accessing subscription below in the closure due to Temporal Dead Zone.
	            var subscription;
	            subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    /** @deprecated internal use only */ Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable.observable] = function () {
	        return this;
	    };
	    /* tslint:enable:max-line-length */
	    /**
	     * Used to stitch together functional operators into a chain.
	     * @method pipe
	     * @return {Observable} the Observable result of all of the operators having
	     * been called in the order they were passed in.
	     *
	     * @example
	     *
	     * import { map, filter, scan } from 'rxjs/operators';
	     *
	     * Rx.Observable.interval(1000)
	     *   .pipe(
	     *     filter(x => x % 2 === 0),
	     *     map(x => x + x),
	     *     scan((acc, x) => acc + x)
	     *   )
	     *   .subscribe(x => console.log(x))
	     */
	    Observable.prototype.pipe = function () {
	        var operations = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            operations[_i - 0] = arguments[_i];
	        }
	        if (operations.length === 0) {
	            return this;
	        }
	        return pipe_1.pipeFromArray(operations)(this);
	    };
	    /* tslint:enable:max-line-length */
	    Observable.prototype.toPromise = function (PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
	                PromiseCtor = root.root.Rx.config.Promise;
	            }
	            else if (root.root.Promise) {
	                PromiseCtor = root.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var value;
	            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
	        });
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	var Observable_2 = Observable;


	var Observable_1 = {
		Observable: Observable_2
	};

	var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends$2(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;


	var ObjectUnsubscribedError_1 = {
		ObjectUnsubscribedError: ObjectUnsubscribedError_2
	};

	var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};

	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends$3(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.closed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription));
	var SubjectSubscription_2 = SubjectSubscription;


	var SubjectSubscription_1 = {
		SubjectSubscription: SubjectSubscription_2
	};

	var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};






	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = (function (_super) {
	    __extends$4(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1.Subscriber));
	/**
	 * @class Subject<T>
	 */
	var Subject = (function (_super) {
	    __extends$4(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.closed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber.rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.closed = true;
	        this.observers = null;
	    };
	    Subject.prototype._trySubscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else {
	            return _super.prototype._trySubscribe.call(this, subscriber);
	        }
	    };
	    /** @deprecated internal use only */ Subject.prototype._subscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	var Subject_2 = Subject;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject = (function (_super) {
	    __extends$4(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    /** @deprecated internal use only */ AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject));

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __metadata(k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	}

	var DDService = /** @class */ (function () {
	    function DDService() {
	        this._collection = [];
	        this.grid = { minX: 9999, maxX: -9999, minY: 9999, maxY: -9999 };
	        this.change = new Subject_2();
	        this.drop = new Subject_2();
	    }
	    DDService.prototype.add = function (el) {
	        var _this = this;
	        this._collection.push(el);
	        this._collection.forEach(function (el) {
	            _this.grid.minX = _this.grid.minX > el.point.x ? el.point.x : _this.grid.minX;
	            _this.grid.maxX = _this.grid.maxX < el.point.x ? el.point.x : _this.grid.maxX;
	            _this.grid.minY = _this.grid.minY > el.point.y ? el.point.y : _this.grid.minY;
	            _this.grid.maxY = _this.grid.maxY < el.point.y ? el.point.y : _this.grid.maxY;
	        });
	    };
	    DDService.prototype.sorting = function () {
	        this._collection.sort(function (a, b) {
	            if (a.point.x < b.point.x)
	                if (a.point.y > b.point.y)
	                    return -1;
	                else
	                    return 1;
	            if (a.point.y < b.point.y)
	                if (a.point.y < b.point.y)
	                    return 1;
	                else
	                    return -1;
	            else
	                return -1;
	        }).reverse();
	    };
	    Object.defineProperty(DDService.prototype, "active", {
	        set: function (point) {
	            this._collection.forEach(function (el) { return el.active = el.point.x === point.x && el.point.y === point.y; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DDService.prototype, "collection", {
	        get: function () {
	            return this._collection;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DDService.prototype, "customCollection", {
	        get: function () {
	            return this._collection.map(function (el) { return el.customEl; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDService.prototype.getCoords = function (elem) {
	        var box = elem.getBoundingClientRect();
	        return {
	            top: Math.round(box.top + pageYOffset),
	            left: Math.round(box.left + pageXOffset),
	        };
	    };
	    DDService = __decorate([
	        core.Injectable(),
	        __metadata("design:paramtypes", [])
	    ], DDService);
	    return DDService;
	}());

	var DDComponent = /** @class */ (function () {
	    function DDComponent() {
	    }
	    DDComponent = __decorate([
	        core.Component({
	            selector: 'd-d-mat-box-style',
	            template: "<ng-content></ng-content>",
	            styles: ["/deep/ d-d-mat-box-style {\n  transition: all 300ms ease-out;\n  transform: translateZ(0);\n  position: absolute;\n  float: left;\n  user-select: none;\n  border-radius: 5px; }\n  /deep/ d-d-mat-box-style.d-d-move {\n    transition: unset;\n    transform: translateZ(6px);\n    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25); }\n  /deep/ d-d-mat-box-style .ripple {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    overflow: hidden;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    border-radius: inherit;\n    pointer-events: none;\n    animation: ripple-shadow 0.4s forwards;\n    -webkit-animation: ripple-shadow 0.4s forwards; }\n    /deep/ d-d-mat-box-style .ripple .rippleWave {\n      backface-visibility: hidden;\n      position: absolute;\n      border-radius: 50%;\n      transform: scale(0.7);\n      -webkit-transform: scale(0.7);\n      background: rgba(0, 0, 0, 0.3);\n      opacity: 0.45;\n      animation: ripple 2s forwards;\n      -webkit-animation: ripple 2s forwards; }\n\n@keyframes ripple-shadow {\n  0% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); }\n  20% {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); }\n  100% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); } }\n\n@-webkit-keyframes ripple-shadow {\n  0% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); }\n  20% {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); }\n  100% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); } }\n\n@keyframes ripple {\n  to {\n    transform: scale(24);\n    opacity: 0; } }\n\n@-webkit-keyframes ripple {\n  to {\n    -webkit-transform: scale(24);\n    opacity: 0; } }\n\n/deep/ .d-d-shadow {\n  background: rgba(0, 0, 0, 0.4);\n  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.4);\n  border-radius: 5px;\n  position: absolute;\n  display: block;\n  transition: opacity 200ms ease-out; }\n"],
	        }),
	        __metadata("design:paramtypes", [])
	    ], DDComponent);
	    return DDComponent;
	}());

	var DDDirective = /** @class */ (function () {
	    function DDDirective(_elementRef, _render, _resolver, _vcr, _dDService) {
	        this._elementRef = _elementRef;
	        this._render = _render;
	        this._resolver = _resolver;
	        this._vcr = _vcr;
	        this._dDService = _dDService;
	        this.dChange = new core.EventEmitter();
	        this.dDrop = new core.EventEmitter();
	        this._margin = { x: 0, y: 0 };
	        this._padding = { x: 0, y: 0 };
	        this.is = false;
	        this.materialStyle = true;
	        this.shadow = false;
	    }
	    DDDirective_1 = DDDirective;
	    Object.defineProperty(DDDirective.prototype, "config", {
	        set: function (config) {
	            var _this = this;
	            if (config) {
	                this.direction = config.direction || null;
	                this.materialStyle = config.matClick !== undefined ? config.matClick : true;
	                this.shadow = config.shadow !== undefined ? config.shadow : false;
	                this.customElem = config.elem || null;
	                this.swipeElement = config.swipe || null;
	                if (this.swipeElement) {
	                    setTimeout(function () { return _this.swipeElement = _this._elementRef.nativeElement.querySelector(_this.swipeElement) || null; });
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDDirective.prototype.ngAfterViewInit = function () {
	        var component = this._render.parentNode(this._elementRef.nativeElement);
	        this.withContainer = DDDirective_1.COMP.indexOf(component.nodeName) !== -1;
	        this.init(component);
	        this._setLimits();
	    };
	    DDDirective.prototype.init = function (component) {
	        var _this = this;
	        this._parent = this.withContainer ? this._render.parentNode(component) : component;
	        this._setPadding();
	        this._setMargin(true);
	        this.point = this._dDService.getCoords(this._elementRef.nativeElement);
	        setTimeout(function () {
	            var factory = _this._resolver.resolveComponentFactory(DDComponent);
	            var componentRef = _this._vcr.createComponent(factory);
	            _this._elem = componentRef.location.nativeElement;
	            _this._setMargin(false);
	            if (!_this.direction || _this.direction !== 'x' && _this.direction !== 'grid') {
	                _this._render.setStyle(_this._elem, 'width', _this._elementRef.nativeElement.offsetWidth + 'px');
	                _this._render.setStyle(_this._elem, 'height', _this._elementRef.nativeElement.offsetHeight + 'px');
	            }
	            _this._render.appendChild(_this._elem, _this._elementRef.nativeElement);
	            _this._render.setStyle(_this._elem, 'top', _this._point.y + 'px');
	            _this._render.setStyle(_this._elem, 'left', _this._point.x + 'px');
	            _this._dDService.add(_this._getIEl());
	        });
	        this._collect = this._dDService.collection;
	    };
	    Object.defineProperty(DDDirective.prototype, "dDservice", {
	        set: function (service) {
	            this._dDService = service;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDDirective.prototype.onDragStart = function () { return false; };
	    DDDirective.prototype.onMouseDown = function (event) {
	        var _this = this;
	        if (this.swipeElement) {
	            var limitSwipeCoords = this._dDService.getCoords(this.swipeElement);
	            var limitSwipe = {
	                top: limitSwipeCoords.top,
	                right: limitSwipeCoords.left + this.swipeElement.offsetWidth,
	                bottom: limitSwipeCoords.top + this.swipeElement.offsetHeight,
	                left: limitSwipeCoords.left,
	            };
	            if (event.pageY >= limitSwipe.top && event.pageY <= limitSwipe.bottom && event.pageX >= limitSwipe.left && event.pageX <= limitSwipe.right) {
	                this.is = true;
	            }
	        }
	        else
	            this.is = true;
	        var coords = this._dDService.getCoords(this._elem);
	        this._shift = { x: event.pageX - coords.left, y: event.pageY - coords.top };
	        this.matClick(event);
	        if (this.is) {
	            var zIndex_1 = this._elem.style.zIndex || 1;
	            this._render.addClass(this._elem, 'd-d-move');
	            this._render.setStyle(this._elem, 'zIndex', 9999);
	            this._dDService.active = this._point;
	            this._collect = this._dDService.collection;
	            this._addShadow();
	            this.coordinate = event;
	            document.onmousemove = function (e) {
	                _this.coordinate = e;
	            };
	            document.onmouseup = function () {
	                document.onmousemove = null;
	                document.onmouseup = null;
	                _this.is = false;
	                _this._removeShadow();
	                _this._drop();
	                _this._render.removeClass(_this._elem, 'd-d-move');
	                _this._render.setStyle(_this._elem, 'zIndex', zIndex_1);
	            };
	        }
	    };
	    DDDirective.prototype._setPadding = function () {
	        this._padding.y = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-top').replace(/\D+/g, "");
	        this._padding.x = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-left').replace(/\D+/g, "");
	    };
	    DDDirective.prototype._setMargin = function (is) {
	        if (is) {
	            this._margin.y = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-top').replace(/\D+/g, "")
	                + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-bottom').replace(/\D+/g, "");
	            this._margin.x = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-left').replace(/\D+/g, "")
	                + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-right').replace(/\D+/g, "");
	        }
	        else {
	            this._render.setStyle(this._elementRef.nativeElement, 'marginTop', '0');
	            this._render.setStyle(this._elementRef.nativeElement, 'marginRight', '0');
	            this._render.setStyle(this._elementRef.nativeElement, 'marginBottom', '0');
	            this._render.setStyle(this._elementRef.nativeElement, 'marginLeft', '0');
	        }
	    };
	    DDDirective.prototype._setLimits = function () {
	        if (this.container) {
	            var containerCoords = this._dDService.getCoords(this.container);
	            this._limits = {
	                top: containerCoords.top,
	                right: this.container.offsetWidth + containerCoords.left - this._elementRef.nativeElement.offsetWidth,
	                bottom: this.container.offsetHeight + containerCoords.top - this._elementRef.nativeElement.offsetHeight,
	                left: containerCoords.left,
	            };
	            this._innerBox = {
	                top: containerCoords.top,
	                right: this.container.offsetWidth + containerCoords.left,
	                bottom: this.container.offsetHeight + containerCoords.top,
	                left: containerCoords.left,
	            };
	        }
	    };
	    Object.defineProperty(DDDirective.prototype, "coordinate", {
	        set: function (e) {
	            var shift = Object.assign({}, this._shift);
	            var tmpPoint = { x: e.pageX, y: e.pageY };
	            if (this._limits && e.pageX - this._shift.x >= this._limits.right) {
	                tmpPoint.x = this._limits.right;
	                this._shift.x = e.pageX - this._limits.right;
	                shift.x = 0;
	            }
	            else if (this._limits && e.pageX - this._shift.x <= this._limits.left) {
	                tmpPoint.x = this._limits.left;
	                this._shift.x = e.pageX - this._limits.left;
	                shift.x = 0;
	            }
	            if (this._limits && e.pageY - this._shift.y >= this._limits.bottom) {
	                tmpPoint.y = this._limits.bottom;
	                this._shift.y = e.pageY - this._limits.bottom;
	                shift.y = 0;
	            }
	            else if (this._limits && e.pageY - this._shift.y <= this._limits.top) {
	                tmpPoint.y = this._limits.top;
	                this._shift.y = e.pageY - this._limits.top;
	                shift.y = 0;
	            }
	            var parentCoords = this._dDService.getCoords(this._parent);
	            var point = {
	                x: tmpPoint.x - shift.x - parentCoords.left,
	                y: tmpPoint.y - shift.y - parentCoords.top
	            };
	            this._render.setStyle(this._elem, 'left', point.x + 'px');
	            this._render.setStyle(this._elem, 'top', point.y + 'px');
	            if (this.direction)
	                this.swipe(point);
	            else {
	                this._point = point;
	                this._emit('change');
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDDirective.prototype._addShadow = function () {
	        if (this.shadow) {
	            this._dDService.shadow = this._render.createElement('div');
	            var width = this._elem.offsetWidth;
	            var height = this._elem.offsetHeight;
	            this._render.setStyle(this._dDService.shadow, 'width', width - 10 + 'px');
	            this._render.setStyle(this._dDService.shadow, 'height', height - 10 + 'px');
	            this._updateShadow();
	            this._render.addClass(this._dDService.shadow, 'd-d-shadow');
	            this._render.insertBefore(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow, this._elem);
	        }
	    };
	    DDDirective.prototype._removeShadow = function () {
	        if (this.shadow)
	            this._render.removeChild(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow);
	    };
	    DDDirective.prototype.swipe = function (point) {
	        var _this = this;
	        var height = this._elem.offsetHeight + this._margin.y;
	        var width = this._elem.offsetWidth + this._margin.x;
	        var ySet = Math.floor((point.y - this._padding.y + (height / 2)) / height) * height + this._padding.y;
	        var xSet = Math.floor((point.x - this._padding.x + (width / 2)) / width) * width + this._padding.x;
	        if (ySet > this._dDService.grid.maxY)
	            ySet = this._dDService.grid.maxY;
	        else if (ySet < this._dDService.grid.minY)
	            ySet = this._dDService.grid.minY;
	        if (xSet > this._dDService.grid.maxX)
	            xSet = this._dDService.grid.maxX;
	        else if (xSet < this._dDService.grid.minX)
	            xSet = this._dDService.grid.minX;
	        var invertH = point.y < this._point.y ? 1 : -1;
	        var invertW = point.x < this._point.x ? 1 : -1;
	        if (this._point.y !== ySet || this._point.x !== xSet) {
	            this._collect.forEach(function (el) {
	                if (_this._point.y !== ySet && _this.direction === 'grid') {
	                    if ((_this._point.y - (0.5 * height - 1)) < el.point.y && (_this._point.y + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x < _this._point.x) || (invertH < 0 && el.point.x > _this._point.x))) {
	                        _this._setElements(el, { width: invertH * width });
	                    }
	                    else if ((ySet + (0.5 * height - 1)) < el.point.y && (_this._point.y - (0.5 * height - 1)) > el.point.y) {
	                        if (invertH > 0 && (_this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
	                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.minX) });
	                            _this._setElements(el, { height: invertH * height });
	                        }
	                        else if (invertH < 0 && (_this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
	                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.maxX) });
	                            _this._setElements(el, { height: invertH * height });
	                        }
	                        else {
	                            _this._setElements(el, { width: invertH * width });
	                        }
	                    }
	                    else if ((ySet - (0.5 * height - 1)) < el.point.y && (ySet + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x > (xSet - (0.5 * width - 1))) || ((invertH < 0 && el.point.x < (xSet + (0.5 * width - 1)))))) {
	                        if (invertH > 0 && (_this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
	                            _this._setElements(el, { width: invertH * (_this._dDService.grid.minX - el.point.x) });
	                            _this._setElements(el, { height: invertH * height });
	                        }
	                        else if (invertH < 0 && (_this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
	                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.maxX) });
	                            _this._setElements(el, { height: invertH * height });
	                        }
	                        else {
	                            _this._setElements(el, { width: invertH * width });
	                        }
	                    }
	                }
	                else if (_this._point.x !== xSet && (_this.direction === 'grid' || _this.direction === 'x')) {
	                    if ((_this._point.y - (0.5 * height - 1)) < el.point.y && (_this._point.y + (0.5 * height - 1)) > el.point.y) {
	                        if (((_this._point.x - invertW * width) - (0.5 * width - 1)) < el.point.x && ((_this._point.x - invertW * width) + (0.5 * width - 1)) > el.point.x) {
	                            _this._setElements(el, { width: invertW * width });
	                        }
	                    }
	                }
	                else if (_this._point.y !== ySet && _this.direction === 'y') {
	                    if ((_this._point.x - (0.5 * width - 1)) < el.point.x && (_this._point.x + (0.5 * width - 1)) > el.point.x) {
	                        if (((_this._point.y - invertH * height) - (0.5 * height - 1)) < el.point.y && ((_this._point.y - invertH * height) + (0.5 * height - 1)) > el.point.y) {
	                            _this._setElements(el, { height: invertH * height });
	                        }
	                    }
	                }
	            });
	            this._point.y = ySet;
	            this._point.x = xSet;
	            this._emit('change');
	            if (this.shadow)
	                this._updateShadow();
	        }
	    };
	    DDDirective.prototype._setElements = function (el, point) {
	        point.height ? el.point.y += point.height : el.point.x += point.width;
	        this._render.setStyle(el.el, point.height ? 'top' : 'left', (point.height ? el.point.y : el.point.x) + 'px');
	    };
	    DDDirective.prototype._updateShadow = function () {
	        var _this = this;
	        this._render.setStyle(this._dDService.shadow, 'opacity', 0);
	        setTimeout(function () {
	            _this._render.setStyle(_this._dDService.shadow, 'top', _this._point.y + 5 + 'px');
	            _this._render.setStyle(_this._dDService.shadow, 'left', _this._point.x + 5 + 'px');
	            _this._render.setStyle(_this._dDService.shadow, 'opacity', 1);
	        }, 200);
	    };
	    DDDirective.prototype._drop = function () {
	        this._emit('drop');
	        if (this.direction && this.direction === 'grid')
	            if (this._collect.length > 1)
	                if (this._collect[this._collect.length - 1].active) {
	                    if (this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth > this._dDService.grid.maxX) {
	                        this._point.x = this._dDService.grid.minX;
	                    }
	                    else {
	                        this._point.x = this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth + this._margin.x;
	                        this._point.y = this._collect[this._collect.length - 2].point.y;
	                    }
	                }
	        this._render.setStyle(this._elem, 'top', this._point.y + 'px');
	        this._render.setStyle(this._elem, 'left', this._point.x + 'px');
	    };
	    DDDirective.prototype._getIEl = function () {
	        return {
	            point: this._point,
	            active: false,
	            el: this._elem,
	            customEl: this.customElem || null,
	        };
	    };
	    Object.defineProperty(DDDirective.prototype, "point", {
	        set: function (coordinate) {
	            var parentCoords = this._dDService.getCoords(this._parent);
	            this._point = { x: Math.round(coordinate.left - parentCoords.left - this._margin.x), y: Math.round(coordinate.top - parentCoords.top - this._margin.y) };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDDirective.prototype._emit = function (type) {
	        this._dDService.sorting();
	        var event = {
	            type: type,
	            point: this._point,
	            elem: this.customElem || this._elem,
	            collection: this.customElem ? this._dDService.customCollection : this._collect,
	        };
	        switch (type) {
	            case 'change':
	                this.dChange.emit(event);
	                this._dDService.change.next(event);
	                break;
	            case 'drop':
	                this.dDrop.emit(event);
	                this._dDService.drop.next(event);
	                break;
	        }
	    };
	    DDDirective.prototype.matClick = function (event) {
	        var _this = this;
	        if (this.materialStyle) {
	            var el_1 = this._elem, shift = this._shift;
	            if (this.is && this.swipeElement) {
	                el_1 = this.swipeElement;
	                var coords = this._dDService.getCoords(this.swipeElement);
	                shift = { x: event.pageX - coords.left, y: event.pageY - coords.top };
	            }
	            if (el_1.className.indexOf('btn-disabled') !== -1) {
	                return;
	            }
	            var dia = Math.min(el_1.offsetHeight, el_1.offsetWidth, 100), ripple_1 = this._render.createElement('div');
	            this._render.addClass(ripple_1, 'ripple');
	            this._render.appendChild(el_1, ripple_1);
	            var rippleWave = this._render.createElement('div');
	            this._render.addClass(rippleWave, 'rippleWave');
	            this._render.setStyle(rippleWave, 'width', dia + 'px');
	            this._render.setStyle(rippleWave, 'height', dia + 'px');
	            this._render.setStyle(rippleWave, 'left', (shift.x - (dia / 2)) + 'px');
	            this._render.setStyle(rippleWave, 'top', (shift.y - (dia / 2)) + 'px');
	            ripple_1.appendChild(rippleWave);
	            rippleWave.addEventListener('animationend', function () { return _this._render.removeChild(el_1, ripple_1); });
	        }
	    };
	    DDDirective.COMP = 'D-D-MATERIAL-STYLE';
	    __decorate([
	        core.Input('ddMatStyle'),
	        __metadata("design:type", Object)
	    ], DDDirective.prototype, "container", void 0);
	    __decorate([
	        core.Input(),
	        __metadata("design:type", Object),
	        __metadata("design:paramtypes", [Object])
	    ], DDDirective.prototype, "config", null);
	    __decorate([
	        core.Output(),
	        __metadata("design:type", typeof (_a = typeof core.EventEmitter !== "undefined" && core.EventEmitter) === "function" && _a || Object)
	    ], DDDirective.prototype, "dChange", void 0);
	    __decorate([
	        core.Output(),
	        __metadata("design:type", typeof (_b = typeof core.EventEmitter !== "undefined" && core.EventEmitter) === "function" && _b || Object)
	    ], DDDirective.prototype, "dDrop", void 0);
	    __decorate([
	        core.HostListener('dragstart'),
	        __metadata("design:type", Function),
	        __metadata("design:paramtypes", []),
	        __metadata("design:returntype", void 0)
	    ], DDDirective.prototype, "onDragStart", null);
	    __decorate([
	        core.HostListener('mousedown', ['$event']),
	        __metadata("design:type", Function),
	        __metadata("design:paramtypes", [Object]),
	        __metadata("design:returntype", void 0)
	    ], DDDirective.prototype, "onMouseDown", null);
	    DDDirective = DDDirective_1 = __decorate([
	        core.Directive({
	            selector: '[ddMatStyle]',
	        }),
	        __metadata("design:paramtypes", [typeof (_c = typeof core.ElementRef !== "undefined" && core.ElementRef) === "function" && _c || Object, typeof (_d = typeof core.Renderer2 !== "undefined" && core.Renderer2) === "function" && _d || Object, typeof (_e = typeof core.ComponentFactoryResolver !== "undefined" && core.ComponentFactoryResolver) === "function" && _e || Object, typeof (_f = typeof core.ViewContainerRef !== "undefined" && core.ViewContainerRef) === "function" && _f || Object, typeof (_g = typeof DDService !== "undefined" && DDService) === "function" && _g || Object])
	    ], DDDirective);
	    return DDDirective;
	    var DDDirective_1, _a, _b, _c, _d, _e, _f, _g;
	}());

	var DDMaterialStyleComponent = /** @class */ (function () {
	    function DDMaterialStyleComponent(_dDService) {
	        this._dDService = _dDService;
	        this.dChange = new core.EventEmitter();
	        this.dDrop = new core.EventEmitter();
	        this._materialStyle = true;
	        this._shadow = false;
	    }
	    Object.defineProperty(DDMaterialStyleComponent.prototype, "config", {
	        set: function (config) {
	            if (config) {
	                this._direction = config.direction || null;
	                this._materialStyle = config.matClick !== undefined ? config.matClick : true;
	                this._shadow = config.shadow !== undefined ? config.shadow : false;
	                this._customCollection = config.collection || null;
	                this._swipe = config.swipe || null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DDMaterialStyleComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this._dDService.drop.subscribe(function (event) { return _this._sendEvent(event); });
	        this._dDService.change.subscribe(function (event) { return _this._sendEvent(event); });
	    };
	    DDMaterialStyleComponent.prototype._sendEvent = function (event) {
	        switch (event.type) {
	            case 'change':
	                this.dChange.emit(event);
	                break;
	            case 'drop':
	                this.dDrop.emit(event);
	                break;
	        }
	    };
	    DDMaterialStyleComponent.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        this.collection.forEach(function (el, index) {
	            el.direction = el.direction ? el.direction : _this._direction;
	            el.materialStyle = el.materialStyle ? el.materialStyle : _this._materialStyle;
	            el.shadow = el.shadow ? el.shadow : _this._shadow;
	            el.customElem = el.customElem ? el.customElem : (_this._customCollection ? (_this._customCollection[index] || null) : null);
	            el.swipeElement = el.swipeElement ? el.swipeElement : _this._swipe;
	            el.dDservice = _this._dDService;
	        });
	    };
	    __decorate([
	        core.Input(),
	        __metadata("design:type", Object),
	        __metadata("design:paramtypes", [Object])
	    ], DDMaterialStyleComponent.prototype, "config", null);
	    __decorate([
	        core.ContentChildren(DDDirective),
	        __metadata("design:type", typeof (_a = typeof core.QueryList !== "undefined" && core.QueryList) === "function" && _a || Object)
	    ], DDMaterialStyleComponent.prototype, "collection", void 0);
	    __decorate([
	        core.Output(),
	        __metadata("design:type", typeof (_b = typeof core.EventEmitter !== "undefined" && core.EventEmitter) === "function" && _b || Object)
	    ], DDMaterialStyleComponent.prototype, "dChange", void 0);
	    __decorate([
	        core.Output(),
	        __metadata("design:type", typeof (_c = typeof core.EventEmitter !== "undefined" && core.EventEmitter) === "function" && _c || Object)
	    ], DDMaterialStyleComponent.prototype, "dDrop", void 0);
	    DDMaterialStyleComponent = __decorate([
	        core.Component({
	            selector: 'd-d-material-style',
	            template: "<ng-content></ng-content>",
	            styles: ["/deep/ d-d-mat-box-style {\n  transition: all 300ms ease-out;\n  transform: translateZ(0);\n  position: absolute;\n  float: left;\n  user-select: none;\n  border-radius: 5px; }\n  /deep/ d-d-mat-box-style.d-d-move {\n    transition: unset;\n    transform: translateZ(6px);\n    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25); }\n  /deep/ d-d-mat-box-style .ripple {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    overflow: hidden;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    border-radius: inherit;\n    pointer-events: none;\n    animation: ripple-shadow 0.4s forwards;\n    -webkit-animation: ripple-shadow 0.4s forwards; }\n    /deep/ d-d-mat-box-style .ripple .rippleWave {\n      backface-visibility: hidden;\n      position: absolute;\n      border-radius: 50%;\n      transform: scale(0.7);\n      -webkit-transform: scale(0.7);\n      background: rgba(0, 0, 0, 0.3);\n      opacity: 0.45;\n      animation: ripple 2s forwards;\n      -webkit-animation: ripple 2s forwards; }\n\n@keyframes ripple-shadow {\n  0% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); }\n  20% {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); }\n  100% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); } }\n\n@-webkit-keyframes ripple-shadow {\n  0% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); }\n  20% {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); }\n  100% {\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0); } }\n\n@keyframes ripple {\n  to {\n    transform: scale(24);\n    opacity: 0; } }\n\n@-webkit-keyframes ripple {\n  to {\n    -webkit-transform: scale(24);\n    opacity: 0; } }\n\n/deep/ .d-d-shadow {\n  background: rgba(0, 0, 0, 0.4);\n  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.4);\n  border-radius: 5px;\n  position: absolute;\n  display: block;\n  transition: opacity 200ms ease-out; }\n"],
	            providers: [DDService],
	        }),
	        __metadata("design:paramtypes", [typeof (_d = typeof DDService !== "undefined" && DDService) === "function" && _d || Object])
	    ], DDMaterialStyleComponent);
	    return DDMaterialStyleComponent;
	    var _a, _b, _c, _d;
	}());

	var DDMaterialStyleModule = /** @class */ (function () {
	    function DDMaterialStyleModule() {
	    }
	    DDMaterialStyleModule = __decorate([
	        core.NgModule({
	            declarations: [
	                DDDirective,
	                DDComponent,
	                DDMaterialStyleComponent,
	            ],
	            exports: [
	                DDDirective,
	                DDMaterialStyleComponent,
	            ],
	            providers: [
	                DDService,
	            ],
	            entryComponents: [
	                DDComponent,
	            ],
	        })
	    ], DDMaterialStyleModule);
	    return DDMaterialStyleModule;
	}());

	exports.DDMaterialStyleModule = DDMaterialStyleModule;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d-d-material-style.umd.js.map
