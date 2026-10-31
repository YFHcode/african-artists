Fonts for the share images (app/share), from Google Fonts. The Latin fonts are
WOFF 1.0 files for the image renderer (it reads WOFF and TrueType, not WOFF2).
The Arabic font is set by sharp's text engine (Pango and HarfBuzz, which shape
and order Arabic correctly), which needs TrueType: the *.ttf files are the
Google Fonts WOFF files unpacked, with no other change (Inter's TrueType copy
sets the Latin parts of Arabic lines and of credits with an Arabic name).

- Fraunces 600, optical size 144, latin and latin-ext. Copyright The Fraunces
  Project Authors.
- Inter 400 and 600, latin and latin-ext. Copyright The Inter Project Authors.
- IBM Plex Sans Arabic 400 and 600, arabic. Copyright IBM Corp., with Reserved
  Font Name "Plex".

All three are licensed under the SIL Open Font License, Version 1.1:
https://openfontlicense.org
