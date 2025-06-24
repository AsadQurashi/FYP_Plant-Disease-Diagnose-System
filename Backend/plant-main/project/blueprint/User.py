from sqlite3 import IntegrityError
from flask import Blueprint, jsonify
from project.app.bl.UserBLC import UserBLC
from project.app.bl.LoginBLC import LoginBLC
from project.app.model.TokenBlockList import TokenBlockList
from project.app.schema.UserSchema import UserSchema, GetAllUserSchema, GetUserById, LoginSchema
from webargs.flaskparser import use_args, parser
from marshmallow import fields
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
from project.app.db import db

bp = Blueprint("user", __name__)

@bp.route("/register", methods=["POST"])
@use_args(UserSchema(), location="json")
def register_user(args):
    try:
        res = UserBLC.add_user(args)
        return jsonify({"message": "User added successfully", "result": res}), 201
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@bp.route("/user", methods=['GET'])
@use_args({"id": fields.Int()}, location='query')
def get_user(args):
    id = args.get('id')
    # breakpoint()
    if id:
        try:
            res = UserBLC.fetch_user_by_id(args)  
            if res:
                schema = UserSchema()
                result = schema.dump(res)
                return jsonify({"message": "info Fetched", "result": result}), 201
            else:
                return jsonify({"message": "user not found!"}), 404
        except Exception as e:
            return jsonify({"error!": str(e)}), 500
    else:
        res = UserBLC.get_all_users()
        if res:
            schema = GetAllUserSchema(many=True)
            result = schema.dump(res)
            return jsonify({"result" : result}), 201
        else:
            return jsonify({"message" : "No users found!"}),404
    
        
        
@bp.route("/user", methods = ['PUT'])
@use_args(GetUserById(), location='json')
def update_user(args):
    try:
        res = UserBLC.update_user_by_id(args)
        if res:
            return jsonify({"message" : "user updated successfully!", "result" : res}),200
    except Exception as e:
        return jsonify({"message" : str(e)}),404
    
    
@bp.route("/user", methods=['DELETE'])
@use_args(GetUserById(), location='query')  
def delete_user(args):
    try:
        res = UserBLC.deleted_user_by_id(args)
        # breakpoint()
        if "error!" in res:
            return jsonify(res), 404
        return jsonify(res), 200
    except Exception as e:
        return jsonify({"error!": str(e)}), 500


@bp.route('/login', methods=['POST'])
@use_args(LoginSchema(), location='json')
def login(args):    
    try:
        result = LoginBLC.login(args)
        # breakpoint()
        return jsonify({"result":result})
    except IntegrityError as e:
        return jsonify({"Error":e.orig.args[1]}), 422
    except Exception as e:
        return jsonify(str(e)),422
    
@bp.route("/logout", methods=["POST"])
@jwt_required()  # Require JWT authentication
def logout():
    jti = get_jwt()["jti"]  # Get JWT ID from token
    db.session.add(TokenBlockList(jti=jti))  # Add to blocklist
    db.session.commit()
    
    return jsonify({"message": "Logout successful"}), 200