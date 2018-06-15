import React, { Component } from "react"
import Dialog, {
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table"
import PropTypes from "prop-types"
import Typography from "material-ui/Typography"
import { withStyles } from "material-ui/styles"
import { translate } from "react-i18next"

const styles = theme => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary[400],
  },
  title: {
    fontWeight: "bold",
    fontSize: "medium"
  },
  tableRow: {
    backgroundColor: theme.palette.primary[400],
    color: "#ffffff",
    fontSize: "medium"
  },
  text: {
    fontSize: "medium"
  }
})

class StudentModal extends Component {
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  tableBody() {
    const students = []
    let color = false
    for (let i = 0; i < this.props.firstName.length; i++) {
      const name = this.props.firstName[i] + " " + this.props.lastName[i]
      const classes = this.props.classes
      if (color) {
        students.push(
          <TableRow>
            <TableCell tabIndex="0" className={classes.tableRow}>
              {name}
            </TableCell>
            <TableCell tabIndex="0" className={classes.tableRow}>
              {this.props.registration[i]}
            </TableCell>
          </TableRow>
        )
        color = false
      } else {
        color = true
        students.push(
          <TableRow>
            <TableCell tabIndex="0" style={{fontSize: "medium"}}>
              {name}
            </TableCell>
            <TableCell tabIndex="0" style={{fontSize: "medium"}}>
              {this.props.registration[i]}
            </TableCell>
          </TableRow>
        )
      }
    }

    return students
  }

  displayTable() {
    const {classes, t} = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tabIndex="0" className={classes.text}>
                {t("students", {})}
              </TableCell>
              <TableCell tabIndex="0" className={classes.text}>
                {t("registrationStatus", {})}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.tableBody()}
          </TableBody>
        </Table>
      </div>
    )
  }

  render() {
    const {classes} = this.props

    return (
      <Dialog open={this.props.showmodal} onClose={this.handleClose}>
        <DialogTitle className={classes.dialogTitle} tabIndex="0">
          <Typography className={classes.title}>
            {this.props.selectedCourse}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {this.displayTable()}
        </DialogContent>
      </Dialog>
    )
  }
}

StudentModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "StudentModal" })(
  translate("view", { wait: true })(StudentModal)
)
