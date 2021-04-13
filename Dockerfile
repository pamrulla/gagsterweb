FROM google/dart as builder

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install unzip

RUN git clone https://github.com/flutter/flutter.git -b stable
ENV PATH="$PATH:$PWD/flutter/bin"
RUN echo $PATH
RUN echo $PWD
RUN flutter config --enable-web
RUN flutter upgrade
RUN flutter doctor

RUN git clone https://github.com/pamrulla/gagsterweb.git

WORKDIR /gagsterweb/app

RUN flutter pub get
RUN flutter build web --web-renderer canvaskit --release -v
RUN ls -R
WORKDIR /gagsterweb/dist
COPY ../app/build/web/* .

# RUN rm -rf ./app
# RUN rm -rf ./../flutter


FROM alpine
COPY --from=builder /gagsterweb/dist/ /
RUN apk update
RUN apk add --update python3
EXPOSE 8080
# RUN python3 -m http.server 8080
ENTRYPOINT ["python3", "-m", "http.server", "8080"]
