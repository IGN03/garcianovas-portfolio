// get-token.js

const client_id = '8f3c097439df4ae4a85b50756ec7e295';
const client_secret = '98869c5137eb47c3b23a0d491ec464dd';
const code = "AQD6aHa6kgen-TpxcEkuzPwbTuQARf8qhLP8IJ0ZZhZXu8jzDWV5nIBWVyW13XDM7PTUs5U85O1F8VF3F6lJy5oGQbMtLjId69BbJCa6zKI0wzgbtMii_yrrH12eOCKHMK0bO92F9AwBK2uOCGaP62T3IyZMXHS9NjDN3MeECQcq8ubtYedGtCkAkXARQ9SDDKvX5B_5X8XIlXxwJclAqrwtBWiZ_WO5QalY-ylceoohOFqj7vYuB35SF7t1PiL4";

// Base64 encode the keys for Spotify's security requirement
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://127.0.0.1:5173'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('\n=== COPY THIS REFRESH TOKEN ===\n');
    console.log(data.refresh_token);
    console.log('\n===============================\n');
  })
  .catch(err => console.error('Error:', err));