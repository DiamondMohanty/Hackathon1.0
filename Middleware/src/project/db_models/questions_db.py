from project.server import db
from flask import Blueprint, jsonify, request, current_app
from project.common.response import Response
from project.common.request_validator import RequestValidator


questions_blueprint = Blueprint('__questions__', __name__)

class QuestionsDB(db.Model):

    __tablename__ = 'questions_master'
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_text = db.Column(db.TEXT, nullable=False)
    questions_opt1 = db.Column(db.TEXT, nullable=False)
    questions_opt2 = db.Column(db.TEXT, nullable=False)
    questions_opt3 = db.Column(db.TEXT, nullable=False)
    questions_opt4 = db.Column(db.TEXT, nullable=False)
    questions_ans  = db.Column(db.TEXT, nullable=False)
    section_id = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return {
            'question_id': self.question_id,
            'question_text': self.question_text,
            'question_opt1': self.questions_opt1,
            'question_opt2': self.questions_opt2,
            'question_opt3': self.questions_opt3,
            'question_opt4': self.questions_opt4,
            'question_ans': self.questions_ans,
            'section_id': self.section_id
        }