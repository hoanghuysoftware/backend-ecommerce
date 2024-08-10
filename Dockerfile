FROM openjdk:17-jdk
COPY target/BackEnd.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "BackEnd.jar"]