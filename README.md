# file-metadata

This is a script to get metadata from video file. It takes one or more video files and returns a JSON with fields

- file (filename)
- extension (i.e "mp4")
- mime (i.e "video/mp4")
- hash (hexadecimal sha256 hash of the file)
- durationMs (duration in ms)
- size (file size in bytes)

## Instructions

Install dependencies

```
pnpm i
```

Create a new folder "input" in the root of the project and add any videos file you want to process

Run the script

```
pnpm getVideoInfo
```

See JSON file in output folder
