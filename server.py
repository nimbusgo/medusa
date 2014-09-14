#!flask/bin/python
from flask import Flask, jsonify, request
from lib import crossdomain
import json

app = Flask(__name__)

fedoras = []


@app.route('/get_fedoras', methods = ['GET'])
@crossdomain(origin="*")
def get_fedoras():
    return jsonify( { 'fedoras': fedoras } )

@app.route('/post_fedora', methods = ['POST'])
@crossdomain(origin="*")
def post_fedora():
    data = json.loads(request.data)
    print 'received', data
    fedoras.append(data)
    return jsonify( { 'success': True } )


if __name__ == '__main__':
    app.run(debug = True)