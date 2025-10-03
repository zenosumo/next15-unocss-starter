---
allowed-tools: Bash(ls:*), Bash(rm:*), Bash(find:*)
description: Delete files from /logs folder if it exists
---

Delete all files from the logs folder if it exists.

First check if the logs folder exists: !`ls -la logs 2>/dev/null || echo "logs folder does not exist"`

If the logs folder exists, delete all files in it: !`find logs -type f -delete 2>/dev/null && echo "All files deleted from logs folder" || echo "No files to delete or logs folder doesn't exist"`