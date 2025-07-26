FROM python:3.10-slim

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    wget \
    texlive-full \
    libkpathsea-dev \
    build-essential \
    libev-dev && \
    rm -rf /var/lib/apt/lists/*

ENV PIP_NO_CACHE_DIR=1
ENV PIP_PREFER_BINARY=1

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install --prefer-binary -r /app/requirements.txt && \
    echo "0.5"

COPY . /app

RUN python kpathsea_xetex_setup.py build_ext --inplace && \
    python kpathsea_pdftex_setup.py build_ext --inplace

CMD ["python", "wsgi.py"]
