# NFC Digital Cards

Each client gets their own page at `https://nfcxz.vercel.app/<key>`.
There is no login. Pages are only edited by changing files in this repo and pushing,
so only people with push access to the GitHub repo can edit them.

## Add a client

```bash
node scripts/new-client.js        # prints the new key and URL
```

1. Edit the new `clients/<key>.json` with the client's details.
2. Put their photo at `profileClients/<key>.jpg`.
3. `git add . && git commit -m "Add client" && git push` and Vercel redeploys.
4. Write `https://nfcxz.vercel.app/<key>` to the NFC tag.

## Edit or remove a client

- Edit: change `clients/<key>.json`, then commit and push.
- Remove: delete `clients/<key>.json`. The link will show "Card not found".

`/` (the home page) uses `clients/home.json`.

## JSON fields

All fields are optional except `firstName`. Missing ones are hidden on the page.

| Field | Example |
|---|---|
| `firstName`, `middle`, `lastName` | `"Jovic"`, `"S."`, `"Mejica"` |
| `title` | `"BSIT Student \| Web System Developer"` |
| `bio` | Short paragraph |
| `photo`, `photoAlt` | `"/profileClients/abc123.jpg"` |
| `phone` | `"+639948038429"` (used for call/SMS/vCard) |
| `phoneDisplay` | `"+63 994 803 8429"` (shown on page) |
| `email`, `emailSubject` | |
| `socials` | `[{ "type": "facebook", "url": "..." }]` |

Social `type` values: `facebook`, `tiktok`, `instagram`, `linkedin`, `github`, `youtube`,
`x`, `whatsapp`, `telegram`, `messenger`, `website`. Add `"label"` to override the button text.
