# python app.py
# to activate venv use command - venv\Scripts\Activate.ps1
# to deactivate venv use command - deactivate
from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator
from transformers import BertTokenizer, BertModel
from keras.utils import pad_sequences
from keras_preprocessing.sequence import pad_sequences
import tensorflow as tf
import joblib
import pickle
import torch

# from keras.models import load_model
# import keras_preprocessing

# Initialize Flask application
app = Flask(__name__)

from werkzeug.middleware.proxy_fix import ProxyFix

app.wsgi_app = ProxyFix(app.wsgi_app)


class SentimentClassifier(torch.nn.Module):
    def __init__(self):
        super(SentimentClassifier, self).__init__()
        self.bert = BertModel.from_pretrained("bert-base-uncased")
        self.dropout = torch.nn.Dropout(0.1)
        self.fc = torch.nn.Linear(768, 2)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        pooled_output = self.dropout(pooled_output)
        outputs = self.fc(pooled_output)
        return outputs



def translate_to_english(text):
    translated_text = GoogleTranslator(source='auto', target='en').translate(text)
    return translated_text


# loading SVM model and tokenizer
model1 = joblib.load('models/SVM_ML.joblib')

with open('vectorizer/tokenizer_tfidf.pickle', 'rb') as handle:
    vectorizer = pickle.load(handle)


def svm_Val(text):
    X_tfidf = vectorizer.transform([text])
    pred = model1.predict(X_tfidf)
    return pred


# loading LSTM model and tokenizer
model2 = tf.keras.models.load_model('models/LSTM4.h5')

with open('vectorizer/tokenizer_LSTM.pickle', 'rb') as handle:
    lstm_tokenizer = pickle.load(handle)


def LSTM_Val(text):
    # Convert the text data into sequences of tokens
    train_sequences = lstm_tokenizer.texts_to_sequences(text)

    # Pad the sequences to have the same length
    max_length = 200
    padded = pad_sequences(train_sequences, maxlen=max_length)

    prediction = model2.predict(padded)
    # print(prediction)
    return (prediction > 0.5).astype('int32')


# Load the trained sentiment classifier model of bert
model = SentimentClassifier()
model.load_state_dict(torch.load("models/BERT2.pth", map_location=torch.device('cpu')))
model.eval()

# Create a BERT tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")


# analysing sentiment
def sentiment(result):
    if(result == '1'):
        return 'Positive'
    else:
        return 'Negative'

# Define the prediction endpoint
@app.route('/process', methods=['POST'])
def predict():
    try:
        # Get the input data from the request and preprocess
        data = request.json
        text = data['text']
        print('Received text from Node.js:', text)
        text = translate_to_english(text)

        # Make predictions using the loaded model
        # svm
        prediction1 = svm_Val(text)
        svm_reply = str(prediction1[0])

        # lstm
        texts = ["i am very happy", text]
        prediction2 = LSTM_Val(texts)

        reply = prediction2[1]
        lstm_reply = str(reply[0])
        # print(lstm_reply)

        # bert
        # Tokenize the text
        inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
        input_ids = inputs['input_ids']
        attention_mask = inputs['attention_mask']

        # Predict sentiment
        with torch.no_grad():
            outputs = model(input_ids, attention_mask)
            prediction3 = torch.argmax(outputs, dim=1).tolist()

        bert_reply = str(prediction3[0])

        # analysing sentiment
        svm_reply = sentiment(svm_reply)
        lstm_reply = sentiment(lstm_reply)
        bert_reply = sentiment(bert_reply)
        
        print('sending to node : ', "ml : " + svm_reply + " | " + "dl : " + lstm_reply + " | " + "bert : " + bert_reply)
        print('translated text : ' + text)

        # Return the prediction as a JSON response
        return jsonify({'ml': svm_reply ,'dl': lstm_reply, 'bert': bert_reply, 'translatedText': text}), 200
        
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)



# test data
# Looks great but the fabric isnt comfortable. Feel too warm so not for summers at all.
# Very third class cheap quality synthetic material that feels very irritating and rough to the skin. Don't buy if you care about your health.
# Me encanta este restaurante, la comida es deliciosa y el servicio es excelente.
# Je déteste cette ville, elle est trop bruyante et les gens sont très impolis.
# Ich bin so glücklich mit meinem neuen Job, das Team ist fantastisch und die Arbeit ist interessant.
# Wǒ xǐ huān zhè ge gōng yù, tā hěn měi lì
# Я ненавижу это место, оно слишком шумное и люди очень грубые.
# Questo ristorante è un disastro, il cibo è terribile e il servizio è pessimo.
# त्वं बहु उत्तमः असि
# अहं भवन्तं बहु द्वेष्टि