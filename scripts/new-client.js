// Creates a new client folder with a random key.
// Usage:  node scripts/new-client.js            -> random 6-char key
//         node scripts/new-client.js 8          -> random 8-char key
//
// Result:  clients/<key>/data.json   (edit the details)
//          clients/<key>/photo.jpg   (add the photo yourself)
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE = 'https://nfcxz.vercel.app';
const CHARS = 'abcdefghijkmnpqrstuvwxyz23456789'; // no look-alikes (l/1, o/0)
const length = Math.max(4, parseInt(process.argv[2], 10) || 6);
const clientsDir = path.join(__dirname, '..', 'clients');

function randomKey() {
  let k = '';
  for (const b of crypto.randomBytes(length)) k += CHARS[b % CHARS.length];
  return k;
}

let key;
do { key = randomKey(); } while (fs.existsSync(path.join(clientsDir, key)));

const template = {
  firstName: 'First',
  middle: '',
  lastName: 'Last',
  title: 'Job Title | Company',
  bio: 'Short description about the client.',
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

const dir = path.join(clientsDir, key);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(template, null, 2) + '\n');

console.log(`Created  clients/${key}/data.json`);
console.log(`Photo    clients/${key}/photo.jpg  (add this file)`);
console.log(`URL      ${SITE}/${key}`);
