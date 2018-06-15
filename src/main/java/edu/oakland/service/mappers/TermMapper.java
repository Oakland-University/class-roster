package edu.oakland.service.mappers;

import edu.oakland.models.Term;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.*;

public class TermMapper implements RowMapper<Term> {
    public Term mapRow( ResultSet rs, int rowNum ) throws SQLException {
        Term term = new Term();
        term.TermCode = rs.getString("term_code");
        term.StartDate = rs.getString("start_date");
        term.EndDate = rs.getString("end_date");
        term.Description = rs.getString("description");
        term.IsCurrentTerm = rs.getString("is_current_term");

        return term;
    }
}
