import random
import string
import validators


def generate_suffix():
    suffix_length = 6
    letters = string.ascii_lowercase + string.ascii_uppercase + string.digits + "-_"
    suffix = "".join(random.choices(letters, k=suffix_length))
    return suffix


def is_valid_url(url: str):
    return validators.url(url)
