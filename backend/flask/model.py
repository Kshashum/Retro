
from flask import Flask, jsonify, request

app = Flask('lambdaMART')


@app.route("/api/v1/ranklib", methods=['POST'])
def ranklib():
    d = mode()
    return jsonify(d)


app.run("localhost", "4001", debug=True)
