# file-metadata

This is a script to get metadata from video files or from urls in a CSV file. It will output the results in folder "output" as both CSV and JSON.

For files, it takes one or more video files and returns both a CSV and a JSON file with fields:

- file (filename)
- extension (i.e "mp4")
- mime (i.e "video/mp4")
- hash (hexadecimal sha256 hash of the file)
- duration (duration in seconds)
- durationMs (duration in ms)
- size (file size in bytes)

For CSV, it takes a single CSV file with at least one header named "link" containing the urls. It will return a CSV and JSON file with the same fields as in the input file, with the addition of fields:

- duration (duration in seconds)
- durationMs (duration in ms)

## Instructions

- Install dependencies

```
pnpm i
```

To utilize the file option, create a directory "fileInput" in the root of the project and add any video files you want to process.

To utilize the CSV option, create a directory "csvInput" in the root of the project and add a single CSV file. The file must contain a header called "link". It can optionally contain any other fields you may want.

See example directory for example files and structure.

- Run the script

```
pnpm getMetadata
```

- Once run, you get to select if you want to get metadata from files, CSV or both. Let the script complete. Once finished, results will be found in the output folder.
