package edu.oakland.dao;

import java.util.List;
import edu.oakland.models.Term;
import edu.oakland.models.Course;
import edu.oakland.models.Student;

public interface IClassRosterDao {
    public List<Term> getTermList(String pidm);
    public List<Course> getCourseList(String pidm, String term);
    public List<Student> getStudentList(String pidm, String term, String crn);
}
