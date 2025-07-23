from project.app.model.Results import PlantPrediction
from project.app.db import db
from sqlalchemy.orm import scoped_session
from project.app.bl.ModelBLC import ModelBLC

class PredictionRepo:
    
    @staticmethod
    def get_session():
        return db.session
    
    @staticmethod
    def add_prediction_results(args, session: scoped_session, user_id: int):
        response = ModelBLC.predict_plant_disease(args)

        plant_disease = response['plant_disease']
        prediction_result = response['cure_suggestions']
        image_path = response['image_path']

        plant_data = PlantPrediction(
            plant_disease=plant_disease,
            prediction_result=prediction_result,
            image_path=image_path,
            user_id=user_id
        )

        session.add(plant_data)
        session.commit()

        return plant_data
    

        
        