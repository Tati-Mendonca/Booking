FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/management-0.0.1-SNAPSHOT.jar /app/management.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/management.jar", "--server.port=8080", "--server.address=0.0.0.0"]
LABEL authors="Tatiane Mendonça"
