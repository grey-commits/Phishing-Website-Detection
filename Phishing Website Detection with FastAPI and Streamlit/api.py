from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import featureExtraction

# Load the model (make sure you have the correct path to the model file)
RFmodel = pickle.load(open('RandomForestModel.sav', 'rb'))

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. Restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body model
class URLRequest(BaseModel):
    url: str

# API endpoint for URL prediction
@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    url = data.get("url")
    print(f"Received URL: {url}")
    
    # Feature extraction
    data = featureExtraction.getAttributess(url)
    
    # Prediction
    predicted_value = RFmodel.predict(data)
    
    # return response
    if predicted_value == 0:
        return {"prediction": "Legitimate"}
    else:
        return {"prediction": "Phishing"}
