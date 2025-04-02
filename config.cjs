const fs = require("fs");
require("dotenv").config();

const parseBoolean = (value, defaultValue) => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

const config = {
  // Session Configuration
  SESSION_ID: process.env.SESSION_ID || "CYBER-DEXTER-MD [KILL]>>>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUxHa21QaldhUzFJRjkrVWpVYkl4cDByM2EwTkNpbmVYRXh4OVdhQWRVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlhFN3hMUWZFWUp1YzI0ZGRmTkd3cHd0anFwN0V6TDF2Qm11UTdTbTEyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVRnRvdS91VXJORUZOYWhLYnRaQU9RenBEbzcwOUwvOVE0bVUzU3pZaWt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXd0crNisxbEJUZTlUT3o0MXBBNGdkeFJnRGhPaHpleFVSRXdlSnl0MlR3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNFY0FVS29qY05ybGhuSzNVeU9Sc2RmZ3NtNURDZ3hQcmhVenBZRWRrbEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZSUHl5QzJ1TW93ODF6NWNMS2hwRkdoYjNRWXJiVnlPSXZaYnRvc1JJelU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUIzTFk1a2ZuaWJndnorYTZMQURYNk9UV2xObk9Qa29iNTlVZDIxc3BHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVAzbFI3SEc2U0dQdnFWQjZJTVNETFdwY0E2THJIOGNmbmoxVmo3SEFSWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJXcGw0R2hOTHB6cDhjNFpRNTk4MGVsY2E1ZTBySWdtdkRGWW9mdnkwMlNlbGtBMTZJUXNjeEZlbTRadGJacnNwZG85QjVtTFI0YUNqTmM1cXNaWWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6IjNoZVVzOVpRMXk5K3VoeTlETkd6OXNrc1Z3WDA4NmV3R1lWVXlsS3MrTGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InlpbmRJbExLU0NPQWhUR0RTYU5IQmciLCJwaG9uZUlkIjoiYmQ3YThmMTctZWY4Ni00MDZiLTgxYzQtMjZlM2RlYzMwNzc3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF0WG5MaU5KMWU5b3BIbFMyWEJ6S0RSV2RtYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1ZFR6M1BKcTljdE1qZXZoSC84RjdVTUNocnc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTlkyN1dRQU4iLCJtZSI6eyJpZCI6Ijk0NzIyMzAyMDc5OjU1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkAgfiBcbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbi5cbiBSS0MifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0s3TWc4d0ZFTSt6czc4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IktYeU1SMlE4ZGtnWTJjVDE3bCtMdGFBZWdqd3Zabm9JRE8vVWpBbFI4VGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlUyUWJFYitBYm9ISE9CbFBQa3ZXeGVrZjd1emYzU1FrUXVQRUEvelhWbGlydDkrUEVlR0p3ZVNQNWI4SXlpSEhjdktNZjM1UzFWVGNtZE9tV2NkL0NnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsR0pnamdUaXFOeEN6bDVzMkhLY3Q0cDIzYUVXdFFQRUhkelBjbnhKVTIzOUo0YWVNWEtrTDBnRURRVXV1aGEvdURtQVZpT0ZRc01oYVlwVytaWlVqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzIyMzAyMDc5OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNsOGpFZGtQSFpJR05uRTllNWZpN1dnSG9JOEwyWjZDQXp2MUl3SlVmRTQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDM1NzU1MTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQlduIn0=",
  PREFIX: process.env.PREFIX || ".",
  
  // Auto Features
  AUTO_STATUS_SEEN: parseBoolean(process.env.AUTO_STATUS_SEEN, true),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, true),
  AUTO_STATUS_REPLY: parseBoolean(process.env.AUTO_STATUS_REPLY, false),
  AUTO_STATUS_REPLY_VOICE: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE, false),
  AUTO_STATUS_REPLY_VOICE_MULTI: parseBoolean(process.env.AUTO_STATUS_REPLY_VOICE_MULTI, false),
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || "*📍 Auto Status Seen Bot By CYBER-DEXTER-MD*",

  AUTO_DL: parseBoolean(process.env.AUTO_DL, false),
  AUTO_READ: parseBoolean(process.env.AUTO_READ, false),
  AUTO_TYPING: parseBoolean(process.env.AUTO_TYPING, true),
  AUTO_RECORDING: parseBoolean(process.env.AUTO_RECORDING, false),
  AUTO_STATUS_REACT: parseBoolean(process.env.AUTO_STATUS_REACT, true),
  ALWAYS_ONLINE: parseBoolean(process.env.ALWAYS_ONLINE, false),

  // Call Settings
  REJECT_CALL: parseBoolean(process.env.REJECT_CALL, false),

  // General Settings
  NOT_ALLOW: parseBoolean(process.env.NOT_ALLOW, true),
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤CYBER-DEXTER",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94785274495",

  // API Keys
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",

  // Features
  WELCOME: parseBoolean(process.env.WELCOME, true),

  // Trigger Words
  triggerWords: [
    "ඔනි", "send", "එවන්න", "sent", "giv", "gib", "upload",
    "send me", "sent me", "znt", "snt", "ayak", "do", "mee", "autoread"
  ],
};

module.exports = config;
