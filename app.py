from flask import Flask, render_template, request, jsonify
import pandas as pd  # Assuming you use pandas to handle CSV data
from test.py import price  # Import your Python price prediction function

app = Flask(__name__)

# Define a route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Define a route for handling file uploads and making predictions
@app.route('/predict_price', methods=['POST'])
def predict_price_route():
    # Get the uploaded file
    uploaded_file = request.files['file']

    # Process the file and call your price prediction function
    # (Assuming your prediction script is named predict_price.py)
    # You need to adjust this based on your actual script and data processing logic.
    df = pd.read_csv(uploaded_file)
    prediction = predict_price(df)

    # Return the prediction to the frontend
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
