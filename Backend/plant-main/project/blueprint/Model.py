from flask import Blueprint, jsonify
from marshmallow import fields
from webargs.flaskparser import use_args
from project.app.bl.ModelBLC import ModelBLC
from http import HTTPStatus

bp = Blueprint('model', __name__)

@bp.route('/api/image', methods=['POST'])
@use_args({"image": fields.Field(required=True)}, location='files')
def plant_disease(args):
    try:
        return ModelBLC.predict_plant_disease(args)  
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
