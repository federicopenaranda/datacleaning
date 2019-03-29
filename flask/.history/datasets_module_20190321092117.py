import pandas as pd
from pandas import DataFrame, read_csv

def loadDataset(request):
    global dataset
    data = request.get_json()
    file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + data['params']['dataset']
    dataset = pd.read_csv(file)

    # print(df.head())

    return dataset.head(50).to_json(orient='split')