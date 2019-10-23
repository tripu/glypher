# Glypher

*Browser extension for quick copy'n'paste of miscellaneous characters*

![Glypher logo](https://github.com/tripu/glypher/blob/master/img/logo-256.png?raw=true)

**Contents:**

1. [Installation](#1-installation)
1. [Usage](#2-usage)
1. [Development](#3-development)
1. [Credits](#4-credits)

## 1. Installation

(For now, only as a temporary extension)

**Firefox:**

1. Go to `about:debugging#/runtime/this-firefox`
1. Click on *Load Temporary Add-on…*
1. Select the *manifest* (`dist/firefox/manifest.json`)

**Chrom\*:**

1. Go to `chrome://extensions/`
1. Click on *Developer mode*
1. Click on *Load unpacked*
1. Select the *directory* (`dist/chrome/`)

## 2. Usage

Bring up the glyphs pop-up by either:

* Clicking the icon on the toolbar,    
  ![Icon](https://github.com/tripu/glypher/blob/master/screenshots/icon.png?raw=true)
* or pressing `Ctrl`+`↑` (`⌘`+`↑` on Mac)

Then, on the glyphs pop-up, find the symbol you need, double-click it to select, and copy it to the clipboard.

![Screenshot](https://github.com/tripu/glypher/blob/master/screenshots/popup.png?raw=true)

Press either `Esc` or `↵` to close the pop-up, and paste the glyph wherever needed.

**NB:** this is *not* the intended final behaviour: usage will be seamless when we implement the ability to *move around the glyphs*
using the cursor keys, and then use `↵` to *automatically* copy the highlighted glyph to the clipboard *and* immediately close the pop-up.
That way, the whole operation is a handful of key strokes, and the user does not need to use the mouse at all.

## 3. Development

Prerequisites: [Bash](https://www.gnu.org/software/bash/) and [jq](https://stedolan.github.io/jq/).

```bash
./build.sh
```

Then, find the resulting temporary extensions under `dist/firefox/` and `dist/chrome/`.

## 4. Credits

Copyright &copy; 2019 tripu ([`t@tripu.info`](mailto:t@tripu.info), [`https://tripu.info`](https://tripu.info/))

This project is licenced [under the terms of the MIT licence](https://github.com/tripu/glypher/blob/master/LICENSE.md).

Logo: [`A-small glyphs.svg`](https://commons.wikimedia.org/wiki/File:A-small_glyphs.svg) licenced
[CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en) by
[Wickey-nl](https://commons.wikimedia.org/wiki/User:Wickey-nl)
