#!flask/bin/python

import sys

from flask import Flask, render_template, request, redirect, Response
import random
import json

import pandas as pd
from pandas import DataFrame, read_csv

app = Flask(__name__)


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


@app.route('/load_dataset', methods=['GET'])
def loadDataset():

    file = r'C:\\courses\\DataCleaning\\flask\\iris.csv'
    df = pd.read_csv(file)

    print(df.head())

    return None



if __name__ == '__main__':
    # run!
    app.run()