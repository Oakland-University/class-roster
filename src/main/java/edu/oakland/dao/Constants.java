package edu.oakland.dao;

public class Constants {
	protected static final String TERMS = "select terms from term_table where pidm = :pidm";

    protected static final String COURSES =
        " select distinct crn, title, term_code, course_subject, " + 
        " course_number, course_section, course_credits, start_time, " + 
        " end_time, building, room, start_date, end_date, " +
        " from courses_table, " +
        " where student = :student and term = :term and pidm = :pidm";

    protected static final String ROSTER_SQL = 
        " select term_code, student_last_name, student_pidm, " +
		" student_first_name, registration_status " +
        " from course_table, " +
        " where pidm = :pidm and term_code = :term and crn = :crn";
}
