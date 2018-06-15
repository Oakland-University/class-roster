package edu.oakland.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import edu.oakland.models.Term;
import edu.oakland.models.Course;
import edu.oakland.models.Student;

import edu.oakland.service.mappers.TermMapper;
import edu.oakland.service.mappers.CourseMapper;
import edu.oakland.service.mappers.StudentMapper;
import edu.oakland.dao.Constants;

@Service
public class ClassRosterDao implements IClassRosterDao {

	@Autowired 
	JdbcTemplate jdbctemplate;
    
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    @Cacheable(value = "classrosterTermList", key = "{ #root.methodName, #pidm }")
    public List<Term> getTermList(String pidm) {
        List<Term> list = new ArrayList<Term>();
        list.addAll(jdbctemplate.query(Constants.TERMS, new Object[] {pidm, pidm}, new TermMapper() ));
        String size = Integer.toString(list.size());

        return list;
	}

	// Gets the rest of the course information
    @Override
    @Cacheable(value = "classrosterCourseList", key = "{ #root.methodName, #pidm }")
    public List<Course> getCourseList(String pidm, String term) {
        List<Course> list = new ArrayList<Course>();
        list.addAll(jdbctemplate.query(Constants.COURSES, new Object[] {term, pidm}, new CourseMapper() ));

        return list;
	}

	// Gets the students that registered for a course 
    @Override
    @Cacheable(value = "classrosterStudentList", key = "{ #root.methodName, #pidm }")
    public List<Student> getStudentList(String pidm, String term, String crn) {
        List<Student> list = new ArrayList<Student>();
        list.addAll(jdbctemplate.query(Constants.ROSTER_SQL, new Object[] {pidm, term, crn}, new StudentMapper() ));

        return list;
	}
}
