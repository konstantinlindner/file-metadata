# video-utils

This repository contains utilties for in-app video content. It includes tools to get metadata from video files or urls in a CSV file as well as video compression scripts.

## Metadata

For file input, it takes one or more video files and returns both a CSV and a JSON file with fields:

- file (filename)
- extension (i.e "mp4")
- mime (i.e "video/mp4")
- hash (hexadecimal sha256 hash of the file)
- duration (duration in seconds)
- durationMs (duration in ms)
- size (file size in bytes)

For CSV input, it takes a single CSV file with at least one header named "link" containing the urls. It will return a CSV and JSON file with the same fields as in the input file, with the addition of fields:

- duration (duration in seconds)
- durationMs (duration in ms)

## Video compression

The script can also compress video files using FFmpeg.

## Instructions

1. Install FFmpeg on your machine if you don't already have it

```bash
brew install ffmpeg
```

2. Install dependencies

```bash
pnpm i
```

- To utilize the file option, create a directory "fileInput" in the root of the project and add any video files you want to process.

- To utilize the CSV option, create a directory "csvInput" in the root of the project and add a single CSV file. The file must contain a header called "link". It can optionally contain any other fields you may want.

- To compress video files, place any videos inside the directory named "fileInput" in the root of the project and choose the option to create low res videos after running the script.

3. Run the script

```bash
pnpm launch
```

- Once run, you get to select what you want to do. Let the script complete. Once finished, results will be found in the output folder.
