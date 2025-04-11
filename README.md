
# Сайт с предсказанием

Данный сайт, просто предсказывает какой сегодня будет день. 

На данный момент кнопка истории чисто для визуала, но в процссе завершения когда-нибудь... 

История появлятся внизу после заврешения запроса.



## Для запуска сайта на Linux / MacOS

### 1. Создание виртуального окружения(Это необходимо, потому что питон не будет давать установить их и попросит вирутальную среду):
```bash
python3 -m venv venv 
source venv/bin/activate
```

### 2. Установка FastAPI и Uvicorn (Если не получается через pip, то можно через аналог pipx):
```bash
pip install fastapi uvicorn
```

### 3. Запуск проекта:
```bash
uvicorn app:app --reload
```

---

## Windows

### 1. Создание виртуального окружения:
```cmd
python -m venv venv
venv\Scripts\activate
```

### 2. Установка FastAPI и Uvicorn:
```cmd
pip install fastapi uvicorn
```

### 3. Запуск проекта:
```cmd
uvicorn app:app --reload
```

---


## Как выйти из виртуального окружения:
```bash
deactivate
```

---
На этом усе собственна

![image](https://github.com/user-attachments/assets/88ce404d-5da6-4daa-b67d-be493927d68c)
