package edu.oakland.service.mappers;

import edu.oakland.models.Course;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class CourseMapper implements RowMapper<Course> {
    public Course mapRow( ResultSet rs, int rowNum ) throws SQLException {
        Course course = new Course();
        course.Crn = rs.getString("sfrstcr_crn");
        course.Title  = rs.getString("crs_title");
        course.TermCode = rs.getString("sfrstcr_term_code");
        course.Subject = rs.getString("crs_subject");
        course.Number = rs.getString("crs_number");
        course.Section = rs.getString("crs_section");
        course.Credits = rs.getString("crs_credits");
        course.StartTime = rs.getString("start_time");
        course.EndTime = rs.getString("end_time");
        course.Building = rs.getString("building");
        course.Room = rs.getString("room");
        course.StartDate = rs.getString("start_date");
        course.EndDate = rs.getString("end_date");
        course.MeetDays = rs.getString("meet_days");

        return course;
    }
}
