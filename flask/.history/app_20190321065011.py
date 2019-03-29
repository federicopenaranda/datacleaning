#!flask/bin/python

import sys

from flask import Flask, render_template, request, redirect, Response
from flask_cors import CORS

import random
import json

import pandas as pd
from pandas import DataFrame, read_csv

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)

@app.route('/')
def output():
    # serve index template
    return render_template('index.html', name='Joe')


@app.route('/receiver', methods=['POST'])
def worker():
    # read json + reply
    data = request.get_json()
    result = ''

    for item in data:
        # loop over every row
        result += str(item['make']) + '\n'

    return result


@app.route('/load_dataset', methods=['POST'])
def loadDataset():
    dataset = request.get_json()
    print(dataset['params']['dataset'])
    file = r'C:\\courses\\DataCleaning\\back\\clean01\\public\\datasets\\' + dataset['params']['dataset']
    df = pd.read_csv(file)

    # print(df.head())

    return df.head(50).to_json(orient='split')



if __name__ == '__main__':
    # run!
    app.run()
