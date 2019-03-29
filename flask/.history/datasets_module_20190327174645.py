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
        dataset = pd.read_csv(file)
        print(dataset.dtypes)
        print (dataset.head(10))

        #dataset['sample_date'] = datetime.strptime( dataset['sample_date'].astype(str),'%Y%m%d')
        
        dataset['sample_date'] = pd.to_datetime(dataset['sample_date'], format='%Y%m%d', errors='coerce')
        sdate = dataset['sample_date'].dt.strftime("%Y-%m-%d")
        sdate.dt.strftime("%Y-%m-%d")
        dataset['sample_date'] = sdate

        print(sdate.head(10))

        print(dataset.dtypes)

        print (dataset.head(10))
        # dataset['sample_date'] =  pd.to_datetime(dataset['sample_date'], format='%Y-%m-%d')

    return ''


def viewDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] == None:
        return ''
    else:
        return dataset.head(50).to_json(orient='split', date_format='iso')


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
    global dataset

    # Getting info()
    infoBuffer = io.StringIO()
    dataset.info(verbose=True, buf=infoBuffer)
    info = infoBuffer.getvalue()

    # Getting describe()
    describeOutput = dataset.describe(include='all')
    description = describeOutput.to_json()

    # Getting missing values ( isnull() )
    missingValuesOutput = dataset.isnull().sum()
    missing = missingValuesOutput.to_json()

    return jsonify( info=info, description=description, missing=missing )