FROM python:3
RUN python -m pip install --user --upgrade pip
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --user -r requirements.txt
ENTRYPOINT [ "python" ]
COPY ./ ./
COPY app.py .
CMD [ "app.py" ]