from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt, verify_jwt_in_request


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        # breakpoint()
        if claims.get("role") != "admin":
            return jsonify({"error": "Admin privileges required"}), 403

        return fn(*args, **kwargs)

    return wrapper