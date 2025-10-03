#!/usr/bin/env python3
import json, os, sys
from datetime import datetime
from pathlib import Path

LOG_FILENAME = "claude-hooks.log"

def extract_text_from_prompt(prompt_data):
    if isinstance(prompt_data, str):
        return prompt_data
    if isinstance(prompt_data, list):
        parts = []
        for item in prompt_data:
            if isinstance(item, dict) and item.get("type") == "text":
                parts.append(item.get("text", ""))
            elif isinstance(item, str):
                parts.append(item)
        return "\n".join(parts)
    if isinstance(prompt_data, dict):
        if "text" in prompt_data:
            return str(prompt_data["text"])
    return str(prompt_data) if prompt_data else ""

def main():
    try:
        data = json.load(sys.stdin)
    except Exception as e:
        sys.exit(0)

    project_dir = Path(os.environ.get("CLAUDE_PROJECT_DIR", Path.cwd()))
    log_dir = project_dir / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    ts = datetime.now().isoformat(timespec="seconds")
    prompt = data.get("prompt", "")
    session_id = data.get("session_id", "")

    clean_prompt_text = extract_text_from_prompt(prompt)
    log_file = log_dir / LOG_FILENAME
    try:
        with log_file.open("a", encoding="utf-8") as f:
            f.write(f"{ts} Start session={session_id or 'unknown'} ----- USER PROMPT ----- \n")
            f.write(f"{clean_prompt_text}\n")
    except IOError:
        pass

    sys.exit(0)

if __name__ == "__main__":
    main()
