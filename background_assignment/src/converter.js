// Usage:
// ```
// const Converter = require("./converter.js");
// const text = "hello";
// const bytes = Converter.stringToBytes32(text);
// const textBackAndForth = Converter.bytes32ToString(bytes);
// assert.equal(text, textBackAndForth);
// const solTimestamp = 1650890064;
// console.log(Converter.solTimestampToString(solTimestamp));
// // Prints e.g. 'Mon Apr 25 2022 21:34:24 GMT+0900 (Japan Standard Time)'.
// ```
const Buffer = require("buffer").Buffer;
const defaultEncoding = "utf8"

function stringToBytes32(text, encoding = defaultEncoding) {
    // For example, if text is "hello",
    // then buf is <Buffer 68 65 6c 6c 6f>.
    let bufShort = Buffer.from(text, encoding);
    if (bufShort.length > 32) {
        throw new Error(
            "Parameter must be representable with 32 bytes or fewer."
        )
    }
    // `bufLong` is initiated as the buffer of length 32 filled with zeros:
    //  <Buffer 00 00 00 00 00 00 00 ... 00>
    let bufLong = Buffer.alloc(32);
    // Copy the content of bufShort to bufLong.
    // In effect, bufLong becomes bufShort with padded zeros.
    // For example, bufLong becomes
    //  <Buffer 68 65 6c 6c 6f 00 00 ... 00>
    bufShort.copy(bufLong);

    // For example, hexRep is "0x68656c6c6f00...0"
    let hexRep = "0x" + bufLong.toString("hex")
    return hexRep;
}

function bytes32ToString(bytes, encoding = defaultEncoding) {
    // Strip the leading "0x" prefix if necessary.
    // For example, if bytes is "0x68656c6c6f00...0",
    // then bytes becomes "68656c6c6f00...0".
    if (bytes.slice(0, 2) === "0x") {
        bytes = bytes.slice(2);
    }
    // For example, buf is <Buffer 68 65 6c 6c 6f 00 00 ... 00>.
    let buf = Buffer.from(bytes, "hex");
    // For example, string is "hello\x00\x00...\x00".
    let string = buf.toString(encoding);
    // For example, stringSliced is "hello".
    let stringSliced = string.replaceAll("\x00", "");
    return stringSliced;
}

function solTimestampToString(solTimestamp) {
    // Solidity and JavaScript (more precisely, the built-in Date class) use
    // seconds and milliseconds since the UNIX epoch as units of time.
    // For example, if solTimestamp is 1650890064, then jsTimestamp is 1650890064000.
    let jsTimestamp = solTimestamp * 1000;
    // Instantiates a Date object.
    let datetime = new Date(jsTimestamp);
    // datetime.toString() would return 
    return datetime.toString();
}

module.exports = {
    stringToBytes32,
    bytes32ToString,
    solTimestampToString,
}
