from project.server import db
from flask import Blueprint, current_app, jsonify, request


breakfast_model = Blueprint('breakfast_model', __name__)

class BreakFasts(db.Model):
    
    __tablename__ = 'breakfasts'
    dish_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dish_name = db.Column(db.String(255), nullable = False)
    dish_category = db.Column(db.String(255), nullable = False)
    dish_price = db.Column(db.Integer, nullable = False)
    img_name = db.Column(db.String(50), nullable = True)
    
    def get_id(self):
        return self.dish_id
        
    def to_dict(self):
        return {
                'id': self.dish_id,
                'name': self.dish_name,
                'category': self.dish_category,
                'price': self.dish_price,
                'img': self.img_name
            }
        

@breakfast_model.route('/oishii/addons', methods=['GET'])
def get_addons():
    all_addons = BreakFasts.query.filter(BreakFasts.dish_category == 'Addon').all()
    addon_list = map(lambda item: item.to_dict(), all_addons)
    return jsonify(addon_list)

@breakfast_model.route('/oishii/breakfasts', methods=['GET'])
def get_breakfasts():
    all_breakfasts = BreakFasts.query.all()
    categories = []
    for breakfast in all_breakfasts:
        model = breakfast.to_dict()
        if model['category'] not in categories:
            categories.append(model['category'])
    breakfast_return_arr = map(lambda item: item.to_dict(), all_breakfasts)
    
    return jsonify({
        'fooditems': breakfast_return_arr,
        'categories': categories
    }) 

# URL for updating and deleting both breakfast and main course
@breakfast_model.route('/oishii/saveItem', methods=['POST']) 
def update_existing_food_item():
    request_data = request.get_json()
    response = None
    if 'id' in request_data and 'type' in request_data:
        in_pack_id = request_data['id']
        request_type = request_data['type'] 
        fetched_pack = None
      
        if request_type == "B":
            fetched_pack = BreakFasts.query.filter(BreakFasts.dish_id == int(in_pack_id)).first()
        else:
            fetched_pack = MainCourse.query.filter(MainCourse.dish_id == int(in_pack_id)).first()
        if fetched_pack is not None:
            # Pack Already Exists
            fetched_pack.dish_name = request_data['name']
            fetched_pack.dish_category = request_data['category']
            fetched_pack.dish_price = request_data['price']
            db.session.commit()
        else:
            # New Pack Requested
            if request_type == "B":
                fetched_pack = BreakFasts()
            else:
                fetched_pack = MainCourse()
            fetched_pack.dish_name = request_data['name']
            fetched_pack.dish_category = request_data['category']
            fetched_pack.dish_price = request_data['price']
            db.session.add(fetched_pack)
            db.session.commit()

    else:
        response = 'Invalid request recieved. Please check the in parameter name.'

    return jsonify(
        {
            'error': response
        }
    )

@breakfast_model.route('/oishii/deleteItem', methods=['POST']) 
def delete_existing_food_item():
    request_data = request.get_json()
    response = None
    if 'id' in request_data and 'type' in request_data:
        in_pack_id = request_data['id']
        request_type = request_data['type']
        fetched_pack = None
        if request_type == "B":
            fetched_pack = BreakFasts.query.filter(BreakFasts.dish_id == int(in_pack_id)).first()
        else:
            fetched_pack = MainCourse.query.filter(MainCourse.dish_id == int(in_pack_id)).first()
        if fetched_pack is not None:
            # Pack Already Exists
            db.session.delete(fetched_pack)
            db.session.commit()
        else:
            response = 'The pack is not found'
    else:
        response = 'Invalid request recieved. Please check the in parameter name.'

    return jsonify(
        {
            'error': response
        }
    )