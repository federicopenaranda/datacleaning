import pandas as pd
from pandas import DataFrame, read_csv
from flask import jsonify
from datetime import datetime

def loadDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] != None:
        file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
        dataset = pd.read_csv(file)
        # dataset['sample_date'] = dataset['sample_date'].astype('datetime64[ns]')
        # print(dataset.head(10))

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
    # print(data['params']['column'])
    # print(dataset[data['params']['column']])
    # desc = dataset[data['params']['column']].describe()
    desc = dataset.describe()
    return jsonify( desc )


def shapeDataset(request):
    global dataset
    # print(dataset.info())
    data = dataset.info(verbose=True)
    # print (data)
    return jsonify( info=data )