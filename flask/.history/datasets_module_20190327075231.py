import pandas as pd
from pandas import DataFrame, read_csv
from flask import jsonify
from datetime import datetime
import io
import json

def loadDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] != None:
        file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
        dataset = pd.read_csv(file, parse_dates=['sample_date'], infer_datetime_format=True)

        print(dataset.dtypes)
        # dataset['sample_date'] =  pd.to_datetime(dataset['sample_date'], format='%Y-%m-%d')

    return ''


def viewDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] == None:
        return ''
    else:
        return dataset.head(50).to_json(orient='split')


def deleteColumn(request):
    global dataset
    data = request.get_json()
    dataset.drop(data['params']['column'], axis=1, inplace=True)
    return dataset.head(50).to_json(orient='split')


def infoColumn(request):
    global dataset
    data = request.get_json()
    desc = dataset[data['params']['column']].describe(include='all')
    desc2 = desc.to_json()
    return jsonify( description=desc2 )


def infoDataset(request):
    try:
        global dataset
    except NameError:
        global dataset = None

    if dataset is None:
        return jsonify( info='', description='', missing='' )

    print(dataset)

    info2 = io.StringIO()
    dataset.info(verbose=True, buf=info2)
    s = info2.getvalue()
    desc = dataset.describe(include='all')
    desc2 = desc.to_json()

    missing_values_count = dataset.isnull().sum()

    return jsonify( info=s, description=desc2, missing=missing_values_count.to_json() )