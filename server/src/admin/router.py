from fastapi import APIRouter, Body, Depends, File, Query, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, distinct, insert, select,  func, update
from ..datebase import get_async_session
from ..questions.models import Surveys, Answers

import csv


router = APIRouter (
    prefix='/api/admin',
    tags= ['admin']
)


@router.get('all_questions')
async def all_questions(session: AsyncSession = Depends(get_async_session)):
    stmt = (
    select(
    Surveys.c.id_survey_,
    Surveys.c.questions,
    Surveys.c.is_closed,
    func.count(Answers.c.id_survey).label('answer_count')
    )
    .join(Answers, Surveys.c.id_survey_ == Answers.c.id_survey)
    .group_by(Surveys.c.id_survey_,).order_by(Surveys.c.id_survey_)
    )
    stmt_question_for_category = await session.execute(stmt)
    res_question_for_category = stmt_question_for_category.fetchall()
    
    list_data = []
    for i in res_question_for_category:
        list_data.append({
            "questions": i[1],
            "id_survey_": i[0],
            "is_closed": i[2],
            "count":i[3],
        })
    return JSONResponse(content = list_data)

@router.post("/upload_file_q")
async def upload_file(file: UploadFile, session: AsyncSession = Depends(get_async_session)):
    contents = await file.read() # Прочитайте содержимое файла
    decoded_content = contents.decode('utf-8') # Декодируйте содержимое файла в строку
    csv_reader = csv.DictReader(decoded_content.splitlines(), delimiter=',') # Создайте csv-читатель
    
    for row in csv_reader:
        if row['is_closed'] == 'f':
            is_closed = False
        else:
            is_closed = True
        add_question = insert(Surveys).values(
            questions = row['questions'],   
            is_closed = is_closed  
        )
        await session.execute(add_question)
        await session.commit()
    return JSONResponse(content = [{
                        'sucsessful': True}
                        ])


@router.post('/post_question')
async def post_question(questions: str, session: AsyncSession = Depends(get_async_session)):
    add_question = insert(Surveys).values(
        questions = questions,   
        is_closed = False  
    )
    await session.execute(add_question)
    await session.commit()
    return JSONResponse(content = [{
                        'sucsessful': True}
                        ])

@router.put('/put_question')
async def put_question(id_survey_: int, questions:str,is_closed:bool, session: AsyncSession = Depends(get_async_session)):
    update_question = update(Surveys).where(Surveys.c.id_survey_ == id_survey_).values(id_survey_ = id_survey_,questions=questions,is_closed=is_closed )

    await session.execute(update_question)
    await session.commit()
    return JSONResponse(content = [{
                        'sucsessful': True}
                        ])

@router.delete('/put_question_del')
async def put_question_del(id_survey_: int, session: AsyncSession = Depends(get_async_session)):
    delete_question = delete(Surveys).where(Surveys.c.id_survey_ == id_survey_)

    await session.execute(delete_question)
    await session.commit()
    return JSONResponse(content = [{
                        'sucsessful': True}
                        ])
# @router.post('post_questions')
# async def get_questions(id_question:int,user_answer:str, session: AsyncSession = Depends(get_async_session)):
#     # user_answer
#     ... # обработка на мат!
#     #user_answer
#     add_answer = insert(Answers).values(
#                             answer = user_answer,
#                             id_survey = id_question
#     )
#     await session.execute(add_answer)
#     await session.commit()
#     return JSONResponse(content = [{
#                         'sucsessful': True}
#                         ])
