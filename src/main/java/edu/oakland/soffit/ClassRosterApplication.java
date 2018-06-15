package edu.oakland.soffit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apereo.portal.soffit.model.v1_0.Bearer;
import org.apereo.portal.soffit.renderer.SoffitModelAttribute;
import org.apereo.portal.soffit.renderer.SoffitApplication;

@SoffitApplication
@SpringBootApplication
@Configuration
@ComponentScan("edu.oakland")
public class ClassRosterApplication {

    @SoffitModelAttribute(value="bearerJson",viewRegex=".*/class-roster/.*")
    public String getBearerJson(Bearer bearer) {
        ObjectMapper mapper = new ObjectMapper();
        String rslt = null;

        try {
            rslt = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(bearer);
        } catch (JsonProcessingException e) {
            final String msg = "Unable to write the Bearer object to JSON";
            throw new RuntimeException(msg, e);
        }
        return rslt;
    }

	public static void main(String[] args) {
		SpringApplication.run(ClassRosterApplication.class, args);
	}
}
