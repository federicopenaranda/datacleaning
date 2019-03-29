#!flask/bin/python
import sys
import random
import json

from flask import Flask, render_template, request, redirect, Response
from flask_cors import CORS

import pandas as pd
from pandas import DataFrame, read_csv

# Feature functions
from datasets_module import *

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)

# Global dataset variable
dataset = ''

@app.route('/')
def output():
    return render_template('index.html')

@app.route('/load_dataset', methods=['POST'])
def load_dataset():
    return loadDataset(request)


@app.route('/delete_column', methods=['POST'])
def delete_column():
    return deleteColumn(request)




if __name__ == '__main__':
    # run!
    app.run()
