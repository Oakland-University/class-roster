package edu.oakland.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.apereo.portal.soffit.service.BearerService;
import org.apereo.portal.soffit.model.v1_0.Bearer;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import edu.oakland.models.Term;
import edu.oakland.models.Course;
import edu.oakland.models.Student;
import edu.oakland.dao.ClassRosterDao;
import edu.oakland.dao.IClassRosterDao;

@Controller
@CrossOrigin
@RequestMapping("/api/v1")
public class Api {

    @Autowired
    BearerService bearService;

	@Autowired 
	IClassRosterDao classRosterDao;
    
    public String getPidm(String token) {
        Bearer bearer = bearService.parseBearerToken(token);

		return bearer.getAttributes().get("pidm").get(0);
    }

    // Gets the all course terms
    @RequestMapping("/terms")
    public @ResponseBody List<Term> termList(@ModelAttribute("token") String token) {
		String pidm = getPidm(token); 

        return classRosterDao.getTermList(pidm);
	}

	// Gets the rest of the course information
    @RequestMapping("/courses")
    public @ResponseBody List<Course> courseList(@ModelAttribute("token") String token, @ModelAttribute("term") String term) {
		String pidm = getPidm(token); 

        return classRosterDao.getCourseList(pidm, term);
	}

	// Gets the students that registered for a course 
    @RequestMapping("/students")
    public @ResponseBody List<Student> studentList(@ModelAttribute("token") String token, @ModelAttribute("term") String term, @ModelAttribute("crn") String crn) {
		String pidm = getPidm(token); 

        return classRosterDao.getStudentList(pidm, term, crn);
	}
}
