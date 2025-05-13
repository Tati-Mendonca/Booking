FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/management-0.0.1-SNAPSHOT.jar /app/management.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/management.jar"]

LABEL authors="Tatiane Mendonça"



