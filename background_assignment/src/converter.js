// Usage:
// ```
// const conversion = require("./bytes32conversion.js");
// const text = "hello";
// const bytes = conversion.stringToBytes32(text);
// const textBackAndForth = conversion.bytes32ToString(bytes);
// assert.equal(text, textBackAndForth);
// ```
const Buffer = require("buffer").Buffer;
const encoding = "utf-8"


function stringToBytes32(text) {
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

function bytes32ToString(bytes) {
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

module.exports = {
    stringToBytes32,
    bytes32ToString
}
