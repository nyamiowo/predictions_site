from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import random

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

conn = sqlite3.connect("database.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY,
    name TEXT,
    prediction TEXT
)
''')
conn.commit()

predictions_list = [
    "Сегодня твой день!",
    "Будь осторожен на дороге.",
    "Удача рядом, не пропусти шанс.",
    "Лучше остаться дома.",
    "Будет много сюрпризов!"
]

class UserRequest(BaseModel):
    name: str

@app.post("/predict")
def predict(user: UserRequest):
    prediction = random.choice(predictions_list)
    cursor.execute("INSERT INTO predictions (name, prediction) VALUES (?, ?)", (user.name, prediction))
    conn.commit()
    return {"prediction": prediction}

@app.delete("/clear_history")
def clear_history():
    cursor.execute("DELETE FROM predictions")
    conn.commit()
    return {"message": "История успешно удалена."}