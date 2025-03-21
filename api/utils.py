import random
import string
from fastapi import Request
import validators
from datetime import datetime
import requests
from user_agents import parse


def generate_suffix():
    suffix_length = 6
    letters = string.ascii_lowercase + string.ascii_uppercase + string.digits + "-_"
    suffix = "".join(random.choices(letters, k=suffix_length))
    return suffix


def is_valid_url(url: str):
    return validators.url(url)


def extract_click_info(request: Request):
    ip = request.client.host if request.client else "Unknown"
    country = get_country(ip) if ip != "Unknown" else "Unknown"
    user_agent = request.headers.get("User-Agent")
    ua_parsed = parse(user_agent)
    browser = ua_parsed.browser.family
    platform = ua_parsed.os.family

    device = "Unknown"
    if ua_parsed.is_mobile:
        device = "Mobile"
    elif ua_parsed.is_tablet:
        device = "Tablet"
    elif ua_parsed.is_pc:
        device = "Desktop"

    created_at = str(datetime.now())
    return {
        "ip": ip,
        "country": country,
        "browser": browser,
        "platform": platform,
        "device": device,
        "created_at": created_at
    }


def get_country(ip: str) -> str:
    try:
        response = requests.get(f"https://ipapi.co/{ip}/country_name/")
        print(response.text)
        if(response.text == "Reserved" or response.text == "Undefined" or response.status_code != 200):
            return "Unknown"
        return response.text
    except:
        return "Unknown"


def get_expiration_timestamp(created_at: str, expiration_time: int) -> float:
    created_at_timestamp = datetime.fromisoformat(created_at).timestamp()
    return created_at_timestamp + expiration_time
