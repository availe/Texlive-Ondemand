## Introduction

Serving TexLive Files in an On-Demand Manner.

To start the server, run `docker-compose up --build`.

If the `.fmt` files are outdated, first run `docker-compose up --build`, and then open `public/index.html` and click the
download buttons. The
updated files will be saved to
your computer's download directory. Replace `swiftlatexpdftex.fmt` and `swiftlatexxetex.fmt` with the
newly
downloaded versions.

Notes:

- Port locations are assigned in `public/script.js` and `docker-compose.yml`.
- The `/public` directory is only required to compile new .fmt files. It's included in the `.dockerignore`
  file.