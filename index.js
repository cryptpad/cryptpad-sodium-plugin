const SODIUM = {};
let SodiumNative;
try {
    SodiumNative = require('sodium-native');
} catch (e) {}

if (SodiumNative) {
    SODIUM.crypto = {
        open: (signedMsg, validateKey) => {
            let msg = signedMsg.subarray(64);
            return SodiumNative.crypto_sign_open(msg, signedMsg, validateKey);
        },
        detachedVerify: (signedBuffer, signatureBuffer, validateKey) => {
            return SodiumNative.crypto_sign_verify_detached(signatureBuffer, signedBuffer, validateKey);
        }
    };
}

module.exports = {
  name: "SODIUM",
  modules: SODIUM
};

