var m_OutputFlags = { debug: false };
var m_DebugTrace = [];

MSG_TYPE = Object.freeze(
{
	"LOG":		0,
	"WARN":		1,
	"DEBUG":	2,
	"ERROR":	3,
	"INFO":		4
});


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
//--------------------------------------------------------------------------------------\\
// General
//--------------------------------------------------------------------------------------\\
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function processResponse(response, code, output, isHTML=false)
{
	debug("utils.processResponse");

	var type = isHTML ? "text/html" : "text/plain";
	response.writeHead(code, {"Content-Type": type});
	response.write(output);
	response.end();
}
exports.processResponse = processResponse;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function sleep(milliSeconds, callback) 
{
	if (callback != null)
		setTimeout(callback, milliSeconds); 
	else
	{
		// This method should not be used within a loop. Use sparingly or callback instead
		var startTime = Date.now();
		while (Date.now() < startTime + milliSeconds);
	}
}
exports.sleep = sleep;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function trimString(aString, length)
{
	if (aString == null || typeof aString != "string") return aString;
	aString = aString.trim();
	if (aString.length > length)
	{
		if (aString.length > 3)
			return aString.substring(0, length - 3) + "...";
		else
			return aString.substring(0, length);
	}
	else
		return aString;
}
exports.trimString = trimString;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function removeLastChar(aString)
{
	if (aString == null || typeof aString != "string") return aString;
	if (aString.length < 1 ) return aString;
	return aString.substring(0, aString.length - 1);
}
exports.removeLastChar = removeLastChar;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function stringToFloat(aString)
{
	if (aString == null || typeof aString == "number") return aString;
	if (typeof aString != "string") return 0.0;
	return (aString.trim() != "" ? parseFloat(aString) : 0.0);
}
exports.stringToFloat = stringToFloat;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function stringReplaceAll(aString, search, replacement)
{
	if (aString == null || typeof aString != "string" || 
		search == null || replacement == null) return aString;
	return aString.replace(search, replacement);
}
exports.stringReplaceAll = stringReplaceAll;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function stringToSql(aString)
{
	return stringReplaceAll(aString, "'", "''");
}
exports.stringToSql = stringToSql; 

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function dictionaryToString(aDict)
{
	if (aDict == null || aDict instanceof Object == false) return "";
	return JSON.stringify(aDict);
}
exports.dictionaryToString = dictionaryToString;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function dateToSql(aDate)
{
	if (aDate == null || aDate instanceof Date == false) return aDate;
	return aDate.toISOString().slice(0, 19).replace('T', ' ');
}
exports.dateToSql = dateToSql; 

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function newDate(aDate)
{
	if (aDate == null || aDate instanceof Date == false) aDate = new Date();
	var offset = aDate.getTimezoneOffset() * -(60 * 1000);
	return new Date(aDate.getTime() + offset);
}
exports.newDate = newDate;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function round(value, precision) 
{
	if (value == null) return null;
	if (precision == null) precision = 0;
	var factor = Math.pow(10, precision);
	return Math.round(value * factor) / factor;
}
exports.round = round;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function trunc(value, precision) 
{
	if (value == null) return null;
	if (precision == null) precision = 0;
	var factor = Math.pow(10, precision);
	return Math.trunc(value * factor) / factor;
}
exports.trunc = trunc;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function numberWithCommas(value, decimals=0) 
{
	if (value == null) return null;
	if (decimals == null || decimals < 0) decimals = 0;
	var formatValue = parseFloat(value).toFixed(decimals);
	var leftFormat = formatValue;
	var rightFormat = "";
	var decimalIndex = formatValue.indexOf(".");
	if (decimalIndex > -1)
	{
		leftFormat = formatValue.substr(0, decimalIndex);
		rightFormat = formatValue.substr(decimalIndex, formatValue.length);
	}
	return leftFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + rightFormat;
}
exports.numberWithCommas = numberWithCommas;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function arrayAverage(array)
{
	if (array == null || array.length < 1) return null;
	return array.reduce((a, b) => a + b, 0 ) / array.length;
}
exports.arrayAverage = arrayAverage;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function uniqueArray(array)
{
	if (array == null) return null;
	return Array.from(new Set(array));
}
exports.uniqueArray = uniqueArray;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function arrayIsUnique(array)
{
	if (array == null) return null;
	return array.length == uniqueArray(array).length;
}
exports.arrayIsUnique = arrayIsUnique;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function removeItemFromArray(array, item)
{
	if (array == null || item == null) return array;
	var index = array.indexOf(item);
	if (index > -1) 
		array.splice(index, 1);
	return array;
}
exports.removeItemFromArray = removeItemFromArray;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function copy(sourceObject, destinationObject)
{
	if (sourceObject == null || sourceObject instanceof Object == false) return null;
	if (destinationObject == null || destinationObject instanceof Object == false) return null;
	// Object.assign does a deep copy where all references of the copy still point to the original.
	// So, to prevent that, we create a shallow copy of the source first
	var shallowCopySource = shallowCopy(sourceObject);
	Object.assign(destinationObject, shallowCopySource);
	return destinationObject;
}
exports.copy = copy;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function shallowCopy(sourceObject, protectAgainstCircularRef=false)
{
	if (sourceObject == null || sourceObject instanceof Object == false) return null;
	return (protectAgainstCircularRef) ? JSON.parse(stringify(sourceObject)) : JSON.parse(JSON.stringify(sourceObject));
}
exports.shallowCopy = shallowCopy;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function stringify(sourceObject)
{
	var cache = [];
	var results = JSON.stringify(sourceObject, function(key, value) 
	{
		if (typeof value === 'object' && value !== null) 
		{
			if (cache.indexOf(value) !== -1) 
			{
				// Duplicate reference found
				try 
				{
					// If this value does not reference a parent it can be deduped
					return JSON.parse(JSON.stringify(value));
				} 
				catch (error) 
				{
					// discard key if value cannot be deduped
					return;
				}
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null;
	return results;
}

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function getStackTrace(error)
{
    let stack = error.stack || '';
    stack = stack.split('\n').map(function (line) { return line.trim(); });
    return stack; 
}
exports.getStackTrace = getStackTrace;


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
//--------------------------------------------------------------------------------------\\
// Messages 
//--------------------------------------------------------------------------------------\\
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function getDisplayTime(aDate)
{
	if (aDate == null) aDate = new Date();
	var month = ((aDate.getMonth() + 1) < 10) ? "0" + (aDate.getMonth() + 1) : (aDate.getMonth() + 1);
	var day = (aDate.getDate() < 10) ? "0" + aDate.getDate() : aDate.getDate();
	var hour = (aDate.getHours() < 10) ? "0" + aDate.getHours() : aDate.getHours();
	var min = (aDate.getMinutes() < 10) ? "0" + aDate.getMinutes() : aDate.getMinutes();
	var sec = (aDate.getSeconds() < 10) ? "0" + aDate.getSeconds() : aDate.getSeconds();	
	var milli = (aDate.getMilliseconds() < 100) ? "0" + aDate.getMilliseconds() : aDate.getMilliseconds();
	milli = (aDate.getMilliseconds() < 10) ? "0" + milli : milli;
	return aDate.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + "." + sec + "" + milli;
}

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function outputMsg(msgType, msg, newLine=false, outIndex=null)
{
	_setBaseAndFullMsg = function(typeLabel)
	{
		var temp = "";
		if (isStringable)
		{
			if (msgType === MSG_TYPE.ERROR && msg.stack != null) temp = msg.stack.toString();
			else if (msg.message != null) temp = msg.message.toString();
			else temp = msg.toString();
		}
		baseMsg += typeLabel;
		fullMsg = "\r" + baseMsg + temp;
	}
	//====================================================================================

	if (msg == null) return;
	var logPrompt = "      ] ";
	const isStringable = (typeof msg == "string" || msg instanceof Object);
	var timePrompt = getDisplayTime();
	var baseMsg = timePrompt;
	var fullMsg = "";
	if (newLine) console.log(baseMsg + logPrompt); 		
	switch(msgType)
	{
		case MSG_TYPE.LOG: 		
			_setBaseAndFullMsg(logPrompt); 
			console.log(fullMsg, (isStringable ? "" : msg)); 		
			break;			
		case MSG_TYPE.WARN:		
			_setBaseAndFullMsg("  Warn] ");
			console.warn(fullMsg, (isStringable ? "" : msg)); 		
			break;
		case MSG_TYPE.DEBUG:
			_setBaseAndFullMsg(" debug] ");
			if (m_OutputFlags.debug)
				console.log(fullMsg, (isStringable ? "" : msg)); 
			break;
		case MSG_TYPE.INFO:
			_setBaseAndFullMsg("  info] ");
			console.info(fullMsg, (isStringable ? "" : msg)); 
			break;
		case MSG_TYPE.ERROR: 	
			_setBaseAndFullMsg(" ERROR] ");
			console.error(fullMsg, (isStringable ? "" : msg)); 		
			break;
	}
}

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function log(value, newLine=false)
{
	outputMsg(MSG_TYPE.LOG, value, newLine);
}
exports.log = log;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function warn(value, newLine=false)
{
	outputMsg(MSG_TYPE.WARN, value, newLine);
}
exports.warn = warn;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function info(value, newLine=false)
{
	outputMsg(MSG_TYPE.INFO, value, newLine);
}
exports.info = info;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function debug(value, newLine=false)
{
	// Add the incoming value to our debug (stack) trace 
	m_DebugTrace.unshift(value);
	if (m_DebugTrace.length > 13) m_DebugTrace.pop();
	outputMsg(MSG_TYPE.DEBUG, value, newLine);
}
exports.debug = debug;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function error(value)
{
	outputMsg(MSG_TYPE.ERROR, value);
}
exports.error = error;

//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function getDebugTrace()
{
	var output = [];
	m_DebugTrace.forEach(function(item, index, array) 
	{
		output.push(item);
	});
	return output;
}
exports.getDebugTrace = getDebugTrace;


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
//--------------------------------------------------------------------------------------\\
// Administrative Stuff
//--------------------------------------------------------------------------------------\\
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
function setDebugMode(value)
{
    m_OutputFlags.debug = (value === true);
}
exports.setDebugMode = setDebugMode;

