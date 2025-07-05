# ----------- BUILD STAGE -------------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ----------- RUNTIME STAGE -------------
FROM tomcat:10.1.40-jdk21-temurin
WORKDIR /usr/local/tomcat/webapps
RUN rm -rf ROOT
COPY --from=build /app/target/asmvue-0.0.1-SNAPSHOT.war ./ROOT.war
EXPOSE 8080
