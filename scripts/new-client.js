// Creates a new client card with a random key.
// Usage:  node scripts/new-client.js            -> random 6-char key
//         node scripts/new-client.js 8          -> random 8-char key
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE = 'https://nfcxz.vercel.app';
const CHARS = 'abcdefghijkmnpqrstuvwxyz23456789'; // no look-alikes (l/1, o/0)
const length = Math.max(4, parseInt(process.argv[2], 10) || 6);
const dir = path.join(__dirname, '..', 'clients');

function randomKey() {
  let k = '';
  for (const b of crypto.randomBytes(length)) k += CHARS[b % CHARS.length];
  return k;
}

let key;
do { key = randomKey(); } while (fs.existsSync(path.join(dir, `${key}.json`)));

const template = {
  firstName: 'First',
  middle: '',
  lastName: 'Last',
  title: 'Job Title | Company',
  bio: 'Short description about the client.',
  photo: `/profileClients/${key}.jpg`,
  photoAlt: 'Photo of the client',
  phone: '+639000000000',
  phoneDisplay: '+63 900 000 0000',
  email: 'client@example.com',
  emailSubject: 'Inquiry',
  socials: [
    { type: 'facebook', url: 'https://www.facebook.com/' },
    { type: 'instagram', url: 'https://www.instagram.com/' },
  ],
};

fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${key}.json`);
fs.writeFileSync(file, JSON.stringify(template, null, 2) + '\n');

console.log(`Created  clients/${key}.json`);
console.log(`Photo    profileClients/${key}.jpg  (add this file)`);
console.log(`URL      ${SITE}/${key}`);
