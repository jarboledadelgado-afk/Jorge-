from __future__ import annotations
import hashlib, hmac, os, secrets
from datetime import datetime, timezone

APP_VERSION = "4.1-P0"
COOKIE = "orev_session"
SESSION_TTL = int(os.getenv("OREV_SESSION_TTL", str(60*60*24*30)))
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.6-mini").strip()
SECURE_COOKIE = os.getenv("OREV_SECURE_COOKIE", "1" if os.getenv("VERCEL") == "1" else "0") == "1"

def now_iso() -> str: return datetime.now(timezone.utc).isoformat()
def uid(prefix: str) -> str: return f"{prefix}_{secrets.token_urlsafe(9)}"
def token_hash(token: str) -> str: return hashlib.sha256(token.encode()).hexdigest()
def hash_password(password: str, salt_hex: str | None = None) -> tuple[str,str]:
    salt = bytes.fromhex(salt_hex) if salt_hex else secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
    return digest.hex(), salt.hex()
def verify_password(password: str, stored: str, salt: str) -> bool:
    candidate, _ = hash_password(password, salt)
    return hmac.compare_digest(candidate, stored)
