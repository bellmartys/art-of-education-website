Version 2.0 (22 Nov 2026)
  Design refresh of version 1. Same wording, photos and PowerPoint links.
  - Arch shape used across the site: Home page links, artist portraits, About picture
  - Home: row of arch links to each page under the main picture
  - About: picture beside the text instead of one large blue box
  - Rich Learning: intro paragraphs in a light band, matching Artistic Representation
  - Text columns narrowed to a comfortable reading width (about 66 characters)
  - New footer with name and page links on every page
  - All five PowerPoints included in the site (no Wix links left)

Bell Martys website
===================

View it on this computer
  Double-click index.html. Or, from this folder, run:  python3 -m http.server 8000
  then open http://localhost:8000

Put it online
  Upload this whole folder as-is to any static host (Netlify, Cloudflare Pages,
  GitHub Pages, or ordinary web hosting). There is nothing to build or install.

Artist portraits (Artistic Representation page)
  Each artist tile shows initials until a photo is added. Save each portrait into
  images/artists/ named after the artist, as .jpg, .png or .webp:
    bridget-riley, bobbi-lockyer, barbara-kruger, yayoi-kusama, else-bostelmann,
    andy-warhol, malena-valcarcel, zim-and-zou, yaacov-agam, keith-haring,
    frida-kahlo, sheila-hicks, magda-sayeg, victor-vasarely, ben-lewis-giles,
    roy-lichtenstein, yulia-brodskaya, jason-decaires-taylor, kurt-schwitters,
    guillaume-kurkdjian
  Example: images/artists/frida-kahlo.jpg

PowerPoint samples (Rich Learning page)
  All five PowerPoints are in the "downloads" folder and the Rich Learning
  buttons point there; nothing is loaded from Wix any more. They total about
  267 MB (largest 83 MB), so check the host's per-file size limit.
  The Typography file has the new typewriter cover (the Getty image was removed).

Editing text
  Each page is one .html file; the wording sits in plain <p> paragraphs.
  Colours, fonts and spacing are all in css/styles.css.
