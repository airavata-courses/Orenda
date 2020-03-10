FROM openjdk:8
RUN mvn clean && mvn spring-boot:run
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} spring-boot-docker.jar
#ADD target/spring-boot-docker.jar spring-boot-docker.jar
ENTRYPOINT ["java","-jar","/spring-boot-docker.jar"]