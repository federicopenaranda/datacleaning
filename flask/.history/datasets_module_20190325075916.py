import pandas as pd
from pandas import DataFrame, read_csv
from flask import jsonify
from datetime import datetime
import io

def loadDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] != None:
        file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
        dataset = pd.read_csv(file)
        # dataset['sample_date'] = dataset['sample_date'].astype('datetime64[ns]')
        # print(dataset.head(10))
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
    print('infoColumn')
    print(data['params']['column'])
    # print(dataset[data['params']['column']])
    # desc = dataset[data['params']['column']].describe()
    # print(dataset)
    return jsonify( '' )


def infoDataset(request):
    global dataset
    info2 = io.StringIO()
    dataset.info(verbose=True, buf=info2)
    s = info2.getvalue()
    desc = dataset.describe(include='all')
    print(desc)
    return jsonify( info=s, description=desc )