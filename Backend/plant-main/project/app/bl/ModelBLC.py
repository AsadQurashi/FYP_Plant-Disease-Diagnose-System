import os
import uuid
import io
import numpy as np
import tensorflow as tf
from PIL import Image
from flask import jsonify
from http import HTTPStatus
from project.app.utils.classes import class_names, disease_cures

class ModelBLC:
    @staticmethod
    def preprocess_image(image_file):
        image = Image.open(io.BytesIO(image_file.read()))
        image = image.convert("RGB")
        image = image.resize((128, 128)) 
        jpg_path = f"{uuid.uuid4().hex}.jpg"
        image.save(jpg_path, "JPEG")
        return jpg_path

    @staticmethod
    def predict_plant_disease(args):
        model_path = os.path.join(os.path.dirname(__file__), "trained_model.h5")
        if not os.path.exists(model_path):
            return jsonify({"error": "Model file not found!"}), HTTPStatus.NOT_FOUND

        image_file = args['image']
        processed_image_path = ModelBLC.preprocess_image(image_file)
        model = tf.keras.models.load_model(model_path)
        image = tf.keras.preprocessing.image.load_img(processed_image_path, target_size=(128, 128))
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])
        prediction = model.predict(input_arr)
        result_index = np.argmax(prediction)
        if result_index >= len(class_names):
            return jsonify({"error": "prediction result out of range!"}), HTTPStatus.NOT_FOUND
        predicted_result = class_names[result_index]
        cure_suggestions = disease_cures.get(predicted_result)
        os.remove(processed_image_path)
        return jsonify({'plant name' : predicted_result,'predicted_results': cure_suggestions}), HTTPStatus.OK
