## Guardigen: Your Personal Password Generator

### Why It’s Awesome:<br>
:heavy_minus_sign: **Works Offline:** No internet? No worries!<br>
:heavy_minus_sign: **No Data Stored:** Like a digital ghost—no evidence left behind.<br>
:heavy_minus_sign: **Uncrackable:** So secure, even the most dedicated hackers will need a magic wand.<br>
:heavy_minus_sign: **Cryptographically Secure:** We don’t mess around with security.<br>
:heavy_minus_sign: **No More Forgotten Passwords:** You’ll never need to recall them again.<br>
:heavy_minus_sign: **Generate Passwords On The Go:** Like a password-generating genie.<br>
:heavy_minus_sign: **Consistent Output for Same Input:** Always the same password for the same login.<br>
:heavy_minus_sign: **Single Key to Rule Them All:** One key to create all your unique passwords.<br>
:heavy_minus_sign: **Progressive Web App:** Install it on any device and feel the tech magic.<br>
:heavy_minus_sign: **Unique, Strong Passwords for Every Account:** Because you deserve the best protection.<br>
:heavy_minus_sign: **Only the Key Owner Can Generate Passwords:** No one else can crack your code.<br>

### How It Works:<br>
Guardigen is more like a password calculator than a random generator. Imagine it like this: Website + Username + Secret Key = Your special, uncrackable password. Since only you know the specific details, only you can generate the password—no memory required!

Guardigen operates entirely on your device. It doesn’t store or transmit any data. We use advanced encryption techniques to keep your passwords secure, ensuring that your data stays private and protected.

### Technical Details:<br>
**1. Local-Only Operation:** No data is sent or stored remotely—everything stays on your device.<br>
**2. Double Encryption:** We use SHA3-512 hashing combined with scrypt for top-tier security. Scrypt’s memory and CPU hardness make brute-force attacks extremely difficult.<br>
**3. High-Quality Randomness:** SHAKE-256 provides the randomness needed to generate secure passwords.<br>
**4. Big Integer Magic:** A 256-bit random number creates unique indices for password characters, ensuring high entropy.<br>
**5. Sophisticated Seeding:** The scrypt output seeds the SHAKE CSPRNG, which uses Big Endian byte order to produce a 256-bit integer, ensuring robust security.<br>
**6. Maximum Entropy:** We maximize entropy to protect against potential threats.<br>
**7. No Data Residue:** All operations are done in real-time with no data stored or cached.<br>

### Ready to upgrade your password game? Check out Guardigen on GitHub and start securing your accounts with style!
