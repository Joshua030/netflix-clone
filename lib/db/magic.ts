
const { Magic } = require('@magic-sdk/admin');

export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY??''); // ✨