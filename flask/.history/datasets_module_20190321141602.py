import pandas as pd
from pandas import DataFrame, read_csv

def loadDataset(request):
    global dataset
    data = request.get_json()
    if ( data == None ):
        return ''
    file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
    dataset = pd.read_csv(file)
    return dataset.head(50).to_json(orient='split')


def deleteColumn(request):
    global dataset
    data = request.get_json()
    dataset.drop(data['params']['column'], axis=1, inplace=True)
    return dataset.head(50).to_json(orient='split')