import csv
import json
import os
import random as rnd
import re
import sys

from fastapi import APIRouter, Body, Depends, File, Query, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, distinct, insert, select,  func
from ..datebase import get_async_session
from .Clusterization import Clusterization



Clust = Clusterization()

router = APIRouter (
    prefix='/api',
    tags= ['api']
)


@router.post("/upload")
async def upload_file(file: UploadFile):
    folder_path = os.getcwd() + r'\src\api\INPUT_\\'  # путь к папке, в которую нужно сохранить файл
    file_path = os.path.join(folder_path, file.filename)  # объединяем путь к папке и имени файла
    with open(file_path, "wb") as f:  # открываем файл на запись
        f.write(await file.read())  # записываем содержимое загруженного файла в созданный файл
    asnswer = Clust.calc(file=file_path)  #Clust.main(object=[{}])
    return JSONResponse(content=[asnswer])


@router.post("/download")
async def upload_file(file: str):
    folder_path = os.getcwd() + r'\src\api\INPUT_\\'  # путь к папке, в которую нужно сохранить файл
    file = file+'.json'
    file_path = os.path.join(folder_path, file)  # объединяем путь к папке и имени файла
    data = Clust.calc(file=file_path)  #Clust.main(object=[{}])
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
