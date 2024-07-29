## Guardigen: Your Personal Password Generator

### Why It’s Awesome:
✔ **Works Offline:** No internet? No worries!
✔ **No Data Stored:** Like a digital ghost—no evidence left behind.
✔ **Uncrackable:** So secure, even the most dedicated hackers will need a magic wand.
✔ **Cryptographically Secure:** We don’t mess around with security.
✔ **No More Forgotten Passwords:** You’ll never need to recall them again.
✔ **Generate Passwords On The Go:** Like a password-generating genie.
✔ **Consistent Output for Same Input:** Always the same password for the same login.
✔ **Single Key to Rule Them All:** One key to create all your unique passwords.
✔ **Progressive Web App:** Install it on any device and feel the tech magic.
✔ **Unique, Strong Passwords for Every Account:** Because you deserve the best protection.
✔ **Only the Key Owner Can Generate Passwords:** No one else can crack your code.

### How It Works:
Guardigen is more like a password calculator than a random generator. Imagine it like this: Website + Username + Secret Key = Your special, uncrackable password. Since only you know the specific details, only you can generate the password—no memory required!

Guardigen operates entirely on your device. It doesn’t store or transmit any data. We use advanced encryption techniques to keep your passwords secure, ensuring that your data stays private and protected.

### Technical Details:
**Local-Only Operation:** No data is sent or stored remotely—everything stays on your device.
**Double Encryption:** We use SHA3-512 hashing combined with scrypt for top-tier security. Scrypt’s memory and CPU hardness make brute-force attacks extremely difficult.
**High-Quality Randomness:** SHAKE-256 provides the randomness needed to generate secure passwords.
**Big Integer Magic:** A 256-bit random number creates unique indices for password characters, ensuring high entropy.
**Sophisticated Seeding:** The scrypt output seeds the SHAKE CSPRNG, which uses Big Endian byte order to produce a 256-bit integer, ensuring robust security.
**Maximum Entropy:** We maximize entropy to protect against potential threats.
**No Data Residue:** All operations are done in real-time with no data stored or cached.

Ready to upgrade your password game? Check out Guardigen on GitHub and start securing your accounts with style!
