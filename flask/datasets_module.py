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
    global datasetFile

    data = request.get_json()

    if data['params']['dataset'] != None:
        file = r'C:\\courses\\clean01\\datacleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
        dataset = pd.read_csv(file)
        datasetFile = data['params']['dataset']
    else:
        return jsonify( result='Wrong Dataset File!' )

    end = time.time()

    ram, rows, cols = getOperationMetadata()

    query = buildOperationLogQuery( round(end - start, 4), datasetFile, 'load_dataset', '', ram, rows, cols )
    executeQuery(query)

    return jsonify( success=True )


def viewDataset(request):
    global dataset
    data = request.get_json()

    if data['params']['dataset'] == None:
        return ''
    else:
        return dataset.head(50).to_json(orient='split', date_format='iso')


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


def applyOperations(request):
    global dataset
    data = request.get_json()

    print(data['params']['operations'])

    for op in data['params']['operations']:
        applyOperation(op)

    # for col in dataset.columns:
    #     if col in data['params']['operations']:
    #         for op in data['params']['operations'][col]:
    #             applyOperation(op)

    return jsonify( data=data['params'] )


def applyOperation(operation):
    if operation['operation_type'] == 'filling_blank':
        fillingBlankOperation(operation)

    if operation['operation_type'] == 'change_data_type' and operation['operation_value'] == 'date':
        changeColumnToDate(operation)

    if operation['operation_type'] == 'delete_column':
        deleteColumn(operation)
        


#########################################
##      START: Helper Functions        ##
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

    return str(round(memorySize / factor, 4)), str(count_row), str(count_col)

def executeQuery( sql ):
    # MySQL Connection
    import mysql.connector
    from mysql.connector import Error

    try:
        connection = mysql.connector.connect(host='localhost', database='clean01',  user='root',  password='')

        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute( sql )
            connection.commit()
    except Error as e :
        print ("Error while connecting to MySQL", e)
    finally:
        #closing database connection.
        if(connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def buildOperationLogQuery( execution_time, dataset_file, operation_type, operation_configuration, ram, rows, cols ):
    if operation_configuration == '':
        return "INSERT INTO `operation_log` \
                VALUES ( \
                    NULL, \
                    '" + str( execution_time ) + "', \
                    '"+ dataset_file +"', \
                    '"+ operation_type +"', \
                    NULL, \
                    'finished', \
                    '"+ str( ram ) +"', \
                    '"+ str( cols ) +"', \
                    '"+ str( rows ) +"', \
                    now());"
    else:
        return "INSERT INTO `operation_log` \
                VALUES ( \
                    NULL, \
                    '" + str( execution_time ) + "', \
                    '"+ dataset_file +"', \
                    '"+ operation_type +"', \
                    \""+ str(operation_configuration) +"\", \
                    'finished', \
                    '"+ str( ram ) +"', \
                    '"+ str( cols ) +"', \
                    '"+ str( rows ) +"', \
                    now());"
#########################################
##      START: Helper Functions        ##
#########################################



#############################################
##         Operations Functions            ##
#############################################
def fillingBlankOperation( operation ):
    global dataset
    global datasetFile

    print(operation)

    if operation['operation_status'] == 'applied':
        print('operation fillingBlankOperation already applied!')
        return jsonify( success=True, result='Operation already applied!' )

    if operation['operation_dataset'] == datasetFile:
        start = time.time()
        opCol = dataset[operation['operation_column']]

        x = datetime(operation['operation_value']['year'], operation['operation_value']['month'], operation['operation_value']['day'])

        opCol.fillna(x, inplace=True)
        end = time.time()

        ram, rows, cols = getOperationMetadata()

        query = buildOperationLogQuery( round(end - start, 4), datasetFile, 'filling_blank', operation, ram, rows, cols )
        executeQuery(query)

        return jsonify( success=True )
    else:
        return jsonify( success=False, result='Wrong Dataset File!' )


def changeColumnToDate( operation ):
    global dataset
    global datasetFile

    if operation['operation_status'] == 'applied':
        print('operation fillingBlankOperation already applied!')
        return jsonify( success=True, result='Operation already applied!' )


    if operation['operation_dataset'] == datasetFile:
        start = time.time()

        opCol = dataset[operation['operation_column']]
        dataset[operation['operation_column']] = pd.to_datetime(opCol, format='%Y%m%d', errors='coerce')
        
        end = time.time()

        ram, rows, cols = getOperationMetadata()
        query = buildOperationLogQuery( round(end - start, 4), datasetFile, 'change_data_type', operation, ram, rows, cols )
        executeQuery(query)
                
        return jsonify( success=True )
    else:
        return jsonify( result='Wrong Dataset File or operation!' )


def deleteColumn( operation ):
    global dataset
    global datasetFile

    if operation['operation_status'] == 'applied':
        print('operation fillingBlankOperation already applied!')
        return jsonify( success=True, result='Operation already applied!' )

    if operation['operation_dataset'] == datasetFile:
        start = time.time()

        dataset.drop( operation['operation_column'], axis=1, inplace=True )
        
        end = time.time()

        ram, rows, cols = getOperationMetadata()
        query = buildOperationLogQuery( round(end - start, 4), datasetFile, 'delete_column', operation, ram, rows, cols )
        executeQuery(query)
                
        return jsonify( success=True )
    else:
        return jsonify( result='Wrong Dataset File or operation!' )