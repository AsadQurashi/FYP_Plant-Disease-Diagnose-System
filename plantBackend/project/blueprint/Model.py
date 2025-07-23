from flask import Blueprint, Response, jsonify, send_file
from marshmallow import fields
from webargs.flaskparser import use_args
from project.app.bl.ModelBLC import ModelBLC
from http import HTTPStatus
from project.app.utils.monitor import load_history
from project.app.utils.plot_generator import generate_training_plot, get_training_statistics
from project.app.model.Results import PlantPrediction
from project.app.repository.UserRepository import UserRepository
from project.app.schema.UserSchema import UserSchema
from project.app.repository.ResultRepo import PredictionRepo

bp = Blueprint('model', __name__)

# @bp.route('/api/image', methods=['POST'])
# @use_args({"image": fields.Field(required=True), "user_id": fields.Field(required=True)}, location='files')
# def plant_disease(args):
#     user_id = UserRepository.get_user(args)

#     try:
#         return ModelBLC.predict_plant_disease(args)  
#     except Exception as e:
#         return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

# updatted code
@bp.route('/api/image', methods=['POST'])
@use_args({
    "image": fields.Field(required=True)
}, location='files')
def plant_disease(args):
    try:
        session = UserRepository.get_session()
        user_id = 1 #here is the dummy id
        user = UserRepository.get_user(user_id, session)

        if not user:
            return jsonify({"error": "User not found"}), HTTPStatus.NOT_FOUND

        result = PredictionRepo.add_prediction_results(args, session, user_id)

        return jsonify({
            "plant_disease": result.plant_disease,
            "prediction_result": result.prediction_result,
            "user_id": result.user_id
        }), HTTPStatus.OK

    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
@bp.route('/api/predictions', methods=['GET'])
@use_args({"user_id": fields.Int(required=True)}, location='query')
def get_predictions_by_user(args):
    user_id = args['user_id']
    predictions = PlantPrediction.query.filter_by(user_id=user_id).all()

    result = [{
        "id": p.id,
        "plant_disease": p.plant_disease,
        "image_path": p.image_path,
        "prediction_result": p.prediction_result,
    } for p in predictions]

    return jsonify(result), HTTPStatus.OK
########################################updated code#############################################

#############################################################################################



    
@bp.route("/api/model/plot", methods=["GET"])
def plot_training_graph():
    img = generate_training_plot()
    return Response(img.getvalue(), mimetype='image/png')

@bp.route("/api/model/statistics", methods=["GET"])
def model_statistics():
    try:
        stats = get_training_statistics()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



