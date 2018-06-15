package edu.oakland.service.mappers;

import edu.oakland.models.Student;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.*;

public class StudentMapper implements RowMapper<Student> {
    public Student mapRow( ResultSet rs, int rowNum ) throws SQLException {
        Student student = new Student();
        student.FirstName = rs.getString("student_first_name");
        student.LastName = rs.getString("student_last_name");
        student.RegistrationStatus = rs.getString("registration_status");
		student.Pidm = rs.getString("student_pidm");
        return student;
    }
}
