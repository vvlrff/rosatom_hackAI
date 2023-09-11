import csv
import os
from fastapi import APIRouter, Body, Depends, File, Query, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, distinct, insert, select,  func
from ..datebase import get_async_session
from .models import Surveys, Answers
from ..api.Clusterization import Clusterization


Clust = Clusterization()
router = APIRouter (
    prefix='/api/questions',
    tags= ['questions']
)

@router.get('questions')
async def get_questions(session: AsyncSession = Depends(get_async_session)):
    stmt_questions = select(Surveys).where(Surveys.c.is_closed == False)
    questions_all = await session.execute(stmt_questions)
    res_questions_all = questions_all.fetchall()
    list_data = []
    for i in res_questions_all:
        list_data.append({
                'id': i[0],
                'question' : i[1]
            })
    return JSONResponse(content=list_data)

@router.post('post_questions')
async def get_questions(id_question:int,user_answer:str, session: AsyncSession = Depends(get_async_session)):
    # user_answer
    ... # обработка на мат!
    #user_answer
    add_answer = insert(Answers).values(
                            answer = user_answer,
                            id_survey = id_question
    )
    await session.execute(add_answer)
    await session.commit()
    return JSONResponse(content = [{
                        'sucsessful': True}
                        ])

@router.get('all_data_questions')
async def all_data_questions(id_question:int, session: AsyncSession = Depends(get_async_session)):
    
    stmt_question_for_category = (
    select(Answers, Surveys.c.questions)
    .where(Answers.c.id_survey == id_question)
    .join(Surveys, Answers.c.id_survey == Surveys.c.id_survey_)
    )
    stmt_question_for_category = await session.execute(stmt_question_for_category)
    res_question_for_category = stmt_question_for_category.fetchall()
    list_data = []
    category = []
    answers = []
    for i in res_question_for_category:
        if i[-1] not in category:
            category.append(i[-1])
        else:
            pass
        
        answers.append(i[1])
    list_data.append({
        "question": category[0],
        "answer": answers
    })

    answer = Clust.calc(target=list_data)
    print(answer)
    return JSONResponse(content=[answer])

@router.get('/output_question')
async def all_data_questions(id_question:int, session: AsyncSession = Depends(get_async_session)):
    
    stmt_question_for_category = (
    select(Answers, Surveys.c.questions)
    .where(Answers.c.id_survey == id_question)
    .join(Surveys, Answers.c.id_survey == Surveys.c.id_survey_)
    )
    stmt_question_for_category = await session.execute(stmt_question_for_category)
    res_question_for_category = stmt_question_for_category.fetchall()
    list_data = []
    category = []
    answers = []
    for i in res_question_for_category:
        if i[-1] not in category:
            category.append(i[-1])
        else:
            pass
        
        answers.append(i[1])
    list_data.append({
        "question": category[0],
        "answer": answers
    })

    data = Clust.calc(target=list_data)
    flat_data = []
    for answer in data['answer']:
        flat_data.append([data['question'], data['question_id'], answer['category_namber'], answer['count'], answer['comparative_size'], answer['cluster']])
    
    # Откройте файл для записи данных в CSV
    filename = 'data.csv'
    with open(filename, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        # Запишите заголовки
        csvwriter.writerow(['question', 'question_id', 'category_namber', 'count', 'comparative_size', 'cluster'])
        # Запишите данные
        csvwriter.writerows(flat_data)
        # C:\Users\gjark\OneDrive\Рабочий стол\hack_08_10\Hack_08_10_09_2023\server\data.csv
        path_exel = os.path.join(os.getcwd(), filename)
    return FileResponse(path=path_exel,filename=filename, media_type='multipart/form-data' )



@router.get('all_questions')
async def get_all_questions(session: AsyncSession = Depends(get_async_session)):
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
            "questions": i[0],
            "id_survey_": i[1],
            "is_closed": i[2],
            "count":i[3],
        })
    return JSONResponse(content = list_data)

@router.get('info_DB')
async def get_info_DB(session: AsyncSession = Depends(get_async_session)):
        #"Для незаконченных"
    stmt_q_false = (
    select(
    Surveys.c.is_closed,
    func.count().label("is_closed_count")
    )
    .where(Surveys.c.is_closed == False)
    .group_by(Surveys.c.is_closed)
    )
    stmt_question_for_category_ = await session.execute(stmt_q_false)
    stmt_question_for_category_ = stmt_question_for_category_.fetchall()
    question_False = int
    for i in stmt_question_for_category_:
        question_False = i[1]
    #"Для законченных"
    stmt_q_True = (
                select(
                Surveys.c.is_closed,
                func.count().label("is_closed_count")
                )
                .where(Surveys.c.is_closed == True)
                .group_by(Surveys.c.is_closed)
                )
    stmt_question_for_category_True = await session.execute(stmt_q_True)
    stmt_question_for_category_True = stmt_question_for_category_True.fetchall()
    question_True = int
    for i in stmt_question_for_category_True:
        question_True = i[1]
    list_data = [{
            "count":question_False+question_True,
            "question_False":question_False,
            "question_True":question_True,
    }]
    return JSONResponse(content = list_data)

