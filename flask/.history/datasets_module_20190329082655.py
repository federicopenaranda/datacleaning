import pandas as pd
from pandas import DataFrame, read_csv
from flask import jsonify
from datetime import datetime
import io
import json
import time


def loadDataset(request):
    start = time.time()

    global dataset

    data = request.get_json()

    if data['params']['dataset'] != None:
        file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
        dataset = pd.read_csv(file, error_bad_lines=False, warn_bad_lines=True)

    ram, rows, cols = getOperationMetadata()

    end = time.time()

    print( 'Execution Time: ' )
    print( round(end - start, 4) )

    print( 'RAM Used (MB): ' )
    print( ram )

    print( 'Total Rows: ' )
    print( rows )

    print( 'Total Cols: ' )
    print( cols )

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

    print(info)

    # Getting describe()
    describeOutput = dataset.describe(include='all')
    description = describeOutput.to_json()

    # Getting missing values ( isnull() )
    missingValuesOutput = dataset.isnull().sum()
    missing = missingValuesOutput.to_json()

    return jsonify( info=info, description=description, missing=missing )


def changeColumnToDate(request):
    global dataset
    
    data = request.get_json()
    column = data['params']['column']
    dataset[column] = pd.to_datetime(dataset[column], format='%Y%m%d', errors='coerce')
    # sdate = dataset[column]
    # sdate.dt.strftime("%Y-%m-%d")
    # dataset['sample_date'] = sdate

    return jsonify( success=True )



#########################################
##         Helper Functions            ##
#########################################
def getOperationMetadata():
    global dataset

    infoBuffer = io.StringIO()
    dataset.info(verbose=False, memory_usage=True, buf=infoBuffer)
    info = infoBuffer.getvalue()

    lines = info.splitlines()
    memory0 = lines[len(lines)-1]
    memory1 = memory0.split(' ')
    memory11 = memory1[len(memory1) - 2]

    memoryUnit = memory1[len(memory1) - 1]
    memorySize = float( memory11.replace('+', '') )

    factor = 1

    if memoryUnit == 'KB':
        factor = 1_024
    elif memoryUnit == 'GB':
        factor = 1 / 1_024
    elif memoryUnit == 'MB':
        factor = 1

    count_row = dataset.shape[0]  # gives number of row count
    count_col = dataset.shape[1]  # gives number of col count    

    return round(memorySize / factor, 4), count_row, count_col


def executeQuery( sql )
    # MySQL Connection
    import mysql.connector
    from mysql.connector import Error

    try:
        connection = mysql.connector.connect(host='localhost', database='clean01',  user='root',  password='')

        if connection.is_connected():
            print ("Connected to MySQL")
            cursor = connection.cursor()
            cursor.execute( sql )
    except Error as e :
        print ("Error while connecting to MySQL", e)