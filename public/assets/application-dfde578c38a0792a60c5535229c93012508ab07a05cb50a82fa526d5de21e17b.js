/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
$(function(){ $(document).foundation(); });
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */

!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=!!e&&"length"in e&&e.length,n=pe.type(e);return"function"===n||pe.isWindow(e)?!1:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function i(e,t,n){if(pe.isFunction(t))return pe.grep(e,function(e,i){return!!t.call(e,i,e)!==n});if(t.nodeType)return pe.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(Le.test(t))return pe.filter(t,e,n);t=pe.filter(t,e)}return pe.grep(e,function(e){return pe.inArray(e,t)>-1!==n})}function a(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function r(e){var t={};return pe.each(e.match(Se)||[],function(e,n){t[n]=!0}),t}function s(){ie.addEventListener?(ie.removeEventListener("DOMContentLoaded",o),e.removeEventListener("load",o)):(ie.detachEvent("onreadystatechange",o),e.detachEvent("onload",o))}function o(){(ie.addEventListener||"load"===e.event.type||"complete"===ie.readyState)&&(s(),pe.ready())}function l(e,t,n){if(void 0===n&&1===e.nodeType){var i="data-"+t.replace(Ae,"-$1").toLowerCase();if(n=e.getAttribute(i),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:Ee.test(n)?pe.parseJSON(n):n}catch(a){}pe.data(e,t,n)}else n=void 0}return n}function d(e){var t;for(t in e)if(("data"!==t||!pe.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(e,t,n,i){if(je(e)){var a,r,s=pe.expando,o=e.nodeType,l=o?pe.cache:e,d=o?e[s]:e[s]&&s;if(d&&l[d]&&(i||l[d].data)||void 0!==n||"string"!=typeof t)return d||(d=o?e[s]=ne.pop()||pe.guid++:s),l[d]||(l[d]=o?{}:{toJSON:pe.noop}),("object"==typeof t||"function"==typeof t)&&(i?l[d]=pe.extend(l[d],t):l[d].data=pe.extend(l[d].data,t)),r=l[d],i||(r.data||(r.data={}),r=r.data),void 0!==n&&(r[pe.camelCase(t)]=n),"string"==typeof t?(a=r[t],null==a&&(a=r[pe.camelCase(t)])):a=r,a}}function c(e,t,n){if(je(e)){var i,a,r=e.nodeType,s=r?pe.cache:e,o=r?e[pe.expando]:pe.expando;if(s[o]){if(t&&(i=n?s[o]:s[o].data)){pe.isArray(t)?t=t.concat(pe.map(t,pe.camelCase)):t in i?t=[t]:(t=pe.camelCase(t),t=t in i?[t]:t.split(" ")),a=t.length;for(;a--;)delete i[t[a]];if(n?!d(i):!pe.isEmptyObject(i))return}(n||(delete s[o].data,d(s[o])))&&(r?pe.cleanData([e],!0):ce.deleteExpando||s!=s.window?delete s[o]:s[o]=void 0)}}}function h(e,t,n,i){var a,r=1,s=20,o=i?function(){return i.cur()}:function(){return pe.css(e,t,"")},l=o(),d=n&&n[3]||(pe.cssNumber[t]?"":"px"),u=(pe.cssNumber[t]||"px"!==d&&+l)&&Ie.exec(pe.css(e,t));if(u&&u[3]!==d){d=d||u[3],n=n||[],u=+l||1;do r=r||".5",u/=r,pe.style(e,t,u+d);while(r!==(r=o()/l)&&1!==r&&--s)}return n&&(u=+u||+l||0,a=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=d,i.start=u,i.end=a)),a}function p(e){var t=Re.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function m(e,t){var n,i,a=0,r="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):void 0;if(!r)for(r=[],n=e.childNodes||e;null!=(i=n[a]);a++)!t||pe.nodeName(i,t)?r.push(i):pe.merge(r,m(i,t));return void 0===t||t&&pe.nodeName(e,t)?pe.merge([e],r):r}function f(e,t){for(var n,i=0;null!=(n=e[i]);i++)pe._data(n,"globalEval",!t||pe._data(t[i],"globalEval"))}function _(e){Oe.test(e.type)&&(e.defaultChecked=e.checked)}function g(e,t,n,i,a){for(var r,s,o,l,d,u,c,h=e.length,g=p(t),y=[],v=0;h>v;v++)if(s=e[v],s||0===s)if("object"===pe.type(s))pe.merge(y,s.nodeType?[s]:s);else if(Ue.test(s)){for(l=l||g.appendChild(t.createElement("div")),d=($e.exec(s)||["",""])[1].toLowerCase(),c=Be[d]||Be._default,l.innerHTML=c[1]+pe.htmlPrefilter(s)+c[2],r=c[0];r--;)l=l.lastChild;if(!ce.leadingWhitespace&&qe.test(s)&&y.push(t.createTextNode(qe.exec(s)[0])),!ce.tbody)for(s="table"!==d||Je.test(s)?"<table>"!==c[1]||Je.test(s)?0:l:l.firstChild,r=s&&s.childNodes.length;r--;)pe.nodeName(u=s.childNodes[r],"tbody")&&!u.childNodes.length&&s.removeChild(u);for(pe.merge(y,l.childNodes),l.textContent="";l.firstChild;)l.removeChild(l.firstChild);l=g.lastChild}else y.push(t.createTextNode(s));for(l&&g.removeChild(l),ce.appendChecked||pe.grep(m(y,"input"),_),v=0;s=y[v++];)if(i&&pe.inArray(s,i)>-1)a&&a.push(s);else if(o=pe.contains(s.ownerDocument,s),l=m(g.appendChild(s),"script"),o&&f(l),n)for(r=0;s=l[r++];)ze.test(s.type||"")&&n.push(s);return l=null,g}function y(){return!0}function v(){return!1}function b(){try{return ie.activeElement}catch(e){}}function M(e,t,n,i,a,r){var s,o;if("object"==typeof t){"string"!=typeof n&&(i=i||n,n=void 0);for(o in t)M(e,o,n,i,t[o],r);return e}if(null==i&&null==a?(a=n,i=n=void 0):null==a&&("string"==typeof n?(a=i,i=void 0):(a=i,i=n,n=void 0)),a===!1)a=v;else if(!a)return e;return 1===r&&(s=a,a=function(e){return pe().off(e),s.apply(this,arguments)},a.guid=s.guid||(s.guid=pe.guid++)),e.each(function(){pe.event.add(this,t,a,i,n)})}function w(e,t){return pe.nodeName(e,"table")&&pe.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function L(e){return e.type=(null!==pe.find.attr(e,"type"))+"/"+e.type,e}function k(e){var t=at.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Y(e,t){if(1===t.nodeType&&pe.hasData(e)){var n,i,a,r=pe._data(e),s=pe._data(t,r),o=r.events;if(o){delete s.handle,s.events={};for(n in o)for(i=0,a=o[n].length;a>i;i++)pe.event.add(t,n,o[n][i])}s.data&&(s.data=pe.extend({},s.data))}}function D(e,t){var n,i,a;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!ce.noCloneEvent&&t[pe.expando]){a=pe._data(t);for(i in a.events)pe.removeEvent(t,i,a.handle);t.removeAttribute(pe.expando)}"script"===n&&t.text!==e.text?(L(t).text=e.text,k(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),ce.html5Clone&&e.innerHTML&&!pe.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Oe.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function T(e,t,n,i){t=re.apply([],t);var a,r,s,o,l,d,u=0,c=e.length,h=c-1,p=t[0],f=pe.isFunction(p);if(f||c>1&&"string"==typeof p&&!ce.checkClone&&it.test(p))return e.each(function(a){var r=e.eq(a);f&&(t[0]=p.call(this,a,r.html())),T(r,t,n,i)});if(c&&(d=g(t,e[0].ownerDocument,!1,e,i),a=d.firstChild,1===d.childNodes.length&&(d=a),a||i)){for(o=pe.map(m(d,"script"),L),s=o.length;c>u;u++)r=d,u!==h&&(r=pe.clone(r,!0,!0),s&&pe.merge(o,m(r,"script"))),n.call(e[u],r,u);if(s)for(l=o[o.length-1].ownerDocument,pe.map(o,k),u=0;s>u;u++)r=o[u],ze.test(r.type||"")&&!pe._data(r,"globalEval")&&pe.contains(l,r)&&(r.src?pe._evalUrl&&pe._evalUrl(r.src):pe.globalEval((r.text||r.textContent||r.innerHTML||"").replace(rt,"")));d=a=null}return e}function x(e,t,n){for(var i,a=t?pe.filter(t,e):e,r=0;null!=(i=a[r]);r++)n||1!==i.nodeType||pe.cleanData(m(i)),i.parentNode&&(n&&pe.contains(i.ownerDocument,i)&&f(m(i,"script")),i.parentNode.removeChild(i));return e}function S(e,t){var n=pe(t.createElement(e)).appendTo(t.body),i=pe.css(n[0],"display");return n.detach(),i}function C(e){var t=ie,n=dt[e];return n||(n=S(e,t),"none"!==n&&n||(lt=(lt||pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=(lt[0].contentWindow||lt[0].contentDocument).document,t.write(),t.close(),n=S(e,t),lt.detach()),dt[e]=n),n}function H(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function j(e){if(e in kt)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=Lt.length;n--;)if(e=Lt[n]+t,e in kt)return e}function E(e,t){for(var n,i,a,r=[],s=0,o=e.length;o>s;s++)i=e[s],i.style&&(r[s]=pe._data(i,"olddisplay"),n=i.style.display,t?(r[s]||"none"!==n||(i.style.display=""),""===i.style.display&&Fe(i)&&(r[s]=pe._data(i,"olddisplay",C(i.nodeName)))):(a=Fe(i),(n&&"none"!==n||!a)&&pe._data(i,"olddisplay",a?n:pe.css(i,"display"))));for(s=0;o>s;s++)i=e[s],i.style&&(t&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=t?r[s]||"":"none"));return e}function A(e,t,n){var i=bt.exec(t);return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):t}function P(e,t,n,i,a){for(var r=n===(i?"border":"content")?4:"width"===t?1:0,s=0;4>r;r+=2)"margin"===n&&(s+=pe.css(e,n+We[r],!0,a)),i?("content"===n&&(s-=pe.css(e,"padding"+We[r],!0,a)),"margin"!==n&&(s-=pe.css(e,"border"+We[r]+"Width",!0,a))):(s+=pe.css(e,"padding"+We[r],!0,a),"padding"!==n&&(s+=pe.css(e,"border"+We[r]+"Width",!0,a)));return s}function I(t,n,i){var a=!0,r="width"===n?t.offsetWidth:t.offsetHeight,s=mt(t),o=ce.boxSizing&&"border-box"===pe.css(t,"boxSizing",!1,s);if(ie.msFullscreenElement&&e.top!==e&&t.getClientRects().length&&(r=Math.round(100*t.getBoundingClientRect()[n])),0>=r||null==r){if(r=ft(t,n,s),(0>r||null==r)&&(r=t.style[n]),ct.test(r))return r;a=o&&(ce.boxSizingReliable()||r===t.style[n]),r=parseFloat(r)||0}return r+P(t,n,i||(o?"border":"content"),a,s)+"px"}function W(e,t,n,i,a){return new W.prototype.init(e,t,n,i,a)}function F(){return e.setTimeout(function(){Yt=void 0}),Yt=pe.now()}function N(e,t){var n,i={height:e},a=0;for(t=t?1:0;4>a;a+=2-t)n=We[a],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function O(e,t,n){for(var i,a=(q.tweeners[t]||[]).concat(q.tweeners["*"]),r=0,s=a.length;s>r;r++)if(i=a[r].call(n,t,e))return i}function $(e,t,n){var i,a,r,s,o,l,d,u,c=this,h={},p=e.style,m=e.nodeType&&Fe(e),f=pe._data(e,"fxshow");n.queue||(o=pe._queueHooks(e,"fx"),null==o.unqueued&&(o.unqueued=0,l=o.empty.fire,o.empty.fire=function(){o.unqueued||l()}),o.unqueued++,c.always(function(){c.always(function(){o.unqueued--,pe.queue(e,"fx").length||o.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],d=pe.css(e,"display"),u="none"===d?pe._data(e,"olddisplay")||C(e.nodeName):d,"inline"===u&&"none"===pe.css(e,"float")&&(ce.inlineBlockNeedsLayout&&"inline"!==C(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",ce.shrinkWrapBlocks()||c.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Tt.exec(a)){if(delete t[i],r=r||"toggle"===a,a===(m?"hide":"show")){if("show"!==a||!f||void 0===f[i])continue;m=!0}h[i]=f&&f[i]||pe.style(e,i)}else d=void 0;if(pe.isEmptyObject(h))"inline"===("none"===d?C(e.nodeName):d)&&(p.display=d);else{f?"hidden"in f&&(m=f.hidden):f=pe._data(e,"fxshow",{}),r&&(f.hidden=!m),m?pe(e).show():c.done(function(){pe(e).hide()}),c.done(function(){var t;pe._removeData(e,"fxshow");for(t in h)pe.style(e,t,h[t])});for(i in h)s=O(m?f[i]:0,i,c),i in f||(f[i]=s.start,m&&(s.end=s.start,s.start="width"===i||"height"===i?1:0))}}function z(e,t){var n,i,a,r,s;for(n in e)if(i=pe.camelCase(n),a=t[i],r=e[n],pe.isArray(r)&&(a=r[1],r=e[n]=r[0]),n!==i&&(e[i]=r,delete e[n]),s=pe.cssHooks[i],s&&"expand"in s){r=s.expand(r),delete e[i];for(n in r)n in e||(e[n]=r[n],t[n]=a)}else t[i]=a}function q(e,t,n){var i,a,r=0,s=q.prefilters.length,o=pe.Deferred().always(function(){delete l.elem}),l=function(){if(a)return!1;for(var t=Yt||F(),n=Math.max(0,d.startTime+d.duration-t),i=n/d.duration||0,r=1-i,s=0,l=d.tweens.length;l>s;s++)d.tweens[s].run(r);return o.notifyWith(e,[d,r,n]),1>r&&l?n:(o.resolveWith(e,[d]),!1)},d=o.promise({elem:e,props:pe.extend({},t),opts:pe.extend(!0,{specialEasing:{},easing:pe.easing._default},n),originalProperties:t,originalOptions:n,startTime:Yt||F(),duration:n.duration,tweens:[],createTween:function(t,n){var i=pe.Tween(e,d.opts,t,n,d.opts.specialEasing[t]||d.opts.easing);return d.tweens.push(i),i},stop:function(t){var n=0,i=t?d.tweens.length:0;if(a)return this;for(a=!0;i>n;n++)d.tweens[n].run(1);return t?(o.notifyWith(e,[d,1,0]),o.resolveWith(e,[d,t])):o.rejectWith(e,[d,t]),this}}),u=d.props;for(z(u,d.opts.specialEasing);s>r;r++)if(i=q.prefilters[r].call(d,e,u,d.opts))return pe.isFunction(i.stop)&&(pe._queueHooks(d.elem,d.opts.queue).stop=pe.proxy(i.stop,i)),i;return pe.map(u,O,d),pe.isFunction(d.opts.start)&&d.opts.start.call(e,d),pe.fx.timer(pe.extend(l,{elem:e,anim:d,queue:d.opts.queue})),d.progress(d.opts.progress).done(d.opts.done,d.opts.complete).fail(d.opts.fail).always(d.opts.always)}function R(e){return pe.attr(e,"class")||""}function B(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var i,a=0,r=t.toLowerCase().match(Se)||[];if(pe.isFunction(n))for(;i=r[a++];)"+"===i.charAt(0)?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function U(e,t,n,i){function a(o){var l;return r[o]=!0,pe.each(e[o]||[],function(e,o){var d=o(t,n,i);return"string"!=typeof d||s||r[d]?s?!(l=d):void 0:(t.dataTypes.unshift(d),a(d),!1)}),l}var r={},s=e===Qt;return a(t.dataTypes[0])||!r["*"]&&a("*")}function J(e,t){var n,i,a=pe.ajaxSettings.flatOptions||{};for(i in t)void 0!==t[i]&&((a[i]?e:n||(n={}))[i]=t[i]);return n&&pe.extend(!0,e,n),e}function G(e,t,n){for(var i,a,r,s,o=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===a&&(a=e.mimeType||t.getResponseHeader("Content-Type"));if(a)for(s in o)if(o[s]&&o[s].test(a)){l.unshift(s);break}if(l[0]in n)r=l[0];else{for(s in n){if(!l[0]||e.converters[s+" "+l[0]]){r=s;break}i||(i=s)}r=r||i}return r?(r!==l[0]&&l.unshift(r),n[r]):void 0}function V(e,t,n,i){var a,r,s,o,l,d={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)d[s.toLowerCase()]=e.converters[s];for(r=u.shift();r;)if(e.responseFields[r]&&(n[e.responseFields[r]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=r,r=u.shift())if("*"===r)r=l;else if("*"!==l&&l!==r){if(s=d[l+" "+r]||d["* "+r],!s)for(a in d)if(o=a.split(" "),o[1]===r&&(s=d[l+" "+o[0]]||d["* "+o[0]])){s===!0?s=d[a]:d[a]!==!0&&(r=o[0],u.unshift(o[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(c){return{state:"parsererror",error:s?c:"No conversion from "+l+" to "+r}}}return{state:"success",data:t}}function K(e){return e.style&&e.style.display||pe.css(e,"display")}function Q(e){for(;e&&1===e.nodeType;){if("none"===K(e)||"hidden"===e.type)return!0;e=e.parentNode}return!1}function X(e,t,n,i){var a;if(pe.isArray(t))pe.each(t,function(t,a){n||nn.test(e)?i(e,a):X(e+"["+("object"==typeof a&&null!=a?t:"")+"]",a,n,i)});else if(n||"object"!==pe.type(t))i(e,t);else for(a in t)X(e+"["+a+"]",t[a],n,i)}function Z(){try{return new e.XMLHttpRequest}catch(t){}}function ee(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function te(e){return pe.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var ne=[],ie=e.document,ae=ne.slice,re=ne.concat,se=ne.push,oe=ne.indexOf,le={},de=le.toString,ue=le.hasOwnProperty,ce={},he="1.12.1",pe=function(e,t){return new pe.fn.init(e,t)},me=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,fe=/^-ms-/,_e=/-([\da-z])/gi,ge=function(e,t){return t.toUpperCase()};pe.fn=pe.prototype={jquery:he,constructor:pe,selector:"",length:0,toArray:function(){return ae.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:ae.call(this)},pushStack:function(e){var t=pe.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e){return pe.each(this,e)},map:function(e){return this.pushStack(pe.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(ae.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:se,sort:ne.sort,splice:ne.splice},pe.extend=pe.fn.extend=function(){var e,t,n,i,a,r,s=arguments[0]||{},o=1,l=arguments.length,d=!1;for("boolean"==typeof s&&(d=s,s=arguments[o]||{},o++),"object"==typeof s||pe.isFunction(s)||(s={}),o===l&&(s=this,o--);l>o;o++)if(null!=(a=arguments[o]))for(i in a)e=s[i],n=a[i],s!==n&&(d&&n&&(pe.isPlainObject(n)||(t=pe.isArray(n)))?(t?(t=!1,r=e&&pe.isArray(e)?e:[]):r=e&&pe.isPlainObject(e)?e:{},s[i]=pe.extend(d,r,n)):void 0!==n&&(s[i]=n));return s},pe.extend({expando:"jQuery"+(he+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===pe.type(e)},isArray:Array.isArray||function(e){return"array"===pe.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){var t=e&&e.toString();return!pe.isArray(e)&&t-parseFloat(t)+1>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==pe.type(e)||e.nodeType||pe.isWindow(e))return!1;try{if(e.constructor&&!ue.call(e,"constructor")&&!ue.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(!ce.ownFirst)for(t in e)return ue.call(e,t);for(t in e);return void 0===t||ue.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?le[de.call(e)]||"object":typeof e},globalEval:function(t){t&&pe.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(fe,"ms-").replace(_e,ge)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t){var i,a=0;if(n(e))for(i=e.length;i>a&&t.call(e[a],a,e[a])!==!1;a++);else for(a in e)if(t.call(e[a],a,e[a])===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(me,"")},makeArray:function(e,t){var i=t||[];return null!=e&&(n(Object(e))?pe.merge(i,"string"==typeof e?[e]:e):se.call(i,e)),i},inArray:function(e,t,n){var i;if(t){if(oe)return oe.call(t,e,n);for(i=t.length,n=n?0>n?Math.max(0,i+n):n:0;i>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,i=0,a=e.length;n>i;)e[a++]=t[i++];if(n!==n)for(;void 0!==t[i];)e[a++]=t[i++];return e.length=a,e},grep:function(e,t,n){for(var i,a=[],r=0,s=e.length,o=!n;s>r;r++)i=!t(e[r],r),i!==o&&a.push(e[r]);return a},map:function(e,t,i){var a,r,s=0,o=[];if(n(e))for(a=e.length;a>s;s++)r=t(e[s],s,i),null!=r&&o.push(r);else for(s in e)r=t(e[s],s,i),null!=r&&o.push(r);return re.apply([],o)},guid:1,proxy:function(e,t){var n,i,a;return"string"==typeof t&&(a=e[t],t=e,e=a),pe.isFunction(e)?(n=ae.call(arguments,2),i=function(){return e.apply(t||this,n.concat(ae.call(arguments)))},i.guid=e.guid=e.guid||pe.guid++,i):void 0},now:function(){return+new Date},support:ce}),"function"==typeof Symbol&&(pe.fn[Symbol.iterator]=ne[Symbol.iterator]),pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){le["[object "+t+"]"]=t.toLowerCase()});var ye=/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
function(e){function t(e,t,n,i){var a,r,s,o,l,d,c,p,m=t&&t.ownerDocument,f=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==f&&9!==f&&11!==f)return n;if(!i&&((t?t.ownerDocument||t:O)!==j&&H(t),t=t||j,A)){if(11!==f&&(d=ge.exec(e)))if(a=d[1]){if(9===f){if(!(s=t.getElementById(a)))return n;if(s.id===a)return n.push(s),n}else if(m&&(s=m.getElementById(a))&&F(t,s)&&s.id===a)return n.push(s),n}else{if(d[2])return X.apply(n,t.getElementsByTagName(e)),n;if((a=d[3])&&M.getElementsByClassName&&t.getElementsByClassName)return X.apply(n,t.getElementsByClassName(a)),n}if(M.qsa&&!B[e+" "]&&(!P||!P.test(e))){if(1!==f)m=t,p=e;else if("object"!==t.nodeName.toLowerCase()){for((o=t.getAttribute("id"))?o=o.replace(ve,"\\$&"):t.setAttribute("id",o=N),c=Y(e),r=c.length,l=he.test(o)?"#"+o:"[id='"+o+"']";r--;)c[r]=l+" "+h(c[r]);p=c.join(","),m=ye.test(e)&&u(t.parentNode)||t}if(p)try{return X.apply(n,m.querySelectorAll(p)),n}catch(_){}finally{o===N&&t.removeAttribute("id")}}}return T(e.replace(oe,"$1"),t,n,i)}function n(){function e(n,i){return t.push(n+" ")>w.cacheLength&&delete e[t.shift()],e[n+" "]=i}var t=[];return e}function i(e){return e[N]=!0,e}function a(e){var t=j.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function r(e,t){for(var n=e.split("|"),i=n.length;i--;)w.attrHandle[n[i]]=t}function s(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||J)-(~e.sourceIndex||J);if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function o(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function d(e){return i(function(t){return t=+t,i(function(n,i){for(var a,r=e([],n.length,t),s=r.length;s--;)n[a=r[s]]&&(n[a]=!(i[a]=n[a]))})})}function u(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function c(){}function h(e){for(var t=0,n=e.length,i="";n>t;t++)i+=e[t].value;return i}function p(e,t,n){var i=t.dir,a=n&&"parentNode"===i,r=z++;return t.first?function(t,n,r){for(;t=t[i];)if(1===t.nodeType||a)return e(t,n,r)}:function(t,n,s){var o,l,d,u=[$,r];if(s){for(;t=t[i];)if((1===t.nodeType||a)&&e(t,n,s))return!0}else for(;t=t[i];)if(1===t.nodeType||a){if(d=t[N]||(t[N]={}),l=d[t.uniqueID]||(d[t.uniqueID]={}),(o=l[i])&&o[0]===$&&o[1]===r)return u[2]=o[2];if(l[i]=u,u[2]=e(t,n,s))return!0}}}function m(e){return e.length>1?function(t,n,i){for(var a=e.length;a--;)if(!e[a](t,n,i))return!1;return!0}:e[0]}function f(e,n,i){for(var a=0,r=n.length;r>a;a++)t(e,n[a],i);return i}function _(e,t,n,i,a){for(var r,s=[],o=0,l=e.length,d=null!=t;l>o;o++)(r=e[o])&&(!n||n(r,i,a))&&(s.push(r),d&&t.push(o));return s}function g(e,t,n,a,r,s){return a&&!a[N]&&(a=g(a)),r&&!r[N]&&(r=g(r,s)),i(function(i,s,o,l){var d,u,c,h=[],p=[],m=s.length,g=i||f(t||"*",o.nodeType?[o]:o,[]),y=!e||!i&&t?g:_(g,h,e,o,l),v=n?r||(i?e:m||a)?[]:s:y;if(n&&n(y,v,o,l),a)for(d=_(v,p),a(d,[],o,l),u=d.length;u--;)(c=d[u])&&(v[p[u]]=!(y[p[u]]=c));if(i){if(r||e){if(r){for(d=[],u=v.length;u--;)(c=v[u])&&d.push(y[u]=c);r(null,v=[],d,l)}for(u=v.length;u--;)(c=v[u])&&(d=r?ee(i,c):h[u])>-1&&(i[d]=!(s[d]=c))}}else v=_(v===s?v.splice(m,v.length):v),r?r(null,s,v,l):X.apply(s,v)})}function y(e){for(var t,n,i,a=e.length,r=w.relative[e[0].type],s=r||w.relative[" "],o=r?1:0,l=p(function(e){return e===t},s,!0),d=p(function(e){return ee(t,e)>-1},s,!0),u=[function(e,n,i){var a=!r&&(i||n!==x)||((t=n).nodeType?l(e,n,i):d(e,n,i));return t=null,a}];a>o;o++)if(n=w.relative[e[o].type])u=[p(m(u),n)];else{if(n=w.filter[e[o].type].apply(null,e[o].matches),n[N]){for(i=++o;a>i&&!w.relative[e[i].type];i++);return g(o>1&&m(u),o>1&&h(e.slice(0,o-1).concat({value:" "===e[o-2].type?"*":""})).replace(oe,"$1"),n,i>o&&y(e.slice(o,i)),a>i&&y(e=e.slice(i)),a>i&&h(e))}u.push(n)}return m(u)}function v(e,n){var a=n.length>0,r=e.length>0,s=function(i,s,o,l,d){var u,c,h,p=0,m="0",f=i&&[],g=[],y=x,v=i||r&&w.find.TAG("*",d),b=$+=null==y?1:Math.random()||.1,M=v.length;for(d&&(x=s===j||s||d);m!==M&&null!=(u=v[m]);m++){if(r&&u){for(c=0,s||u.ownerDocument===j||(H(u),o=!A);h=e[c++];)if(h(u,s||j,o)){l.push(u);break}d&&($=b)}a&&((u=!h&&u)&&p--,i&&f.push(u))}if(p+=m,a&&m!==p){for(c=0;h=n[c++];)h(f,g,s,o);if(i){if(p>0)for(;m--;)f[m]||g[m]||(g[m]=K.call(l));g=_(g)}X.apply(l,g),d&&!i&&g.length>0&&p+n.length>1&&t.uniqueSort(l)}return d&&($=b,x=y),f};return a?i(s):s}var b,M,w,L,k,Y,D,T,x,S,C,H,j,E,A,P,I,W,F,N="sizzle"+1*new Date,O=e.document,$=0,z=0,q=n(),R=n(),B=n(),U=function(e,t){return e===t&&(C=!0),0},J=1<<31,G={}.hasOwnProperty,V=[],K=V.pop,Q=V.push,X=V.push,Z=V.slice,ee=function(e,t){for(var n=0,i=e.length;i>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ae="\\["+ne+"*("+ie+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+ne+"*\\]",re=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ae+")*)|.*)\\)|)",se=new RegExp(ne+"+","g"),oe=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),le=new RegExp("^"+ne+"*,"+ne+"*"),de=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ue=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),ce=new RegExp(re),he=new RegExp("^"+ie+"$"),pe={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie+"|[*])"),ATTR:new RegExp("^"+ae),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},me=/^(?:input|select|textarea|button)$/i,fe=/^h\d$/i,_e=/^[^{]+\{\s*\[native \w/,ge=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,ve=/'|\\/g,be=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Me=function(e,t,n){var i="0x"+t-65536;return i!==i||n?t:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},we=function(){H()};try{X.apply(V=Z.call(O.childNodes),O.childNodes),V[O.childNodes.length].nodeType}catch(Le){X={apply:V.length?function(e,t){Q.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}M=t.support={},k=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},H=t.setDocument=function(e){var t,n,i=e?e.ownerDocument||e:O;return i!==j&&9===i.nodeType&&i.documentElement?(j=i,E=j.documentElement,A=!k(j),(n=j.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",we,!1):n.attachEvent&&n.attachEvent("onunload",we)),M.attributes=a(function(e){return e.className="i",!e.getAttribute("className")}),M.getElementsByTagName=a(function(e){return e.appendChild(j.createComment("")),!e.getElementsByTagName("*").length}),M.getElementsByClassName=_e.test(j.getElementsByClassName),M.getById=a(function(e){return E.appendChild(e).id=N,!j.getElementsByName||!j.getElementsByName(N).length}),M.getById?(w.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&A){var n=t.getElementById(e);return n?[n]:[]}},w.filter.ID=function(e){var t=e.replace(be,Me);return function(e){return e.getAttribute("id")===t}}):(delete w.find.ID,w.filter.ID=function(e){var t=e.replace(be,Me);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),w.find.TAG=M.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):M.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],a=0,r=t.getElementsByTagName(e);if("*"===e){for(;n=r[a++];)1===n.nodeType&&i.push(n);return i}return r},w.find.CLASS=M.getElementsByClassName&&function(e,t){return"undefined"!=typeof t.getElementsByClassName&&A?t.getElementsByClassName(e):void 0},I=[],P=[],(M.qsa=_e.test(j.querySelectorAll))&&(a(function(e){E.appendChild(e).innerHTML="<a id='"+N+"'></a><select id='"+N+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&P.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||P.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+N+"-]").length||P.push("~="),e.querySelectorAll(":checked").length||P.push(":checked"),e.querySelectorAll("a#"+N+"+*").length||P.push(".#.+[+~]")}),a(function(e){var t=j.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&P.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||P.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),P.push(",.*:")})),(M.matchesSelector=_e.test(W=E.matches||E.webkitMatchesSelector||E.mozMatchesSelector||E.oMatchesSelector||E.msMatchesSelector))&&a(function(e){M.disconnectedMatch=W.call(e,"div"),W.call(e,"[s!='']:x"),I.push("!=",re)}),P=P.length&&new RegExp(P.join("|")),I=I.length&&new RegExp(I.join("|")),t=_e.test(E.compareDocumentPosition),F=t||_e.test(E.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode;return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return C=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!M.sortDetached&&t.compareDocumentPosition(e)===n?e===j||e.ownerDocument===O&&F(O,e)?-1:t===j||t.ownerDocument===O&&F(O,t)?1:S?ee(S,e)-ee(S,t):0:4&n?-1:1)}:function(e,t){if(e===t)return C=!0,0;var n,i=0,a=e.parentNode,r=t.parentNode,o=[e],l=[t];if(!a||!r)return e===j?-1:t===j?1:a?-1:r?1:S?ee(S,e)-ee(S,t):0;if(a===r)return s(e,t);for(n=e;n=n.parentNode;)o.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;o[i]===l[i];)i++;return i?s(o[i],l[i]):o[i]===O?-1:l[i]===O?1:0},j):j},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==j&&H(e),n=n.replace(ue,"='$1']"),M.matchesSelector&&A&&!B[n+" "]&&(!I||!I.test(n))&&(!P||!P.test(n)))try{var i=W.call(e,n);if(i||M.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(a){}return t(n,j,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==j&&H(e),F(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==j&&H(e);var n=w.attrHandle[t.toLowerCase()],i=n&&G.call(w.attrHandle,t.toLowerCase())?n(e,t,!A):void 0;return void 0!==i?i:M.attributes||!A?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],i=0,a=0;if(C=!M.detectDuplicates,S=!M.sortStable&&e.slice(0),e.sort(U),C){for(;t=e[a++];)t===e[a]&&(i=n.push(a));for(;i--;)e.splice(n[i],1)}return S=null,e},L=t.getText=function(e){var t,n="",i=0,a=e.nodeType;if(a){if(1===a||9===a||11===a){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=L(e)}else if(3===a||4===a)return e.nodeValue}else for(;t=e[i++];)n+=L(t);return n},w=t.selectors={cacheLength:50,createPseudo:i,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(be,Me),e[3]=(e[3]||e[4]||e[5]||"").replace(be,Me),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&ce.test(n)&&(t=Y(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(be,Me).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=q[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&q(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,i){return function(a){var r=t.attr(a,e);return null==r?"!="===n:n?(r+="","="===n?r===i:"!="===n?r!==i:"^="===n?i&&0===r.indexOf(i):"*="===n?i&&r.indexOf(i)>-1:"$="===n?i&&r.slice(-i.length)===i:"~="===n?(" "+r.replace(se," ")+" ").indexOf(i)>-1:"|="===n?r===i||r.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(e,t,n,i,a){var r="nth"!==e.slice(0,3),s="last"!==e.slice(-4),o="of-type"===t;return 1===i&&0===a?function(e){return!!e.parentNode}:function(t,n,l){var d,u,c,h,p,m,f=r!==s?"nextSibling":"previousSibling",_=t.parentNode,g=o&&t.nodeName.toLowerCase(),y=!l&&!o,v=!1;if(_){if(r){for(;f;){for(h=t;h=h[f];)if(o?h.nodeName.toLowerCase()===g:1===h.nodeType)return!1;m=f="only"===e&&!m&&"nextSibling"}return!0}if(m=[s?_.firstChild:_.lastChild],s&&y){for(h=_,c=h[N]||(h[N]={}),u=c[h.uniqueID]||(c[h.uniqueID]={}),d=u[e]||[],p=d[0]===$&&d[1],v=p&&d[2],h=p&&_.childNodes[p];h=++p&&h&&h[f]||(v=p=0)||m.pop();)if(1===h.nodeType&&++v&&h===t){u[e]=[$,p,v];break}}else if(y&&(h=t,c=h[N]||(h[N]={}),u=c[h.uniqueID]||(c[h.uniqueID]={}),d=u[e]||[],p=d[0]===$&&d[1],v=p),v===!1)for(;(h=++p&&h&&h[f]||(v=p=0)||m.pop())&&((o?h.nodeName.toLowerCase()!==g:1!==h.nodeType)||!++v||(y&&(c=h[N]||(h[N]={}),u=c[h.uniqueID]||(c[h.uniqueID]={}),u[e]=[$,v]),h!==t)););return v-=a,v===i||v%i===0&&v/i>=0}}},PSEUDO:function(e,n){var a,r=w.pseudos[e]||w.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return r[N]?r(n):r.length>1?(a=[e,e,"",n],w.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,t){for(var i,a=r(e,n),s=a.length;s--;)i=ee(e,a[s]),e[i]=!(t[i]=a[s])}):function(e){return r(e,0,a)}):r}},pseudos:{not:i(function(e){var t=[],n=[],a=D(e.replace(oe,"$1"));return a[N]?i(function(e,t,n,i){for(var r,s=a(e,null,i,[]),o=e.length;o--;)(r=s[o])&&(e[o]=!(t[o]=r))}):function(e,i,r){return t[0]=e,a(t,null,r,n),t[0]=null,!n.pop()}}),has:i(function(e){return function(n){return t(e,n).length>0}}),contains:i(function(e){return e=e.replace(be,Me),function(t){return(t.textContent||t.innerText||L(t)).indexOf(e)>-1}}),lang:i(function(e){return he.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(be,Me).toLowerCase(),function(t){var n;do if(n=A?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===E},focus:function(e){return e===j.activeElement&&(!j.hasFocus||j.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!w.pseudos.empty(e)},header:function(e){return fe.test(e.nodeName)},input:function(e){return me.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:d(function(){return[0]}),last:d(function(e,t){return[t-1]}),eq:d(function(e,t,n){return[0>n?n+t:n]}),even:d(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:d(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:d(function(e,t,n){for(var i=0>n?n+t:n;--i>=0;)e.push(i);return e}),gt:d(function(e,t,n){for(var i=0>n?n+t:n;++i<t;)e.push(i);return e})}},w.pseudos.nth=w.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[b]=o(b);for(b in{submit:!0,reset:!0})w.pseudos[b]=l(b);return c.prototype=w.filters=w.pseudos,w.setFilters=new c,Y=t.tokenize=function(e,n){var i,a,r,s,o,l,d,u=R[e+" "];if(u)return n?0:u.slice(0);for(o=e,l=[],d=w.preFilter;o;){(!i||(a=le.exec(o)))&&(a&&(o=o.slice(a[0].length)||o),l.push(r=[])),i=!1,(a=de.exec(o))&&(i=a.shift(),r.push({value:i,type:a[0].replace(oe," ")}),o=o.slice(i.length));for(s in w.filter)!(a=pe[s].exec(o))||d[s]&&!(a=d[s](a))||(i=a.shift(),r.push({value:i,type:s,matches:a}),o=o.slice(i.length));if(!i)break}return n?o.length:o?t.error(e):R(e,l).slice(0)},D=t.compile=function(e,t){var n,i=[],a=[],r=B[e+" "];if(!r){for(t||(t=Y(e)),n=t.length;n--;)r=y(t[n]),r[N]?i.push(r):a.push(r);r=B(e,v(a,i)),r.selector=e}return r},T=t.select=function(e,t,n,i){var a,r,s,o,l,d="function"==typeof e&&e,c=!i&&Y(e=d.selector||e);if(n=n||[],1===c.length){if(r=c[0]=c[0].slice(0),r.length>2&&"ID"===(s=r[0]).type&&M.getById&&9===t.nodeType&&A&&w.relative[r[1].type]){if(t=(w.find.ID(s.matches[0].replace(be,Me),t)||[])[0],!t)return n;d&&(t=t.parentNode),e=e.slice(r.shift().value.length)}for(a=pe.needsContext.test(e)?0:r.length;a--&&(s=r[a],!w.relative[o=s.type]);)if((l=w.find[o])&&(i=l(s.matches[0].replace(be,Me),ye.test(r[0].type)&&u(t.parentNode)||t))){if(r.splice(a,1),e=i.length&&h(r),!e)return X.apply(n,i),n;break}}return(d||D(e,c))(i,t,!A,n,!t||ye.test(e)&&u(t.parentNode)||t),n},M.sortStable=N.split("").sort(U).join("")===N,M.detectDuplicates=!!C,H(),M.sortDetached=a(function(e){return 1&e.compareDocumentPosition(j.createElement("div"))}),a(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||r("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),M.attributes&&a(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||r("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),a(function(e){return null==e.getAttribute("disabled")})||r(te,function(e,t,n){var i;return n?void 0:e[t]===!0?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null}),t}(e);pe.find=ye,pe.expr=ye.selectors,pe.expr[":"]=pe.expr.pseudos,pe.uniqueSort=pe.unique=ye.uniqueSort,pe.text=ye.getText,pe.isXMLDoc=ye.isXML,pe.contains=ye.contains;var ve=function(e,t,n){for(var i=[],a=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(a&&pe(e).is(n))break;i.push(e)}return i},be=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},Me=pe.expr.match.needsContext,we=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Le=/^.[^:#\[\.,]*$/;pe.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?pe.find.matchesSelector(i,e)?[i]:[]:pe.find.matches(e,pe.grep(t,function(e){return 1===e.nodeType}))},pe.fn.extend({find:function(e){var t,n=[],i=this,a=i.length;if("string"!=typeof e)return this.pushStack(pe(e).filter(function(){for(t=0;a>t;t++)if(pe.contains(i[t],this))return!0}));for(t=0;a>t;t++)pe.find(e,i[t],n);return n=this.pushStack(a>1?pe.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},filter:function(e){return this.pushStack(i(this,e||[],!1))},not:function(e){return this.pushStack(i(this,e||[],!0))},is:function(e){return!!i(this,"string"==typeof e&&Me.test(e)?pe(e):e||[],!1).length}});var ke,Ye=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,De=pe.fn.init=function(e,t,n){var i,a;if(!e)return this;if(n=n||ke,"string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:Ye.exec(e),!i||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof pe?t[0]:t,pe.merge(this,pe.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:ie,!0)),we.test(i[1])&&pe.isPlainObject(t))for(i in t)pe.isFunction(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}if(a=ie.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return ke.find(e);this.length=1,this[0]=a}return this.context=ie,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):pe.isFunction(e)?"undefined"!=typeof n.ready?n.ready(e):e(pe):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),pe.makeArray(e,this))};De.prototype=pe.fn,ke=pe(ie);var Te=/^(?:parents|prev(?:Until|All))/,xe={children:!0,contents:!0,next:!0,prev:!0};pe.fn.extend({has:function(e){var t,n=pe(e,this),i=n.length;return this.filter(function(){for(t=0;i>t;t++)if(pe.contains(this,n[t]))return!0})},closest:function(e,t){for(var n,i=0,a=this.length,r=[],s=Me.test(e)||"string"!=typeof e?pe(e,t||this.context):0;a>i;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&pe.find.matchesSelector(n,e))){r.push(n);break}return this.pushStack(r.length>1?pe.uniqueSort(r):r)},index:function(e){return e?"string"==typeof e?pe.inArray(this[0],pe(e)):pe.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(pe.uniqueSort(pe.merge(this.get(),pe(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),pe.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return ve(e,"parentNode")},parentsUntil:function(e,t,n){return ve(e,"parentNode",n)},next:function(e){return a(e,"nextSibling")},prev:function(e){return a(e,"previousSibling")},nextAll:function(e){return ve(e,"nextSibling")},prevAll:function(e){return ve(e,"previousSibling")},nextUntil:function(e,t,n){return ve(e,"nextSibling",n)},prevUntil:function(e,t,n){return ve(e,"previousSibling",n)},siblings:function(e){return be((e.parentNode||{}).firstChild,e)},children:function(e){return be(e.firstChild)},contents:function(e){return pe.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:pe.merge([],e.childNodes)}},function(e,t){pe.fn[e]=function(n,i){var a=pe.map(this,t,n);return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(a=pe.filter(i,a)),this.length>1&&(xe[e]||(a=pe.uniqueSort(a)),Te.test(e)&&(a=a.reverse())),this.pushStack(a)}});var Se=/\S+/g;pe.Callbacks=function(e){e="string"==typeof e?r(e):pe.extend({},e);var t,n,i,a,s=[],o=[],l=-1,d=function(){for(a=e.once,i=t=!0;o.length;l=-1)for(n=o.shift();++l<s.length;)s[l].apply(n[0],n[1])===!1&&e.stopOnFalse&&(l=s.length,n=!1);e.memory||(n=!1),t=!1,a&&(s=n?[]:"")},u={add:function(){return s&&(n&&!t&&(l=s.length-1,o.push(n)),function i(t){pe.each(t,function(t,n){pe.isFunction(n)?e.unique&&u.has(n)||s.push(n):n&&n.length&&"string"!==pe.type(n)&&i(n)})}(arguments),n&&!t&&d()),this},remove:function(){return pe.each(arguments,function(e,t){for(var n;(n=pe.inArray(t,s,n))>-1;)s.splice(n,1),l>=n&&l--}),this},has:function(e){return e?pe.inArray(e,s)>-1:s.length>0},empty:function(){return s&&(s=[]),this},disable:function(){return a=o=[],s=n="",this},disabled:function(){return!s},lock:function(){return a=!0,n||u.disable(),this},locked:function(){return!!a},fireWith:function(e,n){return a||(n=n||[],n=[e,n.slice?n.slice():n],o.push(n),t||d()),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!i}};return u},pe.extend({Deferred:function(e){var t=[["resolve","done",pe.Callbacks("once memory"),"resolved"],["reject","fail",pe.Callbacks("once memory"),"rejected"],["notify","progress",pe.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return a.done(arguments).fail(arguments),this},then:function(){var e=arguments;return pe.Deferred(function(n){pe.each(t,function(t,r){var s=pe.isFunction(e[t])&&e[t];a[r[1]](function(){var e=s&&s.apply(this,arguments);e&&pe.isFunction(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this===i?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?pe.extend(e,i):i}},a={};return i.pipe=i.then,pe.each(t,function(e,r){var s=r[2],o=r[3];i[r[1]]=s.add,o&&s.add(function(){n=o},t[1^e][2].disable,t[2][2].lock),a[r[0]]=function(){return a[r[0]+"With"](this===a?i:this,arguments),this},a[r[0]+"With"]=s.fireWith}),i.promise(a),e&&e.call(a,a),a},when:function(e){var t,n,i,a=0,r=ae.call(arguments),s=r.length,o=1!==s||e&&pe.isFunction(e.promise)?s:0,l=1===o?e:pe.Deferred(),d=function(e,n,i){return function(a){n[e]=this,i[e]=arguments.length>1?ae.call(arguments):a,i===t?l.notifyWith(n,i):--o||l.resolveWith(n,i)}};if(s>1)for(t=new Array(s),n=new Array(s),i=new Array(s);s>a;a++)r[a]&&pe.isFunction(r[a].promise)?r[a].promise().progress(d(a,n,t)).done(d(a,i,r)).fail(l.reject):--o;return o||l.resolveWith(i,r),l.promise()}});var Ce;pe.fn.ready=function(e){return pe.ready.promise().done(e),this},pe.extend({isReady:!1,readyWait:1,holdReady:function(e){e?pe.readyWait++:pe.ready(!0)},ready:function(e){(e===!0?--pe.readyWait:pe.isReady)||(pe.isReady=!0,e!==!0&&--pe.readyWait>0||(Ce.resolveWith(ie,[pe]),pe.fn.triggerHandler&&(pe(ie).triggerHandler("ready"),pe(ie).off("ready"))))}}),pe.ready.promise=function(t){if(!Ce)if(Ce=pe.Deferred(),"complete"===ie.readyState||"loading"!==ie.readyState&&!ie.documentElement.doScroll)e.setTimeout(pe.ready);else if(ie.addEventListener)ie.addEventListener("DOMContentLoaded",o),e.addEventListener("load",o);else{ie.attachEvent("onreadystatechange",o),e.attachEvent("onload",o);var n=!1;try{n=null==e.frameElement&&ie.documentElement}catch(i){}n&&n.doScroll&&!function a(){if(!pe.isReady){try{n.doScroll("left")}catch(t){return e.setTimeout(a,50)}s(),pe.ready()}}()}return Ce.promise(t)},pe.ready.promise();var He;for(He in pe(ce))break;ce.ownFirst="0"===He,ce.inlineBlockNeedsLayout=!1,pe(function(){var e,t,n,i;n=ie.getElementsByTagName("body")[0],n&&n.style&&(t=ie.createElement("div"),i=ie.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(t),"undefined"!=typeof t.style.zoom&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ce.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(i))}),function(){var e=ie.createElement("div");ce.deleteExpando=!0;try{delete e.test}catch(t){ce.deleteExpando=!1}e=null}();var je=function(e){var t=pe.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return 1!==n&&9!==n?!1:!t||t!==!0&&e.getAttribute("classid")===t},Ee=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Ae=/([A-Z])/g;pe.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?pe.cache[e[pe.expando]]:e[pe.expando],!!e&&!d(e)},data:function(e,t,n){return u(e,t,n)},removeData:function(e,t){return c(e,t)},_data:function(e,t,n){return u(e,t,n,!0)},_removeData:function(e,t){return c(e,t,!0)}}),pe.fn.extend({data:function(e,t){var n,i,a,r=this[0],s=r&&r.attributes;if(void 0===e){if(this.length&&(a=pe.data(r),1===r.nodeType&&!pe._data(r,"parsedAttrs"))){for(n=s.length;n--;)s[n]&&(i=s[n].name,0===i.indexOf("data-")&&(i=pe.camelCase(i.slice(5)),l(r,i,a[i])));pe._data(r,"parsedAttrs",!0)}return a}return"object"==typeof e?this.each(function(){pe.data(this,e)}):arguments.length>1?this.each(function(){pe.data(this,e,t)}):r?l(r,e,pe.data(r,e)):void 0},removeData:function(e){return this.each(function(){pe.removeData(this,e)})}}),pe.extend({queue:function(e,t,n){var i;return e?(t=(t||"fx")+"queue",i=pe._data(e,t),n&&(!i||pe.isArray(n)?i=pe._data(e,t,pe.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=pe.queue(e,t),i=n.length,a=n.shift(),r=pe._queueHooks(e,t),s=function(){pe.dequeue(e,t)};"inprogress"===a&&(a=n.shift(),i--),a&&("fx"===t&&n.unshift("inprogress"),delete r.stop,a.call(e,s,r)),!i&&r&&r.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return pe._data(e,n)||pe._data(e,n,{empty:pe.Callbacks("once memory").add(function(){pe._removeData(e,t+"queue"),pe._removeData(e,n)})})}}),pe.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?pe.queue(this[0],e):void 0===t?this:this.each(function(){var n=pe.queue(this,e,t);pe._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&pe.dequeue(this,e)})},dequeue:function(e){return this.each(function(){pe.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,a=pe.Deferred(),r=this,s=this.length,o=function(){--i||a.resolveWith(r,[r])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=pe._data(r[s],e+"queueHooks"),n&&n.empty&&(i++,n.empty.add(o));return o(),a.promise(t)}}),function(){var e;ce.shrinkWrapBlocks=function(){if(null!=e)return e;e=!1;var t,n,i;return n=ie.getElementsByTagName("body")[0],n&&n.style?(t=ie.createElement("div"),i=ie.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(t),"undefined"!=typeof t.style.zoom&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(ie.createElement("div")).style.width="5px",e=3!==t.offsetWidth),n.removeChild(i),e):void 0}}();var Pe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ie=new RegExp("^(?:([+-])=|)("+Pe+")([a-z%]*)$","i"),We=["Top","Right","Bottom","Left"],Fe=function(e,t){return e=t||e,"none"===pe.css(e,"display")||!pe.contains(e.ownerDocument,e)},Ne=function(e,t,n,i,a,r,s){var o=0,l=e.length,d=null==n;if("object"===pe.type(n)){a=!0;for(o in n)Ne(e,t,o,n[o],!0,r,s)}else if(void 0!==i&&(a=!0,pe.isFunction(i)||(s=!0),d&&(s?(t.call(e,i),t=null):(d=t,t=function(e,t,n){return d.call(pe(e),n)})),t))for(;l>o;o++)t(e[o],n,s?i:i.call(e[o],o,t(e[o],n)));return a?e:d?t.call(e):l?t(e[0],n):r},Oe=/^(?:checkbox|radio)$/i,$e=/<([\w:-]+)/,ze=/^$|\/(?:java|ecma)script/i,qe=/^\s+/,Re="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";!function(){var e=ie.createElement("div"),t=ie.createDocumentFragment(),n=ie.createElement("input");e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ce.leadingWhitespace=3===e.firstChild.nodeType,ce.tbody=!e.getElementsByTagName("tbody").length,ce.htmlSerialize=!!e.getElementsByTagName("link").length,ce.html5Clone="<:nav></:nav>"!==ie.createElement("nav").cloneNode(!0).outerHTML,n.type="checkbox",n.checked=!0,t.appendChild(n),ce.appendChecked=n.checked,e.innerHTML="<textarea>x</textarea>",ce.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,t.appendChild(e),n=ie.createElement("input"),n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),e.appendChild(n),ce.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.noCloneEvent=!!e.addEventListener,e[pe.expando]=1,ce.attributes=!e.getAttribute(pe.expando)}();var Be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ce.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};Be.optgroup=Be.option,Be.tbody=Be.tfoot=Be.colgroup=Be.caption=Be.thead,Be.th=Be.td;var Ue=/<|&#?\w+;/,Je=/<tbody/i;!function(){var t,n,i=ie.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})n="on"+t,(ce[t]=n in e)||(i.setAttribute(n,"t"),ce[t]=i.attributes[n].expando===!1);i=null}();var Ge=/^(?:input|select|textarea)$/i,Ve=/^key/,Ke=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Qe=/^(?:focusinfocus|focusoutblur)$/,Xe=/^([^.]*)(?:\.(.+)|)/;pe.event={global:{},add:function(e,t,n,i,a){var r,s,o,l,d,u,c,h,p,m,f,_=pe._data(e);if(_){for(n.handler&&(l=n,n=l.handler,a=l.selector),n.guid||(n.guid=pe.guid++),(s=_.events)||(s=_.events={}),(u=_.handle)||(u=_.handle=function(e){return"undefined"==typeof pe||e&&pe.event.triggered===e.type?void 0:pe.event.dispatch.apply(u.elem,arguments)},u.elem=e),t=(t||"").match(Se)||[""],o=t.length;o--;)r=Xe.exec(t[o])||[],p=f=r[1],m=(r[2]||"").split(".").sort(),p&&(d=pe.event.special[p]||{},p=(a?d.delegateType:d.bindType)||p,d=pe.event.special[p]||{},c=pe.extend({type:p,origType:f,data:i,handler:n,guid:n.guid,
selector:a,needsContext:a&&pe.expr.match.needsContext.test(a),namespace:m.join(".")},l),(h=s[p])||(h=s[p]=[],h.delegateCount=0,d.setup&&d.setup.call(e,i,m,u)!==!1||(e.addEventListener?e.addEventListener(p,u,!1):e.attachEvent&&e.attachEvent("on"+p,u))),d.add&&(d.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),a?h.splice(h.delegateCount++,0,c):h.push(c),pe.event.global[p]=!0);e=null}},remove:function(e,t,n,i,a){var r,s,o,l,d,u,c,h,p,m,f,_=pe.hasData(e)&&pe._data(e);if(_&&(u=_.events)){for(t=(t||"").match(Se)||[""],d=t.length;d--;)if(o=Xe.exec(t[d])||[],p=f=o[1],m=(o[2]||"").split(".").sort(),p){for(c=pe.event.special[p]||{},p=(i?c.delegateType:c.bindType)||p,h=u[p]||[],o=o[2]&&new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=r=h.length;r--;)s=h[r],!a&&f!==s.origType||n&&n.guid!==s.guid||o&&!o.test(s.namespace)||i&&i!==s.selector&&("**"!==i||!s.selector)||(h.splice(r,1),s.selector&&h.delegateCount--,c.remove&&c.remove.call(e,s));l&&!h.length&&(c.teardown&&c.teardown.call(e,m,_.handle)!==!1||pe.removeEvent(e,p,_.handle),delete u[p])}else for(p in u)pe.event.remove(e,p+t[d],n,i,!0);pe.isEmptyObject(u)&&(delete _.handle,pe._removeData(e,"events"))}},trigger:function(t,n,i,a){var r,s,o,l,d,u,c,h=[i||ie],p=ue.call(t,"type")?t.type:t,m=ue.call(t,"namespace")?t.namespace.split("."):[];if(o=u=i=i||ie,3!==i.nodeType&&8!==i.nodeType&&!Qe.test(p+pe.event.triggered)&&(p.indexOf(".")>-1&&(m=p.split("."),p=m.shift(),m.sort()),s=p.indexOf(":")<0&&"on"+p,t=t[pe.expando]?t:new pe.Event(p,"object"==typeof t&&t),t.isTrigger=a?2:3,t.namespace=m.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:pe.makeArray(n,[t]),d=pe.event.special[p]||{},a||!d.trigger||d.trigger.apply(i,n)!==!1)){if(!a&&!d.noBubble&&!pe.isWindow(i)){for(l=d.delegateType||p,Qe.test(l+p)||(o=o.parentNode);o;o=o.parentNode)h.push(o),u=o;u===(i.ownerDocument||ie)&&h.push(u.defaultView||u.parentWindow||e)}for(c=0;(o=h[c++])&&!t.isPropagationStopped();)t.type=c>1?l:d.bindType||p,r=(pe._data(o,"events")||{})[t.type]&&pe._data(o,"handle"),r&&r.apply(o,n),r=s&&o[s],r&&r.apply&&je(o)&&(t.result=r.apply(o,n),t.result===!1&&t.preventDefault());if(t.type=p,!a&&!t.isDefaultPrevented()&&(!d._default||d._default.apply(h.pop(),n)===!1)&&je(i)&&s&&i[p]&&!pe.isWindow(i)){u=i[s],u&&(i[s]=null),pe.event.triggered=p;try{i[p]()}catch(f){}pe.event.triggered=void 0,u&&(i[s]=u)}return t.result}},dispatch:function(e){e=pe.event.fix(e);var t,n,i,a,r,s=[],o=ae.call(arguments),l=(pe._data(this,"events")||{})[e.type]||[],d=pe.event.special[e.type]||{};if(o[0]=e,e.delegateTarget=this,!d.preDispatch||d.preDispatch.call(this,e)!==!1){for(s=pe.event.handlers.call(this,e,l),t=0;(a=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=a.elem,n=0;(r=a.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.rnamespace||e.rnamespace.test(r.namespace))&&(e.handleObj=r,e.data=r.data,i=((pe.event.special[r.origType]||{}).handle||r.handler).apply(a.elem,o),void 0!==i&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return d.postDispatch&&d.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,i,a,r,s=[],o=t.delegateCount,l=e.target;if(o&&l.nodeType&&("click"!==e.type||isNaN(e.button)||e.button<1))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(i=[],n=0;o>n;n++)r=t[n],a=r.selector+" ",void 0===i[a]&&(i[a]=r.needsContext?pe(a,this).index(l)>-1:pe.find(a,this,null,[l]).length),i[a]&&i.push(r);i.length&&s.push({elem:l,handlers:i})}return o<t.length&&s.push({elem:this,handlers:t.slice(o)}),s},fix:function(e){if(e[pe.expando])return e;var t,n,i,a=e.type,r=e,s=this.fixHooks[a];for(s||(this.fixHooks[a]=s=Ke.test(a)?this.mouseHooks:Ve.test(a)?this.keyHooks:{}),i=s.props?this.props.concat(s.props):this.props,e=new pe.Event(r),t=i.length;t--;)n=i[t],e[n]=r[n];return e.target||(e.target=r.srcElement||ie),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,i,a,r=t.button,s=t.fromElement;return null==e.pageX&&null!=t.clientX&&(i=e.target.ownerDocument||ie,a=i.documentElement,n=i.body,e.pageX=t.clientX+(a&&a.scrollLeft||n&&n.scrollLeft||0)-(a&&a.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(a&&a.scrollTop||n&&n.scrollTop||0)-(a&&a.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?t.toElement:s),e.which||void 0===r||(e.which=1&r?1:2&r?3:4&r?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==b()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===b()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return pe.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(e){return pe.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n){var i=pe.extend(new pe.Event,n,{type:e,isSimulated:!0});pe.event.trigger(i,null,t),i.isDefaultPrevented()&&n.preventDefault()}},pe.removeEvent=ie.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)}:function(e,t,n){var i="on"+t;e.detachEvent&&("undefined"==typeof e[i]&&(e[i]=null),e.detachEvent(i,n))},pe.Event=function(e,t){return this instanceof pe.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?y:v):this.type=e,t&&pe.extend(this,t),this.timeStamp=e&&e.timeStamp||pe.now(),void(this[pe.expando]=!0)):new pe.Event(e,t)},pe.Event.prototype={constructor:pe.Event,isDefaultPrevented:v,isPropagationStopped:v,isImmediatePropagationStopped:v,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=y,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=y,e&&!this.isSimulated&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=y,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},pe.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){pe.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,a=e.relatedTarget,r=e.handleObj;return(!a||a!==i&&!pe.contains(i,a))&&(e.type=r.origType,n=r.handler.apply(this,arguments),e.type=t),n}}}),ce.submit||(pe.event.special.submit={setup:function(){return pe.nodeName(this,"form")?!1:void pe.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=pe.nodeName(t,"input")||pe.nodeName(t,"button")?pe.prop(t,"form"):void 0;n&&!pe._data(n,"submit")&&(pe.event.add(n,"submit._submit",function(e){e._submitBubble=!0}),pe._data(n,"submit",!0))})},postDispatch:function(e){e._submitBubble&&(delete e._submitBubble,this.parentNode&&!e.isTrigger&&pe.event.simulate("submit",this.parentNode,e))},teardown:function(){return pe.nodeName(this,"form")?!1:void pe.event.remove(this,"._submit")}}),ce.change||(pe.event.special.change={setup:function(){return Ge.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(pe.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._justChanged=!0)}),pe.event.add(this,"click._change",function(e){this._justChanged&&!e.isTrigger&&(this._justChanged=!1),pe.event.simulate("change",this,e)})),!1):void pe.event.add(this,"beforeactivate._change",function(e){var t=e.target;Ge.test(t.nodeName)&&!pe._data(t,"change")&&(pe.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||pe.event.simulate("change",this.parentNode,e)}),pe._data(t,"change",!0))})},handle:function(e){var t=e.target;return this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type?e.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return pe.event.remove(this,"._change"),!Ge.test(this.nodeName)}}),ce.focusin||pe.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){pe.event.simulate(t,e.target,pe.event.fix(e))};pe.event.special[t]={setup:function(){var i=this.ownerDocument||this,a=pe._data(i,t);a||i.addEventListener(e,n,!0),pe._data(i,t,(a||0)+1)},teardown:function(){var i=this.ownerDocument||this,a=pe._data(i,t)-1;a?pe._data(i,t,a):(i.removeEventListener(e,n,!0),pe._removeData(i,t))}}}),pe.fn.extend({on:function(e,t,n,i){return M(this,e,t,n,i)},one:function(e,t,n,i){return M(this,e,t,n,i,1)},off:function(e,t,n){var i,a;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,pe(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(a in e)this.off(a,t,e[a]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=v),this.each(function(){pe.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){pe.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?pe.event.trigger(e,t,n,!0):void 0}});var Ze=/ jQuery\d+="(?:null|\d+)"/g,et=new RegExp("<(?:"+Re+")[\\s/>]","i"),tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,nt=/<script|<style|<link/i,it=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^true\/(.*)/,rt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,st=p(ie),ot=st.appendChild(ie.createElement("div"));pe.extend({htmlPrefilter:function(e){return e.replace(tt,"<$1></$2>")},clone:function(e,t,n){var i,a,r,s,o,l=pe.contains(e.ownerDocument,e);if(ce.html5Clone||pe.isXMLDoc(e)||!et.test("<"+e.nodeName+">")?r=e.cloneNode(!0):(ot.innerHTML=e.outerHTML,ot.removeChild(r=ot.firstChild)),!(ce.noCloneEvent&&ce.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||pe.isXMLDoc(e)))for(i=m(r),o=m(e),s=0;null!=(a=o[s]);++s)i[s]&&D(a,i[s]);if(t)if(n)for(o=o||m(e),i=i||m(r),s=0;null!=(a=o[s]);s++)Y(a,i[s]);else Y(e,r);return i=m(r,"script"),i.length>0&&f(i,!l&&m(e,"script")),i=o=a=null,r},cleanData:function(e,t){for(var n,i,a,r,s=0,o=pe.expando,l=pe.cache,d=ce.attributes,u=pe.event.special;null!=(n=e[s]);s++)if((t||je(n))&&(a=n[o],r=a&&l[a])){if(r.events)for(i in r.events)u[i]?pe.event.remove(n,i):pe.removeEvent(n,i,r.handle);l[a]&&(delete l[a],d||"undefined"==typeof n.removeAttribute?n[o]=void 0:n.removeAttribute(o),ne.push(a))}}}),pe.fn.extend({domManip:T,detach:function(e){return x(this,e,!0)},remove:function(e){return x(this,e)},text:function(e){return Ne(this,function(e){return void 0===e?pe.text(this):this.empty().append((this[0]&&this[0].ownerDocument||ie).createTextNode(e))},null,e,arguments.length)},append:function(){return T(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=w(this,e);t.appendChild(e)}})},prepend:function(){return T(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=w(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return T(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return T(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&pe.cleanData(m(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&pe.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return pe.clone(this,e,t)})},html:function(e){return Ne(this,function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e)return 1===t.nodeType?t.innerHTML.replace(Ze,""):void 0;if("string"==typeof e&&!nt.test(e)&&(ce.htmlSerialize||!et.test(e))&&(ce.leadingWhitespace||!qe.test(e))&&!Be[($e.exec(e)||["",""])[1].toLowerCase()]){e=pe.htmlPrefilter(e);try{for(;i>n;n++)t=this[n]||{},1===t.nodeType&&(pe.cleanData(m(t,!1)),t.innerHTML=e);t=0}catch(a){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return T(this,arguments,function(t){var n=this.parentNode;pe.inArray(this,e)<0&&(pe.cleanData(m(this)),n&&n.replaceChild(t,this))},e)}}),pe.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){pe.fn[e]=function(e){for(var n,i=0,a=[],r=pe(e),s=r.length-1;s>=i;i++)n=i===s?this:this.clone(!0),pe(r[i])[t](n),se.apply(a,n.get());return this.pushStack(a)}});var lt,dt={HTML:"block",BODY:"block"},ut=/^margin/,ct=new RegExp("^("+Pe+")(?!px)[a-z%]+$","i"),ht=function(e,t,n,i){var a,r,s={};for(r in t)s[r]=e.style[r],e.style[r]=t[r];a=n.apply(e,i||[]);for(r in t)e.style[r]=s[r];return a},pt=ie.documentElement;!function(){function t(){var t,u,c=ie.documentElement;c.appendChild(l),d.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",n=a=o=!1,i=s=!0,e.getComputedStyle&&(u=e.getComputedStyle(d),n="1%"!==(u||{}).top,o="2px"===(u||{}).marginLeft,a="4px"===(u||{width:"4px"}).width,d.style.marginRight="50%",i="4px"===(u||{marginRight:"4px"}).marginRight,t=d.appendChild(ie.createElement("div")),t.style.cssText=d.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",t.style.marginRight=t.style.width="0",d.style.width="1px",s=!parseFloat((e.getComputedStyle(t)||{}).marginRight),d.removeChild(t)),d.style.display="none",r=0===d.getClientRects().length,r&&(d.style.display="",d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",t=d.getElementsByTagName("td"),t[0].style.cssText="margin:0;border:0;padding:0;display:none",r=0===t[0].offsetHeight,r&&(t[0].style.display="",t[1].style.display="none",r=0===t[0].offsetHeight)),c.removeChild(l)}var n,i,a,r,s,o,l=ie.createElement("div"),d=ie.createElement("div");d.style&&(d.style.cssText="float:left;opacity:.5",ce.opacity="0.5"===d.style.opacity,ce.cssFloat=!!d.style.cssFloat,d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",ce.clearCloneStyle="content-box"===d.style.backgroundClip,l=ie.createElement("div"),l.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",d.innerHTML="",l.appendChild(d),ce.boxSizing=""===d.style.boxSizing||""===d.style.MozBoxSizing||""===d.style.WebkitBoxSizing,pe.extend(ce,{reliableHiddenOffsets:function(){return null==n&&t(),r},boxSizingReliable:function(){return null==n&&t(),a},pixelMarginRight:function(){return null==n&&t(),i},pixelPosition:function(){return null==n&&t(),n},reliableMarginRight:function(){return null==n&&t(),s},reliableMarginLeft:function(){return null==n&&t(),o}}))}();var mt,ft,_t=/^(top|right|bottom|left)$/;e.getComputedStyle?(mt=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},ft=function(e,t,n){var i,a,r,s,o=e.style;return n=n||mt(e),s=n?n.getPropertyValue(t)||n[t]:void 0,""!==s&&void 0!==s||pe.contains(e.ownerDocument,e)||(s=pe.style(e,t)),n&&!ce.pixelMarginRight()&&ct.test(s)&&ut.test(t)&&(i=o.width,a=o.minWidth,r=o.maxWidth,o.minWidth=o.maxWidth=o.width=s,s=n.width,o.width=i,o.minWidth=a,o.maxWidth=r),void 0===s?s:s+""}):pt.currentStyle&&(mt=function(e){return e.currentStyle},ft=function(e,t,n){var i,a,r,s,o=e.style;return n=n||mt(e),s=n?n[t]:void 0,null==s&&o&&o[t]&&(s=o[t]),ct.test(s)&&!_t.test(t)&&(i=o.left,a=e.runtimeStyle,r=a&&a.left,r&&(a.left=e.currentStyle.left),o.left="fontSize"===t?"1em":s,s=o.pixelLeft+"px",o.left=i,r&&(a.left=r)),void 0===s?s:s+""||"auto"});var gt=/alpha\([^)]*\)/i,yt=/opacity\s*=\s*([^)]*)/i,vt=/^(none|table(?!-c[ea]).+)/,bt=new RegExp("^("+Pe+")(.*)$","i"),Mt={position:"absolute",visibility:"hidden",display:"block"},wt={letterSpacing:"0",fontWeight:"400"},Lt=["Webkit","O","Moz","ms"],kt=ie.createElement("div").style;pe.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=ft(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ce.cssFloat?"cssFloat":"styleFloat"},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var a,r,s,o=pe.camelCase(t),l=e.style;if(t=pe.cssProps[o]||(pe.cssProps[o]=j(o)||o),s=pe.cssHooks[t]||pe.cssHooks[o],void 0===n)return s&&"get"in s&&void 0!==(a=s.get(e,!1,i))?a:l[t];if(r=typeof n,"string"===r&&(a=Ie.exec(n))&&a[1]&&(n=h(e,t,a),r="number"),null!=n&&n===n&&("number"===r&&(n+=a&&a[3]||(pe.cssNumber[o]?"":"px")),ce.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),!(s&&"set"in s&&void 0===(n=s.set(e,n,i)))))try{l[t]=n}catch(d){}}},css:function(e,t,n,i){var a,r,s,o=pe.camelCase(t);return t=pe.cssProps[o]||(pe.cssProps[o]=j(o)||o),s=pe.cssHooks[t]||pe.cssHooks[o],s&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=ft(e,t,i)),"normal"===r&&t in wt&&(r=wt[t]),""===n||n?(a=parseFloat(r),n===!0||isFinite(a)?a||0:r):r}}),pe.each(["height","width"],function(e,t){pe.cssHooks[t]={get:function(e,n,i){return n?vt.test(pe.css(e,"display"))&&0===e.offsetWidth?ht(e,Mt,function(){return I(e,t,i)}):I(e,t,i):void 0},set:function(e,n,i){var a=i&&mt(e);return A(e,n,i?P(e,t,i,ce.boxSizing&&"border-box"===pe.css(e,"boxSizing",!1,a),a):0)}}}),ce.opacity||(pe.cssHooks.opacity={get:function(e,t){return yt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,i=e.currentStyle,a=pe.isNumeric(t)?"alpha(opacity="+100*t+")":"",r=i&&i.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===pe.trim(r.replace(gt,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||i&&!i.filter)||(n.filter=gt.test(r)?r.replace(gt,a):r+" "+a)}}),pe.cssHooks.marginRight=H(ce.reliableMarginRight,function(e,t){return t?ht(e,{display:"inline-block"},ft,[e,"marginRight"]):void 0}),pe.cssHooks.marginLeft=H(ce.reliableMarginLeft,function(e,t){return t?(parseFloat(ft(e,"marginLeft"))||(pe.contains(e.ownerDocument,e)?e.getBoundingClientRect().left-ht(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}):0))+"px":void 0}),pe.each({margin:"",padding:"",border:"Width"},function(e,t){pe.cssHooks[e+t]={expand:function(n){for(var i=0,a={},r="string"==typeof n?n.split(" "):[n];4>i;i++)a[e+We[i]+t]=r[i]||r[i-2]||r[0];return a}},ut.test(e)||(pe.cssHooks[e+t].set=A)}),pe.fn.extend({css:function(e,t){return Ne(this,function(e,t,n){var i,a,r={},s=0;if(pe.isArray(t)){for(i=mt(e),a=t.length;a>s;s++)r[t[s]]=pe.css(e,t[s],!1,i);return r}return void 0!==n?pe.style(e,t,n):pe.css(e,t)},e,t,arguments.length>1)},show:function(){return E(this,!0)},hide:function(){return E(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Fe(this)?pe(this).show():pe(this).hide()})}}),pe.Tween=W,W.prototype={constructor:W,init:function(e,t,n,i,a,r){this.elem=e,this.prop=n,this.easing=a||pe.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=r||(pe.cssNumber[n]?"":"px")},cur:function(){var e=W.propHooks[this.prop];return e&&e.get?e.get(this):W.propHooks._default.get(this)},run:function(e){var t,n=W.propHooks[this.prop];return this.options.duration?this.pos=t=pe.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):W.propHooks._default.set(this),this}},W.prototype.init.prototype=W.prototype,W.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=pe.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){pe.fx.step[e.prop]?pe.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[pe.cssProps[e.prop]]&&!pe.cssHooks[e.prop]?e.elem[e.prop]=e.now:pe.style(e.elem,e.prop,e.now+e.unit)}}},W.propHooks.scrollTop=W.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},pe.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},pe.fx=W.prototype.init,pe.fx.step={};var Yt,Dt,Tt=/^(?:toggle|show|hide)$/,xt=/queueHooks$/;pe.Animation=pe.extend(q,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return h(n.elem,e,Ie.exec(t),n),n}]},tweener:function(e,t){pe.isFunction(e)?(t=e,e=["*"]):e=e.match(Se);for(var n,i=0,a=e.length;a>i;i++)n=e[i],q.tweeners[n]=q.tweeners[n]||[],q.tweeners[n].unshift(t)},prefilters:[$],prefilter:function(e,t){t?q.prefilters.unshift(e):q.prefilters.push(e)}}),pe.speed=function(e,t,n){var i=e&&"object"==typeof e?pe.extend({},e):{complete:n||!n&&t||pe.isFunction(e)&&e,duration:e,easing:n&&t||t&&!pe.isFunction(t)&&t};return i.duration=pe.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in pe.fx.speeds?pe.fx.speeds[i.duration]:pe.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){pe.isFunction(i.old)&&i.old.call(this),i.queue&&pe.dequeue(this,i.queue)},i},pe.fn.extend({fadeTo:function(e,t,n,i){return this.filter(Fe).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var a=pe.isEmptyObject(e),r=pe.speed(t,n,i),s=function(){var t=q(this,pe.extend({},e),r);(a||pe._data(this,"finish"))&&t.stop(!0)};return s.finish=s,a||r.queue===!1?this.each(s):this.queue(r.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,a=null!=e&&e+"queueHooks",r=pe.timers,s=pe._data(this);if(a)s[a]&&s[a].stop&&i(s[a]);else for(a in s)s[a]&&s[a].stop&&xt.test(a)&&i(s[a]);for(a=r.length;a--;)r[a].elem!==this||null!=e&&r[a].queue!==e||(r[a].anim.stop(n),t=!1,r.splice(a,1));(t||!n)&&pe.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=pe._data(this),i=n[e+"queue"],a=n[e+"queueHooks"],r=pe.timers,s=i?i.length:0;for(n.finish=!0,pe.queue(this,e,[]),a&&a.stop&&a.stop.call(this,!0),t=r.length;t--;)r[t].elem===this&&r[t].queue===e&&(r[t].anim.stop(!0),r.splice(t,1));for(t=0;s>t;t++)i[t]&&i[t].finish&&i[t].finish.call(this);delete n.finish})}}),pe.each(["toggle","show","hide"],function(e,t){var n=pe.fn[t];pe.fn[t]=function(e,i,a){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(N(t,!0),e,i,a)}}),pe.each({slideDown:N("show"),slideUp:N("hide"),slideToggle:N("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){pe.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}}),pe.timers=[],pe.fx.tick=function(){var e,t=pe.timers,n=0;for(Yt=pe.now();n<t.length;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||pe.fx.stop(),Yt=void 0},pe.fx.timer=function(e){pe.timers.push(e),e()?pe.fx.start():pe.timers.pop()},pe.fx.interval=13,pe.fx.start=function(){Dt||(Dt=e.setInterval(pe.fx.tick,pe.fx.interval))},pe.fx.stop=function(){e.clearInterval(Dt),Dt=null},pe.fx.speeds={slow:600,fast:200,_default:400},pe.fn.delay=function(t,n){return t=pe.fx?pe.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,i){var a=e.setTimeout(n,t);i.stop=function(){e.clearTimeout(a)}})},function(){var e,t=ie.createElement("input"),n=ie.createElement("div"),i=ie.createElement("select"),a=i.appendChild(ie.createElement("option"));n=ie.createElement("div"),n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",e=n.getElementsByTagName("a")[0],t.setAttribute("type","checkbox"),n.appendChild(t),e=n.getElementsByTagName("a")[0],e.style.cssText="top:1px",ce.getSetAttribute="t"!==n.className,ce.style=/top/.test(e.getAttribute("style")),ce.hrefNormalized="/a"===e.getAttribute("href"),ce.checkOn=!!t.value,ce.optSelected=a.selected,ce.enctype=!!ie.createElement("form").enctype,i.disabled=!0,ce.optDisabled=!a.disabled,t=ie.createElement("input"),t.setAttribute("value",""),ce.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),ce.radioValue="t"===t.value}();var St=/\r/g;pe.fn.extend({val:function(e){var t,n,i,a=this[0];{if(arguments.length)return i=pe.isFunction(e),this.each(function(n){var a;1===this.nodeType&&(a=i?e.call(this,n,pe(this).val()):e,null==a?a="":"number"==typeof a?a+="":pe.isArray(a)&&(a=pe.map(a,function(e){return null==e?"":e+""})),t=pe.valHooks[this.type]||pe.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,a,"value")||(this.value=a))});if(a)return t=pe.valHooks[a.type]||pe.valHooks[a.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(a,"value"))?n:(n=a.value,"string"==typeof n?n.replace(St,""):null==n?"":n)}}}),pe.extend({valHooks:{option:{get:function(e){var t=pe.find.attr(e,"value");return null!=t?t:pe.trim(pe.text(e))}},select:{get:function(e){for(var t,n,i=e.options,a=e.selectedIndex,r="select-one"===e.type||0>a,s=r?null:[],o=r?a+1:i.length,l=0>a?o:r?a:0;o>l;l++)if(n=i[l],(n.selected||l===a)&&(ce.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!pe.nodeName(n.parentNode,"optgroup"))){if(t=pe(n).val(),r)return t;s.push(t)}return s},set:function(e,t){for(var n,i,a=e.options,r=pe.makeArray(t),s=a.length;s--;)if(i=a[s],pe.inArray(pe.valHooks.option.get(i),r)>=0)try{i.selected=n=!0}catch(o){i.scrollHeight}else i.selected=!1;return n||(e.selectedIndex=-1),a}}}}),pe.each(["radio","checkbox"],function(){pe.valHooks[this]={set:function(e,t){return pe.isArray(t)?e.checked=pe.inArray(pe(e).val(),t)>-1:void 0}},ce.checkOn||(pe.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Ct,Ht,jt=pe.expr.attrHandle,Et=/^(?:checked|selected)$/i,At=ce.getSetAttribute,Pt=ce.input;pe.fn.extend({attr:function(e,t){return Ne(this,pe.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){pe.removeAttr(this,e)})}}),pe.extend({attr:function(e,t,n){var i,a,r=e.nodeType;if(3!==r&&8!==r&&2!==r)return"undefined"==typeof e.getAttribute?pe.prop(e,t,n):(1===r&&pe.isXMLDoc(e)||(t=t.toLowerCase(),a=pe.attrHooks[t]||(pe.expr.match.bool.test(t)?Ht:Ct)),void 0!==n?null===n?void pe.removeAttr(e,t):a&&"set"in a&&void 0!==(i=a.set(e,n,t))?i:(e.setAttribute(t,n+""),n):a&&"get"in a&&null!==(i=a.get(e,t))?i:(i=pe.find.attr(e,t),null==i?void 0:i))},attrHooks:{type:{set:function(e,t){if(!ce.radioValue&&"radio"===t&&pe.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i,a=0,r=t&&t.match(Se);if(r&&1===e.nodeType)for(;n=r[a++];)i=pe.propFix[n]||n,pe.expr.match.bool.test(n)?Pt&&At||!Et.test(n)?e[i]=!1:e[pe.camelCase("default-"+n)]=e[i]=!1:pe.attr(e,n,""),e.removeAttribute(At?n:i)}}),Ht={set:function(e,t,n){return t===!1?pe.removeAttr(e,n):Pt&&At||!Et.test(n)?e.setAttribute(!At&&pe.propFix[n]||n,n):e[pe.camelCase("default-"+n)]=e[n]=!0,n}},pe.each(pe.expr.match.bool.source.match(/\w+/g),function(e,t){var n=jt[t]||pe.find.attr;Pt&&At||!Et.test(t)?jt[t]=function(e,t,i){var a,r;return i||(r=jt[t],jt[t]=a,a=null!=n(e,t,i)?t.toLowerCase():null,jt[t]=r),a}:jt[t]=function(e,t,n){return n?void 0:e[pe.camelCase("default-"+t)]?t.toLowerCase():null}}),Pt&&At||(pe.attrHooks.value={set:function(e,t,n){return pe.nodeName(e,"input")?void(e.defaultValue=t):Ct&&Ct.set(e,t,n)}}),At||(Ct={set:function(e,t,n){var i=e.getAttributeNode(n);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(n)),i.value=t+="","value"===n||t===e.getAttribute(n)?t:void 0}},jt.id=jt.name=jt.coords=function(e,t,n){var i;return n?void 0:(i=e.getAttributeNode(t))&&""!==i.value?i.value:null},pe.valHooks.button={get:function(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:void 0},set:Ct.set},pe.attrHooks.contenteditable={set:function(e,t,n){Ct.set(e,""===t?!1:t,n)}},pe.each(["width","height"],function(e,t){pe.attrHooks[t]={set:function(e,n){return""===n?(e.setAttribute(t,"auto"),n):void 0}}})),ce.style||(pe.attrHooks.style={get:function(e){return e.style.cssText||void 0},set:function(e,t){return e.style.cssText=t+""}});var It=/^(?:input|select|textarea|button|object)$/i,Wt=/^(?:a|area)$/i;pe.fn.extend({prop:function(e,t){return Ne(this,pe.prop,e,t,arguments.length>1)},removeProp:function(e){return e=pe.propFix[e]||e,this.each(function(){try{this[e]=void 0,delete this[e]}catch(t){}})}}),pe.extend({prop:function(e,t,n){var i,a,r=e.nodeType;if(3!==r&&8!==r&&2!==r)return 1===r&&pe.isXMLDoc(e)||(t=pe.propFix[t]||t,a=pe.propHooks[t]),void 0!==n?a&&"set"in a&&void 0!==(i=a.set(e,n,t))?i:e[t]=n:a&&"get"in a&&null!==(i=a.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){var t=pe.find.attr(e,"tabindex");return t?parseInt(t,10):It.test(e.nodeName)||Wt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),ce.hrefNormalized||pe.each(["href","src"],function(e,t){pe.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),ce.optSelected||(pe.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),pe.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){pe.propFix[this.toLowerCase()]=this}),ce.enctype||(pe.propFix.enctype="encoding");var Ft=/[\t\r\n\f]/g;pe.fn.extend({addClass:function(e){var t,n,i,a,r,s,o,l=0;if(pe.isFunction(e))return this.each(function(t){pe(this).addClass(e.call(this,t,R(this)))});if("string"==typeof e&&e)for(t=e.match(Se)||[];n=this[l++];)if(a=R(n),i=1===n.nodeType&&(" "+a+" ").replace(Ft," ")){for(s=0;r=t[s++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");o=pe.trim(i),a!==o&&pe.attr(n,"class",o)}return this},removeClass:function(e){var t,n,i,a,r,s,o,l=0;if(pe.isFunction(e))return this.each(function(t){pe(this).removeClass(e.call(this,t,R(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(Se)||[];n=this[l++];)if(a=R(n),i=1===n.nodeType&&(" "+a+" ").replace(Ft," ")){for(s=0;r=t[s++];)for(;i.indexOf(" "+r+" ")>-1;)i=i.replace(" "+r+" "," ");o=pe.trim(i),a!==o&&pe.attr(n,"class",o)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):pe.isFunction(e)?this.each(function(n){pe(this).toggleClass(e.call(this,n,R(this),t),t)}):this.each(function(){var t,i,a,r;if("string"===n)for(i=0,a=pe(this),r=e.match(Se)||[];t=r[i++];)a.hasClass(t)?a.removeClass(t):a.addClass(t);else(void 0===e||"boolean"===n)&&(t=R(this),t&&pe._data(this,"__className__",t),pe.attr(this,"class",t||e===!1?"":pe._data(this,"__className__")||""))})},hasClass:function(e){var t,n,i=0;for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+R(n)+" ").replace(Ft," ").indexOf(t)>-1)return!0;return!1}}),pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){pe.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),pe.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}});var Nt=e.location,Ot=pe.now(),$t=/\?/,zt=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;pe.parseJSON=function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t+"");var n,i=null,a=pe.trim(t+"");return a&&!pe.trim(a.replace(zt,function(e,t,a,r){return n&&t&&(i=0),0===i?e:(n=a||t,i+=!r-!a,"")}))?Function("return "+a)():pe.error("Invalid JSON: "+t)},pe.parseXML=function(t){var n,i;if(!t||"string"!=typeof t)return null;try{e.DOMParser?(i=new e.DOMParser,n=i.parseFromString(t,"text/xml")):(n=new e.ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t))}catch(a){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||pe.error("Invalid XML: "+t),n};var qt=/#.*$/,Rt=/([?&])_=[^&]*/,Bt=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ut=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Jt=/^(?:GET|HEAD)$/,Gt=/^\/\//,Vt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Kt={},Qt={},Xt="*/".concat("*"),Zt=Nt.href,en=Vt.exec(Zt.toLowerCase())||[];
pe.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Zt,type:"GET",isLocal:Ut.test(en[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":pe.parseJSON,"text xml":pe.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?J(J(e,pe.ajaxSettings),t):J(pe.ajaxSettings,e)},ajaxPrefilter:B(Kt),ajaxTransport:B(Qt),ajax:function(t,n){function i(t,n,i,a){var r,c,y,v,M,L=n;2!==b&&(b=2,l&&e.clearTimeout(l),u=void 0,o=a||"",w.readyState=t>0?4:0,r=t>=200&&300>t||304===t,i&&(v=G(h,w,i)),v=V(h,v,w,r),r?(h.ifModified&&(M=w.getResponseHeader("Last-Modified"),M&&(pe.lastModified[s]=M),M=w.getResponseHeader("etag"),M&&(pe.etag[s]=M)),204===t||"HEAD"===h.type?L="nocontent":304===t?L="notmodified":(L=v.state,c=v.data,y=v.error,r=!y)):(y=L,(t||!L)&&(L="error",0>t&&(t=0))),w.status=t,w.statusText=(n||L)+"",r?f.resolveWith(p,[c,L,w]):f.rejectWith(p,[w,L,y]),w.statusCode(g),g=void 0,d&&m.trigger(r?"ajaxSuccess":"ajaxError",[w,h,r?c:y]),_.fireWith(p,[w,L]),d&&(m.trigger("ajaxComplete",[w,h]),--pe.active||pe.event.trigger("ajaxStop")))}"object"==typeof t&&(n=t,t=void 0),n=n||{};var a,r,s,o,l,d,u,c,h=pe.ajaxSetup({},n),p=h.context||h,m=h.context&&(p.nodeType||p.jquery)?pe(p):pe.event,f=pe.Deferred(),_=pe.Callbacks("once memory"),g=h.statusCode||{},y={},v={},b=0,M="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c)for(c={};t=Bt.exec(o);)c[t[1].toLowerCase()]=t[2];t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)g[t]=[g[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||M;return u&&u.abort(t),i(0,t),this}};if(f.promise(w).complete=_.add,w.success=w.done,w.error=w.fail,h.url=((t||h.url||Zt)+"").replace(qt,"").replace(Gt,en[1]+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=pe.trim(h.dataType||"*").toLowerCase().match(Se)||[""],null==h.crossDomain&&(a=Vt.exec(h.url.toLowerCase()),h.crossDomain=!(!a||a[1]===en[1]&&a[2]===en[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(en[3]||("http:"===en[1]?"80":"443")))),h.data&&h.processData&&"string"!=typeof h.data&&(h.data=pe.param(h.data,h.traditional)),U(Kt,h,n,w),2===b)return w;d=pe.event&&h.global,d&&0===pe.active++&&pe.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Jt.test(h.type),s=h.url,h.hasContent||(h.data&&(s=h.url+=($t.test(s)?"&":"?")+h.data,delete h.data),h.cache===!1&&(h.url=Rt.test(s)?s.replace(Rt,"$1_="+Ot++):s+($t.test(s)?"&":"?")+"_="+Ot++)),h.ifModified&&(pe.lastModified[s]&&w.setRequestHeader("If-Modified-Since",pe.lastModified[s]),pe.etag[s]&&w.setRequestHeader("If-None-Match",pe.etag[s])),(h.data&&h.hasContent&&h.contentType!==!1||n.contentType)&&w.setRequestHeader("Content-Type",h.contentType),w.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Xt+"; q=0.01":""):h.accepts["*"]);for(r in h.headers)w.setRequestHeader(r,h.headers[r]);if(h.beforeSend&&(h.beforeSend.call(p,w,h)===!1||2===b))return w.abort();M="abort";for(r in{success:1,error:1,complete:1})w[r](h[r]);if(u=U(Qt,h,n,w)){if(w.readyState=1,d&&m.trigger("ajaxSend",[w,h]),2===b)return w;h.async&&h.timeout>0&&(l=e.setTimeout(function(){w.abort("timeout")},h.timeout));try{b=1,u.send(y,i)}catch(L){if(!(2>b))throw L;i(-1,L)}}else i(-1,"No Transport");return w},getJSON:function(e,t,n){return pe.get(e,t,n,"json")},getScript:function(e,t){return pe.get(e,void 0,t,"script")}}),pe.each(["get","post"],function(e,t){pe[t]=function(e,n,i,a){return pe.isFunction(n)&&(a=a||i,i=n,n=void 0),pe.ajax(pe.extend({url:e,type:t,dataType:a,data:n,success:i},pe.isPlainObject(e)&&e))}}),pe._evalUrl=function(e){return pe.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},pe.fn.extend({wrapAll:function(e){if(pe.isFunction(e))return this.each(function(t){pe(this).wrapAll(e.call(this,t))});if(this[0]){var t=pe(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return pe.isFunction(e)?this.each(function(t){pe(this).wrapInner(e.call(this,t))}):this.each(function(){var t=pe(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=pe.isFunction(e);return this.each(function(n){pe(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){pe.nodeName(this,"body")||pe(this).replaceWith(this.childNodes)}).end()}}),pe.expr.filters.hidden=function(e){return ce.reliableHiddenOffsets()?e.offsetWidth<=0&&e.offsetHeight<=0&&!e.getClientRects().length:Q(e)},pe.expr.filters.visible=function(e){return!pe.expr.filters.hidden(e)};var tn=/%20/g,nn=/\[\]$/,an=/\r?\n/g,rn=/^(?:submit|button|image|reset|file)$/i,sn=/^(?:input|select|textarea|keygen)/i;pe.param=function(e,t){var n,i=[],a=function(e,t){t=pe.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=pe.ajaxSettings&&pe.ajaxSettings.traditional),pe.isArray(e)||e.jquery&&!pe.isPlainObject(e))pe.each(e,function(){a(this.name,this.value)});else for(n in e)X(n,e[n],t,a);return i.join("&").replace(tn,"+")},pe.fn.extend({serialize:function(){return pe.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=pe.prop(this,"elements");return e?pe.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!pe(this).is(":disabled")&&sn.test(this.nodeName)&&!rn.test(e)&&(this.checked||!Oe.test(e))}).map(function(e,t){var n=pe(this).val();return null==n?null:pe.isArray(n)?pe.map(n,function(e){return{name:t.name,value:e.replace(an,"\r\n")}}):{name:t.name,value:n.replace(an,"\r\n")}}).get()}}),pe.ajaxSettings.xhr=void 0!==e.ActiveXObject?function(){return this.isLocal?ee():ie.documentMode>8?Z():/^(get|post|head|put|delete|options)$/i.test(this.type)&&Z()||ee()}:Z;var on=0,ln={},dn=pe.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in ln)ln[e](void 0,!0)}),ce.cors=!!dn&&"withCredentials"in dn,dn=ce.ajax=!!dn,dn&&pe.ajaxTransport(function(t){if(!t.crossDomain||ce.cors){var n;return{send:function(i,a){var r,s=t.xhr(),o=++on;if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(r in t.xhrFields)s[r]=t.xhrFields[r];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(r in i)void 0!==i[r]&&s.setRequestHeader(r,i[r]+"");s.send(t.hasContent&&t.data||null),n=function(e,i){var r,l,d;if(n&&(i||4===s.readyState))if(delete ln[o],n=void 0,s.onreadystatechange=pe.noop,i)4!==s.readyState&&s.abort();else{d={},r=s.status,"string"==typeof s.responseText&&(d.text=s.responseText);try{l=s.statusText}catch(u){l=""}r||!t.isLocal||t.crossDomain?1223===r&&(r=204):r=d.text?200:404}d&&a(r,l,d,s.getAllResponseHeaders())},t.async?4===s.readyState?e.setTimeout(n):s.onreadystatechange=ln[o]=n:n()},abort:function(){n&&n(void 0,!0)}}}}),pe.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),pe.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return pe.globalEval(e),e}}}),pe.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),pe.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=ie.head||pe("head")[0]||ie.documentElement;return{send:function(i,a){t=ie.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||a(200,"success"))},n.insertBefore(t,n.firstChild)},abort:function(){t&&t.onload(void 0,!0)}}}});var un=[],cn=/(=)\?(?=&|$)|\?\?/;pe.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=un.pop()||pe.expando+"_"+Ot++;return this[e]=!0,e}}),pe.ajaxPrefilter("json jsonp",function(t,n,i){var a,r,s,o=t.jsonp!==!1&&(cn.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&cn.test(t.data)&&"data");return o||"jsonp"===t.dataTypes[0]?(a=t.jsonpCallback=pe.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,o?t[o]=t[o].replace(cn,"$1"+a):t.jsonp!==!1&&(t.url+=($t.test(t.url)?"&":"?")+t.jsonp+"="+a),t.converters["script json"]=function(){return s||pe.error(a+" was not called"),s[0]},t.dataTypes[0]="json",r=e[a],e[a]=function(){s=arguments},i.always(function(){void 0===r?pe(e).removeProp(a):e[a]=r,t[a]&&(t.jsonpCallback=n.jsonpCallback,un.push(a)),s&&pe.isFunction(r)&&r(s[0]),s=r=void 0}),"script"):void 0}),ce.createHTMLDocument=function(){if(!ie.implementation.createHTMLDocument)return!1;var e=ie.implementation.createHTMLDocument("");return e.body.innerHTML="<form></form><form></form>",2===e.body.childNodes.length}(),pe.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||(ce.createHTMLDocument?ie.implementation.createHTMLDocument(""):ie);var i=we.exec(e),a=!n&&[];return i?[t.createElement(i[1])]:(i=g([e],t,a),a&&a.length&&pe(a).remove(),pe.merge([],i.childNodes))};var hn=pe.fn.load;pe.fn.load=function(e,t,n){if("string"!=typeof e&&hn)return hn.apply(this,arguments);var i,a,r,s=this,o=e.indexOf(" ");return o>-1&&(i=pe.trim(e.slice(o,e.length)),e=e.slice(0,o)),pe.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(a="POST"),s.length>0&&pe.ajax({url:e,type:a||"GET",dataType:"html",data:t}).done(function(e){r=arguments,s.html(i?pe("<div>").append(pe.parseHTML(e)).find(i):e)}).always(n&&function(e,t){s.each(function(){n.apply(s,r||[e.responseText,t,e])})}),this},pe.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){pe.fn[t]=function(e){return this.on(t,e)}}),pe.expr.filters.animated=function(e){return pe.grep(pe.timers,function(t){return e===t.elem}).length},pe.offset={setOffset:function(e,t,n){var i,a,r,s,o,l,d,u=pe.css(e,"position"),c=pe(e),h={};"static"===u&&(e.style.position="relative"),o=c.offset(),r=pe.css(e,"top"),l=pe.css(e,"left"),d=("absolute"===u||"fixed"===u)&&pe.inArray("auto",[r,l])>-1,d?(i=c.position(),s=i.top,a=i.left):(s=parseFloat(r)||0,a=parseFloat(l)||0),pe.isFunction(t)&&(t=t.call(e,n,pe.extend({},o))),null!=t.top&&(h.top=t.top-o.top+s),null!=t.left&&(h.left=t.left-o.left+a),"using"in t?t.using.call(e,h):c.css(h)}},pe.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){pe.offset.setOffset(this,e,t)});var t,n,i={top:0,left:0},a=this[0],r=a&&a.ownerDocument;if(r)return t=r.documentElement,pe.contains(t,a)?("undefined"!=typeof a.getBoundingClientRect&&(i=a.getBoundingClientRect()),n=te(r),{top:i.top+(n.pageYOffset||t.scrollTop)-(t.clientTop||0),left:i.left+(n.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}):i},position:function(){if(this[0]){var e,t,n={top:0,left:0},i=this[0];return"fixed"===pe.css(i,"position")?t=i.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),pe.nodeName(e[0],"html")||(n=e.offset()),n.top+=pe.css(e[0],"borderTopWidth",!0),n.left+=pe.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-pe.css(i,"marginTop",!0),left:t.left-n.left-pe.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&!pe.nodeName(e,"html")&&"static"===pe.css(e,"position");)e=e.offsetParent;return e||pt})}}),pe.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n=/Y/.test(t);pe.fn[e]=function(i){return Ne(this,function(e,i,a){var r=te(e);return void 0===a?r?t in r?r[t]:r.document.documentElement[i]:e[i]:void(r?r.scrollTo(n?pe(r).scrollLeft():a,n?a:pe(r).scrollTop()):e[i]=a)},e,i,arguments.length,null)}}),pe.each(["top","left"],function(e,t){pe.cssHooks[t]=H(ce.pixelPosition,function(e,n){return n?(n=ft(e,t),ct.test(n)?pe(e).position()[t]+"px":n):void 0})}),pe.each({Height:"height",Width:"width"},function(e,t){pe.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,i){pe.fn[i]=function(i,a){var r=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||a===!0?"margin":"border");return Ne(this,function(t,n,i){var a;return pe.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(a=t.documentElement,Math.max(t.body["scroll"+e],a["scroll"+e],t.body["offset"+e],a["offset"+e],a["client"+e])):void 0===i?pe.css(t,n,s):pe.style(t,n,i,s)},t,r?i:void 0,r,null)}})}),pe.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),pe.fn.size=function(){return this.length},pe.fn.andSelf=pe.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return pe});var pn=e.jQuery,mn=e.$;return pe.noConflict=function(t){return e.$===pe&&(e.$=mn),t&&e.jQuery===pe&&(e.jQuery=pn),pe},t||(e.jQuery=e.$=pe),pe}),function(e,t){"use strict";e.rails!==t&&e.error("jquery-ujs has already been loaded!");var n,i=e(document);e.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",csrfToken:function(){return e("meta[name=csrf-token]").attr("content")},csrfParam:function(){return e("meta[name=csrf-param]").attr("content")},CSRFProtection:function(e){var t=n.csrfToken();t&&e.setRequestHeader("X-CSRF-Token",t)},refreshCSRFTokens:function(){e('form input[name="'+n.csrfParam()+'"]').val(n.csrfToken())},fire:function(t,n,i){var a=e.Event(n);return t.trigger(a,i),a.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e[0].href},isRemote:function(e){return e.data("remote")!==t&&e.data("remote")!==!1},handleRemote:function(i){var a,r,s,o,l,d;if(n.fire(i,"ajax:before")){if(o=i.data("with-credentials")||null,l=i.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,i.is("form")){a=i.data("ujs:submit-button-formmethod")||i.attr("method"),r=i.data("ujs:submit-button-formaction")||i.attr("action"),s=e(i[0]).serializeArray();var u=i.data("ujs:submit-button");u&&(s.push(u),i.data("ujs:submit-button",null)),i.data("ujs:submit-button-formmethod",null),i.data("ujs:submit-button-formaction",null)}else i.is(n.inputChangeSelector)?(a=i.data("method"),r=i.data("url"),s=i.serialize(),i.data("params")&&(s=s+"&"+i.data("params"))):i.is(n.buttonClickSelector)?(a=i.data("method")||"get",r=i.data("url"),s=i.serialize(),i.data("params")&&(s=s+"&"+i.data("params"))):(a=i.data("method"),r=n.href(i),s=i.data("params")||null);return d={type:a||"GET",data:s,dataType:l,beforeSend:function(e,a){return a.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+a.accepts.script),n.fire(i,"ajax:beforeSend",[e,a])?void i.trigger("ajax:send",e):!1},success:function(e,t,n){i.trigger("ajax:success",[e,t,n])},complete:function(e,t){i.trigger("ajax:complete",[e,t])},error:function(e,t,n){i.trigger("ajax:error",[e,t,n])},crossDomain:n.isCrossDomain(r)},o&&(d.xhrFields={withCredentials:o}),r&&(d.url=r),n.ajax(d)}return!1},isCrossDomain:function(e){var t=document.createElement("a");t.href=location.href;var n=document.createElement("a");try{return n.href=e,n.href=n.href,!((!n.protocol||":"===n.protocol)&&!n.host||t.protocol+"//"+t.host==n.protocol+"//"+n.host)}catch(i){return!0}},handleMethod:function(i){var a=n.href(i),r=i.data("method"),s=i.attr("target"),o=n.csrfToken(),l=n.csrfParam(),d=e('<form method="post" action="'+a+'"></form>'),u='<input name="_method" value="'+r+'" type="hidden" />';l===t||o===t||n.isCrossDomain(a)||(u+='<input name="'+l+'" value="'+o+'" type="hidden" />'),s&&d.attr("target",s),d.hide().append(u).appendTo("body"),d.submit()},formElements:function(t,n){return t.is("form")?e(t[0].elements).filter(n):t.find(n)},disableFormElements:function(t){n.formElements(t,n.disableSelector).each(function(){n.disableFormElement(e(this))})},disableFormElement:function(e){var n,i;n=e.is("button")?"html":"val",i=e.data("disable-with"),i!==t&&(e.data("ujs:enable-with",e[n]()),e[n](i)),e.prop("disabled",!0),e.data("ujs:disabled",!0)},enableFormElements:function(t){n.formElements(t,n.enableSelector).each(function(){n.enableFormElement(e(this))})},enableFormElement:function(e){var n=e.is("button")?"html":"val";e.data("ujs:enable-with")!==t&&(e[n](e.data("ujs:enable-with")),e.removeData("ujs:enable-with")),e.prop("disabled",!1),e.removeData("ujs:disabled")},allowAction:function(e){var t,i=e.data("confirm"),a=!1;if(!i)return!0;if(n.fire(e,"confirm")){try{a=n.confirm(i)}catch(r){(console.error||console.log).call(console,r.stack||r)}t=n.fire(e,"confirm:complete",[a])}return a&&t},blankInputs:function(t,n,i){var a,r,s,o,l=e(),d=n||"input,textarea",u=t.find(d),c={};return u.each(function(){a=e(this),a.is("input[type=radio]")?(o=a.attr("name"),c[o]||(0===t.find('input[type=radio]:checked[name="'+o+'"]').length&&(s=t.find('input[type=radio][name="'+o+'"]'),l=l.add(s)),c[o]=o)):(r=a.is("input[type=checkbox],input[type=radio]")?a.is(":checked"):!!a.val(),r===i&&(l=l.add(a)))}),l.length?l:!1},nonBlankInputs:function(e,t){return n.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},disableElement:function(e){var i=e.data("disable-with");i!==t&&(e.data("ujs:enable-with",e.html()),e.html(i)),e.bind("click.railsDisable",function(e){return n.stopEverything(e)}),e.data("ujs:disabled",!0)},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.removeData("ujs:enable-with")),e.unbind("click.railsDisable"),e.removeData("ujs:disabled")}},n.fire(i,"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,i){e.crossDomain||n.CSRFProtection(i)}),e(window).on("pageshow.rails",function(){e(e.rails.enableSelector).each(function(){var t=e(this);t.data("ujs:disabled")&&e.rails.enableFormElement(t)}),e(e.rails.linkDisableSelector).each(function(){var t=e(this);t.data("ujs:disabled")&&e.rails.enableElement(t)})}),i.delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(e(this))}),i.delegate(n.buttonDisableSelector,"ajax:complete",function(){n.enableFormElement(e(this))}),i.delegate(n.linkClickSelector,"click.rails",function(t){var i=e(this),a=i.data("method"),r=i.data("params"),s=t.metaKey||t.ctrlKey;if(!n.allowAction(i))return n.stopEverything(t);if(!s&&i.is(n.linkDisableSelector)&&n.disableElement(i),n.isRemote(i)){if(s&&(!a||"GET"===a)&&!r)return!0;var o=n.handleRemote(i);return o===!1?n.enableElement(i):o.fail(function(){n.enableElement(i)}),!1}return a?(n.handleMethod(i),!1):void 0}),i.delegate(n.buttonClickSelector,"click.rails",function(t){var i=e(this);if(!n.allowAction(i)||!n.isRemote(i))return n.stopEverything(t);i.is(n.buttonDisableSelector)&&n.disableFormElement(i);var a=n.handleRemote(i);return a===!1?n.enableFormElement(i):a.fail(function(){n.enableFormElement(i)}),!1}),i.delegate(n.inputChangeSelector,"change.rails",function(t){var i=e(this);return n.allowAction(i)&&n.isRemote(i)?(n.handleRemote(i),!1):n.stopEverything(t)}),i.delegate(n.formSubmitSelector,"submit.rails",function(i){var a,r,s=e(this),o=n.isRemote(s);if(!n.allowAction(s))return n.stopEverything(i);if(s.attr("novalidate")===t)if(s.data("ujs:formnovalidate-button")===t){if(a=n.blankInputs(s,n.requiredInputSelector,!1),a&&n.fire(s,"ajax:aborted:required",[a]))return n.stopEverything(i)}else s.data("ujs:formnovalidate-button",t);if(o){if(r=n.nonBlankInputs(s,n.fileInputSelector)){setTimeout(function(){n.disableFormElements(s)},13);var l=n.fire(s,"ajax:aborted:file",[r]);return l||setTimeout(function(){n.enableFormElements(s)},13),l}return n.handleRemote(s),!1}setTimeout(function(){n.disableFormElements(s)},13)}),i.delegate(n.formInputClickSelector,"click.rails",function(t){var i=e(this);if(!n.allowAction(i))return n.stopEverything(t);var a=i.attr("name"),r=a?{name:a,value:i.val()}:null,s=i.closest("form");0===s.length&&(s=e("#"+i.attr("form"))),s.data("ujs:submit-button",r),s.data("ujs:formnovalidate-button",i.attr("formnovalidate")),s.data("ujs:submit-button-formaction",i.attr("formaction")),s.data("ujs:submit-button-formmethod",i.attr("formmethod"))}),i.delegate(n.formSubmitSelector,"ajax:send.rails",function(t){this===t.target&&n.disableFormElements(e(this))}),i.delegate(n.formSubmitSelector,"ajax:complete.rails",function(t){this===t.target&&n.enableFormElements(e(this))}),e(function(){n.refreshCSRFTokens()}))}(jQuery),function(e,t){"use strict";e.ajaxPrefilter(function(e,t,n){return e.iframe?"iframe":void 0}),e.ajaxTransport("iframe",function(t,n,i){function a(){u.prop("disabled",!1),s.remove(),o.bind("load",function(){o.remove()}),o.attr("src","javascript:false;")}var r,s=null,o=null,l="iframe-"+e.now(),d=e(t.files).filter(":file:enabled"),u=null;return t.dataTypes.shift(),d.length?(s=e("<form enctype='multipart/form-data' method='post'></form>").hide().attr({action:t.url,target:l}),"string"==typeof t.data&&t.data.length>0&&e.error("data must not be serialized"),e.each(t.data||{},function(t,n){e.isPlainObject(n)&&(t=n.name,n=n.value),e("<input type='hidden' />").attr({name:t,value:n}).appendTo(s)}),e("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(s),r=t.dataTypes[0]&&t.accepts[t.dataTypes[0]]?t.accepts[t.dataTypes[0]]+("*"!==t.dataTypes[0]?", */*; q=0.01":""):t.accepts["*"],e("<input type='hidden' name='X-Http-Accept'>").attr("value",r).appendTo(s),u=d.after(function(t){return e(this).clone().prop("disabled",!0)}).next(),d.appendTo(s),{send:function(t,n){o=e("<iframe src='javascript:false;' name='"+l+"' id='"+l+"' style='display:none'></iframe>"),o.bind("load",function(){o.unbind("load").bind("load",function(){var e=this.contentWindow?this.contentWindow.document:this.contentDocument?this.contentDocument:this.document,t=e.documentElement?e.documentElement:e.body,r=t.getElementsByTagName("textarea")[0],s=r&&r.getAttribute("data-type")||null,o=r&&r.getAttribute("data-status")||200,l=r&&r.getAttribute("data-statusText")||"OK",d={html:t.innerHTML,text:s?r.value:t?t.textContent||t.innerText:null};a(),i.responseText||(i.responseText=d.text),n(o,l,d,s?"Content-Type: "+s:null)}),s[0].submit()}),e("body").append(s,o)},abort:function(){null!==o&&(o.unbind("load").attr("src","javascript:false;"),a())}}):void 0})}(jQuery),function(e){var t;e.remotipart=t={setup:function(n){var i=n.data("ujs:submit-button"),a=e('meta[name="csrf-param"]').attr("content"),r=e('meta[name="csrf-token"]').attr("content"),s=n.find('input[name="'+a+'"]').length;n.one("ajax:beforeSend.remotipart",function(o,l,d){return delete d.beforeSend,d.iframe=!0,d.files=e(e.rails.fileInputSelector,n),d.data=n.serializeArray(),i&&d.data.push(i),d.files.each(function(e,t){for(var n=d.data.length-1;n>=0;n--)d.data[n].name==t.name&&d.data.splice(n,1)}),d.processData=!1,void 0===d.dataType&&(d.dataType="script *"),d.data.push({name:"remotipart_submitted",value:!0}),r&&a&&!s&&d.data.push({name:a,value:r}),e.rails.fire(n,"ajax:remotipartSubmit",[l,d])&&(e.rails.ajax(d),setTimeout(function(){e.rails.disableFormElements(n)},20)),t.teardown(n),!1}).data("remotipartSubmitted",!0)},teardown:function(e){e.unbind("ajax:beforeSend.remotipart").removeData("remotipartSubmitted")}},e(document).on("ajax:aborted:file","form",function(){var n=e(this);return t.setup(n),e.rails.handleRemote(n),!1})}(jQuery),/*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){var t="ui-effects-",n=e;/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
return e.effects={effect:{}},function(e,t){function n(e,t,n){var i=c[t.type]||{};return null==e?n||!t.def?null:t.def:(e=i.floor?~~e:parseFloat(e),isNaN(e)?t.def:i.mod?(e+i.mod)%i.mod:0>e?0:i.max<e?i.max:e)}function i(t){var n=d(),i=n._rgba=[];return t=t.toLowerCase(),m(l,function(e,a){var r,s=a.re.exec(t),o=s&&a.parse(s),l=a.space||"rgba";return o?(r=n[l](o),n[u[l].cache]=r[u[l].cache],i=n._rgba=r._rgba,!1):void 0}),i.length?("0,0,0,0"===i.join()&&e.extend(i,r.transparent),n):r[t]}function a(e,t,n){return n=(n+1)%1,1>6*n?e+(t-e)*n*6:1>2*n?t:2>3*n?e+(t-e)*(2/3-n)*6:e}var r,s="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",o=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],d=e.Color=function(t,n,i,a){return new e.Color.fn.parse(t,n,i,a)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},h=d.support={},p=e("<p>")[0],m=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",h.rgba=p.style.backgroundColor.indexOf("rgba")>-1,m(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),d.fn=e.extend(d.prototype,{parse:function(a,s,o,l){if(a===t)return this._rgba=[null,null,null,null],this;(a.jquery||a.nodeType)&&(a=e(a).css(s),s=t);var c=this,h=e.type(a),p=this._rgba=[];return s!==t&&(a=[a,s,o,l],h="array"),"string"===h?this.parse(i(a)||r._default):"array"===h?(m(u.rgba.props,function(e,t){p[t.idx]=n(a[t.idx],t)}),this):"object"===h?(a instanceof d?m(u,function(e,t){a[t.cache]&&(c[t.cache]=a[t.cache].slice())}):m(u,function(t,i){var r=i.cache;m(i.props,function(e,t){if(!c[r]&&i.to){if("alpha"===e||null==a[e])return;c[r]=i.to(c._rgba)}c[r][t.idx]=n(a[e],t,!0)}),c[r]&&e.inArray(null,c[r].slice(0,3))<0&&(c[r][3]=1,i.from&&(c._rgba=i.from(c[r])))}),this):void 0},is:function(e){var t=d(e),n=!0,i=this;return m(u,function(e,a){var r,s=t[a.cache];return s&&(r=i[a.cache]||a.to&&a.to(i._rgba)||[],m(a.props,function(e,t){return null!=s[t.idx]?n=s[t.idx]===r[t.idx]:void 0})),n}),n},_space:function(){var e=[],t=this;return m(u,function(n,i){t[i.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var i=d(e),a=i._space(),r=u[a],s=0===this.alpha()?d("transparent"):this,o=s[r.cache]||r.to(s._rgba),l=o.slice();return i=i[r.cache],m(r.props,function(e,a){var r=a.idx,s=o[r],d=i[r],u=c[a.type]||{};null!==d&&(null===s?l[r]=d:(u.mod&&(d-s>u.mod/2?s+=u.mod:s-d>u.mod/2&&(s-=u.mod)),l[r]=n((d-s)*t+s,a)))}),this[a](l)},blend:function(t){if(1===this._rgba[3])return this;var n=this._rgba.slice(),i=n.pop(),a=d(t)._rgba;return d(e.map(n,function(e,t){return(1-i)*a[t]+i*e}))},toRgbaString:function(){var t="rgba(",n=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===n[3]&&(n.pop(),t="rgb("),t+n.join()+")"},toHslaString:function(){var t="hsla(",n=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===n[3]&&(n.pop(),t="hsl("),t+n.join()+")"},toHexString:function(t){var n=this._rgba.slice(),i=n.pop();return t&&n.push(~~(255*i)),"#"+e.map(n,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),d.fn.parse.prototype=d.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,n,i=e[0]/255,a=e[1]/255,r=e[2]/255,s=e[3],o=Math.max(i,a,r),l=Math.min(i,a,r),d=o-l,u=o+l,c=.5*u;return t=l===o?0:i===o?60*(a-r)/d+360:a===o?60*(r-i)/d+120:60*(i-a)/d+240,n=0===d?0:.5>=c?d/u:d/(2-u),[Math.round(t)%360,n,c,null==s?1:s]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,n=e[1],i=e[2],r=e[3],s=.5>=i?i*(1+n):i+n-i*n,o=2*i-s;return[Math.round(255*a(o,s,t+1/3)),Math.round(255*a(o,s,t)),Math.round(255*a(o,s,t-1/3)),r]},m(u,function(i,a){var r=a.props,s=a.cache,l=a.to,u=a.from;d.fn[i]=function(i){if(l&&!this[s]&&(this[s]=l(this._rgba)),i===t)return this[s].slice();var a,o=e.type(i),c="array"===o||"object"===o?i:arguments,h=this[s].slice();return m(r,function(e,t){var i=c["object"===o?e:t.idx];null==i&&(i=h[t.idx]),h[t.idx]=n(i,t)}),u?(a=d(u(h)),a[s]=h,a):d(h)},m(r,function(t,n){d.fn[t]||(d.fn[t]=function(a){var r,s=e.type(a),l="alpha"===t?this._hsla?"hsla":"rgba":i,d=this[l](),u=d[n.idx];return"undefined"===s?u:("function"===s&&(a=a.call(this,u),s=e.type(a)),null==a&&n.empty?this:("string"===s&&(r=o.exec(a),r&&(a=u+parseFloat(r[2])*("+"===r[1]?1:-1))),d[n.idx]=a,this[l](d)))})})}),d.hook=function(t){var n=t.split(" ");m(n,function(t,n){e.cssHooks[n]={set:function(t,a){var r,s,o="";if("transparent"!==a&&("string"!==e.type(a)||(r=i(a)))){if(a=d(r||a),!h.rgba&&1!==a._rgba[3]){for(s="backgroundColor"===n?t.parentNode:t;(""===o||"transparent"===o)&&s&&s.style;)try{o=e.css(s,"backgroundColor"),s=s.parentNode}catch(l){}a=a.blend(o&&"transparent"!==o?o:"_default")}a=a.toRgbaString()}try{t.style[n]=a}catch(l){}}},e.fx.step[n]=function(t){t.colorInit||(t.start=d(t.elem,n),t.end=d(t.end),t.colorInit=!0),e.cssHooks[n].set(t.elem,t.start.transition(t.end,t.pos))}})},d.hook(s),e.cssHooks.borderColor={expand:function(e){var t={};return m(["Top","Right","Bottom","Left"],function(n,i){t["border"+i+"Color"]=e}),t}},r=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(n),function(){function t(t){var n,i,a=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,r={};if(a&&a.length&&a[0]&&a[a[0]])for(i=a.length;i--;)n=a[i],"string"==typeof a[n]&&(r[e.camelCase(n)]=a[n]);else for(n in a)"string"==typeof a[n]&&(r[n]=a[n]);return r}function i(t,n){var i,a,s={};for(i in n)a=n[i],t[i]!==a&&(r[i]||(e.fx.step[i]||!isNaN(parseFloat(a)))&&(s[i]=a));return s}var a=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(n.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,r,s,o){var l=e.speed(r,s,o);return this.queue(function(){var r,s=e(this),o=s.attr("class")||"",d=l.children?s.find("*").addBack():s;d=d.map(function(){var n=e(this);return{el:n,start:t(this)}}),r=function(){e.each(a,function(e,t){n[t]&&s[t+"Class"](n[t])})},r(),d=d.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),s.attr("class",o),d=d.map(function(){var t=this,n=e.Deferred(),i=e.extend({},l,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,i),n.promise()}),e.when.apply(e,d.get()).done(function(){r(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),l.complete.call(s[0])})})},e.fn.extend({addClass:function(t){return function(n,i,a,r){return i?e.effects.animateClass.call(this,{add:n},i,a,r):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(n,i,a,r){return arguments.length>1?e.effects.animateClass.call(this,{remove:n},i,a,r):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(n,i,a,r,s){return"boolean"==typeof i||void 0===i?a?e.effects.animateClass.call(this,i?{add:n}:{remove:n},a,r,s):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:n},i,a,r)}}(e.fn.toggleClass),switchClass:function(t,n,i,a,r){return e.effects.animateClass.call(this,{add:n,remove:t},i,a,r)}})}(),function(){function n(t,n,i,a){return e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},null==n&&(n={}),e.isFunction(n)&&(a=n,i=null,n={}),("number"==typeof n||e.fx.speeds[n])&&(a=i,i=n,n={}),e.isFunction(i)&&(a=i,i=null),n&&e.extend(t,n),i=i||n.duration,t.duration=e.fx.off?0:"number"==typeof i?i:i in e.fx.speeds?e.fx.speeds[i]:e.fx.speeds._default,t.complete=a||n.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.4",save:function(e,n){for(var i=0;i<n.length;i++)null!==n[i]&&e.data(t+n[i],e[0].style[n[i]])},restore:function(e,n){var i,a;for(a=0;a<n.length;a++)null!==n[a]&&(i=e.data(t+n[a]),void 0===i&&(i=""),e.css(n[a],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var n,i;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":i=0;break;case"center":i=.5;break;case"right":i=1;break;default:i=e[1]/t.width}return{x:i,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},i=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),a={width:t.width(),height:t.height()},r=document.activeElement;try{r.id}catch(s){r=document.body}return t.wrap(i),(t[0]===r||e.contains(t[0],r))&&e(r).focus(),i=t.parent(),"static"===t.css("position")?(i.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,i){n[i]=t.css(i),isNaN(parseInt(n[i],10))&&(n[i]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(a),i.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,i,a){return a=a||{},e.each(n,function(e,n){var r=t.cssUnit(n);r[0]>0&&(a[n]=r[0]*i+r[1])}),a}}),e.fn.extend({effect:function(){function t(t){function n(){e.isFunction(r)&&r.call(a[0]),e.isFunction(t)&&t()}var a=e(this),r=i.complete,o=i.mode;(a.is(":hidden")?"hide"===o:"show"===o)?(a[o](),n()):s.call(a[0],i,n)}var i=n.apply(this,arguments),a=i.mode,r=i.queue,s=e.effects.effect[i.effect];return e.fx.off||!s?a?this[a](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):r===!1?this.each(t):this.queue(r||"fx",t)},show:function(e){return function(t){if(i(t))return e.apply(this,arguments);var a=n.apply(this,arguments);return a.mode="show",this.effect.call(this,a)}}(e.fn.show),hide:function(e){return function(t){if(i(t))return e.apply(this,arguments);var a=n.apply(this,arguments);return a.mode="hide",this.effect.call(this,a)}}(e.fn.hide),toggle:function(e){return function(t){if(i(t)||"boolean"==typeof t)return e.apply(this,arguments);var a=n.apply(this,arguments);return a.mode="toggle",this.effect.call(this,a)}}(e.fn.toggle),cssUnit:function(t){var n=this.css(t),i=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(i=[parseFloat(n),t])}),i}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?n(2*e)/2:1-n(-2*e+2)/2}})}(),e.effects}),/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(t,i){var a,r,s,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,r=a.name,t.href&&r&&"map"===a.nodeName.toLowerCase()?(s=e("img[usemap='#"+r+"']")[0],!!s&&n(s)):!1):(/^(input|select|textarea|button|object)$/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&n(t)}function n(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var n=this.css("position"),i="absolute"===n,a=t?/(auto|scroll|hidden)/:/(auto|scroll)/,r=this.parents().filter(function(){var t=e(this);return i&&"static"===t.css("position")?!1:a.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==n&&r.length?r:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])},focusable:function(n){return t(n,!isNaN(e.attr(n,"tabindex")))},tabbable:function(n){var i=e.attr(n,"tabindex"),a=isNaN(i);return(a||i>=0)&&t(n,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,n){function i(t,n,i,r){return e.each(a,function(){n-=parseFloat(e.css(t,"padding"+this))||0,i&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),r&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var a="Width"===n?["Left","Right"]:["Top","Bottom"],r=n.toLowerCase(),s={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(t){return void 0===t?s["inner"+n].call(this):this.each(function(){e(this).css(r,i(this,t)+"px")})},e.fn["outer"+n]=function(t,a){return"number"!=typeof t?s["outer"+n].call(this,t):this.each(function(){e(this).css(r,i(this,t,!0,a)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(n,i){return"number"==typeof n?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),i&&i.call(t)},n)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var n,i,a=e(this[0]);a.length&&a[0]!==document;){if(n=a.css("position"),("absolute"===n||"relative"===n||"fixed"===n)&&(i=parseInt(a.css("zIndex"),10),!isNaN(i)&&0!==i))return i;a=a.parent()}return 0}}),e.ui.plugin={add:function(t,n,i){var a,r=e.ui[t].prototype;for(a in i)r.plugins[a]=r.plugins[a]||[],r.plugins[a].push([n,i[a]])},call:function(e,t,n,i){var a,r=e.plugins[t];if(r&&(i||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(a=0;a<r.length;a++)e.options[r[a][0]]&&r[a][1].apply(e.element,n)}}}),/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){var t=0,n=Array.prototype.slice;return e.cleanData=function(t){return function(n){var i,a,r;for(r=0;null!=(a=n[r]);r++)try{i=e._data(a,"events"),i&&i.remove&&e(a).triggerHandler("remove")}catch(s){}t(n)}}(e.cleanData),e.widget=function(t,n,i){var a,r,s,o,l={},d=t.split(".")[0];return t=t.split(".")[1],a=d+"-"+t,i||(i=n,n=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[d]=e[d]||{},r=e[d][t],s=e[d][t]=function(e,t){return this._createWidget?void(arguments.length&&this._createWidget(e,t)):new s(e,t)},e.extend(s,r,{version:i.version,_proto:e.extend({},i),_childConstructors:[]}),o=new n,o.options=e.widget.extend({},o.options),e.each(i,function(t,i){return e.isFunction(i)?void(l[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},a=function(e){return n.prototype[t].apply(this,e)};return function(){var t,n=this._super,r=this._superApply;return this._super=e,this._superApply=a,t=i.apply(this,arguments),this._super=n,this._superApply=r,t}}()):void(l[t]=i)}),s.prototype=e.widget.extend(o,{widgetEventPrefix:r?o.widgetEventPrefix||t:t},l,{constructor:s,namespace:d,widgetName:t,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,n){var i=n.prototype;e.widget(i.namespace+"."+i.widgetName,s,n._proto)}),delete r._childConstructors):n._childConstructors.push(s),e.widget.bridge(t,s),s},e.widget.extend=function(t){for(var i,a,r=n.call(arguments,1),s=0,o=r.length;o>s;s++)for(i in r[s])a=r[s][i],r[s].hasOwnProperty(i)&&void 0!==a&&(e.isPlainObject(a)?t[i]=e.isPlainObject(t[i])?e.widget.extend({},t[i],a):e.widget.extend({},a):t[i]=a);return t},e.widget.bridge=function(t,i){var a=i.prototype.widgetFullName||t;e.fn[t]=function(r){var s="string"==typeof r,o=n.call(arguments,1),l=this;return s?this.each(function(){var n,i=e.data(this,a);return"instance"===r?(l=i,!1):i?e.isFunction(i[r])&&"_"!==r.charAt(0)?(n=i[r].apply(i,o),n!==i&&void 0!==n?(l=n&&n.jquery?l.pushStack(n.get()):n,!1):void 0):e.error("no such method '"+r+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+r+"'")}):(o.length&&(r=e.widget.extend.apply(null,[r].concat(o))),this.each(function(){var t=e.data(this,a);t?(t.option(r||{}),t._init&&t._init()):e.data(this,a,new i(r,this))})),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(n,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),n),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,n){var i,a,r,s=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(s={},i=t.split("."),t=i.shift(),i.length){for(a=s[t]=e.widget.extend({},this.options[t]),r=0;r<i.length-1;r++)a[i[r]]=a[i[r]]||{},a=a[i[r]];if(t=i.pop(),1===arguments.length)return void 0===a[t]?null:a[t];a[t]=n}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];s[t]=n}return this._setOptions(s),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,n,i){var a,r=this;"boolean"!=typeof t&&(i=n,n=t,t=!1),i?(n=a=e(n),this.bindings=this.bindings.add(n)):(i=n,n=this.element,a=this.widget()),e.each(i,function(i,s){function o(){return t||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof s?r[s]:s).apply(r,arguments):void 0}"string"!=typeof s&&(o.guid=s.guid=s.guid||o.guid||e.guid++);var l=i.match(/^([\w:-]*)\s*(.*)$/),d=l[1]+r.eventNamespace,u=l[2];u?a.delegate(u,d,o):n.bind(d,o)})},_off:function(t,n){n=(n||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(n).undelegate(n),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function n(){return("string"==typeof e?i[e]:e).apply(i,arguments)}var i=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,i){var a,r,s=this.options[t];if(i=i||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],r=n.originalEvent)for(a in r)a in n||(n[a]=r[a]);return this.element.trigger(n,i),!(e.isFunction(s)&&s.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(i,a,r){"string"==typeof a&&(a={effect:a});var s,o=a?a===!0||"number"==typeof a?n:a.effect||n:t;a=a||{},"number"==typeof a&&(a={duration:a}),s=!e.isEmptyObject(a),a.complete=r,a.delay&&i.delay(a.delay),s&&e.effects&&e.effects.effect[o]?i[t](a):o!==t&&i[o]?i[o](a.duration,a.easing,r):i.queue(function(n){e(this)[t](),r&&r.call(i[0]),n()})}}),e.widget}),/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./widget"],e):e(jQuery)}(function(e){var t=!1;return e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){return!0===e.data(n.target,t.widgetName+".preventClickEvent")?(e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(n){if(!t){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(n),this._mouseDownEvent=n;var i=this,a=1===n.which,r="string"==typeof this.options.cancel&&n.target.nodeName?e(n.target).closest(this.options.cancel).length:!1;return a&&!r&&this._mouseCapture(n)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(n)&&this._mouseDelayMet(n)&&(this._mouseStarted=this._mouseStart(n)!==!1,!this._mouseStarted)?(n.preventDefault(),!0):(!0===e.data(n.target,this.widgetName+".preventClickEvent")&&e.removeData(n.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),n.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||document.documentMode<9)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(n){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,n.target===this._mouseDownEvent.target&&e.data(n.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(n)),t=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}),/*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],e):e(jQuery)}(function(e){return e.widget("ui.sortable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,n){return e>=t&&t+n>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,n){var i=null,a=!1,r=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,r.widgetName+"-item")===r?(i=e(this),!1):void 0}),e.data(t.target,r.widgetName+"-item")===r&&(i=e(t.target)),i&&(!this.options.handle||n||(e(this.options.handle,i).find("*").addBack().each(function(){this===t.target&&(a=!0)}),a))?(this.currentItem=i,this._removeCurrentsFromItems(),!0):!1)},_mouseStart:function(t,n,i){var a,r,s=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,s.cursorAt&&this._adjustOffsetFromHelper(s.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),s.containment&&this._setContainment(),s.cursor&&"auto"!==s.cursor&&(r=this.document.find("body"),this.storedCursor=r.css("cursor"),r.css("cursor",s.cursor),this.storedStylesheet=e("<style>*{ cursor: "+s.cursor+" !important; }</style>").appendTo(r)),s.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",s.opacity)),s.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",s.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!i)for(a=this.containers.length-1;a>=0;a--)this.containers[a]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var n,i,a,r,s=this.options,o=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-this.overflowOffset.top<s.scrollSensitivity&&(this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop-s.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-this.overflowOffset.left<s.scrollSensitivity&&(this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft-s.scrollSpeed)):(t.pageY-this.document.scrollTop()<s.scrollSensitivity?o=this.document.scrollTop(this.document.scrollTop()-s.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<s.scrollSensitivity&&(o=this.document.scrollTop(this.document.scrollTop()+s.scrollSpeed)),t.pageX-this.document.scrollLeft()<s.scrollSensitivity?o=this.document.scrollLeft(this.document.scrollLeft()-s.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<s.scrollSensitivity&&(o=this.document.scrollLeft(this.document.scrollLeft()+s.scrollSpeed))),o!==!1&&e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),n=this.items.length-1;n>=0;n--)if(i=this.items[n],a=i.item[0],r=this._intersectsWithPointer(i),r&&i.instance===this.currentContainer&&a!==this.currentItem[0]&&this.placeholder[1===r?"next":"prev"]()[0]!==a&&!e.contains(this.placeholder[0],a)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],a):!0)){if(this.direction=1===r?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(i))break;this._rearrange(t,i),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var i=this,a=this.placeholder.offset(),r=this.options.axis,s={};r&&"x"!==r||(s.left=a.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),r&&"y"!==r||(s.top=a.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(s,parseInt(this.options.revert,10)||500,function(){i._clear(t)})}else this._clear(t,n);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);n&&i.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!i.length&&t.key&&i.push(t.key+"="),i.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},n.each(function(){i.push(e(t.item||this).attr(t.attribute||"id")||"")}),i},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,i=this.positionAbs.top,a=i+this.helperProportions.height,r=e.left,s=r+e.width,o=e.top,l=o+e.height,d=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||i+d>o&&l>i+d,h="y"===this.options.axis||t+u>r&&s>t+u,p=c&&h;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:r<t+this.helperProportions.width/2&&n-this.helperProportions.width/2<s&&o<i+this.helperProportions.height/2&&a-this.helperProportions.height/2<l},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),i=t&&n,a=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return i?this.floating?r&&"right"===r||"down"===a?2:1:a&&("down"===a?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),n=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),i=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return this.floating&&a?"right"===a&&n||"left"===a&&!n:i&&("down"===i&&t||"up"===i&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function n(){o.push(this)}var i,a,r,s,o=[],l=[],d=this._connectWith();if(d&&t)for(i=d.length-1;i>=0;i--)for(r=e(d[i],this.document[0]),a=r.length-1;a>=0;a--)s=e.data(r[a],this.widgetFullName),s&&s!==this&&!s.options.disabled&&l.push([e.isFunction(s.options.items)?s.options.items.call(s.element):e(s.options.items,s.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),s]);for(l.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=l.length-1;i>=0;i--)l[i][0].each(n);return e(o)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;n<t.length;n++)if(t[n]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n,i,a,r,s,o,l,d,u=this.items,c=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],h=this._connectWith();if(h&&this.ready)for(n=h.length-1;n>=0;n--)for(a=e(h[n],this.document[0]),i=a.length-1;i>=0;i--)r=e.data(a[i],this.widgetFullName),r&&r!==this&&!r.options.disabled&&(c.push([e.isFunction(r.options.items)?r.options.items.call(r.element[0],t,{item:this.currentItem}):e(r.options.items,r.element),r]),this.containers.push(r));for(n=c.length-1;n>=0;n--)for(s=c[n][1],o=c[n][0],i=0,d=o.length;d>i;i++)l=e(o[i]),l.data(this.widgetName+"-item",s),u.push({item:l,instance:s,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var n,i,a,r;for(n=this.items.length-1;n>=0;n--)i=this.items[n],i.instance!==this.currentContainer&&this.currentContainer&&i.item[0]!==this.currentItem[0]||(a=this.options.toleranceElement?e(this.options.toleranceElement,i.item):i.item,t||(i.width=a.outerWidth(),i.height=a.outerHeight()),r=a.offset(),i.left=r.left,i.top=r.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(n=this.containers.length-1;n>=0;n--)r=this.containers[n].element.offset(),this.containers[n].containerCache.left=r.left,this.containers[n].containerCache.top=r.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var n,i=t.options;i.placeholder&&i.placeholder.constructor!==String||(n=i.placeholder,i.placeholder={element:function(){var i=t.currentItem[0].nodeName.toLowerCase(),a=e("<"+i+">",t.document[0]).addClass(n||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tbody"===i?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),e("<tr>",t.document[0]).appendTo(a)):"tr"===i?t._createTrPlaceholder(t.currentItem,a):"img"===i&&a.attr("src",t.currentItem.attr("src")),n||a.css("visibility","hidden"),a},update:function(e,a){(!n||i.forcePlaceholderSize)&&(a.height()||a.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),a.width()||a.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(i.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),i.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,n){var i=this;t.children().each(function(){e("<td>&#160;</td>",i.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n)})},_contactContainers:function(t){var n,i,a,r,s,o,l,d,u,c,h=null,p=null;for(n=this.containers.length-1;n>=0;n--)if(!e.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(h&&e.contains(this.containers[n].element[0],h.element[0]))continue;h=this.containers[n],p=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",t,this._uiHash(this)),this.containers[n].containerCache.over=0);if(h)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(a=1e4,r=null,u=h.floating||this._isFloating(this.currentItem),s=u?"left":"top",o=u?"width":"height",c=u?"clientX":"clientY",i=this.items.length-1;i>=0;i--)e.contains(this.containers[p].element[0],this.items[i].item[0])&&this.items[i].item[0]!==this.currentItem[0]&&(l=this.items[i].item.offset()[s],d=!1,t[c]-l>this.items[i][o]/2&&(d=!0),Math.abs(t[c]-l)<a&&(a=Math.abs(t[c]-l),r=this.items[i],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return void(this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1));r?this._rearrange(t,r,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var n=this.options,i=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):"clone"===n.helper?this.currentItem.clone():this.currentItem;return i.parents("body").length||e("parent"!==n.appendTo?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(i[0]),i[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!i[0].style.width||n.forceHelperSize)&&i.width(this.currentItem.width()),(!i[0].style.height||n.forceHelperSize)&&i.height(this.currentItem.height()),i},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,n,i,a=this.options;"parent"===a.containment&&(a.containment=this.helper[0].parentNode),("document"===a.containment||"window"===a.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===a.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===a.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(a.containment)||(t=e(a.containment)[0],n=e(a.containment).offset(),i="hidden"!==e(t).css("overflow"),this.containment=[n.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,n.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,n.left+(i?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,n.top+(i?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,n){n||(n=this.position);var i="absolute"===t?1:-1,a="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,r=/(html|body)/i.test(a[0].tagName);return{top:n.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():r?0:a.scrollTop())*i,left:n.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():r?0:a.scrollLeft())*i}},_generatePosition:function(t){var n,i,a=this.options,r=t.pageX,s=t.pageY,o="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(o[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(r=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(s=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(r=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(s=this.containment[3]+this.offset.click.top)),a.grid&&(n=this.originalPageY+Math.round((s-this.originalPageY)/a.grid[1])*a.grid[1],s=this.containment?n-this.offset.click.top>=this.containment[1]&&n-this.offset.click.top<=this.containment[3]?n:n-this.offset.click.top>=this.containment[1]?n-a.grid[1]:n+a.grid[1]:n,i=this.originalPageX+Math.round((r-this.originalPageX)/a.grid[0])*a.grid[0],r=this.containment?i-this.offset.click.left>=this.containment[0]&&i-this.offset.click.left<=this.containment[2]?i:i-this.offset.click.left>=this.containment[0]?i-a.grid[0]:i+a.grid[0]:i)),{top:s-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:o.scrollTop()),left:r-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:o.scrollLeft())}},_rearrange:function(e,t,n,i){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var a=this.counter;this._delay(function(){a===this.counter&&this.refreshPositions(!i)})},_clear:function(e,t){function n(e,t,n){return function(i){n._trigger(e,i,t._uiHash(t))}}this.reverting=!1;var i,a=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&a.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||a.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(a.push(function(e){this._trigger("remove",e,this._uiHash())}),a.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),a.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)t||a.push(n("deactivate",this,this.containers[i])),this.containers[i].containerCache.over&&(a.push(n("out",this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(i=0;i<a.length;i++)a[i].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})}),/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){return function(){function t(e,t,n){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?n/100:1)]}function n(t,n){return parseInt(e.css(t,n),10)||0}function i(t){var n=t[0];return 9===n.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(n)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:n.preventDefault?{width:0,height:0,offset:{top:n.pageY,left:n.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var a,r,s=Math.max,o=Math.abs,l=Math.round,d=/left|center|right/,u=/top|center|bottom/,c=/[\+\-]\d+(\.[\d]+)?%?/,h=/^\w+/,p=/%$/,m=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==a)return a;var t,n,i=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),r=i.children()[0];return e("body").append(i),t=r.offsetWidth,i.css("overflow","scroll"),n=r.offsetWidth,t===n&&(n=i[0].clientWidth),i.remove(),a=t-n},getScrollInfo:function(t){var n=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),i=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),a="scroll"===n||"auto"===n&&t.width<t.element[0].scrollWidth,r="scroll"===i||"auto"===i&&t.height<t.element[0].scrollHeight;return{width:r?e.position.scrollbarWidth():0,height:a?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),i=e.isWindow(n[0]),a=!!n[0]&&9===n[0].nodeType;return{element:n,isWindow:i,isDocument:a,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:i||a?n.width():n.outerWidth(),height:i||a?n.height():n.outerHeight()}}},e.fn.position=function(a){if(!a||!a.of)return m.apply(this,arguments);a=e.extend({},a);var p,f,_,g,y,v,b=e(a.of),M=e.position.getWithinInfo(a.within),w=e.position.getScrollInfo(M),L=(a.collision||"flip").split(" "),k={};return v=i(b),b[0].preventDefault&&(a.at="left top"),f=v.width,_=v.height,g=v.offset,y=e.extend({},g),e.each(["my","at"],function(){var e,t,n=(a[this]||"").split(" ");1===n.length&&(n=d.test(n[0])?n.concat(["center"]):u.test(n[0])?["center"].concat(n):["center","center"]),n[0]=d.test(n[0])?n[0]:"center",n[1]=u.test(n[1])?n[1]:"center",e=c.exec(n[0]),t=c.exec(n[1]),k[this]=[e?e[0]:0,t?t[0]:0],a[this]=[h.exec(n[0])[0],h.exec(n[1])[0]]}),1===L.length&&(L[1]=L[0]),"right"===a.at[0]?y.left+=f:"center"===a.at[0]&&(y.left+=f/2),"bottom"===a.at[1]?y.top+=_:"center"===a.at[1]&&(y.top+=_/2),p=t(k.at,f,_),y.left+=p[0],y.top+=p[1],this.each(function(){var i,d,u=e(this),c=u.outerWidth(),h=u.outerHeight(),m=n(this,"marginLeft"),v=n(this,"marginTop"),Y=c+m+n(this,"marginRight")+w.width,D=h+v+n(this,"marginBottom")+w.height,T=e.extend({},y),x=t(k.my,u.outerWidth(),u.outerHeight());"right"===a.my[0]?T.left-=c:"center"===a.my[0]&&(T.left-=c/2),"bottom"===a.my[1]?T.top-=h:"center"===a.my[1]&&(T.top-=h/2),T.left+=x[0],T.top+=x[1],r||(T.left=l(T.left),T.top=l(T.top)),i={marginLeft:m,marginTop:v},e.each(["left","top"],function(t,n){e.ui.position[L[t]]&&e.ui.position[L[t]][n](T,{targetWidth:f,targetHeight:_,elemWidth:c,elemHeight:h,collisionPosition:i,collisionWidth:Y,collisionHeight:D,offset:[p[0]+x[0],p[1]+x[1]],my:a.my,at:a.at,within:M,elem:u})}),a.using&&(d=function(e){var t=g.left-T.left,n=t+f-c,i=g.top-T.top,r=i+_-h,l={target:{element:b,left:g.left,top:g.top,width:f,height:_},element:{element:u,left:T.left,top:T.top,width:c,height:h},horizontal:0>n?"left":t>0?"right":"center",vertical:0>r?"top":i>0?"bottom":"middle"};c>f&&o(t+n)<f&&(l.horizontal="center"),h>_&&o(i+r)<_&&(l.vertical="middle"),s(o(t),o(n))>s(o(i),o(r))?l.important="horizontal":l.important="vertical",a.using.call(this,e,l)}),u.offset(e.extend(T,{using:d}))})},e.ui.position={fit:{left:function(e,t){var n,i=t.within,a=i.isWindow?i.scrollLeft:i.offset.left,r=i.width,o=e.left-t.collisionPosition.marginLeft,l=a-o,d=o+t.collisionWidth-r-a;t.collisionWidth>r?l>0&&0>=d?(n=e.left+l+t.collisionWidth-r-a,e.left+=l-n):d>0&&0>=l?e.left=a:l>d?e.left=a+r-t.collisionWidth:e.left=a:l>0?e.left+=l:d>0?e.left-=d:e.left=s(e.left-o,e.left)},top:function(e,t){var n,i=t.within,a=i.isWindow?i.scrollTop:i.offset.top,r=t.within.height,o=e.top-t.collisionPosition.marginTop,l=a-o,d=o+t.collisionHeight-r-a;t.collisionHeight>r?l>0&&0>=d?(n=e.top+l+t.collisionHeight-r-a,e.top+=l-n):d>0&&0>=l?e.top=a:l>d?e.top=a+r-t.collisionHeight:e.top=a:l>0?e.top+=l:d>0?e.top-=d:e.top=s(e.top-o,e.top)}},flip:{left:function(e,t){var n,i,a=t.within,r=a.offset.left+a.scrollLeft,s=a.width,l=a.isWindow?a.scrollLeft:a.offset.left,d=e.left-t.collisionPosition.marginLeft,u=d-l,c=d+t.collisionWidth-s-l,h="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,m=-2*t.offset[0];0>u?(n=e.left+h+p+m+t.collisionWidth-s-r,(0>n||n<o(u))&&(e.left+=h+p+m)):c>0&&(i=e.left-t.collisionPosition.marginLeft+h+p+m-l,(i>0||o(i)<c)&&(e.left+=h+p+m))},top:function(e,t){var n,i,a=t.within,r=a.offset.top+a.scrollTop,s=a.height,l=a.isWindow?a.scrollTop:a.offset.top,d=e.top-t.collisionPosition.marginTop,u=d-l,c=d+t.collisionHeight-s-l,h="top"===t.my[1],p=h?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,m="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,f=-2*t.offset[1];0>u?(i=e.top+p+m+f+t.collisionHeight-s-r,(0>i||i<o(u))&&(e.top+=p+m+f)):c>0&&(n=e.top-t.collisionPosition.marginTop+p+m+f-l,(n>0||o(n)<c)&&(e.top+=p+m+f))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,i,a,s,o=document.getElementsByTagName("body")[0],l=document.createElement("div");t=document.createElement(o?"div":"body"),i={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(i,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in i)t.style[s]=i[s];t.appendChild(l),n=o||document.documentElement,n.insertBefore(t,n.firstChild),l.style.cssText="position: absolute; left: 10.7432222px;",a=e(l).offset().left,r=a>10&&11>a,t.innerHTML="",n.removeChild(t)}()}(),e.ui.position}),/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],e):e(jQuery)}(function(e){return e.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var n=e(t.target);!this.mouseHandled&&n.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),n.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var n=e(t.currentTarget);n.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var n,i,a,r,s=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:s=!1,i=this.previousFilter||"",a=String.fromCharCode(t.keyCode),r=!1,clearTimeout(this.filterTimer),a===i?r=!0:a=i+a,n=this._filterMenuItems(a),n=r&&-1!==n.index(this.active.next())?this.active.nextAll(".ui-menu-item"):n,n.length||(a=String.fromCharCode(t.keyCode),n=this._filterMenuItems(a)),n.length?(this.focus(t,n),this.previousFilter=a,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}s&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,n,i=this,a=this.options.icons.submenu,r=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),n=t.parent(),i=e("<span>").addClass("ui-menu-icon ui-icon "+a).data("ui-menu-submenu-carat",!0);n.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",n.attr("id"))}),t=r.add(this.element),n=t.find(this.options.items),n.not(".ui-menu-item").each(function(){var t=e(this);i._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),n.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),n.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var n,i;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),i=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",i.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&e&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,i,a,r,s,o;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,i=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,a=t.offset().top-this.activeMenu.offset().top-n-i,r=this.activeMenu.scrollTop(),s=this.activeMenu.height(),o=t.outerHeight(),0>a?this.activeMenu.scrollTop(r+a):a+o>s&&this.activeMenu.scrollTop(r+a-s+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var i=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));i.length||(i=this.element),this._close(i),this.blur(t),this.activeMenu=i},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var i;this.active&&(i="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),i&&i.length&&this.active||(i=this.activeMenu.find(this.options.items)[t]()),this.focus(n,i)},nextPage:function(t){var n,i,a;return this.active?void(this.isLastItem()||(this._hasScroll()?(i=this.active.offset().top,a=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-i-a<0}),this.focus(t,n)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(t)},previousPage:function(t){var n,i,a;return this.active?void(this.isFirstItem()||(this._hasScroll()?(i=this.active.offset().top,a=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-i+a>0}),this.focus(t,n)):this.focus(t,this.activeMenu.find(this.options.items).first()))):void this.next(t)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)},_filterMenuItems:function(t){var n=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),i=new RegExp("^"+n,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return i.test(e.trim(e(this).text()))})}})}),/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */
function(e){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],e):e(jQuery)}(function(e){return e.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,n,i,a=this.element[0].nodeName.toLowerCase(),r="textarea"===a,s="input"===a;this.isMultiLine=r?!0:s?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[r||s?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(a){if(this.element.prop("readOnly"))return t=!0,i=!0,void(n=!0);t=!1,i=!1,n=!1;var r=e.ui.keyCode;switch(a.keyCode){case r.PAGE_UP:t=!0,this._move("previousPage",a);break;case r.PAGE_DOWN:t=!0,this._move("nextPage",a);break;case r.UP:t=!0,this._keyEvent("previous",a);break;case r.DOWN:t=!0,this._keyEvent("next",a);break;case r.ENTER:this.menu.active&&(t=!0,a.preventDefault(),this.menu.select(a));break;case r.TAB:this.menu.active&&this.menu.select(a);break;case r.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(a),a.preventDefault());break;default:n=!0,this._searchTimeout(a)}},keypress:function(i){if(t)return t=!1,void((!this.isMultiLine||this.menu.element.is(":visible"))&&i.preventDefault());if(!n){var a=e.ui.keyCode;switch(i.keyCode){case a.PAGE_UP:this._move("previousPage",i);break;case a.PAGE_DOWN:this._move("nextPage",i);break;case a.UP:this._keyEvent("previous",i);break;case a.DOWN:this._keyEvent("next",i)}}},input:function(e){return i?(i=!1,void e.preventDefault()):void this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(e),void this._change(e))}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(i){i.target===t.element[0]||i.target===n||e.contains(n,i.target)||t.close()})})},menufocus:function(t,n){var i,a;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)})):(a=n.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:a})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(a.value),i=n.item.attr("aria-label")||a.value,void(i&&e.trim(i).length&&(this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))))},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item"),i=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=i,this._delay(function(){this.previous=i,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,n,i=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,i){i(e.ui.autocomplete.filter(t,n.term))}):"string"==typeof this.options.source?(n=this.options.source,this.source=function(t,a){i.xhr&&i.xhr.abort(),i.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){a(e)},error:function(){a([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),n=this.menu.element.is(":visible"),i=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!n&&!i)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var n=this.menu.element.empty();this._renderMenu(n,t),this.isNewMenu=!0,this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var i=this;e.each(n,function(e,n){i._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").text(n.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[e](t):void this.search(null,t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var i=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return i.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var n;this._superApply(arguments),this.options.disabled||this.cancelSearch||(n=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(n).appendTo(this.liveRegion))}}),e.ui.autocomplete}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";function e(){return Ni.apply(null,arguments)}function t(e){Ni=e}function n(e){return"[object Array]"===Object.prototype.toString.call(e)}function i(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function a(e,t){var n,i=[];for(n=0;n<e.length;++n)i.push(t(e[n],n));return i}function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e,t){for(var n in t)r(t,n)&&(e[n]=t[n]);return r(t,"toString")&&(e.toString=t.toString),r(t,"valueOf")&&(e.valueOf=t.valueOf),e}function o(e,t,n,i){return xe(e,t,n,i,!0).utc()}function l(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function d(e){return null==e._pf&&(e._pf=l()),e._pf}function u(e){if(null==e._isValid){var t=d(e);e._isValid=!(isNaN(e._d.getTime())||!(t.overflow<0)||t.empty||t.invalidMonth||t.invalidWeekday||t.nullInput||t.invalidFormat||t.userInvalidated),e._strict&&(e._isValid=e._isValid&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour)}return e._isValid}function c(e){var t=o(NaN);return null!=e?s(d(t),e):d(t).userInvalidated=!0,t}function h(e,t){var n,i,a;if("undefined"!=typeof t._isAMomentObject&&(e._isAMomentObject=t._isAMomentObject),"undefined"!=typeof t._i&&(e._i=t._i),"undefined"!=typeof t._f&&(e._f=t._f),"undefined"!=typeof t._l&&(e._l=t._l),"undefined"!=typeof t._strict&&(e._strict=t._strict),"undefined"!=typeof t._tzm&&(e._tzm=t._tzm),"undefined"!=typeof t._isUTC&&(e._isUTC=t._isUTC),"undefined"!=typeof t._offset&&(e._offset=t._offset),"undefined"!=typeof t._pf&&(e._pf=d(t)),"undefined"!=typeof t._locale&&(e._locale=t._locale),$i.length>0)for(n in $i)i=$i[n],a=t[i],"undefined"!=typeof a&&(e[i]=a);return e}function p(t){h(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),zi===!1&&(zi=!0,e.updateOffset(this),zi=!1)}function m(e){return e instanceof p||null!=e&&null!=e._isAMomentObject}function f(e){return 0>e?Math.ceil(e):Math.floor(e)}function _(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=f(t)),n}function g(e,t,n){var i,a=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),s=0;for(i=0;a>i;i++)(n&&e[i]!==t[i]||!n&&_(e[i])!==_(t[i]))&&s++;return s+r}function y(){}function v(e){return e?e.toLowerCase().replace("_","-"):e}function b(e){for(var t,n,i,a,r=0;r<e.length;){for(a=v(e[r]).split("-"),t=a.length,n=v(e[r+1]),n=n?n.split("-"):null;t>0;){if(i=M(a.slice(0,t).join("-")))return i;if(n&&n.length>=t&&g(a,n,!0)>=t-1)break;t--}r++}return null}function M(e){var t=null;if(!qi[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=Oi._abbr,require("./locale/"+e),w(t)}catch(n){}return qi[e]}function w(e,t){var n;return e&&(n="undefined"==typeof t?k(e):L(e,t),n&&(Oi=n)),Oi._abbr}function L(e,t){return null!==t?(t.abbr=e,qi[e]=qi[e]||new y,qi[e].set(t),w(e),qi[e]):(delete qi[e],null)}function k(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Oi;if(!n(e)){if(t=M(e))return t;e=[e]}return b(e)}function Y(e,t){var n=e.toLowerCase();Ri[n]=Ri[n+"s"]=Ri[t]=e}function D(e){return"string"==typeof e?Ri[e]||Ri[e.toLowerCase()]:void 0}function T(e){var t,n,i={};for(n in e)r(e,n)&&(t=D(n),t&&(i[t]=e[n]));return i}function x(t,n){return function(i){return null!=i?(C(this,t,i),e.updateOffset(this,n),this):S(this,t)}}function S(e,t){return e._d["get"+(e._isUTC?"UTC":"")+t]()}function C(e,t,n){return e._d["set"+(e._isUTC?"UTC":"")+t](n)}function H(e,t){var n;if("object"==typeof e)for(n in e)this.set(n,e[n]);else if(e=D(e),"function"==typeof this[e])return this[e](t);return this}function j(e,t,n){var i=""+Math.abs(e),a=t-i.length,r=e>=0;return(r?n?"+":"":"-")+Math.pow(10,Math.max(0,a)).toString().substr(1)+i}function E(e,t,n,i){var a=i;"string"==typeof i&&(a=function(){return this[i]()}),e&&(Gi[e]=a),t&&(Gi[t[0]]=function(){return j(a.apply(this,arguments),t[1],t[2])}),n&&(Gi[n]=function(){return this.localeData().ordinal(a.apply(this,arguments),e)})}function A(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function P(e){var t,n,i=e.match(Bi);for(t=0,n=i.length;n>t;t++)Gi[i[t]]?i[t]=Gi[i[t]]:i[t]=A(i[t]);return function(a){var r="";for(t=0;n>t;t++)r+=i[t]instanceof Function?i[t].call(a,e):i[t];return r}}function I(e,t){return e.isValid()?(t=W(t,e.localeData()),Ji[t]=Ji[t]||P(t),Ji[t](e)):e.localeData().invalidDate()}function W(e,t){function n(e){return t.longDateFormat(e)||e}var i=5;for(Ui.lastIndex=0;i>=0&&Ui.test(e);)e=e.replace(Ui,n),Ui.lastIndex=0,i-=1;return e}function F(e){return"function"==typeof e&&"[object Function]"===Object.prototype.toString.call(e)}function N(e,t,n){da[e]=F(t)?t:function(e){return e&&n?n:t}}function O(e,t){return r(da,e)?da[e](t._strict,t._locale):new RegExp($(e))}function $(e){return e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,i,a){return t||n||i||a}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function z(e,t){var n,i=t;for("string"==typeof e&&(e=[e]),"number"==typeof t&&(i=function(e,n){n[t]=_(e)}),n=0;n<e.length;n++)ua[e[n]]=i}function q(e,t){z(e,function(e,n,i,a){i._w=i._w||{},t(e,i._w,i,a)})}function R(e,t,n){null!=t&&r(ua,e)&&ua[e](t,n._a,n,e)}function B(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function U(e){return this._months[e.month()]}function J(e){return this._monthsShort[e.month()]}function G(e,t,n){var i,a,r;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;12>i;i++){if(a=o([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(a,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(a,"").replace(".","")+"$","i")),n||this._monthsParse[i]||(r="^"+this.months(a,"")+"|^"+this.monthsShort(a,""),this._monthsParse[i]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[i].test(e))return i;if(n&&"MMM"===t&&this._shortMonthsParse[i].test(e))return i;if(!n&&this._monthsParse[i].test(e))return i}}function V(e,t){var n;return"string"==typeof t&&(t=e.localeData().monthsParse(t),"number"!=typeof t)?e:(n=Math.min(e.date(),B(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e)}function K(t){return null!=t?(V(this,t),e.updateOffset(this,!0),this):S(this,"Month")}function Q(){return B(this.year(),this.month())}function X(e){var t,n=e._a;return n&&-2===d(e).overflow&&(t=n[ha]<0||n[ha]>11?ha:n[pa]<1||n[pa]>B(n[ca],n[ha])?pa:n[ma]<0||n[ma]>24||24===n[ma]&&(0!==n[fa]||0!==n[_a]||0!==n[ga])?ma:n[fa]<0||n[fa]>59?fa:n[_a]<0||n[_a]>59?_a:n[ga]<0||n[ga]>999?ga:-1,d(e)._overflowDayOfYear&&(ca>t||t>pa)&&(t=pa),d(e).overflow=t),e}function Z(t){e.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function ee(e,t){var n=!0;return s(function(){return n&&(Z(e+"\n"+(new Error).stack),n=!1),t.apply(this,arguments)},t)}function te(e,t){ba[e]||(Z(t),ba[e]=!0)}function ne(e){var t,n,i=e._i,a=Ma.exec(i);if(a){for(d(e).iso=!0,t=0,n=wa.length;n>t;t++)if(wa[t][1].exec(i)){e._f=wa[t][0];break}for(t=0,n=La.length;n>t;t++)if(La[t][1].exec(i)){e._f+=(a[6]||" ")+La[t][0];break}i.match(sa)&&(e._f+="Z"),Me(e)}else e._isValid=!1}function ie(t){var n=ka.exec(t._i);return null!==n?void(t._d=new Date(+n[1])):(ne(t),void(t._isValid===!1&&(delete t._isValid,e.createFromInputFallback(t))))}function ae(e,t,n,i,a,r,s){var o=new Date(e,t,n,i,a,r,s);return 1970>e&&o.setFullYear(e),o}function re(e){var t=new Date(Date.UTC.apply(null,arguments));return 1970>e&&t.setUTCFullYear(e),t}function se(e){return oe(e)?366:365}function oe(e){return e%4===0&&e%100!==0||e%400===0}function le(){return oe(this.year())}function de(e,t,n){var i,a=n-t,r=n-e.day();return r>a&&(r-=7),a-7>r&&(r+=7),i=Se(e).add(r,"d"),{week:Math.ceil(i.dayOfYear()/7),year:i.year()}}function ue(e){return de(e,this._week.dow,this._week.doy).week}function ce(){return this._week.dow}function he(){return this._week.doy}function pe(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")}function me(e){var t=de(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")}function fe(e,t,n,i,a){var r,s=6+a-i,o=re(e,0,1+s),l=o.getUTCDay();return a>l&&(l+=7),n=null!=n?1*n:a,r=1+s+7*(t-1)-l+n,{year:r>0?e:e-1,dayOfYear:r>0?r:se(e-1)+r}}function _e(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")}function ge(e,t,n){return null!=e?e:null!=t?t:n}function ye(e){var t=new Date;return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function ve(e){var t,n,i,a,r=[];if(!e._d){for(i=ye(e),e._w&&null==e._a[pa]&&null==e._a[ha]&&be(e),e._dayOfYear&&(a=ge(e._a[ca],i[ca]),e._dayOfYear>se(a)&&(d(e)._overflowDayOfYear=!0),n=re(a,0,e._dayOfYear),e._a[ha]=n.getUTCMonth(),e._a[pa]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a[t]=r[t]=i[t];for(;7>t;t++)e._a[t]=r[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ma]&&0===e._a[fa]&&0===e._a[_a]&&0===e._a[ga]&&(e._nextDay=!0,e._a[ma]=0),e._d=(e._useUTC?re:ae).apply(null,r),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ma]=24)}}function be(e){var t,n,i,a,r,s,o;t=e._w,null!=t.GG||null!=t.W||null!=t.E?(r=1,s=4,n=ge(t.GG,e._a[ca],de(Se(),1,4).year),i=ge(t.W,1),a=ge(t.E,1)):(r=e._locale._week.dow,s=e._locale._week.doy,n=ge(t.gg,e._a[ca],de(Se(),r,s).year),i=ge(t.w,1),null!=t.d?(a=t.d,r>a&&++i):a=null!=t.e?t.e+r:r),o=fe(n,i,a,s,r),e._a[ca]=o.year,e._dayOfYear=o.dayOfYear}function Me(t){if(t._f===e.ISO_8601)return void ne(t);t._a=[],d(t).empty=!0;var n,i,a,r,s,o=""+t._i,l=o.length,u=0;for(a=W(t._f,t._locale).match(Bi)||[],n=0;n<a.length;n++)r=a[n],i=(o.match(O(r,t))||[])[0],i&&(s=o.substr(0,o.indexOf(i)),s.length>0&&d(t).unusedInput.push(s),o=o.slice(o.indexOf(i)+i.length),u+=i.length),Gi[r]?(i?d(t).empty=!1:d(t).unusedTokens.push(r),R(r,i,t)):t._strict&&!i&&d(t).unusedTokens.push(r);d(t).charsLeftOver=l-u,o.length>0&&d(t).unusedInput.push(o),d(t).bigHour===!0&&t._a[ma]<=12&&t._a[ma]>0&&(d(t).bigHour=void 0),t._a[ma]=we(t._locale,t._a[ma],t._meridiem),ve(t),X(t)}function we(e,t,n){var i;return null==n?t:null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?(i=e.isPM(n),i&&12>t&&(t+=12),i||12!==t||(t=0),t):t}function Le(e){var t,n,i,a,r;if(0===e._f.length)return d(e).invalidFormat=!0,void(e._d=new Date(NaN));for(a=0;a<e._f.length;a++)r=0,t=h({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[a],Me(t),u(t)&&(r+=d(t).charsLeftOver,r+=10*d(t).unusedTokens.length,d(t).score=r,(null==i||i>r)&&(i=r,n=t));s(e,n||t)}function ke(e){if(!e._d){var t=T(e._i);e._a=[t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],ve(e)}}function Ye(e){var t=new p(X(De(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}function De(e){var t=e._i,a=e._f;return e._locale=e._locale||k(e._l),null===t||void 0===a&&""===t?c({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),m(t)?new p(X(t)):(n(a)?Le(e):a?Me(e):i(t)?e._d=t:Te(e),e))}function Te(t){var r=t._i;void 0===r?t._d=new Date:i(r)?t._d=new Date(+r):"string"==typeof r?ie(t):n(r)?(t._a=a(r.slice(0),function(e){return parseInt(e,10)}),ve(t)):"object"==typeof r?ke(t):"number"==typeof r?t._d=new Date(r):e.createFromInputFallback(t)}function xe(e,t,n,i,a){var r={};return"boolean"==typeof n&&(i=n,n=void 0),r._isAMomentObject=!0,r._useUTC=r._isUTC=a,r._l=n,r._i=e,r._f=t,r._strict=i,Ye(r)}function Se(e,t,n,i){return xe(e,t,n,i,!1)}function Ce(e,t){var i,a;if(1===t.length&&n(t[0])&&(t=t[0]),!t.length)return Se();for(i=t[0],a=1;a<t.length;++a)(!t[a].isValid()||t[a][e](i))&&(i=t[a]);return i}function He(){var e=[].slice.call(arguments,0);return Ce("isBefore",e)}function je(){var e=[].slice.call(arguments,0);return Ce("isAfter",e)}function Ee(e){var t=T(e),n=t.year||0,i=t.quarter||0,a=t.month||0,r=t.week||0,s=t.day||0,o=t.hour||0,l=t.minute||0,d=t.second||0,u=t.millisecond||0;this._milliseconds=+u+1e3*d+6e4*l+36e5*o,this._days=+s+7*r,this._months=+a+3*i+12*n,this._data={},this._locale=k(),this._bubble()}function Ae(e){return e instanceof Ee}function Pe(e,t){E(e,0,0,function(){var e=this.utcOffset(),n="+";return 0>e&&(e=-e,n="-"),n+j(~~(e/60),2)+t+j(~~e%60,2)})}function Ie(e){var t=(e||"").match(sa)||[],n=t[t.length-1]||[],i=(n+"").match(Sa)||["-",0,0],a=+(60*i[1])+_(i[2]);return"+"===i[0]?a:-a}function We(t,n){var a,r;return n._isUTC?(a=n.clone(),r=(m(t)||i(t)?+t:+Se(t))-+a,a._d.setTime(+a._d+r),e.updateOffset(a,!1),a):Se(t).local()}function Fe(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Ne(t,n){var i,a=this._offset||0;return null!=t?("string"==typeof t&&(t=Ie(t)),Math.abs(t)<16&&(t=60*t),!this._isUTC&&n&&(i=Fe(this)),this._offset=t,this._isUTC=!0,null!=i&&this.add(i,"m"),a!==t&&(!n||this._changeInProgress?tt(this,Ke(t-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?a:Fe(this)}function Oe(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}function $e(e){return this.utcOffset(0,e)}function ze(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Fe(this),"m")),this}function qe(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ie(this._i)),this}function Re(e){return e=e?Se(e).utcOffset():0,(this.utcOffset()-e)%60===0}function Be(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ue(){if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;var e={};if(h(e,this),e=De(e),e._a){var t=e._isUTC?o(e._a):Se(e._a);this._isDSTShifted=this.isValid()&&g(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Je(){return!this._isUTC}function Ge(){return this._isUTC}function Ve(){return this._isUTC&&0===this._offset}function Ke(e,t){var n,i,a,s=e,o=null;return Ae(e)?s={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(s={},t?s[t]=e:s.milliseconds=e):(o=Ca.exec(e))?(n="-"===o[1]?-1:1,s={y:0,d:_(o[pa])*n,h:_(o[ma])*n,m:_(o[fa])*n,s:_(o[_a])*n,ms:_(o[ga])*n}):(o=Ha.exec(e))?(n="-"===o[1]?-1:1,s={y:Qe(o[2],n),M:Qe(o[3],n),d:Qe(o[4],n),h:Qe(o[5],n),m:Qe(o[6],n),s:Qe(o[7],n),w:Qe(o[8],n)}):null==s?s={}:"object"==typeof s&&("from"in s||"to"in s)&&(a=Ze(Se(s.from),Se(s.to)),s={},s.ms=a.milliseconds,s.M=a.months),i=new Ee(s),Ae(e)&&r(e,"_locale")&&(i._locale=e._locale),i}function Qe(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Xe(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function Ze(e,t){var n;return t=We(t,e),e.isBefore(t)?n=Xe(e,t):(n=Xe(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n}function et(e,t){return function(n,i){var a,r;return null===i||isNaN(+i)||(te(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period)."),r=n,n=i,i=r),n="string"==typeof n?+n:n,a=Ke(n,i),tt(this,a,e),this}}function tt(t,n,i,a){var r=n._milliseconds,s=n._days,o=n._months;a=null==a?!0:a,r&&t._d.setTime(+t._d+r*i),s&&C(t,"Date",S(t,"Date")+s*i),o&&V(t,S(t,"Month")+o*i),a&&e.updateOffset(t,s||o)}function nt(e,t){var n=e||Se(),i=We(n,this).startOf("day"),a=this.diff(i,"days",!0),r=-6>a?"sameElse":-1>a?"lastWeek":0>a?"lastDay":1>a?"sameDay":2>a?"nextDay":7>a?"nextWeek":"sameElse";return this.format(t&&t[r]||this.localeData().calendar(r,this,Se(n)))}function it(){return new p(this)}function at(e,t){var n;return t=D("undefined"!=typeof t?t:"millisecond"),"millisecond"===t?(e=m(e)?e:Se(e),+this>+e):(n=m(e)?+e:+Se(e),n<+this.clone().startOf(t))}function rt(e,t){var n;return t=D("undefined"!=typeof t?t:"millisecond"),"millisecond"===t?(e=m(e)?e:Se(e),+e>+this):(n=m(e)?+e:+Se(e),+this.clone().endOf(t)<n)}function st(e,t,n){return this.isAfter(e,n)&&this.isBefore(t,n)}function ot(e,t){var n;return t=D(t||"millisecond"),"millisecond"===t?(e=m(e)?e:Se(e),+this===+e):(n=+Se(e),+this.clone().startOf(t)<=n&&n<=+this.clone().endOf(t))}function lt(e,t,n){var i,a,r=We(e,this),s=6e4*(r.utcOffset()-this.utcOffset());return t=D(t),"year"===t||"month"===t||"quarter"===t?(a=dt(this,r),"quarter"===t?a/=3:"year"===t&&(a/=12)):(i=this-r,a="second"===t?i/1e3:"minute"===t?i/6e4:"hour"===t?i/36e5:"day"===t?(i-s)/864e5:"week"===t?(i-s)/6048e5:i),n?a:f(a)}function dt(e,t){var n,i,a=12*(t.year()-e.year())+(t.month()-e.month()),r=e.clone().add(a,"months");return 0>t-r?(n=e.clone().add(a-1,"months"),i=(t-r)/(r-n)):(n=e.clone().add(a+1,"months"),i=(t-r)/(n-r)),-(a+i)}function ut(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ct(){var e=this.clone().utc();return 0<e.year()&&e.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():I(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):I(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function ht(t){var n=I(this,t||e.defaultFormat);return this.localeData().postformat(n)}function pt(e,t){return this.isValid()?Ke({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function mt(e){return this.from(Se(),e)}function ft(e,t){return this.isValid()?Ke({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()}function _t(e){return this.to(Se(),e)}function gt(e){var t;return void 0===e?this._locale._abbr:(t=k(e),null!=t&&(this._locale=t),this)}function yt(){return this._locale}function vt(e){switch(e=D(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this}function bt(e){return e=D(e),void 0===e||"millisecond"===e?this:this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms")}function Mt(){return+this._d-6e4*(this._offset||0)}function wt(){return Math.floor(+this/1e3)}function Lt(){return this._offset?new Date(+this):this._d}function kt(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]}function Yt(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}}function Dt(){return u(this)}function Tt(){return s({},d(this))}function xt(){return d(this).overflow}function St(e,t){E(0,[e,e.length],0,t)}function Ct(e,t,n){return de(Se([e,11,31+t-n]),t,n).week}function Ht(e){var t=de(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==e?t:this.add(e-t,"y")}function jt(e){var t=de(this,1,4).year;return null==e?t:this.add(e-t,"y")}function Et(){return Ct(this.year(),1,4)}function At(){var e=this.localeData()._week;return Ct(this.year(),e.dow,e.doy)}function Pt(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)}function It(e,t){return"string"!=typeof e?e:isNaN(e)?(e=t.weekdaysParse(e),"number"==typeof e?e:null):parseInt(e,10)}function Wt(e){return this._weekdays[e.day()]}function Ft(e){return this._weekdaysShort[e.day()]}function Nt(e){return this._weekdaysMin[e.day()]}function Ot(e){var t,n,i;for(this._weekdaysParse=this._weekdaysParse||[],t=0;7>t;t++)if(this._weekdaysParse[t]||(n=Se([2e3,1]).day(t),i="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[t]=new RegExp(i.replace(".",""),"i")),this._weekdaysParse[t].test(e))return t}function $t(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=It(e,this.localeData()),this.add(e-t,"d")):t}function zt(e){var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")}function qt(e){return null==e?this.day()||7:this.day(this.day()%7?e:e-7)}function Rt(e,t){E(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Bt(e,t){return t._meridiemParse}function Ut(e){return"p"===(e+"").toLowerCase().charAt(0)}function Jt(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"}function Gt(e,t){t[ga]=_(1e3*("0."+e))}function Vt(){return this._isUTC?"UTC":""}function Kt(){return this._isUTC?"Coordinated Universal Time":""}function Qt(e){return Se(1e3*e)}function Xt(){return Se.apply(null,arguments).parseZone()}function Zt(e,t,n){var i=this._calendar[e];return"function"==typeof i?i.call(t,n):i}function en(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])}function tn(){return this._invalidDate}function nn(e){return this._ordinal.replace("%d",e)}function an(e){return e}function rn(e,t,n,i){var a=this._relativeTime[n];return"function"==typeof a?a(e,t,n,i):a.replace(/%d/i,e)}function sn(e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t):n.replace(/%s/i,t)}function on(e){var t,n;for(n in e)t=e[n],"function"==typeof t?this[n]=t:this["_"+n]=t;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ln(e,t,n,i){var a=k(),r=o().set(i,t);return a[n](r,e)}function dn(e,t,n,i,a){if("number"==typeof e&&(t=e,e=void 0),e=e||"",null!=t)return ln(e,t,n,a);var r,s=[];for(r=0;i>r;r++)s[r]=ln(e,r,n,a);return s}function un(e,t){return dn(e,t,"months",12,"month")}function cn(e,t){return dn(e,t,"monthsShort",12,"month")}function hn(e,t){return dn(e,t,"weekdays",7,"day")}function pn(e,t){return dn(e,t,"weekdaysShort",7,"day")}function mn(e,t){return dn(e,t,"weekdaysMin",7,"day")}function fn(){var e=this._data;return this._milliseconds=er(this._milliseconds),this._days=er(this._days),this._months=er(this._months),e.milliseconds=er(e.milliseconds),e.seconds=er(e.seconds),e.minutes=er(e.minutes),e.hours=er(e.hours),e.months=er(e.months),e.years=er(e.years),this}function _n(e,t,n,i){var a=Ke(t,n);return e._milliseconds+=i*a._milliseconds,e._days+=i*a._days,e._months+=i*a._months,e._bubble()}function gn(e,t){return _n(this,e,t,1)}function yn(e,t){return _n(this,e,t,-1)}function vn(e){return 0>e?Math.floor(e):Math.ceil(e)}function bn(){var e,t,n,i,a,r=this._milliseconds,s=this._days,o=this._months,l=this._data;return r>=0&&s>=0&&o>=0||0>=r&&0>=s&&0>=o||(r+=864e5*vn(wn(o)+s),s=0,o=0),l.milliseconds=r%1e3,e=f(r/1e3),l.seconds=e%60,t=f(e/60),l.minutes=t%60,n=f(t/60),l.hours=n%24,s+=f(n/24),a=f(Mn(s)),o+=a,s-=vn(wn(a)),i=f(o/12),o%=12,l.days=s,l.months=o,l.years=i,this}function Mn(e){return 4800*e/146097}function wn(e){return 146097*e/4800}function Ln(e){var t,n,i=this._milliseconds;if(e=D(e),"month"===e||"year"===e)return t=this._days+i/864e5,n=this._months+Mn(t),"month"===e?n:n/12;switch(t=this._days+Math.round(wn(this._months)),e){case"week":return t/7+i/6048e5;case"day":return t+i/864e5;case"hour":return 24*t+i/36e5;case"minute":return 1440*t+i/6e4;case"second":return 86400*t+i/1e3;case"millisecond":return Math.floor(864e5*t)+i;default:throw new Error("Unknown unit "+e)}}function kn(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*_(this._months/12)}function Yn(e){return function(){return this.as(e)}}function Dn(e){return e=D(e),this[e+"s"]()}function Tn(e){return function(){return this._data[e]}}function xn(){return f(this.days()/7)}function Sn(e,t,n,i,a){return a.relativeTime(t||1,!!n,e,i)}function Cn(e,t,n){var i=Ke(e).abs(),a=_r(i.as("s")),r=_r(i.as("m")),s=_r(i.as("h")),o=_r(i.as("d")),l=_r(i.as("M")),d=_r(i.as("y")),u=a<gr.s&&["s",a]||1===r&&["m"]||r<gr.m&&["mm",r]||1===s&&["h"]||s<gr.h&&["hh",s]||1===o&&["d"]||o<gr.d&&["dd",o]||1===l&&["M"]||l<gr.M&&["MM",l]||1===d&&["y"]||["yy",d];return u[2]=t,u[3]=+e>0,u[4]=n,Sn.apply(null,u)}function Hn(e,t){return void 0===gr[e]?!1:void 0===t?gr[e]:(gr[e]=t,!0)}function jn(e){var t=this.localeData(),n=Cn(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)}function En(){var e,t,n,i=yr(this._milliseconds)/1e3,a=yr(this._days),r=yr(this._months);e=f(i/60),t=f(e/60),i%=60,e%=60,n=f(r/12),r%=12;var s=n,o=r,l=a,d=t,u=e,c=i,h=this.asSeconds();return h?(0>h?"-":"")+"P"+(s?s+"Y":"")+(o?o+"M":"")+(l?l+"D":"")+(d||u||c?"T":"")+(d?d+"H":"")+(u?u+"M":"")+(c?c+"S":""):"P0D"}
//! moment.js locale configuration
//! locale : belarusian (be)
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion ElensÃºle : https://github.com/Oire
function An(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&4>=t%10&&(10>t%100||t%100>=20)?n[1]:n[2]}function Pn(e,t,n){var i={mm:t?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d",hh:t?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d",dd:"\u0434\u0437\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u0437\u0451\u043d",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u044b_\u043c\u0435\u0441\u044f\u0446\u0430\u045e",yy:"\u0433\u043e\u0434_\u0433\u0430\u0434\u044b_\u0433\u0430\u0434\u043e\u045e"};return"m"===n?t?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443":"h"===n?t?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443":e+" "+An(i[n],+e)}function In(e,t){var n={nominative:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044c_\u043b\u044e\u0442\u044b_\u0441\u0430\u043a\u0430\u0432\u0456\u043a_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u044d\u0440\u0432\u0435\u043d\u044c_\u043b\u0456\u043f\u0435\u043d\u044c_\u0436\u043d\u0456\u0432\u0435\u043d\u044c_\u0432\u0435\u0440\u0430\u0441\u0435\u043d\u044c_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434_\u0441\u043d\u0435\u0436\u0430\u043d\u044c".split("_"),accusative:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044f_\u043b\u044e\u0442\u0430\u0433\u0430_\u0441\u0430\u043a\u0430\u0432\u0456\u043a\u0430_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a\u0430_\u0442\u0440\u0430\u045e\u043d\u044f_\u0447\u044d\u0440\u0432\u0435\u043d\u044f_\u043b\u0456\u043f\u0435\u043d\u044f_\u0436\u043d\u0456\u045e\u043d\u044f_\u0432\u0435\u0440\u0430\u0441\u043d\u044f_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a\u0430_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434\u0430_\u0441\u043d\u0435\u0436\u043d\u044f".split("_")},i=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function Wn(e,t){var n={nominative:"\u043d\u044f\u0434\u0437\u0435\u043b\u044f_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0430_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),accusative:"\u043d\u044f\u0434\u0437\u0435\u043b\u044e_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0443_\u0441\u0443\u0431\u043e\u0442\u0443".split("_")},i=/\[ ?[\u0412\u0432] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/.test(t)?"accusative":"nominative";return n[i][e.day()]}
//! moment.js locale configuration
//! locale : breton (br)
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
function Fn(e,t,n){var i={mm:"munutenn",MM:"miz",dd:"devezh"};return e+" "+$n(i[n],e)}function Nn(e){switch(On(e)){case 1:case 3:case 4:case 5:case 9:return e+" bloaz";default:return e+" vloaz"}}function On(e){return e>9?On(e%10):e}function $n(e,t){return 2===t?zn(e):e}function zn(e){var t={m:"v",b:"v",d:"z"};return void 0===t[e.charAt(0)]?e:t[e.charAt(0)]+e.substring(1)}
//! moment.js locale configuration
//! locale : bosnian (bs)
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan MarkoviÄ‡
function qn(e,t,n){var i=e+" ";switch(n){case"m":return t?"jedna minuta":"jedne minute";case"mm":return i+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return i+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return i+=1===e?"dan":"dana";case"MM":return i+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return i+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}function Rn(e){return e>1&&5>e&&1!==~~(e/10)}function Bn(e,t,n,i){var a=e+" ";switch(n){case"s":return t||i?"p\xe1r sekund":"p\xe1r sekundami";case"m":return t?"minuta":i?"minutu":"minutou";case"mm":return t||i?a+(Rn(e)?"minuty":"minut"):a+"minutami";case"h":return t?"hodina":i?"hodinu":"hodinou";case"hh":return t||i?a+(Rn(e)?"hodiny":"hodin"):a+"hodinami";case"d":return t||i?"den":"dnem";case"dd":return t||i?a+(Rn(e)?"dny":"dn\xed"):a+"dny";case"M":return t||i?"m\u011bs\xedc":"m\u011bs\xedcem";case"MM":return t||i?a+(Rn(e)?"m\u011bs\xedce":"m\u011bs\xedc\u016f"):a+"m\u011bs\xedci";case"y":return t||i?"rok":"rokem";case"yy":return t||i?a+(Rn(e)?"roky":"let"):a+"lety"}}
//! moment.js locale configuration
//! locale : austrian german (de-at)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion ElensÃºle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
function Un(e,t,n,i){var a={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?a[n][0]:a[n][1]}
//! moment.js locale configuration
//! locale : german (de)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion ElensÃºle: https://github.com/Oire
function Jn(e,t,n,i){var a={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return t?a[n][0]:a[n][1]}
//! moment.js locale configuration
//! locale : estonian (et)
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka
function Gn(e,t,n,i){var a={s:["m\xf5ne sekundi","m\xf5ni sekund","paar sekundit"],m:["\xfche minuti","\xfcks minut"],mm:[e+" minuti",e+" minutit"],h:["\xfche tunni","tund aega","\xfcks tund"],hh:[e+" tunni",e+" tundi"],d:["\xfche p\xe4eva","\xfcks p\xe4ev"],M:["kuu aja","kuu aega","\xfcks kuu"],MM:[e+" kuu",e+" kuud"],y:["\xfche aasta","aasta","\xfcks aasta"],yy:[e+" aasta",e+" aastat"]};return t?a[n][2]?a[n][2]:a[n][1]:i?a[n][0]:a[n][1]}function Vn(e,t,n,i){var a="";switch(n){case"s":return i?"muutaman sekunnin":"muutama sekunti";case"m":return i?"minuutin":"minuutti";case"mm":a=i?"minuutin":"minuuttia";break;case"h":return i?"tunnin":"tunti";case"hh":a=i?"tunnin":"tuntia";break;case"d":return i?"p\xe4iv\xe4n":"p\xe4iv\xe4";case"dd":a=i?"p\xe4iv\xe4n":"p\xe4iv\xe4\xe4";break;case"M":return i?"kuukauden":"kuukausi";case"MM":a=i?"kuukauden":"kuukautta";break;case"y":return i?"vuoden":"vuosi";case"yy":a=i?"vuoden":"vuotta"}return a=Kn(e,i)+" "+a}function Kn(e,t){return 10>e?t?$r[e]:Or[e]:e}
//! moment.js locale configuration
//! locale : hrvatski (hr)
//! author : Bojan MarkoviÄ‡ : https://github.com/bmarkovic
function Qn(e,t,n){var i=e+" ";switch(n){case"m":return t?"jedna minuta":"jedne minute";case"mm":return i+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return t?"jedan sat":"jednog sata";case"hh":return i+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return i+=1===e?"dan":"dana";case"MM":return i+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return i+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}function Xn(e,t,n,i){var a=e;switch(n){case"s":return i||t?"n\xe9h\xe1ny m\xe1sodperc":"n\xe9h\xe1ny m\xe1sodperce";case"m":return"egy"+(i||t?" perc":" perce");case"mm":return a+(i||t?" perc":" perce");case"h":return"egy"+(i||t?" \xf3ra":" \xf3r\xe1ja");case"hh":return a+(i||t?" \xf3ra":" \xf3r\xe1ja");case"d":return"egy"+(i||t?" nap":" napja");case"dd":return a+(i||t?" nap":" napja");case"M":return"egy"+(i||t?" h\xf3nap":" h\xf3napja");case"MM":return a+(i||t?" h\xf3nap":" h\xf3napja");case"y":return"egy"+(i||t?" \xe9v":" \xe9ve");case"yy":return a+(i||t?" \xe9v":" \xe9ve")}return""}function Zn(e){return(e?"":"[m\xfalt] ")+"["+Ur[this.day()]+"] LT[-kor]"}
//! moment.js locale configuration
//! locale : Armenian (hy-am)
//! author : Armendarabyan : https://github.com/armendarabyan
function ei(e,t){var n={nominative:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580_\u0583\u0565\u057f\u0580\u057e\u0561\u0580_\u0574\u0561\u0580\u057f_\u0561\u057a\u0580\u056b\u056c_\u0574\u0561\u0575\u056b\u057d_\u0570\u0578\u0582\u0576\u056b\u057d_\u0570\u0578\u0582\u056c\u056b\u057d_\u0585\u0563\u0578\u057d\u057f\u0578\u057d_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split("_"),accusative:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580\u056b_\u0583\u0565\u057f\u0580\u057e\u0561\u0580\u056b_\u0574\u0561\u0580\u057f\u056b_\u0561\u057a\u0580\u056b\u056c\u056b_\u0574\u0561\u0575\u056b\u057d\u056b_\u0570\u0578\u0582\u0576\u056b\u057d\u056b_\u0570\u0578\u0582\u056c\u056b\u057d\u056b_\u0585\u0563\u0578\u057d\u057f\u0578\u057d\u056b_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056b_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b".split("_")},i=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function ti(e,t){var n="\u0570\u0576\u057e_\u0583\u057f\u0580_\u0574\u0580\u057f_\u0561\u057a\u0580_\u0574\u0575\u057d_\u0570\u0576\u057d_\u0570\u056c\u057d_\u0585\u0563\u057d_\u057d\u057a\u057f_\u0570\u056f\u057f_\u0576\u0574\u0562_\u0564\u056f\u057f".split("_");return n[e.month()]}function ni(e,t){var n="\u056f\u056b\u0580\u0561\u056f\u056b_\u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_");return n[e.day()]}
//! moment.js locale configuration
//! locale : icelandic (is)
//! author : Hinrik Ã–rn SigurÃ°sson : https://github.com/hinrik
function ii(e){return e%100===11?!0:e%10===1?!1:!0}function ai(e,t,n,i){var a=e+" ";switch(n){case"s":return t||i?"nokkrar sek\xfandur":"nokkrum sek\xfandum";case"m":return t?"m\xedn\xfata":"m\xedn\xfatu";case"mm":return ii(e)?a+(t||i?"m\xedn\xfatur":"m\xedn\xfatum"):t?a+"m\xedn\xfata":a+"m\xedn\xfatu";case"hh":return ii(e)?a+(t||i?"klukkustundir":"klukkustundum"):a+"klukkustund";case"d":return t?"dagur":i?"dag":"degi";case"dd":return ii(e)?t?a+"dagar":a+(i?"daga":"d\xf6gum"):t?a+"dagur":a+(i?"dag":"degi");case"M":return t?"m\xe1nu\xf0ur":i?"m\xe1nu\xf0":"m\xe1nu\xf0i";case"MM":return ii(e)?t?a+"m\xe1nu\xf0ir":a+(i?"m\xe1nu\xf0i":"m\xe1nu\xf0um"):t?a+"m\xe1nu\xf0ur":a+(i?"m\xe1nu\xf0":"m\xe1nu\xf0i");case"y":return t||i?"\xe1r":"\xe1ri";case"yy":return ii(e)?a+(t||i?"\xe1r":"\xe1rum"):a+(t||i?"\xe1r":"\xe1ri")}}
//! moment.js locale configuration
//! locale : Georgian (ka)
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
function ri(e,t){var n={nominative:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8_\u10db\u10d0\u10e0\u10e2\u10d8_\u10d0\u10de\u10e0\u10d8\u10da\u10d8_\u10db\u10d0\u10d8\u10e1\u10d8_\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8_\u10d8\u10d5\u10da\u10d8\u10e1\u10d8_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8".split("_"),accusative:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10e1_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10e1_\u10db\u10d0\u10e0\u10e2\u10e1_\u10d0\u10de\u10e0\u10d8\u10da\u10d8\u10e1_\u10db\u10d0\u10d8\u10e1\u10e1_\u10d8\u10d5\u10dc\u10d8\u10e1\u10e1_\u10d8\u10d5\u10da\u10d8\u10e1\u10e1_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10e1_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10e1_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10e1".split("_")},i=/D[oD] *MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function si(e,t){var n={nominative:"\u10d9\u10d5\u10d8\u10e0\u10d0_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8_\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8".split("_"),accusative:"\u10d9\u10d5\u10d8\u10e0\u10d0\u10e1_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10e1_\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1".split("_")},i=/(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/.test(t)?"accusative":"nominative";return n[i][e.day()]}
//! moment.js locale configuration
//! locale : Luxembourgish (lb)
//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
function oi(e,t,n,i){var a={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return t?a[n][0]:a[n][1]}function li(e){var t=e.substr(0,e.indexOf(" "));return ui(t)?"a "+e:"an "+e}function di(e){var t=e.substr(0,e.indexOf(" "));return ui(t)?"viru "+e:"virun "+e}function ui(e){if(e=parseInt(e,10),isNaN(e))return!1;if(0>e)return!0;if(10>e)return e>=4&&7>=e?!0:!1;if(100>e){var t=e%10,n=e/10;return ui(0===t?n:t)}if(1e4>e){for(;e>=10;)e/=10;return ui(e)}return e/=1e3,ui(e)}function ci(e,t,n,i){return t?"kelios sekund\u0117s":i?"keli\u0173 sekund\u017ei\u0173":"kelias sekundes"}function hi(e,t){var n={nominative:"sausis_vasaris_kovas_balandis_gegu\u017e\u0117_bir\u017eelis_liepa_rugpj\u016btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"),accusative:"sausio_vasario_kovo_baland\u017eio_gegu\u017e\u0117s_bir\u017eelio_liepos_rugpj\u016b\u010dio_rugs\u0117jo_spalio_lapkri\u010dio_gruod\u017eio".split("_")},i=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function pi(e,t,n,i){return t?fi(n)[0]:i?fi(n)[1]:fi(n)[2]}function mi(e){return e%10===0||e>10&&20>e}function fi(e){return Jr[e].split("_")}function _i(e,t,n,i){var a=e+" ";return 1===e?a+pi(e,t,n[0],i):t?a+(mi(e)?fi(n)[1]:fi(n)[0]):i?a+fi(n)[1]:a+(mi(e)?fi(n)[1]:fi(n)[2])}function gi(e,t){var n=-1===t.indexOf("dddd HH:mm"),i=Gr[e.day()];return n?i:i.substring(0,i.length-2)+"\u012f"}function yi(e,t,n){return n?t%10===1&&11!==t?e[2]:e[3]:t%10===1&&11!==t?e[0]:e[1]}function vi(e,t,n){return e+" "+yi(Vr[n],e,t)}function bi(e,t,n){return yi(Vr[n],e,t)}function Mi(e,t){return t?"da\u017eas sekundes":"da\u017e\u0101m sekund\u0113m"}function wi(e){return 5>e%10&&e%10>1&&~~(e/10)%10!==1}function Li(e,t,n){var i=e+" ";switch(n){case"m":return t?"minuta":"minut\u0119";case"mm":return i+(wi(e)?"minuty":"minut");case"h":return t?"godzina":"godzin\u0119";case"hh":return i+(wi(e)?"godziny":"godzin");case"MM":return i+(wi(e)?"miesi\u0105ce":"miesi\u0119cy");case"yy":return i+(wi(e)?"lata":"lat")}}
//! moment.js locale configuration
//! locale : romanian (ro)
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
function ki(e,t,n){var i={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},a=" ";return(e%100>=20||e>=100&&e%100===0)&&(a=" de "),e+a+i[n]}
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion ElensÃºle : https://github.com/Oire
function Yi(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&4>=t%10&&(10>t%100||t%100>=20)?n[1]:n[2]}function Di(e,t,n){var i={mm:t?"\u043c\u0438\u043d\u0443\u0442\u0430_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442":"\u043c\u0438\u043d\u0443\u0442\u0443_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442",hh:"\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043e\u0432",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0435\u0439",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u0430_\u043c\u0435\u0441\u044f\u0446\u0435\u0432",yy:"\u0433\u043e\u0434_\u0433\u043e\u0434\u0430_\u043b\u0435\u0442"};return"m"===n?t?"\u043c\u0438\u043d\u0443\u0442\u0430":"\u043c\u0438\u043d\u0443\u0442\u0443":e+" "+Yi(i[n],+e)}function Ti(e,t){var n={nominative:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"),accusative:"\u044f\u043d\u0432\u0430\u0440\u044f_\u0444\u0435\u0432\u0440\u0430\u043b\u044f_\u043c\u0430\u0440\u0442\u0430_\u0430\u043f\u0440\u0435\u043b\u044f_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f_\u043e\u043a\u0442\u044f\u0431\u0440\u044f_\u043d\u043e\u044f\u0431\u0440\u044f_\u0434\u0435\u043a\u0430\u0431\u0440\u044f".split("_")},i=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function xi(e,t){var n={nominative:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),accusative:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_")},i=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function Si(e,t){var n={nominative:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split("_"),accusative:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043e\u0442\u0443".split("_")},i=/\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/.test(t)?"accusative":"nominative";return n[i][e.day()]}function Ci(e){return e>1&&5>e}function Hi(e,t,n,i){var a=e+" ";switch(n){case"s":return t||i?"p\xe1r sek\xfand":"p\xe1r sekundami";case"m":return t?"min\xfata":i?"min\xfatu":"min\xfatou";case"mm":return t||i?a+(Ci(e)?"min\xfaty":"min\xfat"):a+"min\xfatami";case"h":return t?"hodina":i?"hodinu":"hodinou";case"hh":return t||i?a+(Ci(e)?"hodiny":"hod\xedn"):a+"hodinami";case"d":return t||i?"de\u0148":"d\u0148om";case"dd":return t||i?a+(Ci(e)?"dni":"dn\xed"):a+"d\u0148ami";case"M":return t||i?"mesiac":"mesiacom";case"MM":return t||i?a+(Ci(e)?"mesiace":"mesiacov"):a+"mesiacmi";case"y":return t||i?"rok":"rokom";case"yy":return t||i?a+(Ci(e)?"roky":"rokov"):a+"rokmi"}}
//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert SedovÅ¡ek : https://github.com/sedovsek
function ji(e,t,n,i){var a=e+" ";switch(n){case"s":return t||i?"nekaj sekund":"nekaj sekundami";case"m":return t?"ena minuta":"eno minuto";case"mm":return a+=1===e?t?"minuta":"minuto":2===e?t||i?"minuti":"minutama":5>e?t||i?"minute":"minutami":t||i?"minut":"minutami";case"h":return t?"ena ura":"eno uro";case"hh":return a+=1===e?t?"ura":"uro":2===e?t||i?"uri":"urama":5>e?t||i?"ure":"urami":t||i?"ur":"urami";case"d":return t||i?"en dan":"enim dnem";case"dd":return a+=1===e?t||i?"dan":"dnem":2===e?t||i?"dni":"dnevoma":t||i?"dni":"dnevi";case"M":return t||i?"en mesec":"enim mesecem";case"MM":return a+=1===e?t||i?"mesec":"mesecem":2===e?t||i?"meseca":"mesecema":5>e?t||i?"mesece":"meseci":t||i?"mesecev":"meseci";case"y":return t||i?"eno leto":"enim letom";case"yy":return a+=1===e?t||i?"leto":"letom":2===e?t||i?"leti":"letoma":5>e?t||i?"leta":"leti":t||i?"let":"leti"}}function Ei(e,t,n,i){var a={s:["viensas secunds","'iensas secunds"],m:["'n m\xedut","'iens m\xedut"],mm:[e+" m\xeduts"," "+e+" m\xeduts"],h:["'n \xfeora","'iensa \xfeora"],hh:[e+" \xfeoras"," "+e+" \xfeoras"],d:["'n ziua","'iensa ziua"],dd:[e+" ziuas"," "+e+" ziuas"],M:["'n mes","'iens mes"],MM:[e+" mesen"," "+e+" mesen"],y:["'n ar","'iens ar"],yy:[e+" ars"," "+e+" ars"]};return i?a[n][0]:t?a[n][0]:a[n][1].trim()}
//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion ElensÃºle : https://github.com/Oire
function Ai(e,t){var n=e.split("_");return t%10===1&&t%100!==11?n[0]:t%10>=2&&4>=t%10&&(10>t%100||t%100>=20)?n[1]:n[2]}function Pi(e,t,n){var i={mm:"\u0445\u0432\u0438\u043b\u0438\u043d\u0430_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d",hh:"\u0433\u043e\u0434\u0438\u043d\u0430_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u043d\u0456\u0432",MM:"\u043c\u0456\u0441\u044f\u0446\u044c_\u043c\u0456\u0441\u044f\u0446\u0456_\u043c\u0456\u0441\u044f\u0446\u0456\u0432",yy:"\u0440\u0456\u043a_\u0440\u043e\u043a\u0438_\u0440\u043e\u043a\u0456\u0432"};return"m"===n?t?"\u0445\u0432\u0438\u043b\u0438\u043d\u0430":"\u0445\u0432\u0438\u043b\u0438\u043d\u0443":"h"===n?t?"\u0433\u043e\u0434\u0438\u043d\u0430":"\u0433\u043e\u0434\u0438\u043d\u0443":e+" "+Ai(i[n],+e)}function Ii(e,t){var n={nominative:"\u0441\u0456\u0447\u0435\u043d\u044c_\u043b\u044e\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c_\u043a\u0432\u0456\u0442\u0435\u043d\u044c_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u0435\u0440\u0432\u0435\u043d\u044c_\u043b\u0438\u043f\u0435\u043d\u044c_\u0441\u0435\u0440\u043f\u0435\u043d\u044c_\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c_\u0436\u043e\u0432\u0442\u0435\u043d\u044c_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043d\u044c".split("_"),accusative:"\u0441\u0456\u0447\u043d\u044f_\u043b\u044e\u0442\u043e\u0433\u043e_\u0431\u0435\u0440\u0435\u0437\u043d\u044f_\u043a\u0432\u0456\u0442\u043d\u044f_\u0442\u0440\u0430\u0432\u043d\u044f_\u0447\u0435\u0440\u0432\u043d\u044f_\u043b\u0438\u043f\u043d\u044f_\u0441\u0435\u0440\u043f\u043d\u044f_\u0432\u0435\u0440\u0435\u0441\u043d\u044f_\u0436\u043e\u0432\u0442\u043d\u044f_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043d\u044f".split("_")},i=/D[oD]? *MMMM?/.test(t)?"accusative":"nominative";return n[i][e.month()]}function Wi(e,t){var n={nominative:"\u043d\u0435\u0434\u0456\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),accusative:"\u043d\u0435\u0434\u0456\u043b\u044e_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044e_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"),genitive:"\u043d\u0435\u0434\u0456\u043b\u0456_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043a\u0430_\u0432\u0456\u0432\u0442\u043e\u0440\u043a\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u0456_\u0441\u0443\u0431\u043e\u0442\u0438".split("_")},i=/(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(t)?"accusative":/\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(t)?"genitive":"nominative";return n[i][e.day()]}function Fi(e){return function(){return e+"\u043e"+(11===this.hours()?"\u0431":"")+"] LT"}}var Ni,Oi,$i=e.momentProperties=[],zi=!1,qi={},Ri={},Bi=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ui=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ji={},Gi={},Vi=/\d/,Ki=/\d\d/,Qi=/\d{3}/,Xi=/\d{4}/,Zi=/[+-]?\d{6}/,ea=/\d\d?/,ta=/\d{1,3}/,na=/\d{1,4}/,ia=/[+-]?\d{1,6}/,aa=/\d+/,ra=/[+-]?\d+/,sa=/Z|[+-]\d\d:?\d\d/gi,oa=/[+-]?\d+(\.\d{1,3})?/,la=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,da={},ua={},ca=0,ha=1,pa=2,ma=3,fa=4,_a=5,ga=6;E("M",["MM",2],"Mo",function(){return this.month()+1}),E("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),E("MMMM",0,0,function(e){return this.localeData().months(this,e)}),Y("month","M"),N("M",ea),N("MM",ea,Ki),N("MMM",la),N("MMMM",la),z(["M","MM"],function(e,t){t[ha]=_(e)-1}),z(["MMM","MMMM"],function(e,t,n,i){var a=n._locale.monthsParse(e,i,n._strict);null!=a?t[ha]=a:d(n).invalidMonth=e});var ya="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),va="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ba={};e.suppressDeprecationWarnings=!1;var Ma=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,wa=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],La=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],ka=/^\/?Date\((\-?\d+)/i;e.createFromInputFallback=ee("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),E(0,["YY",2],0,function(){return this.year()%100}),E(0,["YYYY",4],0,"year"),E(0,["YYYYY",5],0,"year"),E(0,["YYYYYY",6,!0],0,"year"),Y("year","y"),N("Y",ra),N("YY",ea,Ki),N("YYYY",na,Xi),N("YYYYY",ia,Zi),N("YYYYYY",ia,Zi),z(["YYYYY","YYYYYY"],ca),z("YYYY",function(t,n){n[ca]=2===t.length?e.parseTwoDigitYear(t):_(t)}),z("YY",function(t,n){n[ca]=e.parseTwoDigitYear(t)}),e.parseTwoDigitYear=function(e){return _(e)+(_(e)>68?1900:2e3)};var Ya=x("FullYear",!1);E("w",["ww",2],"wo","week"),E("W",["WW",2],"Wo","isoWeek"),Y("week","w"),Y("isoWeek","W"),N("w",ea),N("ww",ea,Ki),N("W",ea),N("WW",ea,Ki),q(["w","ww","W","WW"],function(e,t,n,i){t[i.substr(0,1)]=_(e)});var Da={dow:0,doy:6};E("DDD",["DDDD",3],"DDDo","dayOfYear"),Y("dayOfYear","DDD"),N("DDD",ta),N("DDDD",Qi),z(["DDD","DDDD"],function(e,t,n){n._dayOfYear=_(e)}),e.ISO_8601=function(){};var Ta=ee("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var e=Se.apply(null,arguments);return this>e?this:e}),xa=ee("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var e=Se.apply(null,arguments);return e>this?this:e});Pe("Z",":"),Pe("ZZ",""),N("Z",sa),N("ZZ",sa),z(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Ie(e)});var Sa=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var Ca=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ha=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Ke.fn=Ee.prototype;var ja=et(1,"add"),Ea=et(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Aa=ee("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});E(0,["gg",2],0,function(){return this.weekYear()%100}),E(0,["GG",2],0,function(){return this.isoWeekYear()%100}),St("gggg","weekYear"),St("ggggg","weekYear"),St("GGGG","isoWeekYear"),St("GGGGG","isoWeekYear"),Y("weekYear","gg"),Y("isoWeekYear","GG"),N("G",ra),N("g",ra),N("GG",ea,Ki),N("gg",ea,Ki),N("GGGG",na,Xi),N("gggg",na,Xi),N("GGGGG",ia,Zi),N("ggggg",ia,Zi),q(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,i){t[i.substr(0,2)]=_(e)}),q(["gg","GG"],function(t,n,i,a){n[a]=e.parseTwoDigitYear(t)}),E("Q",0,0,"quarter"),Y("quarter","Q"),N("Q",Vi),z("Q",function(e,t){t[ha]=3*(_(e)-1)}),E("D",["DD",2],"Do","date"),Y("date","D"),N("D",ea),N("DD",ea,Ki),N("Do",function(e,t){return e?t._ordinalParse:t._ordinalParseLenient}),z(["D","DD"],pa),z("Do",function(e,t){t[pa]=_(e.match(ea)[0],10)});var Pa=x("Date",!0);E("d",0,"do","day"),E("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),E("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),E("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),E("e",0,0,"weekday"),E("E",0,0,"isoWeekday"),Y("day","d"),Y("weekday","e"),Y("isoWeekday","E"),N("d",ea),N("e",ea),N("E",ea),N("dd",la),N("ddd",la),N("dddd",la),q(["dd","ddd","dddd"],function(e,t,n){var i=n._locale.weekdaysParse(e);null!=i?t.d=i:d(n).invalidWeekday=e}),q(["d","e","E"],function(e,t,n,i){t[i]=_(e)});var Ia="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Wa="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Fa="Su_Mo_Tu_We_Th_Fr_Sa".split("_");E("H",["HH",2],0,"hour"),E("h",["hh",2],0,function(){return this.hours()%12||12}),Rt("a",!0),Rt("A",!1),Y("hour","h"),N("a",Bt),N("A",Bt),N("H",ea),N("h",ea),N("HH",ea,Ki),N("hh",ea,Ki),z(["H","HH"],ma),z(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),z(["h","hh"],function(e,t,n){t[ma]=_(e),d(n).bigHour=!0});var Na=/[ap]\.?m?\.?/i,Oa=x("Hours",!0);E("m",["mm",2],0,"minute"),Y("minute","m"),N("m",ea),N("mm",ea,Ki),z(["m","mm"],fa);var $a=x("Minutes",!1);E("s",["ss",2],0,"second"),Y("second","s"),N("s",ea),N("ss",ea,Ki),z(["s","ss"],_a);var za=x("Seconds",!1);E("S",0,0,function(){return~~(this.millisecond()/100)}),E(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),E(0,["SSS",3],0,"millisecond"),E(0,["SSSS",4],0,function(){return 10*this.millisecond()}),E(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),E(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),E(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),E(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),E(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),Y("millisecond","ms"),N("S",ta,Vi),N("SS",ta,Ki),N("SSS",ta,Qi);var qa;for(qa="SSSS";qa.length<=9;qa+="S")N(qa,aa);for(qa="S";qa.length<=9;qa+="S")z(qa,Gt);var Ra=x("Milliseconds",!1);E("z",0,0,"zoneAbbr"),E("zz",0,0,"zoneName");var Ba=p.prototype;Ba.add=ja,Ba.calendar=nt,Ba.clone=it,Ba.diff=lt,Ba.endOf=bt,Ba.format=ht,Ba.from=pt,Ba.fromNow=mt,Ba.to=ft,Ba.toNow=_t,Ba.get=H,Ba.invalidAt=xt,Ba.isAfter=at,Ba.isBefore=rt,Ba.isBetween=st,Ba.isSame=ot,Ba.isValid=Dt,Ba.lang=Aa,Ba.locale=gt,Ba.localeData=yt,Ba.max=xa,Ba.min=Ta,Ba.parsingFlags=Tt,Ba.set=H,Ba.startOf=vt,Ba.subtract=Ea,Ba.toArray=kt,Ba.toObject=Yt,Ba.toDate=Lt,Ba.toISOString=ct,Ba.toJSON=ct,Ba.toString=ut,Ba.unix=wt,Ba.valueOf=Mt,Ba.year=Ya,Ba.isLeapYear=le,Ba.weekYear=Ht,Ba.isoWeekYear=jt,Ba.quarter=Ba.quarters=Pt,Ba.month=K,Ba.daysInMonth=Q,Ba.week=Ba.weeks=pe,Ba.isoWeek=Ba.isoWeeks=me,Ba.weeksInYear=At,Ba.isoWeeksInYear=Et,Ba.date=Pa,Ba.day=Ba.days=$t,Ba.weekday=zt,Ba.isoWeekday=qt,Ba.dayOfYear=_e,Ba.hour=Ba.hours=Oa,Ba.minute=Ba.minutes=$a,Ba.second=Ba.seconds=za,Ba.millisecond=Ba.milliseconds=Ra,Ba.utcOffset=Ne,Ba.utc=$e,Ba.local=ze,Ba.parseZone=qe,Ba.hasAlignedHourOffset=Re,Ba.isDST=Be,Ba.isDSTShifted=Ue,Ba.isLocal=Je,Ba.isUtcOffset=Ge,Ba.isUtc=Ve,Ba.isUTC=Ve,Ba.zoneAbbr=Vt,Ba.zoneName=Kt,Ba.dates=ee("dates accessor is deprecated. Use date instead.",Pa),Ba.months=ee("months accessor is deprecated. Use month instead",K),Ba.years=ee("years accessor is deprecated. Use year instead",Ya),Ba.zone=ee("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Oe);var Ua=Ba,Ja={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ga={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Va="Invalid date",Ka="%d",Qa=/\d{1,2}/,Xa={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Za=y.prototype;Za._calendar=Ja,Za.calendar=Zt,Za._longDateFormat=Ga,Za.longDateFormat=en,Za._invalidDate=Va,Za.invalidDate=tn,Za._ordinal=Ka,Za.ordinal=nn,Za._ordinalParse=Qa,Za.preparse=an,Za.postformat=an,Za._relativeTime=Xa,Za.relativeTime=rn,Za.pastFuture=sn,Za.set=on,Za.months=U,Za._months=ya,Za.monthsShort=J,Za._monthsShort=va,Za.monthsParse=G,Za.week=ue,Za._week=Da,Za.firstDayOfYear=he,Za.firstDayOfWeek=ce,Za.weekdays=Wt,Za._weekdays=Ia,Za.weekdaysMin=Nt,Za._weekdaysMin=Fa,Za.weekdaysShort=Ft,Za._weekdaysShort=Wa,Za.weekdaysParse=Ot,Za.isPM=Ut,Za._meridiemParse=Na,Za.meridiem=Jt,w("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=1===_(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),e.lang=ee("moment.lang is deprecated. Use moment.locale instead.",w),e.langData=ee("moment.langData is deprecated. Use moment.localeData instead.",k);var er=Math.abs,tr=Yn("ms"),nr=Yn("s"),ir=Yn("m"),ar=Yn("h"),rr=Yn("d"),sr=Yn("w"),or=Yn("M"),lr=Yn("y"),dr=Tn("milliseconds"),ur=Tn("seconds"),cr=Tn("minutes"),hr=Tn("hours"),pr=Tn("days"),mr=Tn("months"),fr=Tn("years"),_r=Math.round,gr={s:45,m:45,h:22,d:26,M:11},yr=Math.abs,vr=Ee.prototype;vr.abs=fn,vr.add=gn,vr.subtract=yn,vr.as=Ln,vr.asMilliseconds=tr,vr.asSeconds=nr,vr.asMinutes=ir,vr.asHours=ar,vr.asDays=rr,vr.asWeeks=sr,vr.asMonths=or,vr.asYears=lr,vr.valueOf=kn,vr._bubble=bn,vr.get=Dn,vr.milliseconds=dr,vr.seconds=ur,vr.minutes=cr,vr.hours=hr,vr.days=pr,vr.weeks=xn,vr.months=mr,vr.years=fr,vr.humanize=jn,vr.toISOString=En,vr.toString=En,vr.toJSON=En,vr.locale=gt,vr.localeData=yt,vr.toIsoString=ee("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",En),vr.lang=Aa,E("X",0,0,"unix"),E("x",0,0,"valueOf"),N("x",ra),N("X",oa),z("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),z("x",function(e,t,n){n._d=new Date(_(e))}),
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
e.version="2.10.6",t(Se),e.fn=Ua,e.min=He,e.max=je,e.utc=o,e.unix=Qt,e.months=un,e.isDate=i,e.locale=w,e.invalid=c,e.duration=Ke,e.isMoment=m,e.weekdays=hn,e.parseZone=Xt,e.localeData=k,e.isDuration=Ae,e.monthsShort=cn,e.weekdaysMin=mn,e.defineLocale=L,e.weekdaysShort=pn,e.normalizeUnits=D,e.relativeTimeThreshold=Hn;var br=e,Mr=(br.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(e){return/^nm$/i.test(e)},meridiem:function(e,t,n){return 12>e?n?"vm":"VM":n?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[M\xf4re om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}}),br.defineLocale("ar-ma",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:6,doy:12}}),{1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"}),wr={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"},Lr=(br.defineLocale("ar-sa",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,t,n){return 12>e?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return wr[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Mr[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}}),br.defineLocale("ar-tn",{months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:1,doy:4}}),{1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"}),kr={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"},Yr=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&10>=e%100?3:e%100>=11?4:5},Dr={s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629","\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062b\u0627\u0646\u064a\u062a\u0627\u0646","\u062b\u0627\u0646\u064a\u062a\u064a\u0646"],"%d \u062b\u0648\u0627\u0646","%d \u062b\u0627\u0646\u064a\u0629","%d \u062b\u0627\u0646\u064a\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629","\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062f\u0642\u064a\u0642\u062a\u0627\u0646","\u062f\u0642\u064a\u0642\u062a\u064a\u0646"],"%d \u062f\u0642\u0627\u0626\u0642","%d \u062f\u0642\u064a\u0642\u0629","%d \u062f\u0642\u064a\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629",["\u0633\u0627\u0639\u062a\u0627\u0646","\u0633\u0627\u0639\u062a\u064a\u0646"],"%d \u0633\u0627\u0639\u0627\u062a","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645","\u064a\u0648\u0645 \u0648\u0627\u062d\u062f",["\u064a\u0648\u0645\u0627\u0646","\u064a\u0648\u0645\u064a\u0646"],"%d \u0623\u064a\u0627\u0645","%d \u064a\u0648\u0645\u064b\u0627","%d \u064a\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062d\u062f",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064a\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062d\u062f",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064a\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064b\u0627","%d \u0639\u0627\u0645"]},Tr=function(e){return function(t,n,i,a){var r=Yr(t),s=Dr[e][Yr(t)];return 2===r&&(s=s[n?0:1]),s.replace(/%d/i,t)}},xr=["\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a \u064a\u0646\u0627\u064a\u0631","\u0634\u0628\u0627\u0637 \u0641\u0628\u0631\u0627\u064a\u0631","\u0622\u0630\u0627\u0631 \u0645\u0627\u0631\u0633","\u0646\u064a\u0633\u0627\u0646 \u0623\u0628\u0631\u064a\u0644","\u0623\u064a\u0627\u0631 \u0645\u0627\u064a\u0648","\u062d\u0632\u064a\u0631\u0627\u0646 \u064a\u0648\u0646\u064a\u0648","\u062a\u0645\u0648\u0632 \u064a\u0648\u0644\u064a\u0648","\u0622\u0628 \u0623\u063a\u0633\u0637\u0633","\u0623\u064a\u0644\u0648\u0644 \u0633\u0628\u062a\u0645\u0628\u0631","\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u0623\u0648\u0644 \u0623\u0643\u062a\u0648\u0628\u0631","\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u062b\u0627\u0646\u064a \u0646\u0648\u0641\u0645\u0628\u0631","\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644 \u062f\u064a\u0633\u0645\u0628\u0631"],Sr=(br.defineLocale("ar",{months:xr,monthsShort:xr,weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200fM/\u200fYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,t,n){return 12>e?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062f %s",past:"\u0645\u0646\u0630 %s",s:Tr("s"),m:Tr("m"),mm:Tr("m"),h:Tr("h"),hh:Tr("h"),d:Tr("d"),dd:Tr("d"),M:Tr("M"),MM:Tr("M"),y:Tr("y"),yy:Tr("y")},preparse:function(e){return e.replace(/\u200f/g,"").replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return kr[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Lr[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}}),{1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-\xfcnc\xfc",4:"-\xfcnc\xfc",100:"-\xfcnc\xfc",6:"-nc\u0131",9:"-uncu",10:"-uncu",30:"-uncu",60:"-\u0131nc\u0131",90:"-\u0131nc\u0131"}),Cr=(br.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ert\u0259si_\xc7\u0259r\u015f\u0259nb\u0259 ax\u015fam\u0131_\xc7\u0259r\u015f\u0259nb\u0259_C\xfcm\u0259 ax\u015fam\u0131_C\xfcm\u0259_\u015e\u0259nb\u0259".split("_"),weekdaysShort:"Baz_BzE_\xc7Ax_\xc7\u0259r_CAx_C\xfcm_\u015e\u0259n".split("_"),weekdaysMin:"Bz_BE_\xc7A_\xc7\u0259_CA_C\xfc_\u015e\u0259".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT",lastDay:"[d\xfcn\u0259n] LT",lastWeek:"[ke\xe7\u0259n h\u0259ft\u0259] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \u0259vv\u0259l",s:"birne\xe7\u0259 saniyy\u0259",m:"bir d\u0259qiq\u0259",mm:"%d d\u0259qiq\u0259",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gec\u0259|s\u0259h\u0259r|g\xfcnd\xfcz|ax\u015fam/,isPM:function(e){return/^(g\xfcnd\xfcz|ax\u015fam)$/.test(e)},meridiem:function(e,t,n){return 4>e?"gec\u0259":12>e?"s\u0259h\u0259r":17>e?"g\xfcnd\xfcz":"ax\u015fam"},ordinalParse:/\d{1,2}-(\u0131nc\u0131|inci|nci|\xfcnc\xfc|nc\u0131|uncu)/,ordinal:function(e){if(0===e)return e+"-\u0131nc\u0131";var t=e%10,n=e%100-t,i=e>=100?100:null;return e+(Sr[t]||Sr[n]||Sr[i])},week:{dow:1,doy:7}}),br.defineLocale("be",{months:In,monthsShort:"\u0441\u0442\u0443\u0434_\u043b\u044e\u0442_\u0441\u0430\u043a_\u043a\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044d\u0440\u0432_\u043b\u0456\u043f_\u0436\u043d\u0456\u0432_\u0432\u0435\u0440_\u043a\u0430\u0441\u0442_\u043b\u0456\u0441\u0442_\u0441\u043d\u0435\u0436".split("_"),weekdays:Wn,weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0451\u043d\u043d\u044f \u045e] LT",nextDay:"[\u0417\u0430\u045e\u0442\u0440\u0430 \u045e] LT",lastDay:"[\u0423\u0447\u043e\u0440\u0430 \u045e] LT",nextWeek:function(){return"[\u0423] dddd [\u045e] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u0443\u044e] dddd [\u045e] LT";case 1:case 2:case 4:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u044b] dddd [\u045e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u0440\u0430\u0437 %s",past:"%s \u0442\u0430\u043c\u0443",s:"\u043d\u0435\u043a\u0430\u043b\u044c\u043a\u0456 \u0441\u0435\u043a\u0443\u043d\u0434",m:Pn,mm:Pn,h:Pn,hh:Pn,d:"\u0434\u0437\u0435\u043d\u044c",dd:Pn,M:"\u043c\u0435\u0441\u044f\u0446",MM:Pn,y:"\u0433\u043e\u0434",yy:Pn},meridiemParse:/\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u043d\u043e\u0447\u044b":12>e?"\u0440\u0430\u043d\u0456\u0446\u044b":17>e?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0430\u0440\u0430"},ordinalParse:/\d{1,2}-(\u0456|\u044b|\u0433\u0430)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e%10!==2&&e%10!==3||e%100===12||e%100===13?e+"-\u044b":e+"-\u0456";case"D":return e+"-\u0433\u0430";default:return e}},week:{dow:1,doy:7}}),br.defineLocale("bg",{months:"\u044f\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u044f\u043d\u0440_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u044f\u0434\u0430_\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a_\u043f\u0435\u0442\u044a\u043a_\u0441\u044a\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u044f_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u044a\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u043d\u0435\u0441 \u0432] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432] LT",nextWeek:"dddd [\u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0430\u0442\u0430] dddd [\u0432] LT";case 1:case 2:case 4:case 5:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0438\u044f] dddd [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0441\u043b\u0435\u0434 %s",past:"\u043f\u0440\u0435\u0434\u0438 %s",s:"\u043d\u044f\u043a\u043e\u043b\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u043d\u0438",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0430",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},ordinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var t=e%10,n=e%100;return 0===e?e+"-\u0435\u0432":0===n?e+"-\u0435\u043d":n>10&&20>n?e+"-\u0442\u0438":1===t?e+"-\u0432\u0438":2===t?e+"-\u0440\u0438":7===t||8===t?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),{1:"\u09e7",2:"\u09e8",3:"\u09e9",4:"\u09ea",5:"\u09eb",6:"\u09ec",7:"\u09ed",8:"\u09ee",9:"\u09ef",0:"\u09e6"}),Hr={"\u09e7":"1","\u09e8":"2","\u09e9":"3","\u09ea":"4","\u09eb":"5","\u09ec":"6","\u09ed":"7","\u09ee":"8","\u09ef":"9","\u09e6":"0"},jr=(br.defineLocale("bn",{months:"\u099c\u09be\u09a8\u09c1\u09df\u09be\u09b0\u09c0_\u09ab\u09c7\u09ac\u09c1\u09df\u09be\u09b0\u09c0_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0\u09bf\u09b2_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2\u09be\u0987_\u0985\u0997\u09be\u09b8\u09cd\u099f_\u09b8\u09c7\u09aa\u09cd\u099f\u09c7\u09ae\u09cd\u09ac\u09b0_\u0985\u0995\u09cd\u099f\u09cb\u09ac\u09b0_\u09a8\u09ad\u09c7\u09ae\u09cd\u09ac\u09b0_\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd\u09ac\u09b0".split("_"),monthsShort:"\u099c\u09be\u09a8\u09c1_\u09ab\u09c7\u09ac_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09b0_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2_\u0985\u0997_\u09b8\u09c7\u09aa\u09cd\u099f_\u0985\u0995\u09cd\u099f\u09cb_\u09a8\u09ad_\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd".split("_"),weekdays:"\u09b0\u09ac\u09bf\u09ac\u09be\u09b0_\u09b8\u09cb\u09ae\u09ac\u09be\u09b0_\u09ae\u0999\u09cd\u0997\u09b2\u09ac\u09be\u09b0_\u09ac\u09c1\u09a7\u09ac\u09be\u09b0_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf\u09ac\u09be\u09b0_\u09b6\u09c1\u0995\u09cd\u09b0\u09c1\u09ac\u09be\u09b0_\u09b6\u09a8\u09bf\u09ac\u09be\u09b0".split("_"),weekdaysShort:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997\u09b2_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09cd\u09a4\u09bf_\u09b6\u09c1\u0995\u09cd\u09b0\u09c1_\u09b6\u09a8\u09bf".split("_"),weekdaysMin:"\u09b0\u09ac_\u09b8\u09ae_\u09ae\u0999\u09cd\u0997_\u09ac\u09c1_\u09ac\u09cd\u09b0\u09bf\u09b9_\u09b6\u09c1_\u09b6\u09a8\u09bf".split("_"),longDateFormat:{LT:"A h:mm \u09b8\u09ae\u09df",LTS:"A h:mm:ss \u09b8\u09ae\u09df",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u09b8\u09ae\u09df",LLLL:"dddd, D MMMM YYYY, A h:mm \u09b8\u09ae\u09df"},calendar:{sameDay:"[\u0986\u099c] LT",nextDay:"[\u0986\u0997\u09be\u09ae\u09c0\u0995\u09be\u09b2] LT",nextWeek:"dddd, LT",lastDay:"[\u0997\u09a4\u0995\u09be\u09b2] LT",lastWeek:"[\u0997\u09a4] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u09aa\u09b0\u09c7",past:"%s \u0986\u0997\u09c7",s:"\u0995\u098f\u0995 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1",m:"\u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f",mm:"%d \u09ae\u09bf\u09a8\u09bf\u099f",h:"\u098f\u0995 \u0998\u09a8\u09cd\u099f\u09be",hh:"%d \u0998\u09a8\u09cd\u099f\u09be",d:"\u098f\u0995 \u09a6\u09bf\u09a8",dd:"%d \u09a6\u09bf\u09a8",M:"\u098f\u0995 \u09ae\u09be\u09b8",MM:"%d \u09ae\u09be\u09b8",y:"\u098f\u0995 \u09ac\u099b\u09b0",yy:"%d \u09ac\u099b\u09b0"},preparse:function(e){return e.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g,function(e){return Hr[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Cr[e]})},meridiemParse:/\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09c7\u09b2|\u09b0\u09be\u09a4/,isPM:function(e){return/^(\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09c7\u09b2|\u09b0\u09be\u09a4)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u09b0\u09be\u09a4":10>e?"\u09b8\u0995\u09be\u09b2":17>e?"\u09a6\u09c1\u09aa\u09c1\u09b0":20>e?"\u09ac\u09bf\u0995\u09c7\u09b2":"\u09b0\u09be\u09a4"},week:{dow:0,doy:6}}),{1:"\u0f21",2:"\u0f22",3:"\u0f23",4:"\u0f24",5:"\u0f25",6:"\u0f26",7:"\u0f27",8:"\u0f28",9:"\u0f29",0:"\u0f20"}),Er={"\u0f21":"1","\u0f22":"2","\u0f23":"3","\u0f24":"4","\u0f25":"5","\u0f26":"6","\u0f27":"7","\u0f28":"8","\u0f29":"9","\u0f20":"0"},Ar=(br.defineLocale("bo",{months:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),monthsShort:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),weekdays:"\u0f42\u0f5f\u0f60\u0f0b\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f42\u0f5f\u0f60\u0f0b\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysShort:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysMin:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0f51\u0f72\u0f0b\u0f62\u0f72\u0f44] LT",nextDay:"[\u0f66\u0f44\u0f0b\u0f49\u0f72\u0f53] LT",nextWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f62\u0f97\u0f7a\u0f66\u0f0b\u0f58], LT",lastDay:"[\u0f41\u0f0b\u0f66\u0f44] LT",lastWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f58\u0f50\u0f60\u0f0b\u0f58] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0f63\u0f0b",past:"%s \u0f66\u0f94\u0f53\u0f0b\u0f63",s:"\u0f63\u0f58\u0f0b\u0f66\u0f44",m:"\u0f66\u0f90\u0f62\u0f0b\u0f58\u0f0b\u0f42\u0f45\u0f72\u0f42",mm:"%d \u0f66\u0f90\u0f62\u0f0b\u0f58",h:"\u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f42\u0f45\u0f72\u0f42",hh:"%d \u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51",d:"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f45\u0f72\u0f42",dd:"%d \u0f49\u0f72\u0f53\u0f0b",M:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f45\u0f72\u0f42",MM:"%d \u0f5f\u0fb3\u0f0b\u0f56",y:"\u0f63\u0f7c\u0f0b\u0f42\u0f45\u0f72\u0f42",yy:"%d \u0f63\u0f7c"},preparse:function(e){return e.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g,function(e){return Er[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return jr[e]})},meridiemParse:/\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/,isPM:function(e){return/^(\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c":10>e?"\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66":17>e?"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44":20>e?"\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42":"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c"},week:{dow:0,doy:6}}),br.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondenno\xf9",m:"ur vunutenn",mm:Fn,h:"un eur",hh:"%d eur",d:"un devezh",dd:Fn,M:"ur miz",MM:Fn,y:"ur bloaz",yy:Nn},ordinalParse:/\d{1,2}(a\xf1|vet)/,ordinal:function(e){var t=1===e?"a\xf1":"vet";return e+t},week:{dow:1,doy:4}}),br.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:qn,mm:qn,h:qn,hh:qn,d:"dan",dd:qn,M:"mjesec",MM:qn,y:"godinu",yy:qn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),br.defineLocale("ca",{months:"gener_febrer_mar\xe7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",LTS:"LT:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[dem\xe0 a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",
MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|\xe8|a)/,ordinal:function(e,t){var n=1===e?"r":2===e?"n":3===e?"r":4===e?"t":"\xe8";return("w"===t||"W"===t)&&(n="a"),e+n},week:{dow:1,doy:4}}),"leden_\xfanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\xe1\u0159\xed_\u0159\xedjen_listopad_prosinec".split("_")),Pr="led_\xfano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\xe1\u0159_\u0159\xedj_lis_pro".split("_"),Ir=(br.defineLocale("cs",{months:Ar,monthsShort:Pr,monthsParse:function(e,t){var n,i=[];for(n=0;12>n;n++)i[n]=new RegExp("^"+e[n]+"$|^"+t[n]+"$","i");return i}(Ar,Pr),weekdays:"ned\u011ble_pond\u011bl\xed_\xfater\xfd_st\u0159eda_\u010dtvrtek_p\xe1tek_sobota".split("_"),weekdaysShort:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),weekdaysMin:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes v] LT",nextDay:"[z\xedtra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v ned\u011bli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve st\u0159edu v] LT";case 4:return"[ve \u010dtvrtek v] LT";case 5:return"[v p\xe1tek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[v\u010dera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou ned\u011bli v] LT";case 1:case 2:return"[minul\xe9] dddd [v] LT";case 3:return"[minulou st\u0159edu v] LT";case 4:case 5:return"[minul\xfd] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"p\u0159ed %s",s:Bn,m:Bn,mm:Bn,h:Bn,hh:Bn,d:Bn,dd:Bn,M:Bn,MM:Bn,y:Bn,yy:Bn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("cv",{months:"\u043a\u04d1\u0440\u043b\u0430\u0447_\u043d\u0430\u0440\u04d1\u0441_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440\u0442\u043c\u0435_\u0443\u0442\u04d1_\u04ab\u0443\u0440\u043b\u0430_\u0430\u0432\u04d1\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),monthsShort:"\u043a\u04d1\u0440_\u043d\u0430\u0440_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440_\u0443\u0442\u04d1_\u04ab\u0443\u0440_\u0430\u0432\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448".split("_"),weekdays:"\u0432\u044b\u0440\u0441\u0430\u0440\u043d\u0438\u043a\u0443\u043d_\u0442\u0443\u043d\u0442\u0438\u043a\u0443\u043d_\u044b\u0442\u043b\u0430\u0440\u0438\u043a\u0443\u043d_\u044e\u043d\u043a\u0443\u043d_\u043a\u04d7\u04ab\u043d\u0435\u0440\u043d\u0438\u043a\u0443\u043d_\u044d\u0440\u043d\u0435\u043a\u0443\u043d_\u0448\u04d1\u043c\u0430\u0442\u043a\u0443\u043d".split("_"),weekdaysShort:"\u0432\u044b\u0440_\u0442\u0443\u043d_\u044b\u0442\u043b_\u044e\u043d_\u043a\u04d7\u04ab_\u044d\u0440\u043d_\u0448\u04d1\u043c".split("_"),weekdaysMin:"\u0432\u0440_\u0442\u043d_\u044b\u0442_\u044e\u043d_\u043a\u04ab_\u044d\u0440_\u0448\u043c".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7]",LLL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm",LLLL:"dddd, YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm"},calendar:{sameDay:"[\u041f\u0430\u044f\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextDay:"[\u042b\u0440\u0430\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastDay:"[\u04d6\u043d\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextWeek:"[\u04aa\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastWeek:"[\u0418\u0440\u0442\u043d\u04d7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",sameElse:"L"},relativeTime:{future:function(e){var t=/\u0441\u0435\u0445\u0435\u0442$/i.exec(e)?"\u0440\u0435\u043d":/\u04ab\u0443\u043b$/i.exec(e)?"\u0442\u0430\u043d":"\u0440\u0430\u043d";return e+t},past:"%s \u043a\u0430\u044f\u043b\u043b\u0430",s:"\u043f\u04d7\u0440-\u0438\u043a \u04ab\u0435\u043a\u043a\u0443\u043d\u0442",m:"\u043f\u04d7\u0440 \u043c\u0438\u043d\u0443\u0442",mm:"%d \u043c\u0438\u043d\u0443\u0442",h:"\u043f\u04d7\u0440 \u0441\u0435\u0445\u0435\u0442",hh:"%d \u0441\u0435\u0445\u0435\u0442",d:"\u043f\u04d7\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u043f\u04d7\u0440 \u0443\u0439\u04d1\u0445",MM:"%d \u0443\u0439\u04d1\u0445",y:"\u043f\u04d7\u0440 \u04ab\u0443\u043b",yy:"%d \u04ab\u0443\u043b"},ordinalParse:/\d{1,2}-\u043c\u04d7\u0448/,ordinal:"%d-\u043c\u04d7\u0448",week:{dow:1,doy:7}}),br.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn \xf4l",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(e){var t=e,n="",i=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return t>20?n=40===t||50===t||60===t||80===t||100===t?"fed":"ain":t>0&&(n=i[t]),e+n},week:{dow:1,doy:4}}),br.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8n_man_tir_ons_tor_fre_l\xf8r".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I g\xe5r kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"f\xe5 sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"et \xe5r",yy:"%d \xe5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("de-at",{months:"J\xe4nner_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"J\xe4n._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[Heute um] LT [Uhr]",sameElse:"L",nextDay:"[Morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[Gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Un,mm:"%d Minuten",h:Un,hh:"%d Stunden",d:Un,dd:Un,M:Un,MM:Un,y:Un,yy:Un},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("de",{months:"Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[Heute um] LT [Uhr]",sameElse:"L",nextDay:"[Morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[Gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:Jn,mm:"%d Minuten",h:Jn,hh:"%d Stunden",d:Jn,dd:Jn,M:Jn,MM:Jn,y:Jn,yy:Jn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("el",{monthsNominativeEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2_\u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2_\u039c\u03ac\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2_\u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2_\u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2_\u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split("_"),monthsGenitiveEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u039c\u03b1\u03c1\u03c4\u03af\u03bf\u03c5_\u0391\u03c0\u03c1\u03b9\u03bb\u03af\u03bf\u03c5_\u039c\u03b1\u0390\u03bf\u03c5_\u0399\u03bf\u03c5\u03bd\u03af\u03bf\u03c5_\u0399\u03bf\u03c5\u03bb\u03af\u03bf\u03c5_\u0391\u03c5\u03b3\u03bf\u03cd\u03c3\u03c4\u03bf\u03c5_\u03a3\u03b5\u03c0\u03c4\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u039f\u03ba\u03c4\u03c9\u03b2\u03c1\u03af\u03bf\u03c5_\u039d\u03bf\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u0394\u03b5\u03ba\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5".split("_"),months:function(e,t){return/D/.test(t.substring(0,t.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]},monthsShort:"\u0399\u03b1\u03bd_\u03a6\u03b5\u03b2_\u039c\u03b1\u03c1_\u0391\u03c0\u03c1_\u039c\u03b1\u03ca_\u0399\u03bf\u03c5\u03bd_\u0399\u03bf\u03c5\u03bb_\u0391\u03c5\u03b3_\u03a3\u03b5\u03c0_\u039f\u03ba\u03c4_\u039d\u03bf\u03b5_\u0394\u03b5\u03ba".split("_"),weekdays:"\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae_\u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1_\u03a4\u03c1\u03af\u03c4\u03b7_\u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7_\u03a0\u03ad\u03bc\u03c0\u03c4\u03b7_\u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae_\u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split("_"),weekdaysShort:"\u039a\u03c5\u03c1_\u0394\u03b5\u03c5_\u03a4\u03c1\u03b9_\u03a4\u03b5\u03c4_\u03a0\u03b5\u03bc_\u03a0\u03b1\u03c1_\u03a3\u03b1\u03b2".split("_"),weekdaysMin:"\u039a\u03c5_\u0394\u03b5_\u03a4\u03c1_\u03a4\u03b5_\u03a0\u03b5_\u03a0\u03b1_\u03a3\u03b1".split("_"),meridiem:function(e,t,n){return e>11?n?"\u03bc\u03bc":"\u039c\u039c":n?"\u03c0\u03bc":"\u03a0\u039c"},isPM:function(e){return"\u03bc"===(e+"").toLowerCase()[0]},meridiemParse:/[\u03a0\u039c]\.?\u039c?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1 {}] LT",nextDay:"[\u0391\u03cd\u03c1\u03b9\u03bf {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[\u03a7\u03b8\u03b5\u03c2 {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[\u03c4\u03bf \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf] dddd [{}] LT";default:return"[\u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03b7] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,t){var n=this._calendarEl[e],i=t&&t.hours();return"function"==typeof n&&(n=n.apply(t)),n.replace("{}",i%12===1?"\u03c3\u03c4\u03b7":"\u03c3\u03c4\u03b9\u03c2")},relativeTime:{future:"\u03c3\u03b5 %s",past:"%s \u03c0\u03c1\u03b9\u03bd",s:"\u03bb\u03af\u03b3\u03b1 \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1",m:"\u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",mm:"%d \u03bb\u03b5\u03c0\u03c4\u03ac",h:"\u03bc\u03af\u03b1 \u03ce\u03c1\u03b1",hh:"%d \u03ce\u03c1\u03b5\u03c2",d:"\u03bc\u03af\u03b1 \u03bc\u03ad\u03c1\u03b1",dd:"%d \u03bc\u03ad\u03c1\u03b5\u03c2",M:"\u03ad\u03bd\u03b1\u03c2 \u03bc\u03ae\u03bd\u03b1\u03c2",MM:"%d \u03bc\u03ae\u03bd\u03b5\u03c2",y:"\u03ad\u03bd\u03b1\u03c2 \u03c7\u03c1\u03cc\u03bd\u03bf\u03c2",yy:"%d \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1"},ordinalParse:/\d{1,2}\u03b7/,ordinal:"%d\u03b7",week:{dow:1,doy:4}}),br.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}}),br.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY h:mm A",LLLL:"dddd, D MMMM, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),br.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n},week:{dow:1,doy:4}}),br.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_a\u016dg_sep_okt_nov_dec".split("_"),weekdays:"Diman\u0109o_Lundo_Mardo_Merkredo_\u0134a\u016ddo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_\u0134a\u016d_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_\u0134a_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(e){return"p"===e.charAt(0).toLowerCase()},meridiem:function(e,t,n){return e>11?n?"p.t.m.":"P.T.M.":n?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodia\u016d je] LT",nextDay:"[Morga\u016d je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hiera\u016d je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"anta\u016d %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}}),"Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_")),Wr="Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),Fr=(br.defineLocale("es",{months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:function(e,t){return/-MMM-/.test(t)?Wr[e.month()]:Ir[e.month()]},weekdays:"Domingo_Lunes_Martes_Mi\xe9rcoles_Jueves_Viernes_S\xe1bado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mi\xe9._Jue._Vie._S\xe1b.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_S\xe1".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},ordinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),br.defineLocale("et",{months:"jaanuar_veebruar_m\xe4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_m\xe4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"p\xfchap\xe4ev_esmasp\xe4ev_teisip\xe4ev_kolmap\xe4ev_neljap\xe4ev_reede_laup\xe4ev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[T\xe4na,] LT",nextDay:"[Homme,] LT",nextWeek:"[J\xe4rgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s p\xe4rast",past:"%s tagasi",s:Gn,m:Gn,mm:Gn,h:Gn,hh:Gn,d:Gn,dd:"%d p\xe4eva",M:Gn,MM:Gn,y:Gn,yy:Gn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{1:"\u06f1",2:"\u06f2",3:"\u06f3",4:"\u06f4",5:"\u06f5",6:"\u06f6",7:"\u06f7",8:"\u06f8",9:"\u06f9",0:"\u06f0"}),Nr={"\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9","\u06f0":"0"},Or=(br.defineLocale("fa",{months:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),monthsShort:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),weekdays:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysShort:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u062c_\u0634".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/,isPM:function(e){return/\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(e)},meridiem:function(e,t,n){return 12>e?"\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631":"\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631"},calendar:{sameDay:"[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",nextDay:"[\u0641\u0631\u062f\u0627 \u0633\u0627\u0639\u062a] LT",nextWeek:"dddd [\u0633\u0627\u0639\u062a] LT",lastDay:"[\u062f\u06cc\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",lastWeek:"dddd [\u067e\u06cc\u0634] [\u0633\u0627\u0639\u062a] LT",sameElse:"L"},relativeTime:{future:"\u062f\u0631 %s",past:"%s \u067e\u06cc\u0634",s:"\u0686\u0646\u062f\u06cc\u0646 \u062b\u0627\u0646\u06cc\u0647",m:"\u06cc\u06a9 \u062f\u0642\u06cc\u0642\u0647",mm:"%d \u062f\u0642\u06cc\u0642\u0647",h:"\u06cc\u06a9 \u0633\u0627\u0639\u062a",hh:"%d \u0633\u0627\u0639\u062a",d:"\u06cc\u06a9 \u0631\u0648\u0632",dd:"%d \u0631\u0648\u0632",M:"\u06cc\u06a9 \u0645\u0627\u0647",MM:"%d \u0645\u0627\u0647",y:"\u06cc\u06a9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/[\u06f0-\u06f9]/g,function(e){return Nr[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Fr[e]}).replace(/,/g,"\u060c")},ordinalParse:/\d{1,2}\u0645/,ordinal:"%d\u0645",week:{dow:6,doy:12}}),"nolla yksi kaksi kolme nelj\xe4 viisi kuusi seitsem\xe4n kahdeksan yhdeks\xe4n".split(" ")),$r=["nolla","yhden","kahden","kolmen","nelj\xe4n","viiden","kuuden",Or[7],Or[8],Or[9]],zr=(br.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xe4kuu_hein\xe4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kes\xe4_hein\xe4_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[t\xe4n\xe4\xe4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\xe4\xe4st\xe4",past:"%s sitten",s:Vn,m:Vn,mm:Vn,h:Vn,hh:Vn,d:Vn,dd:Vn,M:Vn,MM:Vn,y:Vn,yy:Vn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("fo",{months:"januar_februar_mars_apr\xedl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_m\xe1nadagur_t\xfdsdagur_mikudagur_h\xf3sdagur_fr\xedggjadagur_leygardagur".split("_"),weekdaysShort:"sun_m\xe1n_t\xfds_mik_h\xf3s_fr\xed_ley".split("_"),weekdaysMin:"su_m\xe1_t\xfd_mi_h\xf3_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[\xcd dag kl.] LT",nextDay:"[\xcd morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xcd gj\xe1r kl.] LT",lastWeek:"[s\xed\xf0stu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s s\xed\xf0ani",s:"f\xe1 sekund",m:"ein minutt",mm:"%d minuttir",h:"ein t\xedmi",hh:"%d t\xedmar",d:"ein dagur",dd:"%d dagar",M:"ein m\xe1na\xf0i",MM:"%d m\xe1na\xf0ir",y:"eitt \xe1r",yy:"%d \xe1r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("fr-ca",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(e){return e+(1===e?"er":"e")}}),br.defineLocale("fr",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(e){return e+(1===e?"er":"")},week:{dow:1,doy:4}}),"jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")),qr="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),Rr=(br.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(e,t){return/-MMM-/.test(t)?qr[e.month()]:zr[e.month()]},weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[\xf4fr\xfbne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien min\xfat",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}}),br.defineLocale("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xu\xf1o_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xu\xf1._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_M\xe9rcores_Xoves_Venres_S\xe1bado".split("_"),weekdaysShort:"Dom._Lun._Mar._M\xe9r._Xov._Ven._S\xe1b.".split("_"),weekdaysMin:"Do_Lu_Ma_M\xe9_Xo_Ve_S\xe1".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextDay:function(){return"[ma\xf1\xe1 "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"\xe1s":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"\xe1":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"\xe1s":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(e){return"uns segundos"===e?"nuns segundos":"en "+e},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:7}}),br.defineLocale("he",{months:"\u05d9\u05e0\u05d5\u05d0\u05e8_\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05d9\u05dc_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8_\u05e1\u05e4\u05d8\u05de\u05d1\u05e8_\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8_\u05e0\u05d5\u05d1\u05de\u05d1\u05e8_\u05d3\u05e6\u05de\u05d1\u05e8".split("_"),monthsShort:"\u05d9\u05e0\u05d5\u05f3_\u05e4\u05d1\u05e8\u05f3_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05f3_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05f3_\u05e1\u05e4\u05d8\u05f3_\u05d0\u05d5\u05e7\u05f3_\u05e0\u05d5\u05d1\u05f3_\u05d3\u05e6\u05de\u05f3".split("_"),weekdays:"\u05e8\u05d0\u05e9\u05d5\u05df_\u05e9\u05e0\u05d9_\u05e9\u05dc\u05d9\u05e9\u05d9_\u05e8\u05d1\u05d9\u05e2\u05d9_\u05d7\u05de\u05d9\u05e9\u05d9_\u05e9\u05d9\u05e9\u05d9_\u05e9\u05d1\u05ea".split("_"),weekdaysShort:"\u05d0\u05f3_\u05d1\u05f3_\u05d2\u05f3_\u05d3\u05f3_\u05d4\u05f3_\u05d5\u05f3_\u05e9\u05f3".split("_"),weekdaysMin:"\u05d0_\u05d1_\u05d2_\u05d3_\u05d4_\u05d5_\u05e9".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [\u05d1]MMMM YYYY",LLL:"D [\u05d1]MMMM YYYY HH:mm",LLLL:"dddd, D [\u05d1]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[\u05d4\u05d9\u05d5\u05dd \u05d1\u05be]LT",nextDay:"[\u05de\u05d7\u05e8 \u05d1\u05be]LT",nextWeek:"dddd [\u05d1\u05e9\u05e2\u05d4] LT",lastDay:"[\u05d0\u05ea\u05de\u05d5\u05dc \u05d1\u05be]LT",lastWeek:"[\u05d1\u05d9\u05d5\u05dd] dddd [\u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d1\u05e9\u05e2\u05d4] LT",sameElse:"L"},relativeTime:{future:"\u05d1\u05e2\u05d5\u05d3 %s",past:"\u05dc\u05e4\u05e0\u05d9 %s",s:"\u05de\u05e1\u05e4\u05e8 \u05e9\u05e0\u05d9\u05d5\u05ea",m:"\u05d3\u05e7\u05d4",mm:"%d \u05d3\u05e7\u05d5\u05ea",h:"\u05e9\u05e2\u05d4",hh:function(e){return 2===e?"\u05e9\u05e2\u05ea\u05d9\u05d9\u05dd":e+" \u05e9\u05e2\u05d5\u05ea"},d:"\u05d9\u05d5\u05dd",dd:function(e){return 2===e?"\u05d9\u05d5\u05de\u05d9\u05d9\u05dd":e+" \u05d9\u05de\u05d9\u05dd"},M:"\u05d7\u05d5\u05d3\u05e9",MM:function(e){return 2===e?"\u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd":e+" \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"},y:"\u05e9\u05e0\u05d4",yy:function(e){return 2===e?"\u05e9\u05e0\u05ea\u05d9\u05d9\u05dd":e%10===0&&10!==e?e+" \u05e9\u05e0\u05d4":e+" \u05e9\u05e0\u05d9\u05dd";
}}}),{1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"}),Br={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"},Ur=(br.defineLocale("hi",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u093c\u0930\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948\u0932_\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0938\u094d\u0924_\u0938\u093f\u0924\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u0942\u092c\u0930_\u0928\u0935\u092e\u094d\u092c\u0930_\u0926\u093f\u0938\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u093c\u0930._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948._\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932._\u0905\u0917._\u0938\u093f\u0924._\u0905\u0915\u094d\u091f\u0942._\u0928\u0935._\u0926\u093f\u0938.".split("_"),weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0932\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0932_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u092c\u091c\u0947",LTS:"A h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A h:mm \u092c\u091c\u0947"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0915\u0932] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u0932] LT",lastWeek:"[\u092a\u093f\u091b\u0932\u0947] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u092e\u0947\u0902",past:"%s \u092a\u0939\u0932\u0947",s:"\u0915\u0941\u091b \u0939\u0940 \u0915\u094d\u0937\u0923",m:"\u090f\u0915 \u092e\u093f\u0928\u091f",mm:"%d \u092e\u093f\u0928\u091f",h:"\u090f\u0915 \u0918\u0902\u091f\u093e",hh:"%d \u0918\u0902\u091f\u0947",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u0940\u0928\u0947",MM:"%d \u092e\u0939\u0940\u0928\u0947",y:"\u090f\u0915 \u0935\u0930\u094d\u0937",yy:"%d \u0935\u0930\u094d\u0937"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return Br[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Rr[e]})},meridiemParse:/\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/,meridiemHour:function(e,t){return 12===e&&(e=0),"\u0930\u093e\u0924"===t?4>e?e:e+12:"\u0938\u0941\u092c\u0939"===t?e:"\u0926\u094b\u092a\u0939\u0930"===t?e>=10?e:e+12:"\u0936\u093e\u092e"===t?e+12:void 0},meridiem:function(e,t,n){return 4>e?"\u0930\u093e\u0924":10>e?"\u0938\u0941\u092c\u0939":17>e?"\u0926\u094b\u092a\u0939\u0930":20>e?"\u0936\u093e\u092e":"\u0930\u093e\u0924"},week:{dow:0,doy:6}}),br.defineLocale("hr",{months:"sije\u010danj_velja\u010da_o\u017eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),monthsShort:"sij._velj._o\u017eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:Qn,mm:Qn,h:Qn,hh:Qn,d:"dan",dd:Qn,M:"mjesec",MM:Qn,y:"godinu",yy:Qn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),"vas\xe1rnap h\xe9tf\u0151n kedden szerd\xe1n cs\xfct\xf6rt\xf6k\xf6n p\xe9nteken szombaton".split(" ")),Jr=(br.defineLocale("hu",{months:"janu\xe1r_febru\xe1r_m\xe1rcius_\xe1prilis_m\xe1jus_j\xfanius_j\xfalius_augusztus_szeptember_okt\xf3ber_november_december".split("_"),monthsShort:"jan_feb_m\xe1rc_\xe1pr_m\xe1j_j\xfan_j\xfal_aug_szept_okt_nov_dec".split("_"),weekdays:"vas\xe1rnap_h\xe9tf\u0151_kedd_szerda_cs\xfct\xf6rt\xf6k_p\xe9ntek_szombat".split("_"),weekdaysShort:"vas_h\xe9t_kedd_sze_cs\xfct_p\xe9n_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,t,n){return 12>e?n===!0?"de":"DE":n===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return Zn.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return Zn.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s m\xfalva",past:"%s",s:Xn,m:Xn,mm:Xn,h:Xn,hh:Xn,d:Xn,dd:Xn,M:Xn,MM:Xn,y:Xn,yy:Xn},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),br.defineLocale("hy-am",{months:ei,monthsShort:ti,weekdays:ni,weekdaysShort:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),weekdaysMin:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0569.",LLL:"D MMMM YYYY \u0569., HH:mm",LLLL:"dddd, D MMMM YYYY \u0569., HH:mm"},calendar:{sameDay:"[\u0561\u0575\u057d\u0585\u0580] LT",nextDay:"[\u057e\u0561\u0572\u0568] LT",lastDay:"[\u0565\u0580\u0565\u056f] LT",nextWeek:function(){return"dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},lastWeek:function(){return"[\u0561\u0576\u0581\u0561\u056e] dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},sameElse:"L"},relativeTime:{future:"%s \u0570\u0565\u057f\u0578",past:"%s \u0561\u057c\u0561\u057b",s:"\u0574\u056b \u0584\u0561\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576",m:"\u0580\u0578\u057a\u0565",mm:"%d \u0580\u0578\u057a\u0565",h:"\u056a\u0561\u0574",hh:"%d \u056a\u0561\u0574",d:"\u0585\u0580",dd:"%d \u0585\u0580",M:"\u0561\u0574\u056b\u057d",MM:"%d \u0561\u0574\u056b\u057d",y:"\u057f\u0561\u0580\u056b",yy:"%d \u057f\u0561\u0580\u056b"},meridiemParse:/\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/,isPM:function(e){return/^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(e)},meridiem:function(e){return 4>e?"\u0563\u056b\u0577\u0565\u0580\u057e\u0561":12>e?"\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561":17>e?"\u0581\u0565\u0580\u0565\u056f\u057e\u0561":"\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576"},ordinalParse:/\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/,ordinal:function(e,t){switch(t){case"DDD":case"w":case"W":case"DDDo":return 1===e?e+"-\u056b\u0576":e+"-\u0580\u0564";default:return e}},week:{dow:1,doy:7}}),br.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"siang"===t?e>=11?e:e+12:"sore"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return 11>e?"pagi":15>e?"siang":19>e?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),br.defineLocale("is",{months:"jan\xfaar_febr\xfaar_mars_apr\xedl_ma\xed_j\xfan\xed_j\xfal\xed_\xe1g\xfast_september_okt\xf3ber_n\xf3vember_desember".split("_"),monthsShort:"jan_feb_mar_apr_ma\xed_j\xfan_j\xfal_\xe1g\xfa_sep_okt_n\xf3v_des".split("_"),weekdays:"sunnudagur_m\xe1nudagur_\xferi\xf0judagur_mi\xf0vikudagur_fimmtudagur_f\xf6studagur_laugardagur".split("_"),weekdaysShort:"sun_m\xe1n_\xferi_mi\xf0_fim_f\xf6s_lau".split("_"),weekdaysMin:"Su_M\xe1_\xder_Mi_Fi_F\xf6_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[\xed dag kl.] LT",nextDay:"[\xe1 morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xed g\xe6r kl.] LT",lastWeek:"[s\xed\xf0asta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s s\xed\xf0an",s:ai,m:ai,mm:ai,h:"klukkustund",hh:ai,d:ai,dd:ai,M:ai,MM:ai,y:ai,yy:ai},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Luned\xec_Marted\xec_Mercoled\xec_Gioved\xec_Venerd\xec_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),br.defineLocale("ja",{months:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u65e5\u66dc\u65e5_\u6708\u66dc\u65e5_\u706b\u66dc\u65e5_\u6c34\u66dc\u65e5_\u6728\u66dc\u65e5_\u91d1\u66dc\u65e5_\u571f\u66dc\u65e5".split("_"),weekdaysShort:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),weekdaysMin:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),longDateFormat:{LT:"Ah\u6642m\u5206",LTS:"Ah\u6642m\u5206s\u79d2",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5Ah\u6642m\u5206",LLLL:"YYYY\u5e74M\u6708D\u65e5Ah\u6642m\u5206 dddd"},meridiemParse:/\u5348\u524d|\u5348\u5f8c/i,isPM:function(e){return"\u5348\u5f8c"===e},meridiem:function(e,t,n){return 12>e?"\u5348\u524d":"\u5348\u5f8c"},calendar:{sameDay:"[\u4eca\u65e5] LT",nextDay:"[\u660e\u65e5] LT",nextWeek:"[\u6765\u9031]dddd LT",lastDay:"[\u6628\u65e5] LT",lastWeek:"[\u524d\u9031]dddd LT",sameElse:"L"},relativeTime:{future:"%s\u5f8c",past:"%s\u524d",s:"\u6570\u79d2",m:"1\u5206",mm:"%d\u5206",h:"1\u6642\u9593",hh:"%d\u6642\u9593",d:"1\u65e5",dd:"%d\u65e5",M:"1\u30f6\u6708",MM:"%d\u30f6\u6708",y:"1\u5e74",yy:"%d\u5e74"}}),br.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(e,t){return 12===e&&(e=0),"enjing"===t?e:"siyang"===t?e>=11?e:e+12:"sonten"===t||"ndalu"===t?e+12:void 0},meridiem:function(e,t,n){return 11>e?"enjing":15>e?"siyang":19>e?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),br.defineLocale("ka",{months:ri,monthsShort:"\u10d8\u10d0\u10dc_\u10d7\u10d4\u10d1_\u10db\u10d0\u10e0_\u10d0\u10de\u10e0_\u10db\u10d0\u10d8_\u10d8\u10d5\u10dc_\u10d8\u10d5\u10da_\u10d0\u10d2\u10d5_\u10e1\u10d4\u10e5_\u10dd\u10e5\u10e2_\u10dc\u10dd\u10d4_\u10d3\u10d4\u10d9".split("_"),weekdays:si,weekdaysShort:"\u10d9\u10d5\u10d8_\u10dd\u10e0\u10e8_\u10e1\u10d0\u10db_\u10dd\u10d7\u10ee_\u10ee\u10e3\u10d7_\u10de\u10d0\u10e0_\u10e8\u10d0\u10d1".split("_"),weekdaysMin:"\u10d9\u10d5_\u10dd\u10e0_\u10e1\u10d0_\u10dd\u10d7_\u10ee\u10e3_\u10de\u10d0_\u10e8\u10d0".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[\u10d3\u10e6\u10d4\u10e1] LT[-\u10d6\u10d4]",nextDay:"[\u10ee\u10d5\u10d0\u10da] LT[-\u10d6\u10d4]",lastDay:"[\u10d2\u10e3\u10e8\u10d8\u10dc] LT[-\u10d6\u10d4]",nextWeek:"[\u10e8\u10d4\u10db\u10d3\u10d4\u10d2] dddd LT[-\u10d6\u10d4]",lastWeek:"[\u10ec\u10d8\u10dc\u10d0] dddd LT-\u10d6\u10d4",sameElse:"L"},relativeTime:{future:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(e)?e.replace(/\u10d8$/,"\u10e8\u10d8"):e+"\u10e8\u10d8"},past:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(e)?e.replace(/(\u10d8|\u10d4)$/,"\u10d8\u10e1 \u10ec\u10d8\u10dc"):/\u10ec\u10d4\u10da\u10d8/.test(e)?e.replace(/\u10ec\u10d4\u10da\u10d8$/,"\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc"):void 0},s:"\u10e0\u10d0\u10db\u10d3\u10d4\u10dc\u10d8\u10db\u10d4 \u10ec\u10d0\u10db\u10d8",m:"\u10ec\u10e3\u10d7\u10d8",mm:"%d \u10ec\u10e3\u10d7\u10d8",h:"\u10e1\u10d0\u10d0\u10d7\u10d8",hh:"%d \u10e1\u10d0\u10d0\u10d7\u10d8",d:"\u10d3\u10e6\u10d4",dd:"%d \u10d3\u10e6\u10d4",M:"\u10d7\u10d5\u10d4",MM:"%d \u10d7\u10d5\u10d4",y:"\u10ec\u10d4\u10da\u10d8",yy:"%d \u10ec\u10d4\u10da\u10d8"},ordinalParse:/0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/,ordinal:function(e){return 0===e?e:1===e?e+"-\u10da\u10d8":20>e||100>=e&&e%20===0||e%100===0?"\u10db\u10d4-"+e:e+"-\u10d4"},week:{dow:1,doy:7}}),br.defineLocale("km",{months:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b7\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),monthsShort:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b7\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),weekdays:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),weekdaysShort:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),weekdaysMin:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u1790\u17d2\u1784\u17c3\u1793\u17c8 \u1798\u17c9\u17c4\u1784] LT",nextDay:"[\u179f\u17d2\u17a2\u17c2\u1780 \u1798\u17c9\u17c4\u1784] LT",nextWeek:"dddd [\u1798\u17c9\u17c4\u1784] LT",lastDay:"[\u1798\u17d2\u179f\u17b7\u179b\u1798\u17b7\u1789 \u1798\u17c9\u17c4\u1784] LT",lastWeek:"dddd [\u179f\u1794\u17d2\u178f\u17b6\u17a0\u17cd\u1798\u17bb\u1793] [\u1798\u17c9\u17c4\u1784] LT",sameElse:"L"},relativeTime:{future:"%s\u1791\u17c0\u178f",past:"%s\u1798\u17bb\u1793",s:"\u1794\u17c9\u17bb\u1793\u17d2\u1798\u17b6\u1793\u179c\u17b7\u1793\u17b6\u1791\u17b8",m:"\u1798\u17bd\u1799\u1793\u17b6\u1791\u17b8",mm:"%d \u1793\u17b6\u1791\u17b8",h:"\u1798\u17bd\u1799\u1798\u17c9\u17c4\u1784",hh:"%d \u1798\u17c9\u17c4\u1784",d:"\u1798\u17bd\u1799\u1790\u17d2\u1784\u17c3",dd:"%d \u1790\u17d2\u1784\u17c3",M:"\u1798\u17bd\u1799\u1781\u17c2",MM:"%d \u1781\u17c2",y:"\u1798\u17bd\u1799\u1786\u17d2\u1793\u17b6\u17c6",yy:"%d \u1786\u17d2\u1793\u17b6\u17c6"},week:{dow:1,doy:4}}),br.defineLocale("ko",{months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),longDateFormat:{LT:"A h\uc2dc m\ubd84",LTS:"A h\uc2dc m\ubd84 s\ucd08",L:"YYYY.MM.DD",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h\uc2dc m\ubd84",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h\uc2dc m\ubd84"},calendar:{sameDay:"\uc624\ub298 LT",nextDay:"\ub0b4\uc77c LT",nextWeek:"dddd LT",lastDay:"\uc5b4\uc81c LT",lastWeek:"\uc9c0\ub09c\uc8fc dddd LT",sameElse:"L"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87\ucd08",ss:"%d\ucd08",m:"\uc77c\ubd84",mm:"%d\ubd84",h:"\ud55c\uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c\ub2ec",MM:"%d\ub2ec",y:"\uc77c\ub144",yy:"%d\ub144"},ordinalParse:/\d{1,2}\uc77c/,ordinal:"%d\uc77c",meridiemParse:/\uc624\uc804|\uc624\ud6c4/,isPM:function(e){return"\uc624\ud6c4"===e},meridiem:function(e,t,n){return 12>e?"\uc624\uc804":"\uc624\ud6c4"}}),br.defineLocale("lb",{months:"Januar_Februar_M\xe4erz_Abr\xebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonndeg_M\xe9indeg_D\xebnschdeg_M\xebttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._M\xe9._D\xeb._M\xeb._Do._Fr._Sa.".split("_"),weekdaysMin:"So_M\xe9_D\xeb_M\xeb_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[G\xebschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:li,past:di,s:"e puer Sekonnen",m:oi,mm:"%d Minutten",h:oi,hh:"%d Stonnen",d:oi,dd:"%d Deeg",M:oi,MM:"%d M\xe9int",y:oi,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{m:"minut\u0117_minut\u0117s_minut\u0119",mm:"minut\u0117s_minu\u010di\u0173_minutes",h:"valanda_valandos_valand\u0105",hh:"valandos_valand\u0173_valandas",d:"diena_dienos_dien\u0105",dd:"dienos_dien\u0173_dienas",M:"m\u0117nuo_m\u0117nesio_m\u0117nes\u012f",MM:"m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",y:"metai_met\u0173_metus",yy:"metai_met\u0173_metus"}),Gr="sekmadienis_pirmadienis_antradienis_tre\u010diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),Vr=(br.defineLocale("lt",{months:hi,monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:gi,weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"),weekdaysMin:"S_P_A_T_K_Pn_\u0160".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[\u0160iandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Pra\u0117jus\u012f] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prie\u0161 %s",s:ci,m:pi,mm:_i,h:pi,hh:_i,d:pi,dd:_i,M:pi,MM:_i,y:pi,yy:_i},ordinalParse:/\d{1,2}-oji/,ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}}),{m:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),mm:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),h:"stundas_stund\u0101m_stunda_stundas".split("_"),hh:"stundas_stund\u0101m_stunda_stundas".split("_"),d:"dienas_dien\u0101m_diena_dienas".split("_"),dd:"dienas_dien\u0101m_diena_dienas".split("_"),M:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),MM:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")}),Kr=(br.defineLocale("lv",{months:"janv\u0101ris_febru\u0101ris_marts_apr\u012blis_maijs_j\u016bnijs_j\u016blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_j\u016bn_j\u016bl_aug_sep_okt_nov_dec".split("_"),weekdays:"sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[\u0160odien pulksten] LT",nextDay:"[R\u012bt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"p\u0113c %s",past:"pirms %s",s:Mi,m:bi,mm:vi,h:bi,hh:vi,d:bi,dd:vi,M:bi,MM:vi,y:bi,yy:vi},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&4>=e?t[1]:t[2]},translate:function(e,t,n){var i=Kr.words[n];return 1===n.length?t?i[0]:i[1]:e+" "+Kr.correctGrammaticalCase(e,i)}}),Qr=(br.defineLocale("me",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","\u010detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","\u010det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010de","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){var e=["[pro\u0161le] [nedjelje] [u] LT","[pro\u0161log] [ponedjeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srijede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:Kr.translate,mm:Kr.translate,h:Kr.translate,hh:Kr.translate,d:"dan",dd:Kr.translate,M:"mjesec",MM:Kr.translate,y:"godinu",yy:Kr.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),br.defineLocale("mk",{months:"\u0458\u0430\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d\u0438_\u0458\u0443\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u0458\u0430\u043d_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043e\u043a_\u043f\u0435\u0442\u043e\u043a_\u0441\u0430\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u0430\u0431".split("_"),weekdaysMin:"\u043de_\u043fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441a".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u0435\u043d\u0435\u0441 \u0432\u043e] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432\u043e] LT",nextWeek:"dddd [\u0432\u043e] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432\u043e] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0412\u043e \u0438\u0437\u043c\u0438\u043d\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043e] LT";case 1:case 2:case 4:case 5:return"[\u0412\u043e \u0438\u0437\u043c\u0438\u043d\u0430\u0442\u0438\u043e\u0442] dddd [\u0432\u043e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u043e\u0441\u043b\u0435 %s",past:"\u043f\u0440\u0435\u0434 %s",s:"\u043d\u0435\u043a\u043e\u043b\u043a\u0443 \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u0435\u043d\u0430",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0438",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},ordinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var t=e%10,n=e%100;return 0===e?e+"-\u0435\u0432":0===n?e+"-\u0435\u043d":n>10&&20>n?e+"-\u0442\u0438":1===t?e+"-\u0432\u0438":2===t?e+"-\u0440\u0438":7===t||8===t?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),br.defineLocale("ml",{months:"\u0d1c\u0d28\u0d41\u0d35\u0d30\u0d3f_\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41\u0d35\u0d30\u0d3f_\u0d2e\u0d3e\u0d7c\u0d1a\u0d4d\u0d1a\u0d4d_\u0d0f\u0d2a\u0d4d\u0d30\u0d3f\u0d7d_\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48_\u0d13\u0d17\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d4d_\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31\u0d02\u0d2c\u0d7c_\u0d12\u0d15\u0d4d\u0d1f\u0d4b\u0d2c\u0d7c_\u0d28\u0d35\u0d02\u0d2c\u0d7c_\u0d21\u0d3f\u0d38\u0d02\u0d2c\u0d7c".split("_"),monthsShort:"\u0d1c\u0d28\u0d41._\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41._\u0d2e\u0d3e\u0d7c._\u0d0f\u0d2a\u0d4d\u0d30\u0d3f._\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48._\u0d13\u0d17._\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31._\u0d12\u0d15\u0d4d\u0d1f\u0d4b._\u0d28\u0d35\u0d02._\u0d21\u0d3f\u0d38\u0d02.".split("_"),weekdays:"\u0d1e\u0d3e\u0d2f\u0d31\u0d3e\u0d34\u0d4d\u0d1a_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d33\u0d3e\u0d34\u0d4d\u0d1a_\u0d1a\u0d4a\u0d35\u0d4d\u0d35\u0d3e\u0d34\u0d4d\u0d1a_\u0d2c\u0d41\u0d27\u0d28\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a_\u0d36\u0d28\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a".split("_"),weekdaysShort:"\u0d1e\u0d3e\u0d2f\u0d7c_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d7e_\u0d1a\u0d4a\u0d35\u0d4d\u0d35_\u0d2c\u0d41\u0d27\u0d7b_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d02_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f_\u0d36\u0d28\u0d3f".split("_"),weekdaysMin:"\u0d1e\u0d3e_\u0d24\u0d3f_\u0d1a\u0d4a_\u0d2c\u0d41_\u0d35\u0d4d\u0d2f\u0d3e_\u0d35\u0d46_\u0d36".split("_"),longDateFormat:{LT:"A h:mm -\u0d28\u0d41",LTS:"A h:mm:ss -\u0d28\u0d41",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -\u0d28\u0d41",LLLL:"dddd, D MMMM YYYY, A h:mm -\u0d28\u0d41"},calendar:{sameDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d4d] LT",nextDay:"[\u0d28\u0d3e\u0d33\u0d46] LT",nextWeek:"dddd, LT",lastDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d32\u0d46] LT",lastWeek:"[\u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d",past:"%s \u0d2e\u0d41\u0d7b\u0d2a\u0d4d",s:"\u0d05\u0d7d\u0d2a \u0d28\u0d3f\u0d2e\u0d3f\u0d37\u0d19\u0d4d\u0d19\u0d7e",m:"\u0d12\u0d30\u0d41 \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",mm:"%d \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",h:"\u0d12\u0d30\u0d41 \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",hh:"%d \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",d:"\u0d12\u0d30\u0d41 \u0d26\u0d3f\u0d35\u0d38\u0d02",dd:"%d \u0d26\u0d3f\u0d35\u0d38\u0d02",M:"\u0d12\u0d30\u0d41 \u0d2e\u0d3e\u0d38\u0d02",MM:"%d \u0d2e\u0d3e\u0d38\u0d02",y:"\u0d12\u0d30\u0d41 \u0d35\u0d7c\u0d37\u0d02",yy:"%d \u0d35\u0d7c\u0d37\u0d02"},meridiemParse:/\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i,isPM:function(e){return/^(\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f":12>e?"\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46":17>e?"\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d":20>e?"\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02":"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f"}}),{1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"}),Xr={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"},Zr=(br.defineLocale("mr",{months:"\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u093f\u0932_\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932\u0948_\u0911\u0917\u0938\u094d\u091f_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930_\u0911\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930_\u0921\u093f\u0938\u0947\u0902\u092c\u0930".split("_"),
monthsShort:"\u091c\u093e\u0928\u0947._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a._\u090f\u092a\u094d\u0930\u093f._\u092e\u0947._\u091c\u0942\u0928._\u091c\u0941\u0932\u0948._\u0911\u0917._\u0938\u092a\u094d\u091f\u0947\u0902._\u0911\u0915\u094d\u091f\u094b._\u0928\u094b\u0935\u094d\u0939\u0947\u0902._\u0921\u093f\u0938\u0947\u0902.".split("_"),weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0933\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0933_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u0935\u093e\u091c\u0924\u093e",LTS:"A h:mm:ss \u0935\u093e\u091c\u0924\u093e",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e",LLLL:"dddd, D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0909\u0926\u094d\u092f\u093e] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u093e\u0932] LT",lastWeek:"[\u092e\u093e\u0917\u0940\u0932] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0928\u0902\u0924\u0930",past:"%s \u092a\u0942\u0930\u094d\u0935\u0940",s:"\u0938\u0947\u0915\u0902\u0926",m:"\u090f\u0915 \u092e\u093f\u0928\u093f\u091f",mm:"%d \u092e\u093f\u0928\u093f\u091f\u0947",h:"\u090f\u0915 \u0924\u093e\u0938",hh:"%d \u0924\u093e\u0938",d:"\u090f\u0915 \u0926\u093f\u0935\u0938",dd:"%d \u0926\u093f\u0935\u0938",M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",MM:"%d \u092e\u0939\u093f\u0928\u0947",y:"\u090f\u0915 \u0935\u0930\u094d\u0937",yy:"%d \u0935\u0930\u094d\u0937\u0947"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return Xr[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Qr[e]})},meridiemParse:/\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/,meridiemHour:function(e,t){return 12===e&&(e=0),"\u0930\u093e\u0924\u094d\u0930\u0940"===t?4>e?e:e+12:"\u0938\u0915\u093e\u0933\u0940"===t?e:"\u0926\u0941\u092a\u093e\u0930\u0940"===t?e>=10?e:e+12:"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940"===t?e+12:void 0},meridiem:function(e,t,n){return 4>e?"\u0930\u093e\u0924\u094d\u0930\u0940":10>e?"\u0938\u0915\u093e\u0933\u0940":17>e?"\u0926\u0941\u092a\u093e\u0930\u0940":20>e?"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940":"\u0930\u093e\u0924\u094d\u0930\u0940"},week:{dow:0,doy:6}}),br.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return 11>e?"pagi":15>e?"tengahari":19>e?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),br.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"tengahari"===t?e>=11?e:e+12:"petang"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,n){return 11>e?"pagi":15>e?"tengahari":19>e?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),{1:"\u1041",2:"\u1042",3:"\u1043",4:"\u1044",5:"\u1045",6:"\u1046",7:"\u1047",8:"\u1048",9:"\u1049",0:"\u1040"}),es={"\u1041":"1","\u1042":"2","\u1043":"3","\u1044":"4","\u1045":"5","\u1046":"6","\u1047":"7","\u1048":"8","\u1049":"9","\u1040":"0"},ts=(br.defineLocale("my",{months:"\u1007\u1014\u103a\u1014\u101d\u102b\u101b\u102e_\u1016\u1031\u1016\u1031\u102c\u103a\u101d\u102b\u101b\u102e_\u1019\u1010\u103a_\u1027\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u1007\u1030\u101c\u102d\u102f\u1004\u103a_\u101e\u103c\u1002\u102f\u1010\u103a_\u1005\u1000\u103a\u1010\u1004\u103a\u1018\u102c_\u1021\u1031\u102c\u1000\u103a\u1010\u102d\u102f\u1018\u102c_\u1014\u102d\u102f\u101d\u1004\u103a\u1018\u102c_\u1012\u102e\u1007\u1004\u103a\u1018\u102c".split("_"),monthsShort:"\u1007\u1014\u103a_\u1016\u1031_\u1019\u1010\u103a_\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u101c\u102d\u102f\u1004\u103a_\u101e\u103c_\u1005\u1000\u103a_\u1021\u1031\u102c\u1000\u103a_\u1014\u102d\u102f_\u1012\u102e".split("_"),weekdays:"\u1010\u1014\u1004\u103a\u1039\u1002\u1014\u103d\u1031_\u1010\u1014\u1004\u103a\u1039\u101c\u102c_\u1021\u1004\u103a\u1039\u1002\u102b_\u1017\u102f\u1012\u1039\u1013\u101f\u1030\u1038_\u1000\u103c\u102c\u101e\u1015\u1010\u1031\u1038_\u101e\u1031\u102c\u1000\u103c\u102c_\u1005\u1014\u1031".split("_"),weekdaysShort:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),weekdaysMin:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u101a\u1014\u1031.] LT [\u1019\u103e\u102c]",nextDay:"[\u1019\u1014\u1000\u103a\u1016\u103c\u1014\u103a] LT [\u1019\u103e\u102c]",nextWeek:"dddd LT [\u1019\u103e\u102c]",lastDay:"[\u1019\u1014\u1031.\u1000] LT [\u1019\u103e\u102c]",lastWeek:"[\u1015\u103c\u102e\u1038\u1001\u1032\u1037\u101e\u1031\u102c] dddd LT [\u1019\u103e\u102c]",sameElse:"L"},relativeTime:{future:"\u101c\u102c\u1019\u100a\u103a\u1037 %s \u1019\u103e\u102c",past:"\u101c\u103d\u1014\u103a\u1001\u1032\u1037\u101e\u1031\u102c %s \u1000",s:"\u1005\u1000\u1039\u1000\u1014\u103a.\u1021\u1014\u100a\u103a\u1038\u1004\u101a\u103a",m:"\u1010\u1005\u103a\u1019\u102d\u1014\u1005\u103a",mm:"%d \u1019\u102d\u1014\u1005\u103a",h:"\u1010\u1005\u103a\u1014\u102c\u101b\u102e",hh:"%d \u1014\u102c\u101b\u102e",d:"\u1010\u1005\u103a\u101b\u1000\u103a",dd:"%d \u101b\u1000\u103a",M:"\u1010\u1005\u103a\u101c",MM:"%d \u101c",y:"\u1010\u1005\u103a\u1014\u103e\u1005\u103a",yy:"%d \u1014\u103e\u1005\u103a"},preparse:function(e){return e.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g,function(e){return es[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Zr[e]})},week:{dow:1,doy:4}}),br.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8n_man_tirs_ons_tors_fre_l\xf8r".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"H.mm",LTS:"H.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H.mm",LLLL:"dddd D. MMMM YYYY [kl.] H.mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i g\xe5r kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"ett \xe5r",yy:"%d \xe5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"}),ns={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"},is=(br.defineLocale("ne",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f\u0932_\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0937\u094d\u091f_\u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930_\u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f._\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908._\u0905\u0917._\u0938\u0947\u092a\u094d\u091f._\u0905\u0915\u094d\u091f\u094b._\u0928\u094b\u092d\u0947._\u0921\u093f\u0938\u0947.".split("_"),weekdays:"\u0906\u0907\u0924\u092c\u093e\u0930_\u0938\u094b\u092e\u092c\u093e\u0930_\u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930_\u092c\u0941\u0927\u092c\u093e\u0930_\u092c\u093f\u0939\u093f\u092c\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930_\u0936\u0928\u093f\u092c\u093e\u0930".split("_"),weekdaysShort:"\u0906\u0907\u0924._\u0938\u094b\u092e._\u092e\u0919\u094d\u0917\u0932._\u092c\u0941\u0927._\u092c\u093f\u0939\u093f._\u0936\u0941\u0915\u094d\u0930._\u0936\u0928\u093f.".split("_"),weekdaysMin:"\u0906\u0907._\u0938\u094b._\u092e\u0919\u094d_\u092c\u0941._\u092c\u093f._\u0936\u0941._\u0936.".split("_"),longDateFormat:{LT:"A\u0915\u094b h:mm \u092c\u091c\u0947",LTS:"A\u0915\u094b h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return ns[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return ts[e]})},meridiemParse:/\u0930\u093e\u0924\u0940|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u092c\u0947\u0932\u0941\u0915\u093e|\u0938\u093e\u0901\u091d|\u0930\u093e\u0924\u0940/,meridiemHour:function(e,t){return 12===e&&(e=0),"\u0930\u093e\u0924\u0940"===t?3>e?e:e+12:"\u092c\u093f\u0939\u093e\u0928"===t?e:"\u0926\u093f\u0909\u0901\u0938\u094b"===t?e>=10?e:e+12:"\u092c\u0947\u0932\u0941\u0915\u093e"===t||"\u0938\u093e\u0901\u091d"===t?e+12:void 0},meridiem:function(e,t,n){return 3>e?"\u0930\u093e\u0924\u0940":10>e?"\u092c\u093f\u0939\u093e\u0928":15>e?"\u0926\u093f\u0909\u0901\u0938\u094b":18>e?"\u092c\u0947\u0932\u0941\u0915\u093e":20>e?"\u0938\u093e\u0901\u091d":"\u0930\u093e\u0924\u0940"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u092d\u094b\u0932\u0940] LT",nextWeek:"[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT",lastDay:"[\u0939\u093f\u091c\u094b] LT",lastWeek:"[\u0917\u090f\u0915\u094b] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u093e",past:"%s \u0905\u0917\u093e\u0921\u0940",s:"\u0915\u0947\u0939\u0940 \u0938\u092e\u092f",m:"\u090f\u0915 \u092e\u093f\u0928\u0947\u091f",mm:"%d \u092e\u093f\u0928\u0947\u091f",h:"\u090f\u0915 \u0918\u0923\u094d\u091f\u093e",hh:"%d \u0918\u0923\u094d\u091f\u093e",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",MM:"%d \u092e\u0939\u093f\u0928\u093e",y:"\u090f\u0915 \u092c\u0930\u094d\u0937",yy:"%d \u092c\u0930\u094d\u0937"},week:{dow:1,doy:7}}),"jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")),as="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),rs=(br.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,t){return/-MMM-/.test(t)?as[e.month()]:is[e.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"\xe9\xe9n minuut",mm:"%d minuten",h:"\xe9\xe9n uur",hh:"%d uur",d:"\xe9\xe9n dag",dd:"%d dagen",M:"\xe9\xe9n maand",MM:"%d maanden",y:"\xe9\xe9n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}}),br.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_m\xe5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_m\xe5n_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_m\xe5_ty_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I g\xe5r klokka] LT",lastWeek:"[F\xf8reg\xe5ande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein m\xe5nad",MM:"%d m\xe5nader",y:"eit \xe5r",yy:"%d \xe5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),"stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017adziernik_listopad_grudzie\u0144".split("_")),ss="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015bnia_pa\u017adziernika_listopada_grudnia".split("_"),os=(br.defineLocale("pl",{months:function(e,t){return""===t?"("+ss[e.month()]+"|"+rs[e.month()]+")":/D MMMM/.test(t)?ss[e.month()]:rs[e.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017a_lis_gru".split("_"),weekdays:"niedziela_poniedzia\u0142ek_wtorek_\u015broda_czwartek_pi\u0105tek_sobota".split("_"),weekdaysShort:"nie_pon_wt_\u015br_czw_pt_sb".split("_"),weekdaysMin:"N_Pn_Wt_\u015ar_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dzi\u015b o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zesz\u0142\u0105 niedziel\u0119 o] LT";case 3:return"[W zesz\u0142\u0105 \u015brod\u0119 o] LT";case 6:return"[W zesz\u0142\u0105 sobot\u0119 o] LT";default:return"[W zesz\u0142y] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:Li,mm:Li,h:Li,hh:Li,d:"1 dzie\u0144",dd:"%d dni",M:"miesi\u0105c",MM:Li,y:"rok",yy:Li},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Ter\xe7a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Dom_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1b".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [\xe0s] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [\xe0s] HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atr\xe1s",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}\xba/,ordinal:"%d\xba"}),br.defineLocale("pt",{months:"Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Ter\xe7a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Dom_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1b".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"h\xe1 %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),br.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),weekdays:"duminic\u0103_luni_mar\u021bi_miercuri_joi_vineri_s\xe2mb\u0103t\u0103".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_S\xe2m".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_S\xe2".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[m\xe2ine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s \xeen urm\u0103",s:"c\xe2teva secunde",m:"un minut",mm:ki,h:"o or\u0103",hh:ki,d:"o zi",dd:ki,M:"o lun\u0103",MM:ki,y:"un an",yy:ki},week:{dow:1,doy:7}}),br.defineLocale("ru",{months:Ti,monthsShort:xi,weekdays:Si,weekdaysShort:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),monthsParse:[/^\u044f\u043d\u0432/i,/^\u0444\u0435\u0432/i,/^\u043c\u0430\u0440/i,/^\u0430\u043f\u0440/i,/^\u043c\u0430[\u0439|\u044f]/i,/^\u0438\u044e\u043d/i,/^\u0438\u044e\u043b/i,/^\u0430\u0432\u0433/i,/^\u0441\u0435\u043d/i,/^\u043e\u043a\u0442/i,/^\u043d\u043e\u044f/i,/^\u0434\u0435\u043a/i],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0435\u0433\u043e\u0434\u043d\u044f \u0432] LT",nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",nextWeek:function(){return 2===this.day()?"[\u0412\u043e] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT"},lastWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[\u0412\u043e] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT";switch(this.day()){case 0:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u0435] dddd [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u044b\u0439] dddd [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u0443\u044e] dddd [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0447\u0435\u0440\u0435\u0437 %s",past:"%s \u043d\u0430\u0437\u0430\u0434",s:"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434",m:Di,mm:Di,h:"\u0447\u0430\u0441",hh:Di,d:"\u0434\u0435\u043d\u044c",dd:Di,M:"\u043c\u0435\u0441\u044f\u0446",MM:Di,y:"\u0433\u043e\u0434",yy:Di},meridiemParse:/\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u043d\u043e\u0447\u0438":12>e?"\u0443\u0442\u0440\u0430":17>e?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0435\u0440\u0430"},ordinalParse:/\d{1,2}-(\u0439|\u0433\u043e|\u044f)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":return e+"-\u0439";case"D":return e+"-\u0433\u043e";case"w":case"W":return e+"-\u044f";default:return e}},week:{dow:1,doy:7}}),br.defineLocale("si",{months:"\u0da2\u0db1\u0dc0\u0dcf\u0dbb\u0dd2_\u0db4\u0dd9\u0db6\u0dbb\u0dc0\u0dcf\u0dbb\u0dd2_\u0db8\u0dcf\u0dbb\u0dca\u0dad\u0dd4_\u0d85\u0db4\u0dca\u200d\u0dbb\u0dda\u0dbd\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd\u0dc3\u0dca\u0dad\u0dd4_\u0dc3\u0dd0\u0db4\u0dca\u0dad\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0d94\u0d9a\u0dca\u0dad\u0ddd\u0db6\u0dbb\u0dca_\u0db1\u0ddc\u0dc0\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0daf\u0dd9\u0dc3\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca".split("_"),monthsShort:"\u0da2\u0db1_\u0db4\u0dd9\u0db6_\u0db8\u0dcf\u0dbb\u0dca_\u0d85\u0db4\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd_\u0dc3\u0dd0\u0db4\u0dca_\u0d94\u0d9a\u0dca_\u0db1\u0ddc\u0dc0\u0dd0_\u0daf\u0dd9\u0dc3\u0dd0".split("_"),weekdays:"\u0d89\u0dbb\u0dd2\u0daf\u0dcf_\u0dc3\u0db3\u0dd4\u0daf\u0dcf_\u0d85\u0d9f\u0dc4\u0dbb\u0dd4\u0dc0\u0dcf\u0daf\u0dcf_\u0db6\u0daf\u0dcf\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4\u0dc3\u0dca\u0db4\u0dad\u0dd2\u0db1\u0dca\u0daf\u0dcf_\u0dc3\u0dd2\u0d9a\u0dd4\u0dbb\u0dcf\u0daf\u0dcf_\u0dc3\u0dd9\u0db1\u0dc3\u0dd4\u0dbb\u0dcf\u0daf\u0dcf".split("_"),weekdaysShort:"\u0d89\u0dbb\u0dd2_\u0dc3\u0db3\u0dd4_\u0d85\u0d9f_\u0db6\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4_\u0dc3\u0dd2\u0d9a\u0dd4_\u0dc3\u0dd9\u0db1".split("_"),weekdaysMin:"\u0d89_\u0dc3_\u0d85_\u0db6_\u0db6\u0dca\u200d\u0dbb_\u0dc3\u0dd2_\u0dc3\u0dd9".split("_"),longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [\u0dc0\u0dd0\u0db1\u0dd2] dddd, a h:mm:ss"},calendar:{sameDay:"[\u0d85\u0daf] LT[\u0da7]",nextDay:"[\u0dc4\u0dd9\u0da7] LT[\u0da7]",nextWeek:"dddd LT[\u0da7]",lastDay:"[\u0d8a\u0dba\u0dda] LT[\u0da7]",lastWeek:"[\u0db4\u0dc3\u0dd4\u0d9c\u0dd2\u0dba] dddd LT[\u0da7]",sameElse:"L"},relativeTime:{future:"%s\u0d9a\u0dd2\u0db1\u0dca",past:"%s\u0d9a\u0da7 \u0db4\u0dd9\u0dbb",s:"\u0dad\u0dad\u0dca\u0db4\u0dbb \u0d9a\u0dd2\u0dc4\u0dd2\u0db4\u0dba",m:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4\u0dc0",mm:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4 %d",h:"\u0db4\u0dd0\u0dba",hh:"\u0db4\u0dd0\u0dba %d",d:"\u0daf\u0dd2\u0db1\u0dba",dd:"\u0daf\u0dd2\u0db1 %d",M:"\u0db8\u0dcf\u0dc3\u0dba",MM:"\u0db8\u0dcf\u0dc3 %d",y:"\u0dc0\u0dc3\u0dbb",yy:"\u0dc0\u0dc3\u0dbb %d"},ordinalParse:/\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/,ordinal:function(e){return e+" \u0dc0\u0dd0\u0db1\u0dd2"},meridiem:function(e,t,n){return e>11?n?"\u0db4.\u0dc0.":"\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4":n?"\u0db4\u0dd9.\u0dc0.":"\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4"}}),"janu\xe1r_febru\xe1r_marec_apr\xedl_m\xe1j_j\xfan_j\xfal_august_september_okt\xf3ber_november_december".split("_")),ls="jan_feb_mar_apr_m\xe1j_j\xfan_j\xfal_aug_sep_okt_nov_dec".split("_"),ds=(br.defineLocale("sk",{months:os,monthsShort:ls,monthsParse:function(e,t){var n,i=[];for(n=0;12>n;n++)i[n]=new RegExp("^"+e[n]+"$|^"+t[n]+"$","i");return i}(os,ls),weekdays:"nede\u013ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_\u0161t_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_\u0161t_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nede\u013eu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo \u0161tvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[v\u010dera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minul\xfa nede\u013eu o] LT";case 1:case 2:return"[minul\xfd] dddd [o] LT";case 3:return"[minul\xfa stredu o] LT";case 4:case 5:return"[minul\xfd] dddd [o] LT";case 6:return"[minul\xfa sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:Hi,m:Hi,mm:Hi,h:Hi,hh:Hi,d:Hi,dd:Hi,M:Hi,MM:Hi,y:Hi,yy:Hi},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._\u010det._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_\u010de_pe_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[v\u010deraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prej\u0161njo] [nedeljo] [ob] LT";case 3:return"[prej\u0161njo] [sredo] [ob] LT";case 6:return"[prej\u0161njo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prej\u0161nji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"\u010dez %s",past:"pred %s",s:ji,m:ji,mm:ji,h:ji,hh:ji,d:ji,dd:ji,M:ji,MM:ji,y:ji,yy:ji},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),br.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xebntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xebn_Dhj".split("_"),weekdays:"E Diel_E H\xebn\xeb_E Mart\xeb_E M\xebrkur\xeb_E Enjte_E Premte_E Shtun\xeb".split("_"),weekdaysShort:"Die_H\xebn_Mar_M\xebr_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_M\xeb_E_P_Sh".split("_"),meridiemParse:/PD|MD/,isPM:function(e){return"M"===e.charAt(0)},meridiem:function(e,t,n){return 12>e?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot n\xeb] LT",nextDay:"[Nes\xebr n\xeb] LT",nextWeek:"dddd [n\xeb] LT",lastDay:"[Dje n\xeb] LT",lastWeek:"dddd [e kaluar n\xeb] LT",sameElse:"L"},relativeTime:{future:"n\xeb %s",past:"%s m\xeb par\xeb",s:"disa sekonda",m:"nj\xeb minut\xeb",mm:"%d minuta",h:"nj\xeb or\xeb",hh:"%d or\xeb",d:"nj\xeb dit\xeb",dd:"%d dit\xeb",M:"nj\xeb muaj",MM:"%d muaj",y:"nj\xeb vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["\u0458\u0435\u0434\u0430\u043d \u043c\u0438\u043d\u0443\u0442","\u0458\u0435\u0434\u043d\u0435 \u043c\u0438\u043d\u0443\u0442\u0435"],mm:["\u043c\u0438\u043d\u0443\u0442","\u043c\u0438\u043d\u0443\u0442\u0435","\u043c\u0438\u043d\u0443\u0442\u0430"],h:["\u0458\u0435\u0434\u0430\u043d \u0441\u0430\u0442","\u0458\u0435\u0434\u043d\u043e\u0433 \u0441\u0430\u0442\u0430"],hh:["\u0441\u0430\u0442","\u0441\u0430\u0442\u0430","\u0441\u0430\u0442\u0438"],dd:["\u0434\u0430\u043d","\u0434\u0430\u043d\u0430","\u0434\u0430\u043d\u0430"],MM:["\u043c\u0435\u0441\u0435\u0446","\u043c\u0435\u0441\u0435\u0446\u0430","\u043c\u0435\u0441\u0435\u0446\u0438"],yy:["\u0433\u043e\u0434\u0438\u043d\u0430","\u0433\u043e\u0434\u0438\u043d\u0435","\u0433\u043e\u0434\u0438\u043d\u0430"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&4>=e?t[1]:t[2]},translate:function(e,t,n){var i=ds.words[n];return 1===n.length?t?i[0]:i[1]:e+" "+ds.correctGrammaticalCase(e,i)}}),us=(br.defineLocale("sr-cyrl",{months:["\u0458\u0430\u043d\u0443\u0430\u0440","\u0444\u0435\u0431\u0440\u0443\u0430\u0440","\u043c\u0430\u0440\u0442","\u0430\u043f\u0440\u0438\u043b","\u043c\u0430\u0458","\u0458\u0443\u043d","\u0458\u0443\u043b","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440","\u043e\u043a\u0442\u043e\u0431\u0430\u0440","\u043d\u043e\u0432\u0435\u043c\u0431\u0430\u0440","\u0434\u0435\u0446\u0435\u043c\u0431\u0430\u0440"],monthsShort:["\u0458\u0430\u043d.","\u0444\u0435\u0431.","\u043c\u0430\u0440.","\u0430\u043f\u0440.","\u043c\u0430\u0458","\u0458\u0443\u043d","\u0458\u0443\u043b","\u0430\u0432\u0433.","\u0441\u0435\u043f.","\u043e\u043a\u0442.","\u043d\u043e\u0432.","\u0434\u0435\u0446."],weekdays:["\u043d\u0435\u0434\u0435\u0459\u0430","\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a","\u0443\u0442\u043e\u0440\u0430\u043a","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043a","\u043f\u0435\u0442\u0430\u043a","\u0441\u0443\u0431\u043e\u0442\u0430"],weekdaysShort:["\u043d\u0435\u0434.","\u043f\u043e\u043d.","\u0443\u0442\u043e.","\u0441\u0440\u0435.","\u0447\u0435\u0442.","\u043f\u0435\u0442.","\u0441\u0443\u0431."],weekdaysMin:["\u043d\u0435","\u043f\u043e","\u0443\u0442","\u0441\u0440","\u0447\u0435","\u043f\u0435","\u0441\u0443"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[\u0434\u0430\u043d\u0430\u0441 \u0443] LT",nextDay:"[\u0441\u0443\u0442\u0440\u0430 \u0443] LT",nextWeek:function(){switch(this.day()){case 0:return"[\u0443] [\u043d\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";case 3:return"[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";case 6:return"[\u0443] [\u0441\u0443\u0431\u043e\u0442\u0443] [\u0443] LT";case 1:case 2:case 4:case 5:return"[\u0443] dddd [\u0443] LT"}},lastDay:"[\u0458\u0443\u0447\u0435 \u0443] LT",lastWeek:function(){var e=["[\u043f\u0440\u043e\u0448\u043b\u0435] [\u043d\u0435\u0434\u0435\u0459\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0443\u0442\u043e\u0440\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u0435\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0443\u0431\u043e\u0442\u0435] [\u0443] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"\u043f\u0440\u0435 %s",s:"\u043d\u0435\u043a\u043e\u043b\u0438\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:ds.translate,mm:ds.translate,h:ds.translate,hh:ds.translate,d:"\u0434\u0430\u043d",dd:ds.translate,M:"\u043c\u0435\u0441\u0435\u0446",MM:ds.translate,y:"\u0433\u043e\u0434\u0438\u043d\u0443",yy:ds.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,t){return 1===e?t[0]:e>=2&&4>=e?t[1]:t[2];
},translate:function(e,t,n){var i=us.words[n];return 1===n.length?t?i[0]:i[1]:e+" "+us.correctGrammaticalCase(e,i)}}),cs=(br.defineLocale("sr",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljak","utorak","sreda","\u010detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sre.","\u010det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010de","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){var e=["[pro\u0161le] [nedelje] [u] LT","[pro\u0161log] [ponedeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"];return e[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:us.translate,mm:us.translate,h:us.translate,hh:us.translate,d:"dan",dd:us.translate,M:"mesec",MM:us.translate,y:"godinu",yy:us.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),br.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf6ndag_m\xe5ndag_tisdag_onsdag_torsdag_fredag_l\xf6rdag".split("_"),weekdaysShort:"s\xf6n_m\xe5n_tis_ons_tor_fre_l\xf6r".split("_"),weekdaysMin:"s\xf6_m\xe5_ti_on_to_fr_l\xf6".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Ig\xe5r] LT",nextWeek:"[P\xe5] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"f\xf6r %s sedan",s:"n\xe5gra sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en m\xe5nad",MM:"%d m\xe5nader",y:"ett \xe5r",yy:"%d \xe5r"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(e){var t=e%10,n=1===~~(e%100/10)?"e":1===t?"a":2===t?"a":"e";return e+n},week:{dow:1,doy:4}}),br.defineLocale("ta",{months:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),monthsShort:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),weekdays:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0b9f\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8".split("_"),weekdaysShort:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0bb3\u0bcd_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf_\u0b9a\u0ba9\u0bbf".split("_"),weekdaysMin:"\u0b9e\u0bbe_\u0ba4\u0bbf_\u0b9a\u0bc6_\u0baa\u0bc1_\u0bb5\u0bbf_\u0bb5\u0bc6_\u0b9a".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[\u0b87\u0ba9\u0bcd\u0bb1\u0bc1] LT",nextDay:"[\u0ba8\u0bbe\u0bb3\u0bc8] LT",nextWeek:"dddd, LT",lastDay:"[\u0ba8\u0bc7\u0bb1\u0bcd\u0bb1\u0bc1] LT",lastWeek:"[\u0b95\u0b9f\u0ba8\u0bcd\u0ba4 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0b87\u0bb2\u0bcd",past:"%s \u0bae\u0bc1\u0ba9\u0bcd",s:"\u0b92\u0bb0\u0bc1 \u0b9a\u0bbf\u0bb2 \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd",m:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0bae\u0bcd",mm:"%d \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd",h:"\u0b92\u0bb0\u0bc1 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",hh:"%d \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",d:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbe\u0bb3\u0bcd",dd:"%d \u0ba8\u0bbe\u0b9f\u0bcd\u0b95\u0bb3\u0bcd",M:"\u0b92\u0bb0\u0bc1 \u0bae\u0bbe\u0ba4\u0bae\u0bcd",MM:"%d \u0bae\u0bbe\u0ba4\u0b99\u0bcd\u0b95\u0bb3\u0bcd",y:"\u0b92\u0bb0\u0bc1 \u0bb5\u0bb0\u0bc1\u0b9f\u0bae\u0bcd",yy:"%d \u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bb3\u0bcd"},ordinalParse:/\d{1,2}\u0bb5\u0ba4\u0bc1/,ordinal:function(e){return e+"\u0bb5\u0ba4\u0bc1"},meridiemParse:/\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/,meridiem:function(e,t,n){return 2>e?" \u0baf\u0bbe\u0bae\u0bae\u0bcd":6>e?" \u0bb5\u0bc8\u0b95\u0bb1\u0bc8":10>e?" \u0b95\u0bbe\u0bb2\u0bc8":14>e?" \u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd":18>e?" \u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1":22>e?" \u0bae\u0bbe\u0bb2\u0bc8":" \u0baf\u0bbe\u0bae\u0bae\u0bcd"},meridiemHour:function(e,t){return 12===e&&(e=0),"\u0baf\u0bbe\u0bae\u0bae\u0bcd"===t?2>e?e:e+12:"\u0bb5\u0bc8\u0b95\u0bb1\u0bc8"===t||"\u0b95\u0bbe\u0bb2\u0bc8"===t?e:"\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd"===t&&e>=10?e:e+12},week:{dow:0,doy:6}}),br.defineLocale("th",{months:"\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21_\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c_\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21_\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19_\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19_\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21_\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21_\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19_\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19_\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split("_"),monthsShort:"\u0e21\u0e01\u0e23\u0e32_\u0e01\u0e38\u0e21\u0e20\u0e32_\u0e21\u0e35\u0e19\u0e32_\u0e40\u0e21\u0e29\u0e32_\u0e1e\u0e24\u0e29\u0e20\u0e32_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32_\u0e01\u0e23\u0e01\u0e0e\u0e32_\u0e2a\u0e34\u0e07\u0e2b\u0e32_\u0e01\u0e31\u0e19\u0e22\u0e32_\u0e15\u0e38\u0e25\u0e32_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32_\u0e18\u0e31\u0e19\u0e27\u0e32".split("_"),weekdays:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysShort:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysMin:"\u0e2d\u0e32._\u0e08._\u0e2d._\u0e1e._\u0e1e\u0e24._\u0e28._\u0e2a.".split("_"),longDateFormat:{LT:"H \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 m \u0e19\u0e32\u0e17\u0e35",LTS:"H \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 m \u0e19\u0e32\u0e17\u0e35 s \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 m \u0e19\u0e32\u0e17\u0e35",LLLL:"\u0e27\u0e31\u0e19dddd\u0e17\u0e35\u0e48 D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 m \u0e19\u0e32\u0e17\u0e35"},meridiemParse:/\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/,isPM:function(e){return"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"===e},meridiem:function(e,t,n){return 12>e?"\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07":"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"},calendar:{sameDay:"[\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextDay:"[\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextWeek:"dddd[\u0e2b\u0e19\u0e49\u0e32 \u0e40\u0e27\u0e25\u0e32] LT",lastDay:"[\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",lastWeek:"[\u0e27\u0e31\u0e19]dddd[\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e27\u0e25\u0e32] LT",sameElse:"L"},relativeTime:{future:"\u0e2d\u0e35\u0e01 %s",past:"%s\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27",s:"\u0e44\u0e21\u0e48\u0e01\u0e35\u0e48\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",m:"1 \u0e19\u0e32\u0e17\u0e35",mm:"%d \u0e19\u0e32\u0e17\u0e35",h:"1 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",hh:"%d \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",d:"1 \u0e27\u0e31\u0e19",dd:"%d \u0e27\u0e31\u0e19",M:"1 \u0e40\u0e14\u0e37\u0e2d\u0e19",MM:"%d \u0e40\u0e14\u0e37\u0e2d\u0e19",y:"1 \u0e1b\u0e35",yy:"%d \u0e1b\u0e35"}}),br.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}}),{1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\xfcnc\xfc",4:"'\xfcnc\xfc",100:"'\xfcnc\xfc",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"}),hs=(br.defineLocale("tr",{months:"Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\xfcl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),monthsShort:"Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Sal\u0131_\xc7ar\u015famba_Per\u015fembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_\xc7ar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_\xc7a_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[yar\u0131n saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[d\xfcn] LT",lastWeek:"[ge\xe7en hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \xf6nce",s:"birka\xe7 saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir y\u0131l",yy:"%d y\u0131l"},ordinalParse:/\d{1,2}'(inci|nci|\xfcnc\xfc|nc\u0131|uncu|\u0131nc\u0131)/,ordinal:function(e){if(0===e)return e+"'\u0131nc\u0131";var t=e%10,n=e%100-t,i=e>=100?100:null;return e+(cs[t]||cs[n]||cs[i])},week:{dow:1,doy:7}}),br.defineLocale("tzl",{months:"Januar_Fevraglh_Mar\xe7_Avr\xefu_Mai_G\xfcn_Julia_Guscht_Setemvar_Listop\xe4ts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_G\xfcn_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"S\xfaladi_L\xfane\xe7i_Maitzi_M\xe1rcuri_Xh\xfaadi_Vi\xe9ner\xe7i_S\xe1turi".split("_"),weekdaysShort:"S\xfal_L\xfan_Mai_M\xe1r_Xh\xfa_Vi\xe9_S\xe1t".split("_"),weekdaysMin:"S\xfa_L\xfa_Ma_M\xe1_Xh_Vi_S\xe1".split("_"),longDateFormat:{LT:"HH.mm",LTS:"LT.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY LT",LLLL:"dddd, [li] D. MMMM [dallas] YYYY LT"},meridiem:function(e,t,n){return e>11?n?"d'o":"D'O":n?"d'a":"D'A"},calendar:{sameDay:"[oxhi \xe0] LT",nextDay:"[dem\xe0 \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[ieiri \xe0] LT",lastWeek:"[s\xfcr el] dddd [lasteu \xe0] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:Ei,m:Ei,mm:Ei,h:Ei,hh:Ei,d:Ei,dd:Ei,M:Ei,MM:Ei,y:Ei,yy:Ei},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),br.defineLocale("tzm-latn",{months:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minu\u1e0d",mm:"%d minu\u1e0d",h:"sa\u025ba",hh:"%d tassa\u025bin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),br.defineLocale("tzm",{months:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),monthsShort:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),weekdays:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysShort:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysMin:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u2d30\u2d59\u2d37\u2d45 \u2d34] LT",nextDay:"[\u2d30\u2d59\u2d3d\u2d30 \u2d34] LT",nextWeek:"dddd [\u2d34] LT",lastDay:"[\u2d30\u2d5a\u2d30\u2d4f\u2d5c \u2d34] LT",lastWeek:"dddd [\u2d34] LT",sameElse:"L"},relativeTime:{future:"\u2d37\u2d30\u2d37\u2d45 \u2d59 \u2d62\u2d30\u2d4f %s",past:"\u2d62\u2d30\u2d4f %s",s:"\u2d49\u2d4e\u2d49\u2d3d",m:"\u2d4e\u2d49\u2d4f\u2d53\u2d3a",mm:"%d \u2d4e\u2d49\u2d4f\u2d53\u2d3a",h:"\u2d59\u2d30\u2d44\u2d30",hh:"%d \u2d5c\u2d30\u2d59\u2d59\u2d30\u2d44\u2d49\u2d4f",d:"\u2d30\u2d59\u2d59",dd:"%d o\u2d59\u2d59\u2d30\u2d4f",M:"\u2d30\u2d62o\u2d53\u2d54",MM:"%d \u2d49\u2d62\u2d62\u2d49\u2d54\u2d4f",y:"\u2d30\u2d59\u2d33\u2d30\u2d59",yy:"%d \u2d49\u2d59\u2d33\u2d30\u2d59\u2d4f"},week:{dow:6,doy:12}}),br.defineLocale("uk",{months:Ii,monthsShort:"\u0441\u0456\u0447_\u043b\u044e\u0442_\u0431\u0435\u0440_\u043a\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043b\u0438\u043f_\u0441\u0435\u0440\u043f_\u0432\u0435\u0440_\u0436\u043e\u0432\u0442_\u043b\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),weekdays:Wi,weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0440.",LLL:"D MMMM YYYY \u0440., HH:mm",LLLL:"dddd, D MMMM YYYY \u0440., HH:mm"},calendar:{sameDay:Fi("[\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456 "),nextDay:Fi("[\u0417\u0430\u0432\u0442\u0440\u0430 "),lastDay:Fi("[\u0412\u0447\u043e\u0440\u0430 "),nextWeek:Fi("[\u0423] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Fi("[\u041c\u0438\u043d\u0443\u043b\u043e\u0457] dddd [").call(this);case 1:case 2:case 4:return Fi("[\u041c\u0438\u043d\u0443\u043b\u043e\u0433\u043e] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"%s \u0442\u043e\u043c\u0443",s:"\u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0441\u0435\u043a\u0443\u043d\u0434",m:Pi,mm:Pi,h:"\u0433\u043e\u0434\u0438\u043d\u0443",hh:Pi,d:"\u0434\u0435\u043d\u044c",dd:Pi,M:"\u043c\u0456\u0441\u044f\u0446\u044c",MM:Pi,y:"\u0440\u0456\u043a",yy:Pi},meridiemParse:/\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(e)},meridiem:function(e,t,n){return 4>e?"\u043d\u043e\u0447\u0456":12>e?"\u0440\u0430\u043d\u043a\u0443":17>e?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u043e\u0440\u0430"},ordinalParse:/\d{1,2}-(\u0439|\u0433\u043e)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e+"-\u0439";case"D":return e+"-\u0433\u043e";default:return e}},week:{dow:1,doy:7}}),br.defineLocale("uz",{months:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u042f\u043a\u0448\u0430\u043d\u0431\u0430_\u0414\u0443\u0448\u0430\u043d\u0431\u0430_\u0421\u0435\u0448\u0430\u043d\u0431\u0430_\u0427\u043e\u0440\u0448\u0430\u043d\u0431\u0430_\u041f\u0430\u0439\u0448\u0430\u043d\u0431\u0430_\u0416\u0443\u043c\u0430_\u0428\u0430\u043d\u0431\u0430".split("_"),weekdaysShort:"\u042f\u043a\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043e\u0440_\u041f\u0430\u0439_\u0416\u0443\u043c_\u0428\u0430\u043d".split("_"),weekdaysMin:"\u042f\u043a_\u0414\u0443_\u0421\u0435_\u0427\u043e_\u041f\u0430_\u0416\u0443_\u0428\u0430".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[\u0411\u0443\u0433\u0443\u043d \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",nextDay:"[\u042d\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]",nextWeek:"dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastDay:"[\u041a\u0435\u0447\u0430 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastWeek:"[\u0423\u0442\u0433\u0430\u043d] dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",sameElse:"L"},relativeTime:{future:"\u042f\u043a\u0438\u043d %s \u0438\u0447\u0438\u0434\u0430",past:"\u0411\u0438\u0440 \u043d\u0435\u0447\u0430 %s \u043e\u043b\u0434\u0438\u043d",s:"\u0444\u0443\u0440\u0441\u0430\u0442",m:"\u0431\u0438\u0440 \u0434\u0430\u043a\u0438\u043a\u0430",mm:"%d \u0434\u0430\u043a\u0438\u043a\u0430",h:"\u0431\u0438\u0440 \u0441\u043e\u0430\u0442",hh:"%d \u0441\u043e\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u0431\u0438\u0440 \u043e\u0439",MM:"%d \u043e\u0439",y:"\u0431\u0438\u0440 \u0439\u0438\u043b",yy:"%d \u0439\u0438\u043b"},week:{dow:1,doy:7}}),br.defineLocale("vi",{months:"th\xe1ng 1_th\xe1ng 2_th\xe1ng 3_th\xe1ng 4_th\xe1ng 5_th\xe1ng 6_th\xe1ng 7_th\xe1ng 8_th\xe1ng 9_th\xe1ng 10_th\xe1ng 11_th\xe1ng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),weekdays:"ch\u1ee7 nh\u1eadt_th\u1ee9 hai_th\u1ee9 ba_th\u1ee9 t\u01b0_th\u1ee9 n\u0103m_th\u1ee9 s\xe1u_th\u1ee9 b\u1ea3y".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [n\u0103m] YYYY",LLL:"D MMMM [n\u0103m] YYYY HH:mm",LLLL:"dddd, D MMMM [n\u0103m] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[H\xf4m nay l\xfac] LT",nextDay:"[Ng\xe0y mai l\xfac] LT",nextWeek:"dddd [tu\u1ea7n t\u1edbi l\xfac] LT",lastDay:"[H\xf4m qua l\xfac] LT",lastWeek:"dddd [tu\u1ea7n r\u1ed3i l\xfac] LT",sameElse:"L"},relativeTime:{future:"%s t\u1edbi",past:"%s tr\u01b0\u1edbc",s:"v\xe0i gi\xe2y",m:"m\u1ed9t ph\xfat",mm:"%d ph\xfat",h:"m\u1ed9t gi\u1edd",hh:"%d gi\u1edd",d:"m\u1ed9t ng\xe0y",dd:"%d ng\xe0y",M:"m\u1ed9t th\xe1ng",MM:"%d th\xe1ng",y:"m\u1ed9t n\u0103m",yy:"%d n\u0103m"},ordinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}}),br.defineLocale("zh-cn",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"Ah\u70b9mm\u5206",LTS:"Ah\u70b9m\u5206s\u79d2",L:"YYYY-MM-DD",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5Ah\u70b9mm\u5206",LLLL:"YYYY\u5e74MMMD\u65e5ddddAh\u70b9mm\u5206",l:"YYYY-MM-DD",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5Ah\u70b9mm\u5206",llll:"YYYY\u5e74MMMD\u65e5ddddAh\u70b9mm\u5206"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,t){return 12===e&&(e=0),"\u51cc\u6668"===t||"\u65e9\u4e0a"===t||"\u4e0a\u5348"===t?e:"\u4e0b\u5348"===t||"\u665a\u4e0a"===t?e+12:e>=11?e:e+12},meridiem:function(e,t,n){var i=100*e+t;return 600>i?"\u51cc\u6668":900>i?"\u65e9\u4e0a":1130>i?"\u4e0a\u5348":1230>i?"\u4e2d\u5348":1800>i?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:function(){return 0===this.minutes()?"[\u4eca\u5929]Ah[\u70b9\u6574]":"[\u4eca\u5929]LT"},nextDay:function(){return 0===this.minutes()?"[\u660e\u5929]Ah[\u70b9\u6574]":"[\u660e\u5929]LT"},lastDay:function(){return 0===this.minutes()?"[\u6628\u5929]Ah[\u70b9\u6574]":"[\u6628\u5929]LT"},nextWeek:function(){var e,t;return e=br().startOf("week"),t=this.unix()-e.unix()>=604800?"[\u4e0b]":"[\u672c]",0===this.minutes()?t+"dddAh\u70b9\u6574":t+"dddAh\u70b9mm"},lastWeek:function(){var e,t;return e=br().startOf("week"),t=this.unix()<e.unix()?"[\u4e0a]":"[\u672c]",0===this.minutes()?t+"dddAh\u70b9\u6574":t+"dddAh\u70b9mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(\u65e5|\u6708|\u5468)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u5468";default:return e}},relativeTime:{future:"%s\u5185",past:"%s\u524d",s:"\u51e0\u79d2",m:"1 \u5206\u949f",mm:"%d \u5206\u949f",h:"1 \u5c0f\u65f6",hh:"%d \u5c0f\u65f6",d:"1 \u5929",dd:"%d \u5929",M:"1 \u4e2a\u6708",MM:"%d \u4e2a\u6708",y:"1 \u5e74",yy:"%d \u5e74"},week:{dow:1,doy:4}}),br.defineLocale("zh-tw",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"Ah\u9edemm\u5206",LTS:"Ah\u9edem\u5206s\u79d2",L:"YYYY\u5e74MMMD\u65e5",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5Ah\u9edemm\u5206",LLLL:"YYYY\u5e74MMMD\u65e5ddddAh\u9edemm\u5206",l:"YYYY\u5e74MMMD\u65e5",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5Ah\u9edemm\u5206",llll:"YYYY\u5e74MMMD\u65e5ddddAh\u9edemm\u5206"},meridiemParse:/\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,t){return 12===e&&(e=0),"\u65e9\u4e0a"===t||"\u4e0a\u5348"===t?e:"\u4e2d\u5348"===t?e>=11?e:e+12:"\u4e0b\u5348"===t||"\u665a\u4e0a"===t?e+12:void 0},meridiem:function(e,t,n){var i=100*e+t;return 900>i?"\u65e9\u4e0a":1130>i?"\u4e0a\u5348":1230>i?"\u4e2d\u5348":1800>i?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u9031";default:return e}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",m:"\u4e00\u5206\u9418",mm:"%d\u5206\u9418",h:"\u4e00\u5c0f\u6642",hh:"%d\u5c0f\u6642",d:"\u4e00\u5929",dd:"%d\u5929",M:"\u4e00\u500b\u6708",MM:"%d\u500b\u6708",y:"\u4e00\u5e74",yy:"%d\u5e74"}}),br);return hs.locale("en"),hs}),/*! version : 4.14.30
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
function(e){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],e);else if("object"==typeof exports)e(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";e(jQuery,moment)}}(function(e,t){"use strict";if(!t)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var n=function(n,i){var a,r,s,o,l,d={},u=t().startOf("d"),c=u.clone(),h=!0,p=!1,m=!1,f=0,_=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],g=["days","months","years","decades"],y=["top","bottom","auto"],v=["left","right","auto"],b=["default","top","bottom"],M={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},w={},L=function(e){if("string"!=typeof e||e.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(e){case"y":return-1!==s.indexOf("Y");case"M":return-1!==s.indexOf("M");case"d":return-1!==s.toLowerCase().indexOf("d");case"h":case"H":return-1!==s.toLowerCase().indexOf("h");case"m":return-1!==s.indexOf("m");case"s":return-1!==s.indexOf("s");default:return!1}},k=function(){return L("h")||L("m")||L("s")},Y=function(){return L("y")||L("M")||L("d")},D=function(){var t=e("<thead>").append(e("<tr>").append(e("<th>").addClass("prev").attr("data-action","previous").append(e("<span>").addClass(i.icons.previous))).append(e("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",i.calendarWeeks?"6":"5")).append(e("<th>").addClass("next").attr("data-action","next").append(e("<span>").addClass(i.icons.next)))),n=e("<tbody>").append(e("<tr>").append(e("<td>").attr("colspan",i.calendarWeeks?"8":"7")));return[e("<div>").addClass("datepicker-days").append(e("<table>").addClass("table-condensed").append(t).append(e("<tbody>"))),e("<div>").addClass("datepicker-months").append(e("<table>").addClass("table-condensed").append(t.clone()).append(n.clone())),e("<div>").addClass("datepicker-years").append(e("<table>").addClass("table-condensed").append(t.clone()).append(n.clone())),e("<div>").addClass("datepicker-decades").append(e("<table>").addClass("table-condensed").append(t.clone()).append(n.clone()))]},T=function(){var t=e("<tr>"),n=e("<tr>"),a=e("<tr>");return L("h")&&(t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Increment Hour"}).addClass("btn").attr("data-action","incrementHours").append(e("<span>").addClass(i.icons.up)))),n.append(e("<td>").append(e("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:"Pick Hour"}).attr("data-action","showHours"))),a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Decrement Hour"}).addClass("btn").attr("data-action","decrementHours").append(e("<span>").addClass(i.icons.down))))),L("m")&&(L("h")&&(t.append(e("<td>").addClass("separator")),n.append(e("<td>").addClass("separator").html(":")),a.append(e("<td>").addClass("separator"))),t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Increment Minute"}).addClass("btn").attr("data-action","incrementMinutes").append(e("<span>").addClass(i.icons.up)))),n.append(e("<td>").append(e("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:"Pick Minute"}).attr("data-action","showMinutes"))),a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Decrement Minute"}).addClass("btn").attr("data-action","decrementMinutes").append(e("<span>").addClass(i.icons.down))))),L("s")&&(L("m")&&(t.append(e("<td>").addClass("separator")),n.append(e("<td>").addClass("separator").html(":")),a.append(e("<td>").addClass("separator"))),t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Increment Second"}).addClass("btn").attr("data-action","incrementSeconds").append(e("<span>").addClass(i.icons.up)))),n.append(e("<td>").append(e("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:"Pick Second"}).attr("data-action","showSeconds"))),a.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:"Decrement Second"}).addClass("btn").attr("data-action","decrementSeconds").append(e("<span>").addClass(i.icons.down))))),r||(t.append(e("<td>").addClass("separator")),n.append(e("<td>").append(e("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:"Toggle Period"}))),a.append(e("<td>").addClass("separator"))),e("<div>").addClass("timepicker-picker").append(e("<table>").addClass("table-condensed").append([t,n,a]))},x=function(){var t=e("<div>").addClass("timepicker-hours").append(e("<table>").addClass("table-condensed")),n=e("<div>").addClass("timepicker-minutes").append(e("<table>").addClass("table-condensed")),i=e("<div>").addClass("timepicker-seconds").append(e("<table>").addClass("table-condensed")),a=[T()];return L("h")&&a.push(t),L("m")&&a.push(n),L("s")&&a.push(i),a},S=function(){var t=[];return i.showTodayButton&&t.push(e("<td>").append(e("<a>").attr({"data-action":"today",title:"Go to today"}).append(e("<span>").addClass(i.icons.today)))),!i.sideBySide&&Y()&&k()&&t.push(e("<td>").append(e("<a>").attr({"data-action":"togglePicker",title:"Select Time"}).append(e("<span>").addClass(i.icons.time)))),i.showClear&&t.push(e("<td>").append(e("<a>").attr({"data-action":"clear",title:"Clear selection"}).append(e("<span>").addClass(i.icons.clear)))),i.showClose&&t.push(e("<td>").append(e("<a>").attr({"data-action":"close",title:"Close the picker"}).append(e("<span>").addClass(i.icons.close)))),e("<table>").addClass("table-condensed").append(e("<tbody>").append(e("<tr>").append(t)))},C=function(){var t=e("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),n=e("<div>").addClass("datepicker").append(D()),a=e("<div>").addClass("timepicker").append(x()),s=e("<ul>").addClass("list-unstyled"),o=e("<li>").addClass("picker-switch"+(i.collapse?" accordion-toggle":"")).append(S());return i.inline&&t.removeClass("dropdown-menu"),r&&t.addClass("usetwentyfour"),L("s")&&!r&&t.addClass("wider"),i.sideBySide&&Y()&&k()?(t.addClass("timepicker-sbs"),t.append(e("<div>").addClass("row").append(n.addClass("col-sm-6")).append(a.addClass("col-sm-6"))),t.append(o),t):("top"===i.toolbarPlacement&&s.append(o),Y()&&s.append(e("<li>").addClass(i.collapse&&k()?"collapse in":"").append(n)),"default"===i.toolbarPlacement&&s.append(o),k()&&s.append(e("<li>").addClass(i.collapse&&Y()?"collapse":"").append(a)),"bottom"===i.toolbarPlacement&&s.append(o),t.append(s))},H=function(){var t,a={};return t=n.is("input")||i.inline?n.data():n.find("input").data(),t.dateOptions&&t.dateOptions instanceof Object&&(a=e.extend(!0,a,t.dateOptions)),e.each(i,function(e){var n="date"+e.charAt(0).toUpperCase()+e.slice(1);void 0!==t[n]&&(a[e]=t[n])}),a},j=function(){var t,a=(p||n).position(),r=(p||n).offset(),s=i.widgetPositioning.vertical,o=i.widgetPositioning.horizontal;if(i.widgetParent)t=i.widgetParent.append(m);else if(n.is("input"))t=n.after(m).parent();else{if(i.inline)return void(t=n.append(m));t=n,n.children().first().after(m)}if("auto"===s&&(s=r.top+1.5*m.height()>=e(window).height()+e(window).scrollTop()&&m.height()+n.outerHeight()<r.top?"top":"bottom"),"auto"===o&&(o=t.width()<r.left+m.outerWidth()/2&&r.left+m.outerWidth()>e(window).width()?"right":"left"),"top"===s?m.addClass("top").removeClass("bottom"):m.addClass("bottom").removeClass("top"),"right"===o?m.addClass("pull-right"):m.removeClass("pull-right"),"relative"!==t.css("position")&&(t=t.parents().filter(function(){return"relative"===e(this).css("position")}).first()),0===t.length)throw new Error("datetimepicker component should be placed within a relative positioned container");m.css({top:"top"===s?"auto":a.top+n.outerHeight(),bottom:"top"===s?a.top+n.outerHeight():"auto",left:"left"===o?t===n?0:a.left:"auto",right:"left"===o?"auto":t.outerWidth()-n.outerWidth()-(t===n?0:a.left)})},E=function(e){"dp.change"===e.type&&(e.date&&e.date.isSame(e.oldDate)||!e.date&&!e.oldDate)||n.trigger(e)},A=function(e){"y"===e&&(e="YYYY"),E({type:"dp.update",change:e,viewDate:c.clone()})},P=function(e){m&&(e&&(l=Math.max(f,Math.min(3,l+e))),m.find(".datepicker > div").hide().filter(".datepicker-"+_[l].clsName).show())},I=function(){var t=e("<tr>"),n=c.clone().startOf("w").startOf("d");for(i.calendarWeeks===!0&&t.append(e("<th>").addClass("cw").text("#"));n.isBefore(c.clone().endOf("w"));)t.append(e("<th>").addClass("dow").text(n.format("dd"))),n.add(1,"d");m.find(".datepicker-days thead").append(t)},W=function(e){return i.disabledDates[e.format("YYYY-MM-DD")]===!0},F=function(e){return i.enabledDates[e.format("YYYY-MM-DD")]===!0},N=function(e){return i.disabledHours[e.format("H")]===!0},O=function(e){return i.enabledHours[e.format("H")]===!0},$=function(t,n){if(!t.isValid())return!1;if(i.disabledDates&&"d"===n&&W(t))return!1;if(i.enabledDates&&"d"===n&&!F(t))return!1;if(i.minDate&&t.isBefore(i.minDate,n))return!1;if(i.maxDate&&t.isAfter(i.maxDate,n))return!1;if(i.daysOfWeekDisabled&&"d"===n&&-1!==i.daysOfWeekDisabled.indexOf(t.day()))return!1;if(i.disabledHours&&("h"===n||"m"===n||"s"===n)&&N(t))return!1;if(i.enabledHours&&("h"===n||"m"===n||"s"===n)&&!O(t))return!1;if(i.disabledTimeIntervals&&("h"===n||"m"===n||"s"===n)){var a=!1;if(e.each(i.disabledTimeIntervals,function(){return t.isBetween(this[0],this[1])?(a=!0,!1):void 0}),a)return!1}return!0},z=function(){for(var t=[],n=c.clone().startOf("y").startOf("d");n.isSame(c,"y");)t.push(e("<span>").attr("data-action","selectMonth").addClass("month").text(n.format("MMM"))),n.add(1,"M");m.find(".datepicker-months td").empty().append(t)},q=function(){var t=m.find(".datepicker-months"),n=t.find("th"),i=t.find("tbody").find("span");n.eq(0).find("span").attr("title","Previous Year"),n.eq(1).attr("title","Select Year"),n.eq(2).find("span").attr("title","Next Year"),t.find(".disabled").removeClass("disabled"),$(c.clone().subtract(1,"y"),"y")||n.eq(0).addClass("disabled"),n.eq(1).text(c.year()),$(c.clone().add(1,"y"),"y")||n.eq(2).addClass("disabled"),i.removeClass("active"),u.isSame(c,"y")&&!h&&i.eq(u.month()).addClass("active"),i.each(function(t){$(c.clone().month(t),"M")||e(this).addClass("disabled")})},R=function(){var e=m.find(".datepicker-years"),t=e.find("th"),n=c.clone().subtract(5,"y"),a=c.clone().add(6,"y"),r="";for(t.eq(0).find("span").attr("title","Previous Decade"),t.eq(1).attr("title","Select Decade"),t.eq(2).find("span").attr("title","Next Decade"),e.find(".disabled").removeClass("disabled"),i.minDate&&i.minDate.isAfter(n,"y")&&t.eq(0).addClass("disabled"),t.eq(1).text(n.year()+"-"+a.year()),i.maxDate&&i.maxDate.isBefore(a,"y")&&t.eq(2).addClass("disabled");!n.isAfter(a,"y");)r+='<span data-action="selectYear" class="year'+(n.isSame(u,"y")&&!h?" active":"")+($(n,"y")?"":" disabled")+'">'+n.year()+"</span>",n.add(1,"y");e.find("td").html(r)},B=function(){var e=m.find(".datepicker-decades"),n=e.find("th"),a=t(c.isBefore(t({y:1999}))?{y:1899}:{y:1999}),r=a.clone().add(100,"y"),s="";for(n.eq(0).find("span").attr("title","Previous Century"),n.eq(2).find("span").attr("title","Next Century"),e.find(".disabled").removeClass("disabled"),(a.isSame(t({y:1900}))||i.minDate&&i.minDate.isAfter(a,"y"))&&n.eq(0).addClass("disabled"),n.eq(1).text(a.year()+"-"+r.year()),(a.isSame(t({y:2e3}))||i.maxDate&&i.maxDate.isBefore(r,"y"))&&n.eq(2).addClass("disabled");!a.isAfter(r,"y");)s+='<span data-action="selectDecade" class="decade'+(a.isSame(u,"y")?" active":"")+($(a,"y")?"":" disabled")+'" data-selection="'+(a.year()+6)+'">'+(a.year()+1)+" - "+(a.year()+12)+"</span>",a.add(12,"y");s+="<span></span><span></span><span></span>",e.find("td").html(s)},U=function(){var n,a,r,s,o=m.find(".datepicker-days"),l=o.find("th"),d=[];if(Y()){for(l.eq(0).find("span").attr("title","Previous Month"),l.eq(1).attr("title","Select Month"),l.eq(2).find("span").attr("title","Next Month"),o.find(".disabled").removeClass("disabled"),l.eq(1).text(c.format(i.dayViewHeaderFormat)),$(c.clone().subtract(1,"M"),"M")||l.eq(0).addClass("disabled"),$(c.clone().add(1,"M"),"M")||l.eq(2).addClass("disabled"),n=c.clone().startOf("M").startOf("w").startOf("d"),s=0;42>s;s++)0===n.weekday()&&(a=e("<tr>"),i.calendarWeeks&&a.append('<td class="cw">'+n.week()+"</td>"),d.push(a)),r="",n.isBefore(c,"M")&&(r+=" old"),n.isAfter(c,"M")&&(r+=" new"),n.isSame(u,"d")&&!h&&(r+=" active"),$(n,"d")||(r+=" disabled"),n.isSame(t(),"d")&&(r+=" today"),(0===n.day()||6===n.day())&&(r+=" weekend"),a.append('<td data-action="selectDay" data-day="'+n.format("L")+'" class="day'+r+'">'+n.date()+"</td>"),n.add(1,"d");o.find("tbody").empty().append(d),q(),R(),B()}},J=function(){var t=m.find(".timepicker-hours table"),n=c.clone().startOf("d"),i=[],a=e("<tr>");for(c.hour()>11&&!r&&n.hour(12);n.isSame(c,"d")&&(r||c.hour()<12&&n.hour()<12||c.hour()>11);)n.hour()%4===0&&(a=e("<tr>"),i.push(a)),a.append('<td data-action="selectHour" class="hour'+($(n,"h")?"":" disabled")+'">'+n.format(r?"HH":"hh")+"</td>"),n.add(1,"h");t.empty().append(i)},G=function(){for(var t=m.find(".timepicker-minutes table"),n=c.clone().startOf("h"),a=[],r=e("<tr>"),s=1===i.stepping?5:i.stepping;c.isSame(n,"h");)n.minute()%(4*s)===0&&(r=e("<tr>"),a.push(r)),r.append('<td data-action="selectMinute" class="minute'+($(n,"m")?"":" disabled")+'">'+n.format("mm")+"</td>"),n.add(s,"m");t.empty().append(a)},V=function(){for(var t=m.find(".timepicker-seconds table"),n=c.clone().startOf("m"),i=[],a=e("<tr>");c.isSame(n,"m");)n.second()%20===0&&(a=e("<tr>"),i.push(a)),a.append('<td data-action="selectSecond" class="second'+($(n,"s")?"":" disabled")+'">'+n.format("ss")+"</td>"),n.add(5,"s");t.empty().append(i)},K=function(){var e,t,n=m.find(".timepicker span[data-time-component]");r||(e=m.find(".timepicker [data-action=togglePeriod]"),t=u.clone().add(u.hours()>=12?-12:12,"h"),e.text(u.format("A")),$(t,"h")?e.removeClass("disabled"):e.addClass("disabled")),n.filter("[data-time-component=hours]").text(u.format(r?"HH":"hh")),n.filter("[data-time-component=minutes]").text(u.format("mm")),n.filter("[data-time-component=seconds]").text(u.format("ss")),J(),G(),V()},Q=function(){m&&(U(),K())},X=function(e){var t=h?null:u;return e?(e=e.clone().locale(i.locale),1!==i.stepping&&e.minutes(Math.round(e.minutes()/i.stepping)*i.stepping%60).seconds(0),void($(e)?(u=e,c=u.clone(),a.val(u.format(s)),n.data("date",u.format(s)),h=!1,Q(),E({type:"dp.change",date:u.clone(),oldDate:t})):(i.keepInvalid||a.val(h?"":u.format(s)),E({type:"dp.error",date:e})))):(h=!0,a.val(""),n.data("date",""),E({type:"dp.change",date:!1,oldDate:t}),void Q())},Z=function(){var t=!1;return m?(m.find(".collapse").each(function(){var n=e(this).data("collapse");return n&&n.transitioning?(t=!0,!1):!0}),t?d:(p&&p.hasClass("btn")&&p.toggleClass("active"),m.hide(),e(window).off("resize",j),m.off("click","[data-action]"),m.off("mousedown",!1),m.remove(),m=!1,E({type:"dp.hide",date:u.clone()}),d)):d},ee=function(){X(null)},te={next:function(){var e=_[l].navFnc;c.add(_[l].navStep,e),U(),A(e)},previous:function(){var e=_[l].navFnc;c.subtract(_[l].navStep,e),U(),A(e)},pickerSwitch:function(){P(1)},selectMonth:function(t){var n=e(t.target).closest("tbody").find("span").index(e(t.target));c.month(n),l===f?(X(u.clone().year(c.year()).month(c.month())),i.inline||Z()):(P(-1),U()),A("M")},selectYear:function(t){var n=parseInt(e(t.target).text(),10)||0;c.year(n),l===f?(X(u.clone().year(c.year())),i.inline||Z()):(P(-1),U()),A("YYYY")},selectDecade:function(t){var n=parseInt(e(t.target).data("selection"),10)||0;c.year(n),l===f?(X(u.clone().year(c.year())),i.inline||Z()):(P(-1),U()),A("YYYY")},selectDay:function(t){var n=c.clone();e(t.target).is(".old")&&n.subtract(1,"M"),e(t.target).is(".new")&&n.add(1,"M"),X(n.date(parseInt(e(t.target).text(),10))),k()||i.keepOpen||i.inline||Z()},incrementHours:function(){var e=u.clone().add(1,"h");$(e,"h")&&X(e)},incrementMinutes:function(){var e=u.clone().add(i.stepping,"m");$(e,"m")&&X(e)},incrementSeconds:function(){var e=u.clone().add(1,"s");$(e,"s")&&X(e)},decrementHours:function(){var e=u.clone().subtract(1,"h");$(e,"h")&&X(e)},decrementMinutes:function(){var e=u.clone().subtract(i.stepping,"m");$(e,"m")&&X(e)},decrementSeconds:function(){var e=u.clone().subtract(1,"s");$(e,"s")&&X(e)},togglePeriod:function(){X(u.clone().add(u.hours()>=12?-12:12,"h"))},togglePicker:function(t){var n,a=e(t.target),r=a.closest("ul"),s=r.find(".in"),o=r.find(".collapse:not(.in)");if(s&&s.length){if(n=s.data("collapse"),n&&n.transitioning)return;s.collapse?(s.collapse("hide"),o.collapse("show")):(s.removeClass("in"),o.addClass("in")),a.is("span")?a.toggleClass(i.icons.time+" "+i.icons.date):a.find("span").toggleClass(i.icons.time+" "+i.icons.date)}},showPicker:function(){m.find(".timepicker > div:not(.timepicker-picker)").hide(),m.find(".timepicker .timepicker-picker").show()},showHours:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-hours").show()},showMinutes:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-seconds").show()},selectHour:function(t){var n=parseInt(e(t.target).text(),10);r||(u.hours()>=12?12!==n&&(n+=12):12===n&&(n=0)),X(u.clone().hours(n)),te.showPicker.call(d)},selectMinute:function(t){X(u.clone().minutes(parseInt(e(t.target).text(),10))),te.showPicker.call(d)},selectSecond:function(t){X(u.clone().seconds(parseInt(e(t.target).text(),10))),te.showPicker.call(d)},clear:ee,today:function(){$(t(),"d")&&X(t())},close:Z},ne=function(t){return e(t.currentTarget).is(".disabled")?!1:(te[e(t.currentTarget).data("action")].apply(d,arguments),!1)},ie=function(){var n,r={year:function(e){return e.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(e){return e.date(1).hours(0).seconds(0).minutes(0)},day:function(e){return e.hours(0).seconds(0).minutes(0)},hour:function(e){return e.seconds(0).minutes(0)},minute:function(e){return e.seconds(0)}};return a.prop("disabled")||!i.ignoreReadonly&&a.prop("readonly")||m?d:(void 0!==a.val()&&0!==a.val().trim().length?X(re(a.val().trim())):i.useCurrent&&h&&(a.is("input")&&0===a.val().trim().length||i.inline)&&(n=t(),"string"==typeof i.useCurrent&&(n=r[i.useCurrent](n)),X(n)),m=C(),I(),z(),m.find(".timepicker-hours").hide(),m.find(".timepicker-minutes").hide(),m.find(".timepicker-seconds").hide(),Q(),P(),e(window).on("resize",j),m.on("click","[data-action]",ne),m.on("mousedown",!1),p&&p.hasClass("btn")&&p.toggleClass("active"),m.show(),j(),i.focusOnShow&&!a.is(":focus")&&a.focus(),E({type:"dp.show"}),d)},ae=function(){return m?Z():ie()},re=function(e){return e=void 0===i.parseInputDate?t.isMoment(e)||e instanceof Date?t(e):t(e,o,i.useStrict):i.parseInputDate(e),e.locale(i.locale),e},se=function(e){var t,n,a,r,s=null,o=[],l={},u=e.which,c="p";w[u]=c;for(t in w)w.hasOwnProperty(t)&&w[t]===c&&(o.push(t),parseInt(t,10)!==u&&(l[t]=!0));for(t in i.keyBinds)if(i.keyBinds.hasOwnProperty(t)&&"function"==typeof i.keyBinds[t]&&(a=t.split(" "),a.length===o.length&&M[u]===a[a.length-1])){for(r=!0,n=a.length-2;n>=0;n--)if(!(M[a[n]]in l)){r=!1;break}if(r){s=i.keyBinds[t];break}}s&&(s.call(d,m),e.stopPropagation(),e.preventDefault())},oe=function(e){w[e.which]="r",e.stopPropagation(),e.preventDefault()},le=function(t){var n=e(t.target).val().trim(),i=n?re(n):null;return X(i),t.stopImmediatePropagation(),!1},de=function(){a.on({change:le,blur:i.debug?"":Z,keydown:se,keyup:oe,focus:i.allowInputToggle?ie:""}),n.is("input")?a.on({focus:ie}):p&&(p.on("click",ae),p.on("mousedown",!1))},ue=function(){a.off({change:le,blur:Z,keydown:se,keyup:oe,focus:i.allowInputToggle?Z:""}),n.is("input")?a.off({focus:ie}):p&&(p.off("click",ae),p.off("mousedown",!1))},ce=function(t){var n={};return e.each(t,function(){var e=re(this);e.isValid()&&(n[e.format("YYYY-MM-DD")]=!0)}),Object.keys(n).length?n:!1},he=function(t){var n={};return e.each(t,function(){n[this]=!0}),Object.keys(n).length?n:!1},pe=function(){var e=i.format||"L LT";s=e.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(e){var t=u.localeData().longDateFormat(e)||e;return t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(e){return u.localeData().longDateFormat(e)||e})}),o=i.extraFormats?i.extraFormats.slice():[],o.indexOf(e)<0&&o.indexOf(s)<0&&o.push(s),r=s.toLowerCase().indexOf("a")<1&&s.replace(/\[.*?\]/g,"").indexOf("h")<1,L("y")&&(f=2),L("M")&&(f=1),L("d")&&(f=0),l=Math.max(f,l),h||X(u)};if(d.destroy=function(){Z(),ue(),n.removeData("DateTimePicker"),n.removeData("date")},d.toggle=ae,d.show=ie,d.hide=Z,d.disable=function(){return Z(),p&&p.hasClass("btn")&&p.addClass("disabled"),a.prop("disabled",!0),d},d.enable=function(){return p&&p.hasClass("btn")&&p.removeClass("disabled"),a.prop("disabled",!1),d},d.ignoreReadonly=function(e){if(0===arguments.length)return i.ignoreReadonly;if("boolean"!=typeof e)throw new TypeError("ignoreReadonly () expects a boolean parameter");return i.ignoreReadonly=e,d},d.options=function(t){if(0===arguments.length)return e.extend(!0,{},i);if(!(t instanceof Object))throw new TypeError("options() options parameter should be an object");return e.extend(!0,i,t),e.each(i,function(e,t){if(void 0===d[e])throw new TypeError("option "+e+" is not recognized!");d[e](t)}),d},d.date=function(e){if(0===arguments.length)return h?null:u.clone();if(!(null===e||"string"==typeof e||t.isMoment(e)||e instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return X(null===e?null:re(e)),d},d.format=function(e){if(0===arguments.length)return i.format;if("string"!=typeof e&&("boolean"!=typeof e||e!==!1))throw new TypeError("format() expects a sting or boolean:false parameter "+e);return i.format=e,s&&pe(),d},d.dayViewHeaderFormat=function(e){if(0===arguments.length)return i.dayViewHeaderFormat;if("string"!=typeof e)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return i.dayViewHeaderFormat=e,d},d.extraFormats=function(e){if(0===arguments.length)return i.extraFormats;if(e!==!1&&!(e instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return i.extraFormats=e,o&&pe(),d},d.disabledDates=function(t){if(0===arguments.length)return i.disabledDates?e.extend({},i.disabledDates):i.disabledDates;if(!t)return i.disabledDates=!1,Q(),d;if(!(t instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return i.disabledDates=ce(t),i.enabledDates=!1,Q(),d},d.enabledDates=function(t){if(0===arguments.length)return i.enabledDates?e.extend({},i.enabledDates):i.enabledDates;if(!t)return i.enabledDates=!1,Q(),d;if(!(t instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return i.enabledDates=ce(t),i.disabledDates=!1,Q(),d},d.daysOfWeekDisabled=function(e){if(0===arguments.length)return i.daysOfWeekDisabled.splice(0);if("boolean"==typeof e&&!e)return i.daysOfWeekDisabled=!1,Q(),d;if(!(e instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(i.daysOfWeekDisabled=e.reduce(function(e,t){return t=parseInt(t,10),t>6||0>t||isNaN(t)?e:(-1===e.indexOf(t)&&e.push(t),e)},[]).sort(),i.useCurrent&&!i.keepInvalid){for(var t=0;!$(u,"d");){if(u.add(1,"d"),7===t)throw"Tried 7 times to find a valid date";t++}X(u)}return Q(),d},d.maxDate=function(e){if(0===arguments.length)return i.maxDate?i.maxDate.clone():i.maxDate;if("boolean"==typeof e&&e===!1)return i.maxDate=!1,Q(),d;"string"==typeof e&&("now"===e||"moment"===e)&&(e=t());var n=re(e);if(!n.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+e);if(i.minDate&&n.isBefore(i.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+n.format(s));return i.maxDate=n,i.useCurrent&&!i.keepInvalid&&u.isAfter(e)&&X(i.maxDate),c.isAfter(n)&&(c=n.clone()),Q(),d},d.minDate=function(e){if(0===arguments.length)return i.minDate?i.minDate.clone():i.minDate;if("boolean"==typeof e&&e===!1)return i.minDate=!1,Q(),d;"string"==typeof e&&("now"===e||"moment"===e)&&(e=t());var n=re(e);if(!n.isValid())throw new TypeError("minDate() Could not parse date parameter: "+e);if(i.maxDate&&n.isAfter(i.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+n.format(s));return i.minDate=n,i.useCurrent&&!i.keepInvalid&&u.isBefore(e)&&X(i.minDate),c.isBefore(n)&&(c=n.clone()),Q(),d},d.defaultDate=function(e){if(0===arguments.length)return i.defaultDate?i.defaultDate.clone():i.defaultDate;if(!e)return i.defaultDate=!1,d;"string"==typeof e&&("now"===e||"moment"===e)&&(e=t());var n=re(e);if(!n.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+e);if(!$(n))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return i.defaultDate=n,(i.defaultDate&&i.inline||""===a.val().trim()&&void 0===a.attr("placeholder"))&&X(i.defaultDate),d},d.locale=function(e){if(0===arguments.length)return i.locale;if(!t.localeData(e))throw new TypeError("locale() locale "+e+" is not loaded from moment locales!");return i.locale=e,u.locale(i.locale),c.locale(i.locale),s&&pe(),m&&(Z(),ie()),d},d.stepping=function(e){return 0===arguments.length?i.stepping:(e=parseInt(e,10),(isNaN(e)||1>e)&&(e=1),i.stepping=e,d)},d.useCurrent=function(e){var t=["year","month","day","hour","minute"];if(0===arguments.length)return i.useCurrent;if("boolean"!=typeof e&&"string"!=typeof e)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof e&&-1===t.indexOf(e.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of "+t.join(", "));return i.useCurrent=e,d},d.collapse=function(e){if(0===arguments.length)return i.collapse;if("boolean"!=typeof e)throw new TypeError("collapse() expects a boolean parameter");return i.collapse===e?d:(i.collapse=e,m&&(Z(),ie()),d)},d.icons=function(t){if(0===arguments.length)return e.extend({},i.icons);if(!(t instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return e.extend(i.icons,t),m&&(Z(),ie()),d},d.useStrict=function(e){if(0===arguments.length)return i.useStrict;if("boolean"!=typeof e)throw new TypeError("useStrict() expects a boolean parameter");return i.useStrict=e,d},d.sideBySide=function(e){if(0===arguments.length)return i.sideBySide;if("boolean"!=typeof e)throw new TypeError("sideBySide() expects a boolean parameter");return i.sideBySide=e,m&&(Z(),ie()),d},d.viewMode=function(e){if(0===arguments.length)return i.viewMode;if("string"!=typeof e)throw new TypeError("viewMode() expects a string parameter");if(-1===g.indexOf(e))throw new TypeError("viewMode() parameter must be one of ("+g.join(", ")+") value");return i.viewMode=e,l=Math.max(g.indexOf(e),f),P(),d},d.toolbarPlacement=function(e){if(0===arguments.length)return i.toolbarPlacement;if("string"!=typeof e)throw new TypeError("toolbarPlacement() expects a string parameter");if(-1===b.indexOf(e))throw new TypeError("toolbarPlacement() parameter must be one of ("+b.join(", ")+") value");return i.toolbarPlacement=e,m&&(Z(),ie()),d},d.widgetPositioning=function(t){if(0===arguments.length)return e.extend({},i.widgetPositioning);if("[object Object]"!=={}.toString.call(t))throw new TypeError("widgetPositioning() expects an object variable");if(t.horizontal){if("string"!=typeof t.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(t.horizontal=t.horizontal.toLowerCase(),-1===v.indexOf(t.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+v.join(", ")+")");i.widgetPositioning.horizontal=t.horizontal}if(t.vertical){if("string"!=typeof t.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(t.vertical=t.vertical.toLowerCase(),-1===y.indexOf(t.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+y.join(", ")+")");i.widgetPositioning.vertical=t.vertical}return Q(),d},d.calendarWeeks=function(e){if(0===arguments.length)return i.calendarWeeks;if("boolean"!=typeof e)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return i.calendarWeeks=e,Q(),d},d.showTodayButton=function(e){if(0===arguments.length)return i.showTodayButton;if("boolean"!=typeof e)throw new TypeError("showTodayButton() expects a boolean parameter");return i.showTodayButton=e,m&&(Z(),ie()),d},d.showClear=function(e){if(0===arguments.length)return i.showClear;if("boolean"!=typeof e)throw new TypeError("showClear() expects a boolean parameter");return i.showClear=e,m&&(Z(),ie()),d},d.widgetParent=function(t){if(0===arguments.length)return i.widgetParent;if("string"==typeof t&&(t=e(t)),null!==t&&"string"!=typeof t&&!(t instanceof e))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return i.widgetParent=t,m&&(Z(),ie()),d},d.keepOpen=function(e){if(0===arguments.length)return i.keepOpen;if("boolean"!=typeof e)throw new TypeError("keepOpen() expects a boolean parameter");return i.keepOpen=e,d},d.focusOnShow=function(e){if(0===arguments.length)return i.focusOnShow;if("boolean"!=typeof e)throw new TypeError("focusOnShow() expects a boolean parameter");return i.focusOnShow=e,d},d.inline=function(e){if(0===arguments.length)return i.inline;if("boolean"!=typeof e)throw new TypeError("inline() expects a boolean parameter");return i.inline=e,d},d.clear=function(){return ee(),d},d.keyBinds=function(e){return i.keyBinds=e,d},d.debug=function(e){if("boolean"!=typeof e)throw new TypeError("debug() expects a boolean parameter");return i.debug=e,d},d.allowInputToggle=function(e){if(0===arguments.length)return i.allowInputToggle;if("boolean"!=typeof e)throw new TypeError("allowInputToggle() expects a boolean parameter");return i.allowInputToggle=e,d},d.showClose=function(e){if(0===arguments.length)return i.showClose;if("boolean"!=typeof e)throw new TypeError("showClose() expects a boolean parameter");return i.showClose=e,d},d.keepInvalid=function(e){if(0===arguments.length)return i.keepInvalid;if("boolean"!=typeof e)throw new TypeError("keepInvalid() expects a boolean parameter");return i.keepInvalid=e,d},d.datepickerInput=function(e){if(0===arguments.length)return i.datepickerInput;if("string"!=typeof e)throw new TypeError("datepickerInput() expects a string parameter");return i.datepickerInput=e,d},d.parseInputDate=function(e){if(0===arguments.length)return i.parseInputDate;if("function"!=typeof e)throw new TypeError("parseInputDate() sholud be as function");return i.parseInputDate=e,d},d.disabledTimeIntervals=function(t){if(0===arguments.length)return i.disabledTimeIntervals?e.extend({},i.disabledTimeIntervals):i.disabledTimeIntervals;if(!t)return i.disabledTimeIntervals=!1,Q(),d;if(!(t instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return i.disabledTimeIntervals=t,Q(),d},d.disabledHours=function(t){if(0===arguments.length)return i.disabledHours?e.extend({},i.disabledHours):i.disabledHours;if(!t)return i.disabledHours=!1,Q(),d;if(!(t instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(i.disabledHours=he(t),i.enabledHours=!1,i.useCurrent&&!i.keepInvalid){for(var n=0;!$(u,"h");){if(u.add(1,"h"),24===n)throw"Tried 24 times to find a valid date";n++}X(u)}return Q(),d},d.enabledHours=function(t){if(0===arguments.length)return i.enabledHours?e.extend({},i.enabledHours):i.enabledHours;if(!t)return i.enabledHours=!1,Q(),d;if(!(t instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(i.enabledHours=he(t),i.disabledHours=!1,i.useCurrent&&!i.keepInvalid){for(var n=0;!$(u,"h");){if(u.add(1,"h"),24===n)throw"Tried 24 times to find a valid date";n++}X(u)}return Q(),d},d.viewDate=function(e){if(0===arguments.length)return c.clone();if(!e)return c=u.clone(),d;if(!("string"==typeof e||t.isMoment(e)||e instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return c=re(e),A(),d},n.is("input"))a=n;else if(a=n.find(i.datepickerInput),0===a.size())a=n.find("input");else if(!a.is("input"))throw new Error('CSS class "'+i.datepickerInput+'" cannot be applied to non input element');if(n.hasClass("input-group")&&(p=0===n.find(".datepickerbutton").size()?n.find('[class^="input-group-"]'):n.find(".datepickerbutton")),
!i.inline&&!a.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return e.extend(!0,i,H()),d.options(i),pe(),de(),a.prop("disabled")&&d.disable(),a.is("input")&&0!==a.val().trim().length?X(re(a.val().trim())):i.defaultDate&&void 0===a.attr("placeholder")&&X(i.defaultDate),i.inline&&ie(),d};e.fn.datetimepicker=function(t){return this.each(function(){var i=e(this);i.data("DateTimePicker")||(t=e.extend(!0,{},e.fn.datetimepicker.defaults,t),i.data("DateTimePicker",n(i,t)))})},e.fn.datetimepicker.defaults={format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:t.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")?this.date(n.clone().subtract(7,"d")):this.date(n.clone().add(1,"m"))}},down:function(e){if(!e)return void this.show();var n=this.date()||t();e.find(".datepicker").is(":visible")?this.date(n.clone().add(7,"d")):this.date(n.clone().subtract(1,"m"))},"control up":function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")?this.date(n.clone().subtract(1,"y")):this.date(n.clone().add(1,"h"))}},"control down":function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")?this.date(n.clone().add(1,"y")):this.date(n.clone().subtract(1,"h"))}},left:function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")&&this.date(n.clone().subtract(1,"d"))}},right:function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")&&this.date(n.clone().add(1,"d"))}},pageUp:function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")&&this.date(n.clone().subtract(1,"M"))}},pageDown:function(e){if(e){var n=this.date()||t();e.find(".datepicker").is(":visible")&&this.date(n.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(e){e.find(".timepicker").is(":visible")&&e.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(t())},"delete":function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1}}),function(e){var t=function(){var t=65,n='<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',i={eventName:"click",onShow:function(){},onBeforeShow:function(){},onHide:function(){},onChange:function(){},onSubmit:function(){},color:"ff0000",livePreview:!0,flat:!1},a=function(t,n){var i=W(t);e(n).data("colorpicker").fields.eq(1).val(i.r).end().eq(2).val(i.g).end().eq(3).val(i.b).end()},r=function(t,n){e(n).data("colorpicker").fields.eq(4).val(t.h).end().eq(5).val(t.s).end().eq(6).val(t.b).end()},s=function(t,n){e(n).data("colorpicker").fields.eq(0).val(N(t)).end()},o=function(t,n){e(n).data("colorpicker").selector.css("backgroundColor","#"+N({h:t.h,s:100,b:100})),e(n).data("colorpicker").selectorIndic.css({left:parseInt(150*t.s/100,10),top:parseInt(150*(100-t.b)/100,10)})},l=function(t,n){e(n).data("colorpicker").hue.css("top",parseInt(150-150*t.h/360,10))},d=function(t,n){e(n).data("colorpicker").currentColor.css("backgroundColor","#"+N(t))},u=function(t,n){e(n).data("colorpicker").newColor.css("backgroundColor","#"+N(t))},c=function(n){var i=n.charCode||n.keyCode||-1;if(i>t&&90>=i||32==i)return!1;var a=e(this).parent().parent();a.data("colorpicker").livePreview===!0&&h.apply(this)},h=function(t){var n,i=e(this).parent().parent();this.parentNode.className.indexOf("_hex")>0?i.data("colorpicker").color=n=P(E(this.value)):this.parentNode.className.indexOf("_hsb")>0?i.data("colorpicker").color=n=H({h:parseInt(i.data("colorpicker").fields.eq(4).val(),10),s:parseInt(i.data("colorpicker").fields.eq(5).val(),10),b:parseInt(i.data("colorpicker").fields.eq(6).val(),10)}):i.data("colorpicker").color=n=I(j({r:parseInt(i.data("colorpicker").fields.eq(1).val(),10),g:parseInt(i.data("colorpicker").fields.eq(2).val(),10),b:parseInt(i.data("colorpicker").fields.eq(3).val(),10)})),t&&(a(n,i.get(0)),s(n,i.get(0)),r(n,i.get(0))),o(n,i.get(0)),l(n,i.get(0)),u(n,i.get(0)),i.data("colorpicker").onChange.apply(i,[n,N(n),W(n)])},p=function(t){var n=e(this).parent().parent();n.data("colorpicker").fields.parent().removeClass("colorpicker_focus")},m=function(){t=this.parentNode.className.indexOf("_hex")>0?70:65,e(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"),e(this).parent().addClass("colorpicker_focus")},f=function(t){var n=e(this).parent().find("input").focus(),i={el:e(this).parent().addClass("colorpicker_slider"),max:this.parentNode.className.indexOf("_hsb_h")>0?360:this.parentNode.className.indexOf("_hsb")>0?100:255,y:t.pageY,field:n,val:parseInt(n.val(),10),preview:e(this).parent().parent().data("colorpicker").livePreview};e(document).bind("mouseup",i,g),e(document).bind("mousemove",i,_)},_=function(e){return e.data.field.val(Math.max(0,Math.min(e.data.max,parseInt(e.data.val+e.pageY-e.data.y,10)))),e.data.preview&&h.apply(e.data.field.get(0),[!0]),!1},g=function(t){return h.apply(t.data.field.get(0),[!0]),t.data.el.removeClass("colorpicker_slider").find("input").focus(),e(document).unbind("mouseup",g),e(document).unbind("mousemove",_),!1},y=function(t){var n={cal:e(this).parent(),y:e(this).offset().top};n.preview=n.cal.data("colorpicker").livePreview,e(document).bind("mouseup",n,b),e(document).bind("mousemove",n,v)},v=function(e){return h.apply(e.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360*(150-Math.max(0,Math.min(150,e.pageY-e.data.y)))/150,10)).get(0),[e.data.preview]),!1},b=function(t){return a(t.data.cal.data("colorpicker").color,t.data.cal.get(0)),s(t.data.cal.data("colorpicker").color,t.data.cal.get(0)),e(document).unbind("mouseup",b),e(document).unbind("mousemove",v),!1},M=function(t){var n={cal:e(this).parent(),pos:e(this).offset()};n.preview=n.cal.data("colorpicker").livePreview,e(document).bind("mouseup",n,L),e(document).bind("mousemove",n,w)},w=function(e){return h.apply(e.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100*(150-Math.max(0,Math.min(150,e.pageY-e.data.pos.top)))/150,10)).end().eq(5).val(parseInt(100*Math.max(0,Math.min(150,e.pageX-e.data.pos.left))/150,10)).get(0),[e.data.preview]),!1},L=function(t){return a(t.data.cal.data("colorpicker").color,t.data.cal.get(0)),s(t.data.cal.data("colorpicker").color,t.data.cal.get(0)),e(document).unbind("mouseup",L),e(document).unbind("mousemove",w),!1},k=function(t){e(this).addClass("colorpicker_focus")},Y=function(t){e(this).removeClass("colorpicker_focus")},D=function(t){var n=e(this).parent(),i=n.data("colorpicker").color;n.data("colorpicker").origColor=i,d(i,n.get(0)),n.data("colorpicker").onSubmit(i,N(i),W(i),n.data("colorpicker").el)},T=function(t){var n=e("#"+e(this).data("colorpickerId"));n.data("colorpicker").onBeforeShow.apply(this,[n.get(0)]);var i=e(this).offset(),a=C(),r=i.top+this.offsetHeight,s=i.left;return r+176>a.t+a.h&&(r-=this.offsetHeight+176),s+356>a.l+a.w&&(s-=356),n.css({left:s+"px",top:r+"px"}),0!=n.data("colorpicker").onShow.apply(this,[n.get(0)])&&n.show(),e(document).bind("mousedown",{cal:n},x),!1},x=function(t){S(t.data.cal.get(0),t.target,t.data.cal.get(0))||(0!=t.data.cal.data("colorpicker").onHide.apply(this,[t.data.cal.get(0)])&&t.data.cal.hide(),e(document).unbind("mousedown",x))},S=function(e,t,n){if(e==t)return!0;if(e.contains)return e.contains(t);if(e.compareDocumentPosition)return!!(16&e.compareDocumentPosition(t));for(var i=t.parentNode;i&&i!=n;){if(i==e)return!0;i=i.parentNode}return!1},C=function(){var e="CSS1Compat"==document.compatMode;return{l:window.pageXOffset||(e?document.documentElement.scrollLeft:document.body.scrollLeft),t:window.pageYOffset||(e?document.documentElement.scrollTop:document.body.scrollTop),w:window.innerWidth||(e?document.documentElement.clientWidth:document.body.clientWidth),h:window.innerHeight||(e?document.documentElement.clientHeight:document.body.clientHeight)}},H=function(e){return{h:Math.min(360,Math.max(0,e.h)),s:Math.min(100,Math.max(0,e.s)),b:Math.min(100,Math.max(0,e.b))}},j=function(e){return{r:Math.min(255,Math.max(0,e.r)),g:Math.min(255,Math.max(0,e.g)),b:Math.min(255,Math.max(0,e.b))}},E=function(e){var t=6-e.length;if(t>0){for(var n=[],i=0;t>i;i++)n.push("0");n.push(e),e=n.join("")}return e},A=function(e){var e=parseInt(e.indexOf("#")>-1?e.substring(1):e,16);return{r:e>>16,g:(65280&e)>>8,b:255&e}},P=function(e){return I(A(e))},I=function(e){var t={h:0,s:0,b:0},n=Math.min(e.r,e.g,e.b),i=Math.max(e.r,e.g,e.b),a=i-n;return t.b=i,t.s=0!=i?255*a/i:0,0!=t.s?e.r==i?t.h=(e.g-e.b)/a:e.g==i?t.h=2+(e.b-e.r)/a:t.h=4+(e.r-e.g)/a:t.h=-1,t.h*=60,t.h<0&&(t.h+=360),t.s*=100/255,t.b*=100/255,t},W=function(e){var t={},n=Math.round(e.h),i=Math.round(255*e.s/100),a=Math.round(255*e.b/100);if(0==i)t.r=t.g=t.b=a;else{var r=a,s=(255-i)*a/255,o=(r-s)*(n%60)/60;360==n&&(n=0),60>n?(t.r=r,t.b=s,t.g=s+o):120>n?(t.g=r,t.b=s,t.r=r-o):180>n?(t.g=r,t.r=s,t.b=s+o):240>n?(t.b=r,t.r=s,t.g=r-o):300>n?(t.b=r,t.g=s,t.r=s+o):360>n?(t.r=r,t.g=s,t.b=r-o):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b)}},F=function(t){var n=[t.r.toString(16),t.g.toString(16),t.b.toString(16)];return e.each(n,function(e,t){1==t.length&&(n[e]="0"+t)}),n.join("")},N=function(e){return F(W(e))},O=function(){var t=e(this).parent(),n=t.data("colorpicker").origColor;t.data("colorpicker").color=n,a(n,t.get(0)),s(n,t.get(0)),r(n,t.get(0)),o(n,t.get(0)),l(n,t.get(0)),u(n,t.get(0))};return{init:function(t){if(t=e.extend({},i,t||{}),"string"==typeof t.color)t.color=P(t.color);else if(void 0!=t.color.r&&void 0!=t.color.g&&void 0!=t.color.b)t.color=I(t.color);else{if(void 0==t.color.h||void 0==t.color.s||void 0==t.color.b)return this;t.color=H(t.color)}return this.each(function(){if(!e(this).data("colorpickerId")){var i=e.extend({},t);i.origColor=t.color;var _="collorpicker_"+parseInt(1e3*Math.random());e(this).data("colorpickerId",_);var g=e(n).attr("id",_);i.flat?g.appendTo(this).show():g.appendTo(document.body),i.fields=g.find("input").bind("keyup",c).bind("change",h).bind("blur",p).bind("focus",m),g.find("span").bind("mousedown",f).end().find(">div.colorpicker_current_color").bind("click",O),i.selector=g.find("div.colorpicker_color").bind("mousedown",M),i.selectorIndic=i.selector.find("div div"),i.el=this,i.hue=g.find("div.colorpicker_hue div"),g.find("div.colorpicker_hue").bind("mousedown",y),i.newColor=g.find("div.colorpicker_new_color"),i.currentColor=g.find("div.colorpicker_current_color"),g.data("colorpicker",i),g.find("div.colorpicker_submit").bind("mouseenter",k).bind("mouseleave",Y).bind("click",D),a(i.color,g.get(0)),r(i.color,g.get(0)),s(i.color,g.get(0)),l(i.color,g.get(0)),o(i.color,g.get(0)),d(i.color,g.get(0)),u(i.color,g.get(0)),i.flat?g.css({position:"relative",display:"block"}):e(this).bind(i.eventName,T)}})},showPicker:function(){return this.each(function(){e(this).data("colorpickerId")&&T.apply(this)})},hidePicker:function(){return this.each(function(){e(this).data("colorpickerId")&&e("#"+e(this).data("colorpickerId")).hide()})},setColor:function(t){if("string"==typeof t)t=P(t);else if(void 0!=t.r&&void 0!=t.g&&void 0!=t.b)t=I(t);else{if(void 0==t.h||void 0==t.s||void 0==t.b)return this;t=H(t)}return this.each(function(){if(e(this).data("colorpickerId")){var n=e("#"+e(this).data("colorpickerId"));n.data("colorpicker").color=t,n.data("colorpicker").origColor=t,a(t,n.get(0)),r(t,n.get(0)),s(t,n.get(0)),l(t,n.get(0)),o(t,n.get(0)),d(t,n.get(0)),u(t,n.get(0))}})}}}();e.fn.extend({ColorPicker:t.init,ColorPickerHide:t.hidePicker,ColorPickerShow:t.showPicker,ColorPickerSetColor:t.setColor})}(jQuery),function(e){var t;e.filters=t={append:function(t){t=t||{};var n=t.label,i=t.name,a=t.type,r=t.value,s=t.operator,o=t.select_options,l=t.index,d="f["+i+"]["+l+"][v]",u="f["+i+"]["+l+"][o]",c=null,h=null;switch(a){case"boolean":var c='<select class="input-sm form-control" name="'+d+'"><option value="_discard">...</option><option value="true"'+("true"==r?'selected="selected"':"")+">"+RailsAdmin.I18n.t("true")+'</option><option value="false"'+("false"==r?'selected="selected"':"")+">"+RailsAdmin.I18n.t("false")+'</option><option disabled="disabled">---------</option><option '+("_present"==r?'selected="selected"':"")+' value="_present">'+RailsAdmin.I18n.t("is_present")+"</option><option "+("_blank"==r?'selected="selected"':"")+' value="_blank"  >'+RailsAdmin.I18n.t("is_blank")+"</option></select>";break;case"date":h='<input size="20" class="date additional-fieldset default input-sm form-control" style="display:'+(s&&"default"!=s?"none":"inline-block")+';" type="text" name="'+d+'[]" value="'+(r[0]||"")+'" /> <input size="20" placeholder="-\u221e" class="date additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="text" name="'+d+'[]" value="'+(r[1]||"")+'" /> <input size="20" placeholder="\u221e" class="date additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="text" name="'+d+'[]" value="'+(r[2]||"")+'" />';case"datetime":case"timestamp":c=c||'<select class="switch-additionnal-fieldsets input-sm form-control" name="'+u+'"><option '+("default"==s?'selected="selected"':"")+' data-additional-fieldset="default" value="default">'+RailsAdmin.I18n.t("date")+"</option><option "+("between"==s?'selected="selected"':"")+' data-additional-fieldset="between" value="between">'+RailsAdmin.I18n.t("between_and_")+"</option><option "+("today"==s?'selected="selected"':"")+' value="today">'+RailsAdmin.I18n.t("today")+"</option><option "+("yesterday"==s?'selected="selected"':"")+' value="yesterday">'+RailsAdmin.I18n.t("yesterday")+"</option><option "+("this_week"==s?'selected="selected"':"")+' value="this_week">'+RailsAdmin.I18n.t("this_week")+"</option><option "+("last_week"==s?'selected="selected"':"")+' value="last_week">'+RailsAdmin.I18n.t("last_week")+'</option><option disabled="disabled">---------</option><option '+("_not_null"==s?'selected="selected"':"")+' value="_not_null">'+RailsAdmin.I18n.t("is_present")+"</option><option "+("_null"==s?'selected="selected"':"")+' value="_null" >'+RailsAdmin.I18n.t("is_blank")+"</option></select>",h=h||'<input size="25" class="datetime additional-fieldset default input-sm form-control" style="display:'+(s&&"default"!=s?"none":"inline-block")+';" type="text" name="'+d+'[]" value="'+(r[0]||"")+'" /> <input size="25" placeholder="-\u221e" class="datetime additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="text" name="'+d+'[]" value="'+(r[1]||"")+'" /> <input size="25" placeholder="\u221e" class="datetime additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="text" name="'+d+'[]" value="'+(r[2]||"")+'" />';break;case"enum":var p=r instanceof Array?!0:!1;c='<select style="display:'+(p?"none":"inline-block")+'" '+(p?"":'name="'+d+'"')+' data-name="'+d+'" class="select-single input-sm form-control"><option value="_discard">...</option><option '+("_present"==r?'selected="selected"':"")+' value="_present">'+RailsAdmin.I18n.t("is_present")+"</option><option "+("_blank"==r?'selected="selected"':"")+' value="_blank">'+RailsAdmin.I18n.t("is_blank")+'</option><option disabled="disabled">---------</option>'+o+'</select><select multiple="multiple" style="display:'+(p?"inline-block":"none")+'" '+(p?'name="'+d+'[]"':"")+' data-name="'+d+'[]" class="select-multiple input-sm form-control">'+o+'</select> <a href="#" class="switch-select"><i class="icon-'+(p?"minus":"plus")+'"></i></a>';break;case"string":case"text":case"belongs_to_association":c='<select class="switch-additionnal-fieldsets input-sm form-control" value="'+s+'" name="'+u+'"><option data-additional-fieldset="additional-fieldset"'+("like"==s?'selected="selected"':"")+' value="like">'+RailsAdmin.I18n.t("contains")+'</option><option data-additional-fieldset="additional-fieldset"'+("is"==s?'selected="selected"':"")+' value="is">'+RailsAdmin.I18n.t("is_exactly")+'</option><option data-additional-fieldset="additional-fieldset"'+("starts_with"==s?'selected="selected"':"")+' value="starts_with">'+RailsAdmin.I18n.t("starts_with")+'</option><option data-additional-fieldset="additional-fieldset"'+("ends_with"==s?'selected="selected"':"")+' value="ends_with">'+RailsAdmin.I18n.t("ends_with")+'</option><option disabled="disabled">---------</option><option '+("_not_null"==s?'selected="selected"':"")+' value="_not_null">'+RailsAdmin.I18n.t("is_present")+"</option><option "+("_null"==s?'selected="selected"':"")+' value="_null">'+RailsAdmin.I18n.t("is_blank")+"</option></select>",h='<input class="additional-fieldset input-sm form-control" style="display:'+("_blank"==s||"_present"==s?"none":"inline-block")+';" type="text" name="'+d+'" value="'+r+'" /> ';break;case"integer":case"decimal":case"float":c='<select class="switch-additionnal-fieldsets input-sm form-control" name="'+u+'"><option '+("default"==s?'selected="selected"':"")+' data-additional-fieldset="default" value="default">'+RailsAdmin.I18n.t("number")+"</option><option "+("between"==s?'selected="selected"':"")+' data-additional-fieldset="between" value="between">'+RailsAdmin.I18n.t("between_and_")+'</option><option disabled="disabled">---------</option><option '+("_not_null"==s?'selected="selected"':"")+' value="_not_null">'+RailsAdmin.I18n.t("is_present")+"</option><option "+("_null"==s?'selected="selected"':"")+' value="_null" >'+RailsAdmin.I18n.t("is_blank")+"</option></select>",h='<input class="additional-fieldset default input-sm form-control" style="display:'+(s&&"default"!=s?"none":"inline-block")+';" type="'+a+'" name="'+d+'[]" value="'+(r[0]||"")+'" /> <input placeholder="-\u221e" class="additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="'+a+'" name="'+d+'[]" value="'+(r[1]||"")+'" /> <input placeholder="\u221e" class="additional-fieldset between input-sm form-control" style="display:'+("between"==s?"inline-block":"none")+';" type="'+a+'" name="'+d+'[]" value="'+(r[2]||"")+'" />';break;default:c='<input type="text" class="input-sm form-control" name="'+d+'" value="'+r+'"/> '}var m=e("<p>").addClass("filter form-search").append('<span class="label label-info form-label"><a href="#delete" class="delete"><i class="fa fa-trash-o fa-fw icon-white"></i></a> '+n+"</span>").append("&nbsp;"+c+"&nbsp;"+(h||""));e("#filters_box").append(m),m.find(".date, .datetime").datetimepicker({locale:RailsAdmin.I18n.locale,showTodayButton:!0,format:t.datetimepicker_format}),e("hr.filters_box:hidden").show("slow")}},e(document).on("click","#filters a",function(t){t.preventDefault(),e.filters.append({label:e(this).data("field-label"),name:e(this).data("field-name"),type:e(this).data("field-type"),value:e(this).data("field-value"),operator:e(this).data("field-operator"),select_options:e(this).data("field-options"),index:e.now().toString().slice(6,11),datetimepicker_format:e(this).data("field-datetimepicker-format")})}),e(document).on("click","#filters_box .delete",function(t){t.preventDefault(),form=e(this).parents("form"),e(this).parents(".filter").remove(),!e("#filters_box").children().length&&e("hr.filters_box:visible").hide("slow")}),e(document).on("click","#filters_box .switch-select",function(t){t.preventDefault();var n=e(this).siblings("select:visible"),i=e(this).siblings("select:hidden");i.attr("name",i.data("name")).show("slow"),n.attr("name",null).hide("slow"),e(this).find("i").toggleClass("icon-plus icon-minus")}),e(document).on("change","#filters_box .switch-additionnal-fieldsets",function(t){var n=e(this).find("option:selected");(klass=e(n).data("additional-fieldset"))?(e(this).siblings(".additional-fieldset:not(."+klass+")").hide("slow"),e(this).siblings("."+klass).show("slow")):e(this).siblings(".additional-fieldset").hide("slow")})}(jQuery),function(e){e.widget("ra.filteringMultiselect",{_cache:{},options:{createQuery:function(e){return{query:e}},sortable:!1,removable:!0,regional:{up:"Up",down:"Down",add:"Add",chooseAll:"Choose all",chosen:"Chosen records",clearAll:"Clear all",remove:"Remove"},searchDelay:400,remote_source:null,xhr:!1},_create:function(){this._cache={},this._build(),this._buildCache(),this._bindEvents()},_build:function(){var t;this.wrapper=e('<div class="ra-multiselect">'),this.wrapper.insertAfter(this.element),this.header=e('<div class="ra-multiselect-header ui-helper-clearfix">'),this.filter=e('<input type="search" placeholder="'+this.options.regional.search+'" class="form-control ra-multiselect-search"/>'),this.header.append(this.filter),this.wrapper.append(this.header),this.columns={left:e('<div class="ra-multiselect-column ra-multiselect-left">'),center:e('<div class="ra-multiselect-column ra-multiselect-center">'),right:e('<div class="ra-multiselect-column ra-multiselect-right">')};for(t in this.columns)this.columns.hasOwnProperty(t)&&this.wrapper.append(this.columns[t]);this.collection=e('<select multiple="multiple"></select>'),this.collection.addClass("form-control ra-multiselect-collection"),this.addAll=e('<a href="#" class="ra-multiselect-item-add-all"><span class="ui-icon ui-icon-circle-triangle-e"></span>'+this.options.regional.chooseAll+"</a>"),this.columns.left.html(this.collection).append(this.addAll),this.collection.wrap('<div class="wrapper"/>'),this.add=e('<a href="#" class="ui-icon ui-icon-circle-triangle-e ra-multiselect-item-add">'+this.options.regional.add+"</a>"),this.columns.center.append(this.add),this.options.removable&&(this.remove=e('<a href="#" class="ui-icon ui-icon-circle-triangle-w ra-multiselect-item-remove">'+this.options.regional.remove+"</a>"),this.columns.center.append(this.remove)),this.options.sortable&&(this.up=e('<a href="#" class="ui-icon ui-icon-circle-triangle-n ra-multiselect-item-up">'+this.options.regional.up+"</a>"),this.down=e('<a href="#" class="ui-icon ui-icon-circle-triangle-s ra-multiselect-item-down">'+this.options.regional.down+"</a>"),this.columns.center.append(this.up).append(this.down)),this.selection=e('<select class="form-control ra-multiselect-selection" multiple="multiple"></select>'),this.columns.right.append(this.selection),this.options.removable&&(this.removeAll=e('<a href="#" class="ra-multiselect-item-remove-all"><span class="ui-icon ui-icon-circle-triangle-w"></span>'+this.options.regional.clearAll+"</a>"),this.columns.right.append(this.removeAll)),this.selection.wrap('<div class="wrapper"/>'),this.element.css({display:"none"}),this.tooManyObjectsPlaceholder=e('<option disabled="disabled" />').text(RailsAdmin.I18n.t("too_many_objects")),this.noObjectsPlaceholder=e('<option disabled="disabled" />').text(RailsAdmin.I18n.t("no_objects")),this.options.xhr&&this.collection.append(this.tooManyObjectsPlaceholder)},_bindEvents:function(){var t=this;this.addAll.click(function(n){t._select(e("option",t.collection)),n.preventDefault(),t.selection.trigger("change")}),this.add.click(function(n){t._select(e(":selected",t.collection)),n.preventDefault(),t.selection.trigger("change")}),this.options.removable&&(this.removeAll.click(function(n){t._deSelect(e("option",t.selection)),n.preventDefault(),t.selection.trigger("change")}),this.remove.click(function(n){t._deSelect(e(":selected",t.selection)),n.preventDefault(),t.selection.trigger("change")}));var n=null;this.options.sortable&&(this.up.click(function(n){t._move("up",e(":selected",t.selection)),n.preventDefault()}),this.down.click(function(n){t._move("down",e(":selected",t.selection)),n.preventDefault()})),this.filter.bind("keyup click",function(e){n&&clearTimeout(n),n=setTimeout(function(){t._queryFilter(t.filter.val())},t.options.searchDelay)})},_queryFilter:function(t){var n=this;n._query(t,function(t){var i,a=[];for(i in t)t.hasOwnProperty(i)&&!n.selected(t[i].id)&&a.push(i);if(a.length>0){n.collection.html("");for(i in a)n.collection.append(e("<option></option>").attr("value",t[a[i]].id).attr("title",t[a[i]].label).text(t[a[i]].label))}else n.collection.html(n.noObjectsPlaceholder)})},_buildCache:function(t){var n=this;this.element.find("option").each(function(t,i){i.selected?(n._cache["o_"+i.value]={id:i.value,value:i.innerHTML},e(i).clone().appendTo(n.selection).attr("selected",!1).attr("title",e(i).text())):(n._cache["o_"+i.value]={id:i.value,value:i.innerHTML},e(i).clone().appendTo(n.collection).attr("selected",!1).attr("title",e(i).text()))})},_deSelect:function(t){var n=this;t.each(function(e,t){n.element.find('option[value="'+t.value+'"]').removeAttr("selected")}),e(t).appendTo(this.collection).attr("selected",!1)},_query:function(t,n){var i,a=[];if(""===t)if(this.options.xhr)this.collection.html(this.tooManyObjectsPlaceholder);else{for(i in this._cache)this._cache.hasOwnProperty(i)&&(option=this._cache[i],a.push({id:option.id,label:option.value}));n.apply(this,[a])}else if(this.options.xhr)e.ajax({beforeSend:function(e){e.setRequestHeader("Accept","application/json")},url:this.options.remote_source,data:this.options.createQuery(t),success:n});else{t=new RegExp(t+".*","i");for(i in this._cache)this._cache.hasOwnProperty(i)&&t.test(this._cache[i].value)&&(option=this._cache[i],a.push({id:option.id,label:option.value}));n.apply(this,[a])}},_select:function(t){var n=this;t.each(function(t,i){var a=n.element.find('option[value="'+i.value+'"]');a.length?a.attr("selected","selected"):n.element.append(e("<option></option>").attr("value",i.value).attr("selected","selected"))}),e(t).appendTo(this.selection).attr("selected",!1)},_move:function(t,n){var i=this;"up"==t?n.each(function(t,n){var a=e(n).prev();if(a.length>0){var r=i.element.find('option[value="'+n.value+'"]'),s=i.element.find('option[value="'+a[0].value+'"]');s.before(r),a.before(e(n))}}):(e.fn.reverse=[].reverse,n.reverse().each(function(t,n){var a=e(n).next();if(a.length>0){var r=i.element.find('option[value="'+n.value+'"]'),s=i.element.find('option[value="'+a[0].value+'"]');s.after(r),a.after(e(n))}}))},selected:function(e){return this.element.find('option[value="'+e+'"]').attr("selected")},destroy:function(){this.wrapper.remove(),this.element.css({display:"inline"}),e.Widget.prototype.destroy.apply(this,arguments)}})}(jQuery),function(e){e.widget("ra.filteringSelect",{options:{createQuery:function(e){return{query:e}},minLength:0,searchDelay:200,remote_source:null,source:null,xhr:!1},_create:function(){var t=this,n=this.element.hide(),i=n.children(":selected"),a=i.val()?i.text():"";this.options.xhr?this.options.source=this.options.remote_source:this.options.source=n.children("option").map(function(){return{label:e(this).text(),value:this.value}}).toArray();var r=e('<div class="input-group filtering-select col-sm-2" style="float:left"></div>'),s=this.input=e('<input type="text">').val(a).addClass("form-control ra-filtering-select-input").attr("style",n.attr("style")).show().autocomplete({delay:this.options.searchDelay,minLength:this.options.minLength,source:this._getSourceFunction(this.options.source),select:function(i,a){var r=e("<option></option>").attr("value",a.item.id).attr("selected","selected").text(a.item.value);n.html(r),n.trigger("change",a.item.id),t._trigger("selected",i,{item:r}),e(t.element.parents(".controls")[0]).find(".update").removeClass("disabled")},change:function(i,a){if(!a.item){var r=new RegExp("^"+e.ui.autocomplete.escapeRegex(e(this).val())+"$","i"),o=!1;if(n.children("option").each(function(){return e(this).text().match(r)?(this.selected=o=!0,!1):void 0}),!o||""==e(this).val())return e(this).val(null),n.html(e('<option value="" selected="selected"></option>')),s.data("ui-autocomplete").term="",e(t.element.parents(".controls")[0]).find(".update").addClass("disabled"),!1}}}).keyup(function(){0==e(this).val().length&&(n.html(e('<option value="" selected="selected"></option>')),n.trigger("change"))});n.attr("placeholder")&&s.attr("placeholder",n.attr("placeholder")),s.data("ui-autocomplete")._renderItem=function(t,n){return e("<li></li>").data("ui-autocomplete-item",n).append(e("<a></a>").html(n.html||n.id)).appendTo(t)};var o=this.button=e('<span class="input-group-btn"><label class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Show All Items" role="button"><span class="caret"></span><span class="ui-button-text">&nbsp;</span></label></span>').click(function(){return s.autocomplete("widget").is(":visible")?void s.autocomplete("close"):(s.autocomplete("search",""),void s.focus())});r.append(s).append(o).insertAfter(n)},_getResultSet:function(t,n,i){var a=new RegExp(e.ui.autocomplete.escapeRegex(t.term),"i"),r=function(t,n){return n.length>0?e.map(t.split(n),function(t,n){return e("<span></span>").text(t).html()}).join(e("<strong></strong>").text(n)[0].outerHTML):e("<span></span>").text(t).html()};return e.map(n,function(e,n){return(e.id||e.value)&&(i||a.test(e.label))?{html:r(e.label||e.id,t.term),value:e.label||e.id,id:e.id||e.value}:void 0})},_getSourceFunction:function(t){var n=this,i=0;return e.isArray(t)?function(e,i){i(n._getResultSet(e,t,!1))}:"string"==typeof t?function(a,r){this.xhr&&this.xhr.abort(),this.xhr=e.ajax({url:t,data:n.options.createQuery(a.term),dataType:"json",autocompleteRequest:++i,success:function(e,t){this.autocompleteRequest===i&&r(n._getResultSet(a,e,!0))},error:function(){this.autocompleteRequest===i&&r([])}})}:t},destroy:function(){this.input.remove(),this.button.remove(),this.element.show(),e.Widget.prototype.destroy.call(this)}})}(jQuery),function(e){e.widget("ra.remoteForm",{_create:function(){var t=this,n=t.element,i=n.find("select").first().data("options")&&n.find("select").first().data("options")["edit-url"];"undefined"!=typeof i&&i.length&&n.on("dblclick",".ra-multiselect option:not(:disabled)",function(e){t._bindModalOpening(e,i.replace("__ID__",this.value))}),n.find(".create").unbind().bind("click",function(n){t._bindModalOpening(n,e(this).data("link"))}),n.find(".update").unbind().bind("click",function(i){(value=n.find("select").val())?t._bindModalOpening(i,e(this).data("link").replace("__ID__",value)):i.preventDefault()})},_bindModalOpening:function(t,n){if(t.preventDefault(),widget=this,e("#modal").length)return!1;var i=this._getModal();setTimeout(function(){e.ajax({url:n,beforeSend:function(e){e.setRequestHeader("Accept","text/javascript")},success:function(e,t,n){i.find(".modal-body").html(e),widget._bindFormEvents()},error:function(e,t,n){i.find(".modal-body").html(e.responseText)},dataType:"text"})},200)},_bindFormEvents:function(){var t=this,n=this._getModal(),i=n.find("form"),a=n.find(":submit[name=_save]").html(),r=n.find(":submit[name=_continue]").html();n.find(".form-actions").remove(),i.attr("data-remote",!0),n.find(".modal-header-title").text(i.data("title")),n.find(".cancel-action").unbind().click(function(){return n.modal("hide"),!1}).html(r),n.find(".save-action").unbind().click(function(){return i.submit(),!1}).html(a),e(document).trigger("rails_admin.dom_ready",[i]),i.bind("ajax:complete",function(i,a,r){if("error"==r)n.find(".modal-body").html(a.responseText),t._bindFormEvents();else{
var s=e.parseJSON(a.responseText),o='<option value="'+s.id+'" selected>'+s.label+"</option>",l=t.element.find("select").filter(":hidden");if(t.element.find(".filtering-select").length){var d=t.element.find(".filtering-select").children(".ra-filtering-select-input");d.val(s.label),l.find("option[value="+s.id+"]").length||(l.html(o).val(s.id),t.element.find(".update").removeClass("disabled"))}else{var d=t.element.find(".ra-filtering-select-input"),u=t.element.find(".ra-multiselect");u.find("option[value="+s.id+"]").length?(l.find("option[value="+s.id+"]").text(s.label),u.find("option[value= "+s.id+"]").text(s.label)):(l.append(o),u.find("select.ra-multiselect-selection").append(o))}t._trigger("success"),n.modal("hide")}})},_getModal:function(){var t=this;return t.dialog||(t.dialog=e('<div id="modal" class="modal fade">            <div class="modal-dialog">            <div class="modal-content">            <div class="modal-header">              <a href="#" class="close" data-dismiss="modal">&times;</a>              <h3 class="modal-header-title">...</h3>            </div>            <div class="modal-body">              ...            </div>            <div class="modal-footer">              <a href="#" class="btn cancel-action">...</a>              <a href="#" class="btn btn-primary save-action">...</a>            </div>            </div>            </div>          </div>').modal({keyboard:!0,backdrop:!0,show:!0}).on("hidden.bs.modal",function(){t.dialog.remove(),t.dialog=null})),this.dialog}})}(jQuery),
// copyright chris wanstrath
function(e){function t(t,i,a){var r=this;return this.on("click.pjax",t,function(t){var s=e.extend({},h(i,a));s.container||(s.container=e(this).attr("data-pjax")||r),n(t,s)})}function n(t,n,i){i=h(n,i);var r=t.currentTarget;if("A"!==r.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(t.which>1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||location.protocol!==r.protocol||location.host!==r.host||r.hash&&r.href.replace(r.hash,"")===location.href.replace(location.hash,"")||r.href===location.href+"#")){var s={url:r.href,container:e(r).attr("data-pjax"),target:r,fragment:null};a(e.extend({},s,i)),t.preventDefault()}}function i(t,n,i){i=h(n,i);var r=t.currentTarget;if("FORM"!==r.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var s={type:r.method,url:r.action,data:e(r).serializeArray(),container:e(r).attr("data-pjax"),target:r,fragment:null};a(e.extend({},s,i)),t.preventDefault()}function a(t){function n(t,n){var a=e.Event(t,{relatedTarget:i});return o.trigger(a,n),!a.isDefaultPrevented()}t=e.extend(!0,{},e.ajaxSettings,a.defaults,t),e.isFunction(t.url)&&(t.url=t.url());var i=t.target,r=c(t.url).hash,o=t.context=p(t.container);t.data||(t.data={}),t.data._pjax=o.selector;var l;t.beforeSend=function(e,i){"GET"!==i.type&&(i.timeout=0),e.setRequestHeader("X-PJAX","true"),e.setRequestHeader("X-PJAX-Container",o.selector);return n("pjax:beforeSend",[e,i])?(i.timeout>0&&(l=setTimeout(function(){n("pjax:timeout",[e,t])&&e.abort("timeout")},i.timeout),i.timeout=0),void(t.requestUrl=c(i.url).href)):!1},t.complete=function(e,i){l&&clearTimeout(l),n("pjax:complete",[e,i,t]),n("pjax:end",[e,t])},t.error=function(e,i,a){var r=f("",e,t),o=n("pjax:error",[e,i,a,t]);"GET"==t.type&&"abort"!==i&&o&&s(r.url)},t.success=function(i,l,u){var h=f(i,u,t);if(!h.contents)return void s(h.url);if(a.state={id:t.id||d(),url:h.url,title:h.title,container:o.selector,fragment:t.fragment,timeout:t.timeout},(t.push||t.replace)&&window.history.replaceState(a.state,h.title,h.url),h.title&&(document.title=h.title),o.html(h.contents),"number"==typeof t.scrollTo&&e(window).scrollTop(t.scrollTo),(t.replace||t.push)&&window._gaq&&_gaq.push(["_trackPageview"]),""!==r){var p=c(h.url);p.hash=r,a.state.url=p.href,window.history.replaceState(a.state,h.title,p.href);var m=e(p.hash);m.length&&e(window).scrollTop(m.offset().top)}n("pjax:success",[i,l,u,t])},a.state||(a.state={id:d(),url:window.location.href,title:document.title,container:o.selector,fragment:t.fragment,timeout:t.timeout},window.history.replaceState(a.state,document.title));var h=a.xhr;h&&h.readyState<4&&(h.onreadystatechange=e.noop,h.abort()),a.options=t;var h=a.xhr=e.ajax(t);return h.readyState>0&&(t.push&&!t.replace&&(_(a.state.id,o.clone().contents()),window.history.pushState(null,"",u(t.requestUrl))),n("pjax:start",[h,t]),n("pjax:send",[h,t])),a.xhr}function r(t,n){var i={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return a(e.extend(i,h(t,n)))}function s(e){window.history.replaceState(null,"","#"),window.location.replace(e)}function o(t){var n=t.state;if(n&&n.container){var i=e(n.container);if(i.length){var r=b[n.id];if(!a.state)return void(a.state=n);var o=a.state.id<n.id?"forward":"back";g(o,a.state.id,i.clone().contents());var l=e.Event("pjax:popstate",{state:n,direction:o});i.trigger(l);var d={id:n.id,url:n.url,container:i,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1};r?(i.trigger("pjax:start",[null,d]),n.title&&(document.title=n.title),i.html(r),a.state=n,i.trigger("pjax:end",[null,d])):a(d),i[0].offsetHeight}else s(location.href)}}function l(t){var n=e.isFunction(t.url)?t.url():t.url,i=t.type?t.type.toUpperCase():"GET",a=e("<form>",{method:"GET"===i?"GET":"POST",action:n,style:"display:none"});"GET"!==i&&"POST"!==i&&a.append(e("<input>",{type:"hidden",name:"_method",value:i.toLowerCase()}));var r=t.data;if("string"==typeof r)e.each(r.split("&"),function(t,n){var i=n.split("=");a.append(e("<input>",{type:"hidden",name:i[0],value:i[1]}))});else if("object"==typeof r)for(key in r)a.append(e("<input>",{type:"hidden",name:key,value:r[key]}));e(document.body).append(a),a.submit()}function d(){return(new Date).getTime()}function u(e){return e.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function c(e){var t=document.createElement("a");return t.href=e,t}function h(t,n){return t&&n?n.container=t:n=e.isPlainObject(t)?t:{container:t},n.container&&(n.container=p(n.container)),n}function p(t){if(t=e(t),t.length){if(""!==t.selector&&t.context===document)return t;if(t.attr("id"))return e("#"+t.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+t.selector}function m(e,t){return e.filter(t).add(e.find(t))}function f(t,n,i){var a={};if(a.url=u(n.getResponseHeader("X-PJAX-URL")||i.requestUrl),/<html/i.test(t))var r=e(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]),s=e(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]);else var r=s=e(t);if(0===s.length)return a;if(a.title=m(r,"title").last().text(),i.fragment){if("body"===i.fragment)var o=s;else var o=m(s,i.fragment).first();o.length&&(a.contents=o.contents(),a.title||(a.title=o.attr("title")||o.data("title")))}else/<html/i.test(t)||(a.contents=s);return a.contents&&(a.contents=a.contents.not("title"),a.contents.find("title").remove()),a.title&&(a.title=e.trim(a.title)),a}function _(e,t){for(b[e]=t,w.push(e);M.length;)delete b[M.shift()];for(;w.length>a.defaults.maxCacheLength;)delete b[w.shift()]}function g(e,t,n){var i,a;b[t]=n,"forward"===e?(i=w,a=M):(i=M,a=w),i.push(t),(t=a.pop())&&delete b[t]}function y(){e.fn.pjax=t,e.pjax=a,e.pjax.enable=e.noop,e.pjax.disable=v,e.pjax.click=n,e.pjax.submit=i,e.pjax.reload=r,e.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20},e(window).bind("popstate.pjax",o)}function v(){e.fn.pjax=function(){return this},e.pjax=l,e.pjax.enable=y,e.pjax.disable=e.noop,e.pjax.click=e.noop,e.pjax.submit=e.noop,e.pjax.reload=function(){window.location.reload()},e(window).unbind("popstate.pjax",o)}var b={},M=[],w=[];e.inArray("state",e.event.props)<0&&e.event.props.push("state"),e.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),e.support.pjax?y():v()}(jQuery),function(e){window.NestedFormEvents=function(){this.addFields=e.proxy(this.addFields,this),this.removeFields=e.proxy(this.removeFields,this)},NestedFormEvents.prototype={addFields:function(t){var n=t.currentTarget,i=e(n).data("association"),a=e("#"+e(n).data("blueprint-id")),r=a.data("blueprint"),s=(e(n).closest(".fields").closestChild("input, textarea, select").eq(0).attr("name")||"").replace(new RegExp("[[a-z_]+]$"),"");if(s)for(var o=s.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g)||[],l=s.match(/[0-9]+/g)||[],d=0;d<o.length;d++)l[d]&&(r=r.replace(new RegExp("(_"+o[d]+")_.+?_","g"),"$1_"+l[d]+"_"),r=r.replace(new RegExp("(\\["+o[d]+"\\])\\[.+?\\]","g"),"$1["+l[d]+"]"));var u=new RegExp("new_"+i,"g"),c=this.newId();r=e.trim(r.replace(u,c));var h=this.insertFields(r,i,n);return h.trigger({type:"nested:fieldAdded",field:h}).trigger({type:"nested:fieldAdded:"+i,field:h}),!1},newId:function(){return(new Date).getTime()},insertFields:function(t,n,i){var a=e(i).data("target");return a?e(t).appendTo(e(a)):e(t).insertBefore(i)},removeFields:function(t){var n=e(t.currentTarget),i=n.data("association"),a=n.prev("input[type=hidden]");a.val("1");var r=n.closest(".fields");return r.hide(),r.trigger({type:"nested:fieldRemoved",field:r}).trigger({type:"nested:fieldRemoved:"+i,field:r}),!1}},window.nestedFormEvents=new NestedFormEvents,e(document).delegate("form a.add_nested_fields","click",nestedFormEvents.addFields).delegate("form a.remove_nested_fields","click",nestedFormEvents.removeFields)}(jQuery),/*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
function(e){e.fn.closestChild=function(t){if(t&&""!=t){var n=[];for(n.push(this);n.length>0;)for(var i=n.shift(),a=i.children(),r=0;r<a.length;++r){var s=e(a[r]);if(s.is(t))return s;n.push(s)}}return e()}}(jQuery),function(){var e;e=jQuery,e(document).ready(function(){return window.nestedFormEvents.insertFields=function(t,n,i){var a;return a=e(i).closest(".controls").siblings(".tab-content"),a.append(t),a.children().last()}}),e(document).on("nested:fieldAdded","form",function(t){var n,i,a,r,s,o,l;return i=t.field.addClass("tab-pane").attr("id","unique-id-"+(new Date).getTime()),r=e('<li><a data-toggle="tab" href="#'+i.attr("id")+'">'+i.children(".object-infos").data("object-label")+"</a></li>"),o=i.closest(".control-group"),n=o.children(".controls"),s=void 0!==n.data("nestedone"),a=n.children(".nav"),t=o.children(".tab-content"),l=n.find(".toggler"),a.append(r),e(window.document).trigger("rails_admin.dom_ready",[i,o]),r.children("a").tab("show"),s||a.select(":hidden").show("slow"),t.select(":hidden").show("slow"),l.addClass("active").removeClass("disabled").children("i").addClass("icon-chevron-down").removeClass("icon-chevron-right"),s?n.find(".add_nested_fields").removeClass("add_nested_fields").html(i.children(".object-infos").data("object-label")):void 0}),e(document).on("nested:fieldRemoved","form",function(t){var n,i,a,r,s,o,l,d;return r=t.field,s=r.closest(".control-group").children(".controls").children(".nav"),a=s.children("li").has('a[href="#'+r.attr("id")+'"]'),l=r.closest(".control-group"),i=l.children(".controls"),o=void 0!==i.data("nestedone"),d=i.find(".toggler"),(a.next().length?a.next():a.prev()).children("a:first").tab("show"),a.remove(),0===s.children().length&&(s.select(":visible").hide("slow"),d.removeClass("active").addClass("disabled").children("i").removeClass("icon-chevron-down").addClass("icon-chevron-right")),o&&(n=d.next(),n.addClass("add_nested_fields").html(n.data("add-label"))),r.find("[required]").each(function(){return e(this).removeAttr("required")})})}.call(this),function(){var e;this.RailsAdmin||(this.RailsAdmin={}),this.RailsAdmin.I18n=e=function(){function e(){}return e.init=function(e,t){return this.locale=e,this.translations=t,moment.locale(this.locale)},e.t=function(e){var t;return t=e.charAt(0).toUpperCase()+e.replace(/_/g," ").slice(1),this.translations[e]||t},e}()}.call(this),/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(void 0!==e.style[n])return{end:t[n]};return!1}e.fn.emulateTransitionEnd=function(t){var n=!1,i=this;e(this).one("bsTransitionEnd",function(){n=!0});var a=function(){n||e(i).trigger(e.support.transition.end)};return setTimeout(a,t),this},e(function(){e.support.transition=t(),e.support.transition&&(e.event.special.bsTransitionEnd={bindType:e.support.transition.end,delegateType:e.support.transition.end,handle:function(t){return e(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.affix"),r="object"==typeof t&&t;a||i.data("bs.affix",a=new n(this,r)),"string"==typeof t&&a[t]()})}var n=function(t,i){this.options=e.extend({},n.DEFAULTS,i),this.$target=e(this.options.target).on("scroll.bs.affix.data-api",e.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",e.proxy(this.checkPositionWithEventLoop,this)),this.$element=e(t),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};n.VERSION="3.2.0",n.RESET="affix affix-top affix-bottom",n.DEFAULTS={offset:0,target:window},n.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(n.RESET).addClass("affix");var e=this.$target.scrollTop(),t=this.$element.offset();return this.pinnedOffset=t.top-e},n.prototype.checkPositionWithEventLoop=function(){setTimeout(e.proxy(this.checkPosition,this),1)},n.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=e(document).height(),i=this.$target.scrollTop(),a=this.$element.offset(),r=this.options.offset,s=r.top,o=r.bottom;"object"!=typeof r&&(o=s=r),"function"==typeof s&&(s=r.top(this.$element)),"function"==typeof o&&(o=r.bottom(this.$element));var l=null!=this.unpin&&i+this.unpin<=a.top?!1:null!=o&&a.top+this.$element.height()>=t-o?"bottom":null!=s&&s>=i?"top":!1;if(this.affixed!==l){null!=this.unpin&&this.$element.css("top","");var d="affix"+(l?"-"+l:""),u=e.Event(d+".bs.affix");this.$element.trigger(u),u.isDefaultPrevented()||(this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(n.RESET).addClass(d).trigger(e.Event(d.replace("affix","affixed"))),"bottom"==l&&this.$element.offset({top:t-this.$element.height()-o}))}}};var i=e.fn.affix;e.fn.affix=t,e.fn.affix.Constructor=n,e.fn.affix.noConflict=function(){return e.fn.affix=i,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var n=e(this),i=n.data();i.offset=i.offset||{},i.offsetBottom&&(i.offset.bottom=i.offsetBottom),i.offsetTop&&(i.offset.top=i.offsetTop),t.call(n,i)})})}(jQuery),/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var n=e(this),a=n.data("bs.alert");a||n.data("bs.alert",a=new i(this)),"string"==typeof t&&a[t].call(n)})}var n='[data-dismiss="alert"]',i=function(t){e(t).on("click",n,this.close)};i.VERSION="3.2.0",i.prototype.close=function(t){function n(){r.detach().trigger("closed.bs.alert").remove()}var i=e(this),a=i.attr("data-target");a||(a=i.attr("href"),a=a&&a.replace(/.*(?=#[^\s]*$)/,""));var r=e(a);t&&t.preventDefault(),r.length||(r=i.hasClass("alert")?i:i.parent()),r.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(r.removeClass("in"),e.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",n).emulateTransitionEnd(150):n())};var a=e.fn.alert;e.fn.alert=t,e.fn.alert.Constructor=i,e.fn.alert.noConflict=function(){return e.fn.alert=a,this},e(document).on("click.bs.alert.data-api",n,i.prototype.close)}(jQuery),/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.button"),r="object"==typeof t&&t;a||i.data("bs.button",a=new n(this,r)),"toggle"==t?a.toggle():t&&a.setState(t)})}var n=function(t,i){this.$element=e(t),this.options=e.extend({},n.DEFAULTS,i),this.isLoading=!1};n.VERSION="3.2.0",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var n="disabled",i=this.$element,a=i.is("input")?"val":"html",r=i.data();t+="Text",null==r.resetText&&i.data("resetText",i[a]()),i[a](null==r[t]?this.options[t]:r[t]),setTimeout(e.proxy(function(){"loadingText"==t?(this.isLoading=!0,i.addClass(n).attr(n,n)):this.isLoading&&(this.isLoading=!1,i.removeClass(n).removeAttr(n))},this),0)},n.prototype.toggle=function(){var e=!0,t=this.$element.closest('[data-toggle="buttons"]');if(t.length){var n=this.$element.find("input");"radio"==n.prop("type")&&(n.prop("checked")&&this.$element.hasClass("active")?e=!1:t.find(".active").removeClass("active")),e&&n.prop("checked",!this.$element.hasClass("active")).trigger("change")}e&&this.$element.toggleClass("active")};var i=e.fn.button;e.fn.button=t,e.fn.button.Constructor=n,e.fn.button.noConflict=function(){return e.fn.button=i,this},e(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(n){var i=e(n.target);i.hasClass("btn")||(i=i.closest(".btn")),t.call(i,"toggle"),n.preventDefault()})}(jQuery),/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.carousel"),r=e.extend({},n.DEFAULTS,i.data(),"object"==typeof t&&t),s="string"==typeof t?t:r.slide;a||i.data("bs.carousel",a=new n(this,r)),"number"==typeof t?a.to(t):s?a[s]():r.interval&&a.pause().cycle()})}var n=function(t,n){this.$element=e(t).on("keydown.bs.carousel",e.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",e.proxy(this.pause,this)).on("mouseleave.bs.carousel",e.proxy(this.cycle,this))};n.VERSION="3.2.0",n.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},n.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break;case 39:this.next();break;default:return}e.preventDefault()},n.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},n.prototype.getItemIndex=function(e){return this.$items=e.parent().children(".item"),this.$items.index(e||this.$active)},n.prototype.to=function(t){var n=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){n.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",e(this.$items[t]))},n.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){return this.sliding?void 0:this.slide("next")},n.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},n.prototype.slide=function(t,n){var i=this.$element.find(".item.active"),a=n||i[t](),r=this.interval,s="next"==t?"left":"right",o="next"==t?"first":"last",l=this;if(!a.length){if(!this.options.wrap)return;a=this.$element.find(".item")[o]()}if(a.hasClass("active"))return this.sliding=!1;var d=a[0],u=e.Event("slide.bs.carousel",{relatedTarget:d,direction:s});if(this.$element.trigger(u),!u.isDefaultPrevented()){if(this.sliding=!0,r&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var c=e(this.$indicators.children()[this.getItemIndex(a)]);c&&c.addClass("active")}var h=e.Event("slid.bs.carousel",{relatedTarget:d,direction:s});return e.support.transition&&this.$element.hasClass("slide")?(a.addClass(t),a[0].offsetWidth,i.addClass(s),a.addClass(s),i.one("bsTransitionEnd",function(){a.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(h)},0)}).emulateTransitionEnd(1e3*i.css("transition-duration").slice(0,-1))):(i.removeClass("active"),a.addClass("active"),this.sliding=!1,this.$element.trigger(h)),r&&this.cycle(),this}};var i=e.fn.carousel;e.fn.carousel=t,e.fn.carousel.Constructor=n,e.fn.carousel.noConflict=function(){return e.fn.carousel=i,this},e(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(n){var i,a=e(this),r=e(a.attr("data-target")||(i=a.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""));if(r.hasClass("carousel")){var s=e.extend({},r.data(),a.data()),o=a.attr("data-slide-to");o&&(s.interval=!1),t.call(r,s),o&&r.data("bs.carousel").to(o),n.preventDefault()}}),e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var n=e(this);t.call(n,n.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.collapse"),r=e.extend({},n.DEFAULTS,i.data(),"object"==typeof t&&t);!a&&r.toggle&&"show"==t&&(t=!t),a||i.data("bs.collapse",a=new n(this,r)),"string"==typeof t&&a[t]()})}var n=function(t,i){this.$element=e(t),this.options=e.extend({},n.DEFAULTS,i),this.transitioning=null,this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};n.VERSION="3.2.0",n.DEFAULTS={toggle:!0},n.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"},n.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var n=e.Event("show.bs.collapse");if(this.$element.trigger(n),!n.isDefaultPrevented()){var i=this.$parent&&this.$parent.find("> .panel > .in");if(i&&i.length){var a=i.data("bs.collapse");if(a&&a.transitioning)return;t.call(i,"hide"),a||i.data("bs.collapse",null)}var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0),this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return s.call(this);var o=e.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",e.proxy(s,this)).emulateTransitionEnd(350)[r](this.$element[0][o])}}},n.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=e.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return e.support.transition?void this.$element[n](0).one("bsTransitionEnd",e.proxy(i,this)).emulateTransitionEnd(350):i.call(this)}}},n.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var i=e.fn.collapse;e.fn.collapse=t,e.fn.collapse.Constructor=n,e.fn.collapse.noConflict=function(){return e.fn.collapse=i,this},e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(n){var i,a=e(this),r=a.attr("data-target")||n.preventDefault()||(i=a.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),s=e(r),o=s.data("bs.collapse"),l=o?"toggle":a.data(),d=a.attr("data-parent"),u=d&&e(d);o&&o.transitioning||(u&&u.find('[data-toggle="collapse"][data-parent="'+d+'"]').not(a).addClass("collapsed"),a[s.hasClass("in")?"addClass":"removeClass"]("collapsed")),t.call(s,l)})}(jQuery),/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){t&&3===t.which||(e(a).remove(),e(r).each(function(){var i=n(e(this)),a={relatedTarget:this};i.hasClass("open")&&(i.trigger(t=e.Event("hide.bs.dropdown",a)),t.isDefaultPrevented()||i.removeClass("open").trigger("hidden.bs.dropdown",a))}))}function n(t){var n=t.attr("data-target");n||(n=t.attr("href"),n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));var i=n&&e(n);return i&&i.length?i:t.parent()}function i(t){return this.each(function(){var n=e(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new s(this)),"string"==typeof t&&i[t].call(n)})}var a=".dropdown-backdrop",r='[data-toggle="dropdown"]',s=function(t){e(t).on("click.bs.dropdown",this.toggle)};s.VERSION="3.2.0",s.prototype.toggle=function(i){var a=e(this);if(!a.is(".disabled, :disabled")){var r=n(a),s=r.hasClass("open");if(t(),!s){"ontouchstart"in document.documentElement&&!r.closest(".navbar-nav").length&&e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click",t);var o={relatedTarget:this};if(r.trigger(i=e.Event("show.bs.dropdown",o)),i.isDefaultPrevented())return;a.trigger("focus"),r.toggleClass("open").trigger("shown.bs.dropdown",o)}return!1}},s.prototype.keydown=function(t){if(/(38|40|27)/.test(t.keyCode)){var i=e(this);if(t.preventDefault(),t.stopPropagation(),!i.is(".disabled, :disabled")){var a=n(i),s=a.hasClass("open");if(!s||s&&27==t.keyCode)return 27==t.which&&a.find(r).trigger("focus"),i.trigger("click");var o=" li:not(.divider):visible a",l=a.find('[role="menu"]'+o+', [role="listbox"]'+o);if(l.length){var d=l.index(l.filter(":focus"));38==t.keyCode&&d>0&&d--,40==t.keyCode&&d<l.length-1&&d++,~d||(d=0),l.eq(d).trigger("focus")}}}};var o=e.fn.dropdown;e.fn.dropdown=i,e.fn.dropdown.Constructor=s,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=o,this},e(document).on("click.bs.dropdown.data-api",t).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",r,s.prototype.toggle).on("keydown.bs.dropdown.data-api",r+', [role="menu"], [role="listbox"]',s.prototype.keydown)}(jQuery),/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t,i){return this.each(function(){var a=e(this),r=a.data("bs.modal"),s=e.extend({},n.DEFAULTS,a.data(),"object"==typeof t&&t);r||a.data("bs.modal",r=new n(this,s)),"string"==typeof t?r[t](i):s.show&&r.show(i)})}var n=function(t,n){this.options=n,this.$body=e(document.body),this.$element=e(t),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,e.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};n.VERSION="3.2.0",n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(e){return this.isShown?this.hide():this.show(e)},n.prototype.show=function(t){var n=this,i=e.Event("show.bs.modal",{relatedTarget:t});this.$element.trigger(i),this.isShown||i.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',e.proxy(this.hide,this)),this.backdrop(function(){var i=e.support.transition&&n.$element.hasClass("fade");n.$element.parent().length||n.$element.appendTo(n.$body),n.$element.show().scrollTop(0),i&&n.$element[0].offsetWidth,n.$element.addClass("in").attr("aria-hidden",!1),n.enforceFocus();var a=e.Event("shown.bs.modal",{relatedTarget:t});i?n.$element.find(".modal-dialog").one("bsTransitionEnd",function(){n.$element.trigger("focus").trigger(a)}).emulateTransitionEnd(300):n.$element.trigger("focus").trigger(a)}))},n.prototype.hide=function(t){t&&t.preventDefault(),t=e.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),e(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),e.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",e.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},n.prototype.enforceFocus=function(){e(document).off("focusin.bs.modal").on("focusin.bs.modal",e.proxy(function(e){this.$element[0]===e.target||this.$element.has(e.target).length||this.$element.trigger("focus")},this))},n.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",e.proxy(function(e){27==e.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},n.prototype.hideModal=function(){var e=this;this.$element.hide(),this.backdrop(function(){e.$element.trigger("hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},n.prototype.backdrop=function(t){var n=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var a=e.support.transition&&i;if(this.$backdrop=e('<div class="modal-backdrop '+i+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",e.proxy(function(e){e.target===e.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),a&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;a?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(150):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){n.removeBackdrop(),t&&t()};e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(150):r()}else t&&t()},n.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},n.prototype.setScrollbar=function(){var e=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",e+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},n.prototype.measureScrollbar=function(){var e=document.createElement("div");e.className="modal-scrollbar-measure",this.$body.append(e);var t=e.offsetWidth-e.clientWidth;return this.$body[0].removeChild(e),t};var i=e.fn.modal;e.fn.modal=t,e.fn.modal.Constructor=n,e.fn.modal.noConflict=function(){return e.fn.modal=i,this},e(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(n){var i=e(this),a=i.attr("href"),r=e(i.attr("data-target")||a&&a.replace(/.*(?=#[^\s]+$)/,"")),s=r.data("bs.modal")?"toggle":e.extend({remote:!/#/.test(a)&&a},r.data(),i.data());i.is("a")&&n.preventDefault(),r.one("show.bs.modal",function(e){e.isDefaultPrevented()||r.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),t.call(r,s,this)})}(jQuery),/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(n,i){var a=e.proxy(this.process,this);this.$body=e("body"),this.$scrollElement=e(e(n).is("body")?window:n),this.options=e.extend({},t.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a),this.refresh(),this.process()}function n(n){return this.each(function(){var i=e(this),a=i.data("bs.scrollspy"),r="object"==typeof n&&n;a||i.data("bs.scrollspy",a=new t(this,r)),"string"==typeof n&&a[n]()})}t.VERSION="3.2.0",t.DEFAULTS={offset:10},t.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},t.prototype.refresh=function(){var t="offset",n=0;e.isWindow(this.$scrollElement[0])||(t="position",n=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var i=this;this.$body.find(this.selector).map(function(){var i=e(this),a=i.data("target")||i.attr("href"),r=/^#./.test(a)&&e(a);return r&&r.length&&r.is(":visible")&&[[r[t]().top+n,a]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},t.prototype.process=function(){var e,t=this.$scrollElement.scrollTop()+this.options.offset,n=this.getScrollHeight(),i=this.options.offset+n-this.$scrollElement.height(),a=this.offsets,r=this.targets,s=this.activeTarget;if(this.scrollHeight!=n&&this.refresh(),t>=i)return s!=(e=r[r.length-1])&&this.activate(e);if(s&&t<=a[0])return s!=(e=r[0])&&this.activate(e);for(e=a.length;e--;)s!=r[e]&&t>=a[e]&&(!a[e+1]||t<=a[e+1])&&this.activate(r[e])},t.prototype.activate=function(t){this.activeTarget=t,e(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var n=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=e(n).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")};var i=e.fn.scrollspy;e.fn.scrollspy=n,e.fn.scrollspy.Constructor=t,e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=i,this},e(window).on("load.bs.scrollspy.data-api",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);n.call(t,t.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.tab");a||i.data("bs.tab",a=new n(this)),"string"==typeof t&&a[t]()})}var n=function(t){this.element=e(t)};n.VERSION="3.2.0",n.prototype.show=function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=t.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var a=n.find(".active:last a")[0],r=e.Event("show.bs.tab",{relatedTarget:a});if(t.trigger(r),!r.isDefaultPrevented()){var s=e(i);this.activate(t.closest("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown.bs.tab",relatedTarget:a})})}}},n.prototype.activate=function(t,n,i){function a(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),i&&i()}var r=n.find("> .active"),s=i&&e.support.transition&&r.hasClass("fade");s?r.one("bsTransitionEnd",a).emulateTransitionEnd(150):a(),r.removeClass("in")};var i=e.fn.tab;e.fn.tab=t,e.fn.tab.Constructor=n,e.fn.tab.noConflict=function(){return e.fn.tab=i,this},e(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(n){n.preventDefault(),t.call(e(this),"show")})}(jQuery),/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.tooltip"),r="object"==typeof t&&t;(a||"destroy"!=t)&&(a||i.data("bs.tooltip",a=new n(this,r)),"string"==typeof t&&a[t]())})}var n=function(e,t){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",e,t)};n.VERSION="3.2.0",n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},n.prototype.init=function(t,n,i){this.enabled=!0,this.type=t,this.$element=e(n),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&e(this.options.viewport.selector||this.options.viewport);for(var a=this.options.trigger.split(" "),r=a.length;r--;){var s=a[r];if("click"==s)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=s){var o="hover"==s?"mouseenter":"focusin",l="hover"==s?"mouseleave":"focusout";this.$element.on(o+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(t){return t=e.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},n.prototype.getDelegateOptions=function(){var t={},n=this.getDefaults();return this._options&&e.each(this._options,function(e,i){n[e]!=i&&(t[e]=i)}),t},n.prototype.enter=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show()},n.prototype.leave=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()},n.prototype.show=function(){var t=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var n=e.contains(document.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!n)return;var i=this,a=this.tip(),r=this.getUID(this.type);this.setContent(),a.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&a.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,o=/\s?auto?\s?/i,l=o.test(s);l&&(s=s.replace(o,"")||"top"),a.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?a.appendTo(this.options.container):a.insertAfter(this.$element);var d=this.getPosition(),u=a[0].offsetWidth,c=a[0].offsetHeight;if(l){var h=s,p=this.$element.parent(),m=this.getPosition(p);s="bottom"==s&&d.top+d.height+c-m.scroll>m.height?"top":"top"==s&&d.top-m.scroll-c<0?"bottom":"right"==s&&d.right+u>m.width?"left":"left"==s&&d.left-u<m.left?"right":s,a.removeClass(h).addClass(s)}var f=this.getCalculatedOffset(s,d,u,c);this.applyPlacement(f,s);var _=function(){i.$element.trigger("shown.bs."+i.type),i.hoverState=null};e.support.transition&&this.$tip.hasClass("fade")?a.one("bsTransitionEnd",_).emulateTransitionEnd(150):_()}},n.prototype.applyPlacement=function(t,n){var i=this.tip(),a=i[0].offsetWidth,r=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),o=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(o)&&(o=0),t.top=t.top+s,t.left=t.left+o,e.offset.setOffset(i[0],e.extend({using:function(e){i.css({top:Math.round(e.top),left:Math.round(e.left)})}},t),0),i.addClass("in");var l=i[0].offsetWidth,d=i[0].offsetHeight;"top"==n&&d!=r&&(t.top=t.top+r-d);var u=this.getViewportAdjustedDelta(n,t,l,d);u.left?t.left+=u.left:t.top+=u.top;var c=u.left?2*u.left-a+l:2*u.top-r+d,h=u.left?"left":"top",p=u.left?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(c,i[0][p],h)},n.prototype.replaceArrow=function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},n.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},n.prototype.hide=function(){function t(){"in"!=n.hoverState&&i.detach(),n.$element.trigger("hidden.bs."+n.type)}var n=this,i=this.tip(),a=e.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(a),a.isDefaultPrevented()?void 0:(i.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i.one("bsTransitionEnd",t).emulateTransitionEnd(150):t(),this.hoverState=null,this)},n.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||"string"!=typeof e.attr("data-original-title"))&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(t){t=t||this.$element;var n=t[0],i="BODY"==n.tagName;return e.extend({},"function"==typeof n.getBoundingClientRect?n.getBoundingClientRect():null,{scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop(),width:i?e(window).width():t.outerWidth(),height:i?e(window).height():t.outerHeight()},i?{top:0,left:0}:t.offset())},n.prototype.getCalculatedOffset=function(e,t,n,i){return"bottom"==e?{top:t.top+t.height,left:t.left+t.width/2-n/2}:"top"==e?{top:t.top-i,left:t.left+t.width/2-n/2}:"left"==e?{top:t.top+t.height/2-i/2,left:t.left-n}:{top:t.top+t.height/2-i/2,left:t.left+t.width}},n.prototype.getViewportAdjustedDelta=function(e,t,n,i){var a={top:0,left:0};if(!this.$viewport)return a;var r=this.options.viewport&&this.options.viewport.padding||0,s=this.getPosition(this.$viewport);if(/right|left/.test(e)){var o=t.top-r-s.scroll,l=t.top+r-s.scroll+i;o<s.top?a.top=s.top-o:l>s.top+s.height&&(a.top=s.top+s.height-l)}else{var d=t.left-r,u=t.left+r+n;d<s.left?a.left=s.left-d:u>s.width&&(a.left=s.left+s.width-u)}return a},n.prototype.getTitle=function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||("function"==typeof n.title?n.title.call(t[0]):n.title)},n.prototype.getUID=function(e){do e+=~~(1e6*Math.random());while(document.getElementById(e));return e},n.prototype.tip=function(){return this.$tip=this.$tip||e(this.options.template)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(t){var n=this;t&&(n=e(t.currentTarget).data("bs."+this.type),n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n))),n.tip().hasClass("in")?n.leave(n):n.enter(n)},n.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var i=e.fn.tooltip;e.fn.tooltip=t,e.fn.tooltip.Constructor=n,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=i,this}}(jQuery),/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),a=i.data("bs.popover"),r="object"==typeof t&&t;(a||"destroy"!=t)&&(a||i.data("bs.popover",a=new n(this,r)),"string"==typeof t&&a[t]())})}var n=function(e,t){this.init("popover",e,t)};if(!e.fn.tooltip)throw new Error("Popover requires tooltip.js");n.VERSION="3.2.0",n.DEFAULTS=e.extend({},e.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),n.prototype=e.extend({},e.fn.tooltip.Constructor.prototype),n.prototype.constructor=n,n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.setContent=function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content").empty()[this.options.html?"string"==typeof n?"html":"append":"text"](n),e.removeClass("fade top bottom left right in"),e.find(".popover-title").html()||e.find(".popover-title").hide()},n.prototype.hasContent=function(){return this.getTitle()||this.getContent()},n.prototype.getContent=function(){var e=this.$element,t=this.options;return e.attr("data-content")||("function"==typeof t.content?t.content.call(e[0]):t.content)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},n.prototype.tip=function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip};var i=e.fn.popover;e.fn.popover=t,e.fn.popover.Constructor=n,e.fn.popover.noConflict=function(){return e.fn.popover=i,this}}(jQuery),/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */
function(e){var t=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(e){return!e||/^\s*$/.test(e)},escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isPlainObject,isUndefined:function(e){return"undefined"==typeof e},toStr:function(e){return t.isUndefined(e)||null===e?"":e+""},bind:e.proxy,each:function(t,n){function i(e,t){return n(t,e)}e.each(t,i)},map:e.map,filter:e.grep,every:function(t,n){var i=!0;return t?(e.each(t,function(e,a){return(i=n.call(null,a,e,t))?void 0:!1}),!!i):i},some:function(t,n){var i=!1;return t?(e.each(t,function(e,a){return(i=n.call(null,a,e,t))?!1:void 0}),!!i):i},mixin:e.extend,getUniqueId:function(){var e=0;return function(){return e++}}(),templatify:function(t){function n(){return String(t)}return e.isFunction(t)?t:n},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i,a;return function(){var r,s,o=this,l=arguments;return r=function(){i=null,n||(a=e.apply(o,l))},s=n&&!i,clearTimeout(i),i=setTimeout(r,t),s&&(a=e.apply(o,l)),a}},throttle:function(e,t){var n,i,a,r,s,o;return s=0,o=function(){s=new Date,a=null,r=e.apply(n,i)},function(){var l=new Date,d=t-(l-s);return n=this,i=arguments,0>=d?(clearTimeout(a),a=null,s=l,r=e.apply(n,i)):a||(a=setTimeout(o,d)),r}},noop:function(){}}}(),n="0.10.5",i=function(){"use strict";function e(e){return e=t.toStr(e),e?e.split(/\s+/):[]}function n(e){return e=t.toStr(e),e?e.split(/\W+/):[]}function i(e){return function(){var n=[].slice.call(arguments,0);return function(i){var a=[];return t.each(n,function(n){a=a.concat(e(t.toStr(i[n])))}),a}}}return{nonword:n,whitespace:e,obj:{nonword:i(n),whitespace:i(e)}}}(),a=function(){"use strict";function n(n){this.maxSize=t.isNumber(n)?n:100,this.reset(),this.maxSize<=0&&(this.set=this.get=e.noop)}function i(){this.head=this.tail=null}function a(e,t){this.key=e,this.val=t,this.prev=this.next=null}return t.mixin(n.prototype,{set:function(e,t){var n,i=this.list.tail;this.size>=this.maxSize&&(this.list.remove(i),delete this.hash[i.key]),(n=this.hash[e])?(n.val=t,this.list.moveToFront(n)):(n=new a(e,t),this.list.add(n),this.hash[e]=n,this.size++)},get:function(e){var t=this.hash[e];return t?(this.list.moveToFront(t),t.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new i}}),t.mixin(i.prototype,{add:function(e){this.head&&(e.next=this.head,this.head.prev=e),this.head=e,this.tail=this.tail||e},remove:function(e){e.prev?e.prev.next=e.next:this.head=e.next,e.next?e.next.prev=e.prev:this.tail=e.prev},moveToFront:function(e){this.remove(e),this.add(e)}}),n}(),r=function(){"use strict";function e(e){this.prefix=["__",e,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+t.escapeRegExChars(this.prefix))}function n(){return(new Date).getTime()}function i(e){return JSON.stringify(t.isUndefined(e)?null:e)}function a(e){return JSON.parse(e)}var r,s;try{r=window.localStorage,r.setItem("~~~","!"),r.removeItem("~~~")}catch(o){r=null}return s=r&&window.JSON?{_prefix:function(e){return this.prefix+e},_ttlKey:function(e){return this._prefix(e)+this.ttlKey},get:function(e){return this.isExpired(e)&&this.remove(e),a(r.getItem(this._prefix(e)))},set:function(e,a,s){return t.isNumber(s)?r.setItem(this._ttlKey(e),i(n()+s)):r.removeItem(this._ttlKey(e)),r.setItem(this._prefix(e),i(a))},remove:function(e){return r.removeItem(this._ttlKey(e)),r.removeItem(this._prefix(e)),this},clear:function(){var e,t,n=[],i=r.length;for(e=0;i>e;e++)(t=r.key(e)).match(this.keyMatcher)&&n.push(t.replace(this.keyMatcher,""));for(e=n.length;e--;)this.remove(n[e]);return this},isExpired:function(e){var i=a(r.getItem(this._ttlKey(e)));return t.isNumber(i)&&n()>i?!0:!1}}:{get:t.noop,set:t.noop,remove:t.noop,clear:t.noop,isExpired:t.noop},t.mixin(e.prototype,s),e}(),s=function(){"use strict";function n(t){t=t||{},this.cancelled=!1,this.lastUrl=null,this._send=t.transport?i(t.transport):e.ajax,this._get=t.rateLimiter?t.rateLimiter(this._get):this._get,this._cache=t.cache===!1?new a(0):l}function i(n){return function(i,a){function r(e){t.defer(function(){o.resolve(e)})}function s(e){t.defer(function(){o.reject(e)})}var o=e.Deferred();return n(i,a,r,s),o}}var r=0,s={},o=6,l=new a(10);return n.setMaxPendingRequests=function(e){o=e},n.resetCache=function(){l.reset()},t.mixin(n.prototype,{_get:function(e,t,n){function i(t){n&&n(null,t),u._cache.set(e,t)}function a(){n&&n(!0)}function l(){r--,delete s[e],u.onDeckRequestArgs&&(u._get.apply(u,u.onDeckRequestArgs),u.onDeckRequestArgs=null)}var d,u=this;this.cancelled||e!==this.lastUrl||((d=s[e])?d.done(i).fail(a):o>r?(r++,s[e]=this._send(e,t).done(i).fail(a).always(l)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(e,n,i){var a;return t.isFunction(n)&&(i=n,n={}),this.cancelled=!1,this.lastUrl=e,(a=this._cache.get(e))?t.defer(function(){i&&i(null,a)}):this._get(e,n,i),!!a},cancel:function(){this.cancelled=!0}}),n}(),o=function(){"use strict";function n(t){t=t||{},t.datumTokenizer&&t.queryTokenizer||e.error("datumTokenizer and queryTokenizer are both required"),this.datumTokenizer=t.datumTokenizer,this.queryTokenizer=t.queryTokenizer,this.reset()}function i(e){return e=t.filter(e,function(e){return!!e}),e=t.map(e,function(e){return e.toLowerCase()})}function a(){return{ids:[],children:{}}}function r(e){for(var t={},n=[],i=0,a=e.length;a>i;i++)t[e[i]]||(t[e[i]]=!0,n.push(e[i]));return n}function s(e,t){function n(e,t){return e-t}var i=0,a=0,r=[];e=e.sort(n),t=t.sort(n);for(var s=e.length,o=t.length;s>i&&o>a;)e[i]<t[a]?i++:e[i]>t[a]?a++:(r.push(e[i]),i++,a++);return r}return t.mixin(n.prototype,{bootstrap:function(e){this.datums=e.datums,this.trie=e.trie},add:function(e){var n=this;e=t.isArray(e)?e:[e],t.each(e,function(e){var r,s;r=n.datums.push(e)-1,s=i(n.datumTokenizer(e)),t.each(s,function(e){var t,i,s;for(t=n.trie,i=e.split("");s=i.shift();)t=t.children[s]||(t.children[s]=a()),t.ids.push(r)})})},get:function(e){var n,a,o=this;return n=i(this.queryTokenizer(e)),t.each(n,function(e){var t,n,i,r;if(a&&0===a.length)return!1;for(t=o.trie,n=e.split("");t&&(i=n.shift());)t=t.children[i];return t&&0===n.length?(r=t.ids.slice(0),void(a=a?s(a,r):r)):(a=[],!1)}),a?t.map(r(a),function(e){return o.datums[e]}):[]},reset:function(){this.datums=[],this.trie=a()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),n}(),l=function(){"use strict";function i(e){return e.local||null}function a(i){var a,r;return r={url:null,thumbprint:"",ttl:864e5,filter:null,ajax:{}},(a=i.prefetch||null)&&(a=t.isString(a)?{url:a}:a,a=t.mixin(r,a),a.thumbprint=n+a.thumbprint,a.ajax.type=a.ajax.type||"GET",a.ajax.dataType=a.ajax.dataType||"json",!a.url&&e.error("prefetch requires url to be set")),a}function r(n){function i(e){return function(n){return t.debounce(n,e)}}function a(e){return function(n){return t.throttle(n,e)}}var r,s;return s={url:null,cache:!0,wildcard:"%QUERY",replace:null,rateLimitBy:"debounce",rateLimitWait:300,send:null,filter:null,ajax:{}},(r=n.remote||null)&&(r=t.isString(r)?{url:r}:r,r=t.mixin(s,r),r.rateLimiter=/^throttle$/i.test(r.rateLimitBy)?a(r.rateLimitWait):i(r.rateLimitWait),r.ajax.type=r.ajax.type||"GET",r.ajax.dataType=r.ajax.dataType||"json",delete r.rateLimitBy,delete r.rateLimitWait,!r.url&&e.error("remote requires url to be set")),r}return{local:i,prefetch:a,remote:r}}();!function(n){"use strict";function a(t){t&&(t.local||t.prefetch||t.remote)||e.error("one of local, prefetch, or remote is required"),this.limit=t.limit||5,this.sorter=d(t.sorter),this.dupDetector=t.dupDetector||u,this.local=l.local(t),this.prefetch=l.prefetch(t),this.remote=l.remote(t),this.cacheKey=this.prefetch?this.prefetch.cacheKey||this.prefetch.url:null,this.index=new o({datumTokenizer:t.datumTokenizer,queryTokenizer:t.queryTokenizer}),this.storage=this.cacheKey?new r(this.cacheKey):null}function d(e){function n(t){return t.sort(e)}function i(e){return e}return t.isFunction(e)?n:i}function u(){return!1}var c,h;return c=n.Bloodhound,h={data:"data",protocol:"protocol",thumbprint:"thumbprint"},n.Bloodhound=a,a.noConflict=function(){return n.Bloodhound=c,a},a.tokenizers=i,t.mixin(a.prototype,{_loadPrefetch:function(t){function n(e){r.clear(),r.add(t.filter?t.filter(e):e),r._saveToStorage(r.index.serialize(),t.thumbprint,t.ttl)}var i,a,r=this;return(i=this._readFromStorage(t.thumbprint))?(this.index.bootstrap(i),a=e.Deferred().resolve()):a=e.ajax(t.url,t.ajax).done(n),a},_getFromRemote:function(e,t){function n(e,n){t(e?[]:r.remote.filter?r.remote.filter(n):n)}var i,a,r=this;if(this.transport)return e=e||"",a=encodeURIComponent(e),i=this.remote.replace?this.remote.replace(this.remote.url,e):this.remote.url.replace(this.remote.wildcard,a),this.transport.get(i,this.remote.ajax,n)},_cancelLastRemoteRequest:function(){this.transport&&this.transport.cancel()},_saveToStorage:function(e,t,n){this.storage&&(this.storage.set(h.data,e,n),this.storage.set(h.protocol,location.protocol,n),this.storage.set(h.thumbprint,t,n))},_readFromStorage:function(e){var t,n={};return this.storage&&(n.data=this.storage.get(h.data),n.protocol=this.storage.get(h.protocol),n.thumbprint=this.storage.get(h.thumbprint)),t=n.thumbprint!==e||n.protocol!==location.protocol,n.data&&!t?n.data:null},_initialize:function(){function n(){a.add(t.isFunction(r)?r():r)}var i,a=this,r=this.local;return i=this.prefetch?this._loadPrefetch(this.prefetch):e.Deferred().resolve(),r&&i.done(n),this.transport=this.remote?new s(this.remote):null,this.initPromise=i.promise()},initialize:function(e){return!this.initPromise||e?this._initialize():this.initPromise},add:function(e){this.index.add(e)},get:function(e,n){function i(e){var i=r.slice(0);t.each(e,function(e){var n;return n=t.some(i,function(t){return a.dupDetector(e,t)}),!n&&i.push(e),i.length<a.limit}),n&&n(a.sorter(i))}var a=this,r=[],s=!1;r=this.index.get(e),r=this.sorter(r).slice(0,this.limit),r.length<this.limit?s=this._getFromRemote(e,i):this._cancelLastRemoteRequest(),s||(r.length>0||!this.transport)&&n&&n(r)},clear:function(){this.index.reset()},clearPrefetchCache:function(){this.storage&&this.storage.clear()},clearRemoteCache:function(){this.transport&&s.resetCache()},ttAdapter:function(){return t.bind(this.get,this)}}),a}(this);var d=function(){return{wrapper:'<span class="twitter-typeahead"></span>',dropdown:'<span class="tt-dropdown-menu"></span>',dataset:'<div class="tt-dataset-%CLASS%"></div>',suggestions:'<span class="tt-suggestions"></span>',suggestion:'<div class="tt-suggestion"></div>'}}(),u=function(){"use strict";var e={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return t.isMsie()&&t.mixin(e.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),t.isMsie()&&t.isMsie()<=7&&t.mixin(e.input,{marginTop:"-1px"}),e}(),c=function(){"use strict";function n(t){t&&t.el||e.error("EventBus initialized without el"),this.$el=e(t.el)}var i="typeahead:";return t.mixin(n.prototype,{trigger:function(e){var t=[].slice.call(arguments,1);this.$el.trigger(i+e,t)}}),n}(),h=function(){"use strict";function e(e,t,n,i){var a;if(!n)return this;for(t=t.split(l),n=i?o(n,i):n,this._callbacks=this._callbacks||{};a=t.shift();)this._callbacks[a]=this._callbacks[a]||{sync:[],async:[]},this._callbacks[a][e].push(n);return this}function t(t,n,i){return e.call(this,"async",t,n,i)}function n(t,n,i){return e.call(this,"sync",t,n,i)}function i(e){var t;if(!this._callbacks)return this;for(e=e.split(l);t=e.shift();)delete this._callbacks[t];return this}function a(e){var t,n,i,a,s;if(!this._callbacks)return this;for(e=e.split(l),i=[].slice.call(arguments,1);(t=e.shift())&&(n=this._callbacks[t]);)a=r(n.sync,this,[t].concat(i)),s=r(n.async,this,[t].concat(i)),a()&&d(s);return this}function r(e,t,n){function i(){for(var i,a=0,r=e.length;!i&&r>a;a+=1)i=e[a].apply(t,n)===!1;return!i}return i}function s(){var e;return e=window.setImmediate?function(e){setImmediate(function(){e()})}:function(e){setTimeout(function(){e()},0)}}function o(e,t){return e.bind?e.bind(t):function(){e.apply(t,[].slice.call(arguments,0))}}var l=/\s+/,d=s();return{onSync:n,onAsync:t,off:i,trigger:a}}(),p=function(e){"use strict";function n(e,n,i){for(var a,r=[],s=0,o=e.length;o>s;s++)r.push(t.escapeRegExChars(e[s]));return a=i?"\\b("+r.join("|")+")\\b":"("+r.join("|")+")",n?new RegExp(a):new RegExp(a,"i")}var i={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(a){function r(t){var n,i,r;return(n=o.exec(t.data))&&(r=e.createElement(a.tagName),a.className&&(r.className=a.className),i=t.splitText(n.index),i.splitText(n[0].length),r.appendChild(i.cloneNode(!0)),t.parentNode.replaceChild(r,i)),!!n}function s(e,t){for(var n,i=3,a=0;a<e.childNodes.length;a++)n=e.childNodes[a],n.nodeType===i?a+=t(n)?1:0:s(n,t)}var o;a=t.mixin({},i,a),a.node&&a.pattern&&(a.pattern=t.isArray(a.pattern)?a.pattern:[a.pattern],o=n(a.pattern,a.caseSensitive,a.wordsOnly),s(a.node,r))}}(window.document),m=function(){"use strict";function n(n){var a,r,o,l,d=this;n=n||{},n.input||e.error("input is missing"),a=t.bind(this._onBlur,this),r=t.bind(this._onFocus,this),o=t.bind(this._onKeydown,this),l=t.bind(this._onInput,this),this.$hint=e(n.hint),this.$input=e(n.input).on("blur.tt",a).on("focus.tt",r).on("keydown.tt",o),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=t.noop),t.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(e){s[e.which||e.keyCode]||t.defer(t.bind(d._onInput,d,e))}):this.$input.on("input.tt",l),this.query=this.$input.val(),this.$overflowHelper=i(this.$input)}function i(t){return e('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:t.css("font-family"),fontSize:t.css("font-size"),fontStyle:t.css("font-style"),fontVariant:t.css("font-variant"),fontWeight:t.css("font-weight"),wordSpacing:t.css("word-spacing"),letterSpacing:t.css("letter-spacing"),textIndent:t.css("text-indent"),textRendering:t.css("text-rendering"),textTransform:t.css("text-transform")}).insertAfter(t)}function a(e,t){return n.normalizeQuery(e)===n.normalizeQuery(t)}function r(e){return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey}var s;return s={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},n.normalizeQuery=function(e){return(e||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")},t.mixin(n.prototype,h,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(e){var t=s[e.which||e.keyCode];this._managePreventDefault(t,e),t&&this._shouldTrigger(t,e)&&this.trigger(t+"Keyed",e)},_onInput:function(){this._checkInputValue()},_managePreventDefault:function(e,t){var n,i,a;switch(e){case"tab":i=this.getHint(),a=this.getInputValue(),n=i&&i!==a&&!r(t);break;case"up":case"down":n=!r(t);break;default:n=!1}n&&t.preventDefault()},_shouldTrigger:function(e,t){var n;switch(e){case"tab":n=!r(t);break;default:n=!0}return n},_checkInputValue:function(){var e,t,n;e=this.getInputValue(),t=a(e,this.query),n=t?this.query.length!==e.length:!1,this.query=e,t?n&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(e){this.query=e},getInputValue:function(){return this.$input.val()},setInputValue:function(e,t){this.$input.val(e),t?this.clearHint():this._checkInputValue()},resetInputValue:function(){this.setInputValue(this.query,!0)},getHint:function(){return this.$hint.val()},setHint:function(e){this.$hint.val(e)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var e,t,n,i;e=this.getInputValue(),t=this.getHint(),n=e!==t&&0===t.indexOf(e),i=""!==e&&n&&!this.hasOverflow(),!i&&this.clearHint()},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function(){var e=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=e},isCursorAtEnd:function(){var e,n,i;return e=this.$input.val().length,n=this.$input[0].selectionStart,t.isNumber(n)?n===e:document.selection?(i=document.selection.createRange(),i.moveStart("character",-e),e===i.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null}}),n}(),f=function(){"use strict";function n(n){n=n||{},n.templates=n.templates||{},n.source||e.error("missing source"),n.name&&!r(n.name)&&e.error("invalid dataset name: "+n.name),this.query=null,this.highlight=!!n.highlight,this.name=n.name||t.getUniqueId(),this.source=n.source,this.displayFn=i(n.display||n.displayKey),this.templates=a(n.templates,this.displayFn),this.$el=e(d.dataset.replace("%CLASS%",this.name))}function i(e){function n(t){return t[e]}return e=e||"value",t.isFunction(e)?e:n}function a(e,n){function i(e){return"<p>"+n(e)+"</p>"}return{empty:e.empty&&t.templatify(e.empty),header:e.header&&t.templatify(e.header),footer:e.footer&&t.templatify(e.footer),suggestion:e.suggestion||i}}function r(e){return/^[_a-zA-Z0-9-]+$/.test(e)}var s="ttDataset",o="ttValue",l="ttDatum";return n.extractDatasetName=function(t){return e(t).data(s)},n.extractValue=function(t){return e(t).data(o)},n.extractDatum=function(t){return e(t).data(l)},t.mixin(n.prototype,h,{_render:function(n,i){function a(){return f.templates.empty({query:n,isEmpty:!0})}function r(){function a(t){var n;return n=e(d.suggestion).append(f.templates.suggestion(t)).data(s,f.name).data(o,f.displayFn(t)).data(l,t),n.children().each(function(){e(this).css(u.suggestionChild)}),n}var r,c;return r=e(d.suggestions).css(u.suggestions),c=t.map(i,a),r.append.apply(r,c),f.highlight&&p({className:"tt-highlight",node:r[0],pattern:n}),r}function c(){return f.templates.header({query:n,isEmpty:!m})}function h(){return f.templates.footer({query:n,isEmpty:!m})}if(this.$el){var m,f=this;this.$el.empty(),m=i&&i.length,!m&&this.templates.empty?this.$el.html(a()).prepend(f.templates.header?c():null).append(f.templates.footer?h():null):m&&this.$el.html(r()).prepend(f.templates.header?c():null).append(f.templates.footer?h():null),this.trigger("rendered")}},getRoot:function(){return this.$el},update:function(e){function t(t){n.canceled||e!==n.query||n._render(e,t)}var n=this;this.query=e,this.canceled=!1,this.source(e,t)},cancel:function(){this.canceled=!0},clear:function(){this.cancel(),this.$el.empty(),this.trigger("rendered")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=null}}),n}(),_=function(){"use strict";function n(n){var a,r,s,o=this;n=n||{},n.menu||e.error("menu is required"),this.isOpen=!1,this.isEmpty=!0,this.datasets=t.map(n.datasets,i),a=t.bind(this._onSuggestionClick,this),r=t.bind(this._onSuggestionMouseEnter,this),s=t.bind(this._onSuggestionMouseLeave,this),this.$menu=e(n.menu).on("click.tt",".tt-suggestion",a).on("mouseenter.tt",".tt-suggestion",r).on("mouseleave.tt",".tt-suggestion",s),t.each(this.datasets,function(e){o.$menu.append(e.getRoot()),e.onSync("rendered",o._onRendered,o)})}function i(e){return new f(e)}return t.mixin(n.prototype,h,{_onSuggestionClick:function(t){this.trigger("suggestionClicked",e(t.currentTarget))},_onSuggestionMouseEnter:function(t){this._removeCursor(),this._setCursor(e(t.currentTarget),!0)},_onSuggestionMouseLeave:function(){this._removeCursor()},_onRendered:function(){function e(e){return e.isEmpty()}this.isEmpty=t.every(this.datasets,e),this.isEmpty?this._hide():this.isOpen&&this._show(),this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block")},_getSuggestions:function(){return this.$menu.find(".tt-suggestion")},_getCursor:function(){return this.$menu.find(".tt-cursor").first()},_setCursor:function(e,t){e.first().addClass("tt-cursor"),!t&&this.trigger("cursorMoved")},_removeCursor:function(){this._getCursor().removeClass("tt-cursor")},_moveCursor:function(e){var t,n,i,a;if(this.isOpen){if(n=this._getCursor(),t=this._getSuggestions(),this._removeCursor(),i=t.index(n)+e,i=(i+1)%(t.length+1)-1,-1===i)return void this.trigger("cursorRemoved");-1>i&&(i=t.length-1),this._setCursor(a=t.eq(i)),this._ensureVisible(a)}},_ensureVisible:function(e){var t,n,i,a;t=e.position().top,n=t+e.outerHeight(!0),i=this.$menu.scrollTop(),a=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),0>t?this.$menu.scrollTop(i+t):n>a&&this.$menu.scrollTop(i+(n-a))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(e){this.$menu.css("ltr"===e?u.ltr:u.rtl)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(e){var t=null;return e.length&&(t={raw:f.extractDatum(e),value:f.extractValue(e),datasetName:f.extractDatasetName(e)}),t},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(e){function n(t){t.update(e)}t.each(this.datasets,n)},empty:function(){function e(e){e.clear()}t.each(this.datasets,e),this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){function e(e){e.destroy()}this.$menu.off(".tt"),this.$menu=null,t.each(this.datasets,e)}}),n}(),g=function(){"use strict";function n(n){var a,r,s;n=n||{},n.input||e.error("missing input"),this.isActivated=!1,this.autoselect=!!n.autoselect,this.minLength=t.isNumber(n.minLength)?n.minLength:1,this.$node=i(n.input,n.withHint),a=this.$node.find(".tt-dropdown-menu"),r=this.$node.find(".tt-input"),s=this.$node.find(".tt-hint"),r.on("blur.tt",function(e){var n,i,s;n=document.activeElement,i=a.is(n),s=a.has(n).length>0,t.isMsie()&&(i||s)&&(e.preventDefault(),e.stopImmediatePropagation(),t.defer(function(){r.focus()}))}),a.on("mousedown.tt",function(e){e.preventDefault()}),this.eventBus=n.eventBus||new c({el:r}),this.dropdown=new _({menu:a,datasets:n.datasets}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onAsync("datasetRendered",this._onDatasetRendered,this),this.input=new m({input:r,hint:s}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this),this._setLanguageDirection()}function i(t,n){var i,r,o,l;i=e(t),r=e(d.wrapper).css(u.wrapper),o=e(d.dropdown).css(u.dropdown),l=i.clone().css(u.hint).css(a(i)),l.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly",!0).attr({autocomplete:"off",spellcheck:"false",tabindex:-1}),i.data(s,{dir:i.attr("dir"),autocomplete:i.attr("autocomplete"),spellcheck:i.attr("spellcheck"),style:i.attr("style")}),i.addClass("tt-input").attr({autocomplete:"off",spellcheck:!1}).css(n?u.input:u.inputWithNoHint);try{!i.attr("dir")&&i.attr("dir","auto")}catch(c){}return i.wrap(r).parent().prepend(n?l:null).append(o)}function a(e){return{backgroundAttachment:e.css("background-attachment"),backgroundClip:e.css("background-clip"),backgroundColor:e.css("background-color"),backgroundImage:e.css("background-image"),backgroundOrigin:e.css("background-origin"),backgroundPosition:e.css("background-position"),backgroundRepeat:e.css("background-repeat"),backgroundSize:e.css("background-size")}}function r(e){var n=e.find(".tt-input");t.each(n.data(s),function(e,i){t.isUndefined(e)?n.removeAttr(i):n.attr(i,e)}),n.detach().removeData(s).removeClass("tt-input").insertAfter(e),e.remove()}var s="ttAttrs";return t.mixin(n.prototype,{_onSuggestionClicked:function(e,t){var n;(n=this.dropdown.getDatumForSuggestion(t))&&this._select(n)},_onCursorMoved:function(){var e=this.dropdown.getDatumForCursor();this.input.setInputValue(e.value,!0),this.eventBus.trigger("cursorchanged",e.raw,e.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue(),this._updateHint()},_onDatasetRendered:function(){this._updateHint()},_onOpened:function(){this._updateHint(),this.eventBus.trigger("opened")},_onClosed:function(){this.input.clearHint(),this.eventBus.trigger("closed")},_onFocused:function(){this.isActivated=!0,this.dropdown.open()},_onBlurred:function(){this.isActivated=!1,this.dropdown.empty(),this.dropdown.close()},_onEnterKeyed:function(e,t){var n,i;n=this.dropdown.getDatumForCursor(),i=this.dropdown.getDatumForTopSuggestion(),n?(this._select(n),t.preventDefault()):this.autoselect&&i&&(this._select(i),t.preventDefault())},_onTabKeyed:function(e,t){var n;(n=this.dropdown.getDatumForCursor())?(this._select(n),t.preventDefault()):this._autocomplete(!0)},_onEscKeyed:function(){this.dropdown.close(),this.input.resetInputValue()},_onUpKeyed:function(){var e=this.input.getQuery();this.dropdown.isEmpty&&e.length>=this.minLength?this.dropdown.update(e):this.dropdown.moveCursorUp(),this.dropdown.open()},_onDownKeyed:function(){var e=this.input.getQuery();this.dropdown.isEmpty&&e.length>=this.minLength?this.dropdown.update(e):this.dropdown.moveCursorDown(),this.dropdown.open()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},_onQueryChanged:function(e,t){this.input.clearHintIfInvalid(),t.length>=this.minLength?this.dropdown.update(t):this.dropdown.empty(),this.dropdown.open(),this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint(),this.dropdown.open()},_setLanguageDirection:function(){var e;this.dir!==(e=this.input.getLanguageDirection())&&(this.dir=e,this.$node.css("direction",e),this.dropdown.setLanguageDirection(e))},_updateHint:function(){var e,n,i,a,r,s;e=this.dropdown.getDatumForTopSuggestion(),e&&this.dropdown.isVisible()&&!this.input.hasOverflow()?(n=this.input.getInputValue(),i=m.normalizeQuery(n),a=t.escapeRegExChars(i),r=new RegExp("^(?:"+a+")(.+$)","i"),s=r.exec(e.value),s?this.input.setHint(n+s[1]):this.input.clearHint()):this.input.clearHint()},_autocomplete:function(e){var t,n,i,a;t=this.input.getHint(),n=this.input.getQuery(),i=e||this.input.isCursorAtEnd(),t&&n!==t&&i&&(a=this.dropdown.getDatumForTopSuggestion(),a&&this.input.setInputValue(a.value),this.eventBus.trigger("autocompleted",a.raw,a.datasetName))},_select:function(e){this.input.setQuery(e.value),this.input.setInputValue(e.value,!0),this._setLanguageDirection(),this.eventBus.trigger("selected",e.raw,e.datasetName),this.dropdown.close(),t.defer(t.bind(this.dropdown.empty,this.dropdown))},open:function(){this.dropdown.open()},close:function(){this.dropdown.close()},setVal:function(e){e=t.toStr(e),this.isActivated?this.input.setInputValue(e):(this.input.setQuery(e),this.input.setInputValue(e,!0)),this._setLanguageDirection()},getVal:function(){return this.input.getQuery()},destroy:function(){this.input.destroy(),this.dropdown.destroy(),r(this.$node),this.$node=null}}),n}();!function(){"use strict";var n,i,a;n=e.fn.typeahead,i="ttTypeahead",a={initialize:function(n,a){function r(){var r,s,o=e(this);t.each(a,function(e){e.highlight=!!n.highlight}),s=new g({input:o,eventBus:r=new c({el:o}),withHint:t.isUndefined(n.hint)?!0:!!n.hint,minLength:n.minLength,autoselect:n.autoselect,datasets:a}),o.data(i,s)}return a=t.isArray(a)?a:[].slice.call(arguments,1),n=n||{},this.each(r)},open:function(){function t(){var t,n=e(this);(t=n.data(i))&&t.open()}return this.each(t)},close:function(){function t(){var t,n=e(this);(t=n.data(i))&&t.close()}return this.each(t)},val:function(t){function n(){var n,a=e(this);(n=a.data(i))&&n.setVal(t)}function a(e){var t,n;return(t=e.data(i))&&(n=t.getVal()),n}return arguments.length?this.each(n):a(this.first())},destroy:function(){function t(){var t,n=e(this);(t=n.data(i))&&(t.destroy(),n.removeData(i))}return this.each(t)}},e.fn.typeahead=function(t){var n;return a[t]&&"initialize"!==t?(n=this.filter(function(){return!!e(this).data(i)}),a[t].apply(n,[].slice.call(arguments,1))):a.initialize.apply(this,arguments)},e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this}}()}(window.jQuery),function(){$(document).on("rails_admin.dom_ready",function(e,t){var n,i,a,r,s,o,l,d;return t=t?t:$("form"),t.length&&(t.find("[data-color]").each(function(){var e;return e=this,$(this).ColorPicker({color:$(e).val(),onShow:function(e){return $(e).fadeIn(500),!1},onHide:function(e){return $(e).fadeOut(500),!1},onChange:function(t,n,i){return $(e).val(n),$(e).css("backgroundColor","#"+n)}})}),$.fn.datetimepicker.defaults.icons={time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-chevron-up",down:"fa fa-chevron-down",previous:"fa fa-angle-double-left",next:"fa fa-angle-double-right",today:"fa fa-dot-circle-o",clear:"fa fa-trash",close:"fa fa-times"},t.find("[data-datetimepicker]").each(function(){var e;return e=$(this).data("options"),$.extend(e,{locale:RailsAdmin.I18n.locale}),$(this).datetimepicker(e)}),t.find("[data-enumeration]").each(function(){return $(this).is("[multiple]")?$(this).filteringMultiselect($(this).data("options")):$(this).filteringSelect($(this).data("options"))}),t.find("[data-fileupload]").each(function(){var e;return e=this,$(this).on("click",".delete input[type='checkbox']",function(){return $(e).children(".toggle").toggle("slow")})}),t.find("[data-fileupload]").change(function(){var e,t,n,i;return n=this,t=$("#"+n.id).parent().children(".preview"),t.length||(t=$("#"+n.id).parent().prepend($("<img />").addClass("preview").addClass("img-thumbnail")).find("img.preview"),t.parent().find("img:not(.preview)").hide()),e=$("#"+n.id).val().split(".").pop().toLowerCase(),n.files&&n.files[0]&&-1!==$.inArray(e,["gif","png","jpg","jpeg","bmp"])?(i=new FileReader,i.onload=function(e){return t.attr("src",e.target.result)},i.readAsDataURL(n.files[0]),t.show()):t.hide()}),t.find("[data-filteringmultiselect]").each(function(){return $(this).filteringMultiselect($(this).data("options")),$(this).parents("#modal").length?$(this).siblings(".btn").remove():$(this).parents(".control-group").first().remoteForm()}),t.find("[data-filteringselect]").each(function(){return $(this).filteringSelect($(this).data("options")),$(this).parents("#modal").length?$(this).siblings(".btn").remove():$(this).parents(".control-group").first().remoteForm()}),t.find("[data-nestedmany]").each(function(){var e,t,n,i;return e=$(this).parents(".control-group").first(),t=e.find("> .controls > .nav"),n=e.find("> .tab-content"),i=e.find("> .controls > .btn-group > .toggler"),n.children(".fields:not(.tab-pane)").addClass("tab-pane").each(function(){return $(this).attr("id","unique-id-"+(new Date).getTime()+Math.floor(1e5*Math.random())),t.append('<li><a data-toggle="tab" href="#'+this.id+'">'+$(this).children(".object-infos").data("object-label")+"</a></li>")}),0===t.find("> li.active").length&&t.find("> li > a[data-toggle='tab']:first").tab("show"),0===t.children().length?(t.hide(),n.hide(),i.addClass("disabled").removeClass("active").children("i").addClass("icon-chevron-right")):i.hasClass("active")?(t.show(),n.show(),i.children("i").addClass("icon-chevron-down")):(t.hide(),n.hide(),i.children("i").addClass("icon-chevron-right"))}),t.find("[data-nestedone]").each(function(){var e,t,n,i,a;return e=$(this).parents(".control-group").first(),n=e.find("> .controls > .nav"),i=e.find("> .tab-content"),a=e.find("> .controls > .btn-group > .toggler"),
i.children(".fields:not(.tab-pane)").addClass("tab-pane active").each(function(){return e.find("> .controls .add_nested_fields").removeClass("add_nested_fields").html($(this).children(".object-infos").data("object-label")),n.append('<li><a data-toggle="tab" href="#'+this.id+'">'+$(this).children(".object-infos").data("object-label")+"</a></li>")}),t=n.find("> li > a[data-toggle='tab']:first"),t.tab("show"),e.find("> .controls > [data-target]:first").html('<i class="icon-white"></i> '+t.html()),n.hide(),0===n.children().length?(n.hide(),i.hide(),a.addClass("disabled").removeClass("active").children("i").addClass("icon-chevron-right")):a.hasClass("active")?(a.children("i").addClass("icon-chevron-down"),i.show()):(a.children("i").addClass("icon-chevron-right"),i.hide())}),t.find("[data-polymorphic]").each(function(){var e,t,n,i;return n=$(this),e=n.parents(".control-group").first(),t=e.find("select").last(),i=n.data("urls"),n.on("change",function(e){return""===$(this).val()?t.html('<option value=""></option>'):$.ajax({url:i[n.val()],data:{compact:!0,all:!0},beforeSend:function(e){return e.setRequestHeader("Accept","application/json")},success:function(e,n,i){var a;return a=$("<option></option>"),$(e).each(function(e,t){var n;return n=$("<option></option>"),n.attr("value",t.id),n.text(t.label),a=a.add(n)}),t.html(a)}})})}),s=function(){return t.find("[data-richtext=ckeditor]").not(".ckeditored").each(function(e,t){var n;try{(n=window.CKEDITOR.instances[this.id])&&n.destroy(!0)}catch(i){}return window.CKEDITOR.replace(this,$(this).data("options")),$(this).addClass("ckeditored")})},n=t.find("[data-richtext=ckeditor]").not(".ckeditored"),n.length&&(window.CKEDITOR?s():(d=n.first().data("options"),window.CKEDITOR_BASEPATH=d.base_location,$.getScript(d.jspath,function(e){return function(e,t,n){return s()}}(this)))),o=function(e){return function(e){return e.each(function(e,t){var n;return d=$(this).data("options"),n=this,$.getScript(d.locations.mode,function(e,t,i){return $("head").append('<link href="'+d.locations.theme+'" rel="stylesheet" media="all" type="text/css">'),CodeMirror.fromTextArea(n,d.options),$(n).addClass("codemirrored")})})}}(this),i=t.find("[data-richtext=codemirror]").not(".codemirrored"),i.length&&(this.array=i,window.CodeMirror?o(this.array):(d=$(i[0]).data("options"),$("head").append('<link href="'+d.csspath+'" rel="stylesheet" media="all" type="text/css">'),$.getScript(d.jspath,function(e){return function(t,n,i){return o(e.array)}}(this)))),r=function(e){return function(e,t){return e.each(function(){return $(this).addClass("bootstrap-wysihtml5ed"),$(this).closest(".controls").addClass("well"),$(this).wysihtml5(t)})}}(this),i=t.find("[data-richtext=bootstrap-wysihtml5]").not(".bootstrap-wysihtml5ed"),i.length&&(this.array=i,d=$(i[0]).data("options"),a=$.parseJSON(d.config_options),window.wysihtml5?r(this.array,a):($("head").append('<link href="'+d.csspath+'" rel="stylesheet" media="all" type="text/css">'),$.getScript(d.jspath,function(e){return function(t,n,i){return r(e.array,a)}}(this)))),l=function(e){return function(e){return e.each(function(){var e;return d=$(this).data("options"),a=$.parseJSON(d.config_options),a?a.inlineMode||(a.inlineMode=!1):a={inlineMode:!1},e=a.imageUploadURL?a.imageUploadParams={authenticity_token:$("meta[name=csrf-token]").attr("content")}:void 0,$(this).addClass("froala-wysiwyged"),$(this).editable(a),e?$(this).on("editable.imageError",function(e,t,n){alert("error uploading image: "+n.message),0===n.code||1===n.code||2===n.code||3===n.code||4===n.code||5===n.code||6===n.code||7===n.code}).on("editable.afterRemoveImage",function(e,t,n){t.options.imageDeleteParams={src:n.attr("src"),authenticity_token:$("meta[name=csrf-token]").attr("content")},t.deleteImage(n)}).on("editable.imageDeleteSuccess",function(e,t,n){}).on("editable.imageDeleteError",function(e,t,n){return alert("error deleting image: "+n.message)}):void 0})}}(this),i=t.find("[data-richtext=froala-wysiwyg]").not(".froala-wysiwyged"),i.length)?(d=$(i[0]).data("options"),$.isFunction($.fn.editable)?l(i):($("head").append('<link href="'+d.csspath+'" rel="stylesheet" media="all" type="text/css">'),$.getScript(d.jspath,function(e){return function(e,t,n){return l(i)}}(this)))):void 0})}.call(this),function(){var e;e=jQuery,e(document).on("click","#list input.toggle",function(){return e("#list [name='bulk_ids[]']").prop("checked",e(this).is(":checked"))}),e(document).on("click",".pjax",function(t){if(t.which>1||t.metaKey||t.ctrlKey);else{if(e.support.pjax)return t.preventDefault(),e.pjax({container:e(this).data("pjax-container")||"[data-pjax-container]",url:e(this).data("href")||e(this).attr("href"),timeout:2e3});if(e(this).data("href"))return window.location=e(this).data("href")}}),e(document).on("submit",".pjax-form",function(t){return e.support.pjax?(t.preventDefault(),e.pjax({container:e(this).data("pjax-container")||"[data-pjax-container]",url:this.action+(-1!==this.action.indexOf("?")?"&":"?")+e(this).serialize(),timeout:2e3})):void 0}),e(document).on("pjax:start",function(){return e("#loading").show()}).on("pjax:end",function(){return e("#loading").hide()}),e(document).on("click","[data-target]",function(){if(!e(this).hasClass("disabled")){if(e(this).has("i.icon-chevron-down").length)return e(this).removeClass("active").children("i").toggleClass("icon-chevron-down icon-chevron-right"),e(e(this).data("target")).select(":visible").hide("slow");if(e(this).has("i.icon-chevron-right").length)return e(this).addClass("active").children("i").toggleClass("icon-chevron-down icon-chevron-right"),e(e(this).data("target")).select(":hidden").show("slow")}}),e(document).on("click",".form-horizontal legend",function(){return e(this).has("i.icon-chevron-down").length?(e(this).siblings(".control-group:visible").hide("slow"),e(this).children("i").toggleClass("icon-chevron-down icon-chevron-right")):e(this).has("i.icon-chevron-right").length?(e(this).siblings(".control-group:hidden").show("slow"),e(this).children("i").toggleClass("icon-chevron-down icon-chevron-right")):void 0}),e(document).on("click","form .tab-content .tab-pane a.remove_nested_one_fields",function(){return e(this).children('input[type="hidden"]').val(e(this).hasClass("active")).siblings("i").toggleClass("icon-check icon-trash")}),e(document).ready(function(){return e(document).trigger("rails_admin.dom_ready")}),e(document).on("pjax:end",function(){return e(document).trigger("rails_admin.dom_ready")}),e(document).on("rails_admin.dom_ready",function(){return e(".animate-width-to").each(function(){var t,n;return t=e(this).data("animate-length"),n=e(this).data("animate-width-to"),e(this).animate({width:n},t,"easeOutQuad")}),e(".form-horizontal legend").has("i.icon-chevron-right").each(function(){return e(this).siblings(".control-group").hide()}),e(".table").tooltip({selector:"th[rel=tooltip]"}),e("[formnovalidate]").on("click",function(){return e(this).closest("form").attr("novalidate",!0)})}),e(document).on("click","#fields_to_export label input#check_all",function(){var t;return t=e("#fields_to_export label input"),e("#fields_to_export label input#check_all").is(":checked")?e(t).prop("checked",!0):e(t).prop("checked",!1)}),e(document).on("pjax:popstate",function(){e(document).one("pjax:end",function(t){e(t.target).find("script").each(function(){e.globalEval(this.text||this.textContent||this.innerHTML||"")})})}),e(document).on("click","#remove_filter",function(t){return t.preventDefault(),e("#filters_box").html(""),e("hr.filters_box").hide(),e(this).parent().siblings("input[type='search']").val(""),e(this).parents("form").submit()})}.call(this),function(){}.call(this);
$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($(window).width() < 767) && !switched ){
      switched = true;
      $("table.responsive").each(function(i, element) {
        splitTable($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  $(window).on("resize", updateTables);


	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");

		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");

		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
	}

	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

});
/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/

  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort

  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/



var stIsIE = /*@cc_on!@*/false;

sorttable = {
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    // kill the timer
    if (_timer) clearInterval(_timer);

    if (!document.createElement || !document.getElementsByTagName) return;

    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });

  },

  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    // Safari doesn't support table.tHead, sigh
    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];

    if (table.tHead.rows.length != 1) return; // can't cope with two header rows

    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        // table doesn't have a tfoot. Create one.
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }

    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      // manually override the type with a sorttable_type attribute
      if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	        headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
	      } else {
	        headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
	      }
	      // make it clickable to sort
	      headrow[i].sorttable_columnindex = i;
	      headrow[i].sorttable_tbody = table.tBodies[0];
	      dean_addEvent(headrow[i],"click", sorttable.innerSortFunction = function(e) {

          if (this.className.search(/\bsorttable_sorted\b/) != -1) {
            // if we're already sorted by this column, just
            // reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted',
                                                    'sorttable_sorted_reverse');
            this.removeChild(document.getElementById('sorttable_sortfwdind'));
            sortrevind = document.createElement('span');
            sortrevind.id = "sorttable_sortrevind";
            sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : '&nbsp;&#x25B4;';
            this.appendChild(sortrevind);
            return;
          }
          if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
            // if we're already sorted by this column in reverse, just
            // re-reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted_reverse',
                                                    'sorttable_sorted');
            this.removeChild(document.getElementById('sorttable_sortrevind'));
            sortfwdind = document.createElement('span');
            sortfwdind.id = "sorttable_sortfwdind";
            sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
            this.appendChild(sortfwdind);
            return;
          }

          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }

          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
          this.appendChild(sortfwdind);

	        // build an array to sort. This is a Schwartzian transform thing,
	        // i.e., we "decorate" each row with the actual sort key,
	        // sort based on the sort keys, and then put the rows back in order
	        // which is a lot faster because you only do getInnerText once per row
	        row_array = [];
	        col = this.sorttable_columnindex;
	        rows = this.sorttable_tbody.rows;
	        for (var j=0; j<rows.length; j++) {
	          row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
	        }
	        /* If you want a stable sort, uncomment the following line */
	        //sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
	        /* and comment out this one */
	        row_array.sort(this.sorttable_sortfunction);

	        tb = this.sorttable_tbody;
	        for (var j=0; j<row_array.length; j++) {
	          tb.appendChild(row_array[j][1]);
	        }

	        delete row_array;
	      });
	    }
    }
  },

  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },

  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.

    if (!node) return "";

    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;

    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },

  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },

  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,''));
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    if (a[0]==b[0]) return 0;
    if (a[0]<b[0]) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },

  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//








;
