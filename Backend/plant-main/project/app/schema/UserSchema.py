from marshmallow import Schema, fields, ValidationError, validates
from marshmallow import validates, ValidationError

class UserSchema(Schema):
    user_id = fields.Integer(dump_only = True)
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    # role = fields.String(required=True)

    @validates("password")
    def validate_password(self, value):
        if not value and value.strip() == "":
            raise ValidationError("Password cannot be empty.")
        
    # @validates('role')
    # def validate_role(self, value):
    #     if value not in ['admin', 'user']:
    #         raise ValidationError('Invalid role. Roles must be admin, seller, or buyer.')
        
                
class GetUserById(Schema):
    user_id = fields.Integer(required=True)

class GetAllUserSchema(UserSchema):  
    pass

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)
    # role = fields.String(required=True)