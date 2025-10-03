#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.8"
# ///
import json, os, sys, uuid, time, tempfile
from datetime import datetime
from pathlib import Path

# Toggle here: set to True to enable summary+TTS, False to disable
ENABLE_TTS = True

TTL_SEC = int(os.getenv("CLAUDE_SUMMARY_TTL_SEC", "600"))

def now_iso():
    return datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

def read_json_stdin():
    try:
        return json.load(sys.stdin)
    except Exception as e:
        return {"error": f"failed to parse stdin: {e}"}

def read_lock(lock_path: Path):
    if not lock_path.exists():
        return None
    try:
        return json.loads(lock_path.read_text(encoding="utf-8"))
    except Exception:
        return None

def write_lock_atomic(lock_path: Path, payload: dict):
    tmp = lock_path.with_suffix(lock_path.suffix + ".tmp")
    tmp.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    os.replace(tmp, lock_path)

def main():
    data = read_json_stdin()
    session_id = data.get("session_id", "unknown")
    stop_hook_active = bool(data.get("stop_hook_active", False))

    project_dir = Path(os.environ.get("CLAUDE_PROJECT_DIR", Path.cwd()))
    logs_dir = project_dir / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    log_file = logs_dir / "claude-hooks.log"
    ts = datetime.now().isoformat(timespec="seconds")
    try:
        with log_file.open("a", encoding="utf-8") as f:
            f.write(f"{ts} Stop session={session_id}\n")
    except Exception:
        pass

    if not ENABLE_TTS:
        sys.exit(0)

    if stop_hook_active:
        sys.exit(0)

    tmp_dir = Path(tempfile.gettempdir())
    lock_path = tmp_dir / f"claude_summary_{session_id}.lock"
    lock = read_lock(lock_path)

    if lock:
        age = time.time() - float(lock.get("ts_epoch", 0))
        if age > TTL_SEC:
            try: lock_path.unlink(missing_ok=True)
            except Exception: pass
            sys.exit(0)
        stage = lock.get("stage", "requested")
        if stage in ("done", "failed"):
            try: lock_path.unlink(missing_ok=True)
            except Exception: pass
            sys.exit(0)
        sys.exit(0)

    run_id = str(uuid.uuid4())
    payload = {
        "version": 1,
        "stage": "requested",
        "run_id": run_id,
        "ts": now_iso(),
        "ts_epoch": time.time(),
        "ttl_sec": TTL_SEC,
    }
    try:
        write_lock_atomic(lock_path, payload)
    except Exception:
        sys.exit(0)

    out = {
        "decision": "block",
        "reason": f"TASK:use summary subagent RUN_ID={run_id}"
    }
    sys.stdout.write(json.dumps(out))
    sys.stdout.flush()
    sys.exit(2)

if __name__ == "__main__":
    main()
