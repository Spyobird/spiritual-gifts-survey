from flask import Flask, render_template, request, jsonify
from src.scoring import calculate_scores

def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/api/score', methods=['POST'])
    def score():
        data = request.get_json()
        if not data or 'responses' not in data:
            return jsonify({"error": "No responses provided"}), 400
        scores = calculate_scores(data['responses'])
        return jsonify({"scores": scores})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
