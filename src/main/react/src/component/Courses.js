import React, { Component } from "react"
import Card, { CardContent } from "material-ui/Card"
import { Typography, Button, Divider } from "material-ui"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import { translate } from "react-i18next"
import { getMapUrl } from "../utils/mapLinks.js"

const styles = theme => ({
  card: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    color: "#ffffff",
    fontWeight: 'bolder',
    fontSize: 'medium'
  },
  text: {
    fontSize: 'medium'
  },
  cardContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#F8F5EC"
  },
  button: {
    backgroundColor: "#877148",
    color: "#ffffff",
    marginTop: 10,
    fontSize: 12 
  }
})

class Courses extends Component {
  showModal = index => {
    this.props.openModal(index)
  }

  isNumber(text) {
    try {
      const iText = parseInt(text, 10)
      if (isNaN(iText)) return false
      else return true
    } catch (err) {
      return false
    }
  }

  getTime(index) {
    let stringTime = " "
    let sTime = this.props.courses[index].StartTime
    let eTime = this.props.courses[index].EndTime

    if (sTime === null || eTime === null) {
      return "N/A"
    }

    if (this.isNumber(sTime) && this.isNumber(eTime)) {
      let sType = ""
      let eType = ""
      let sHour = parseInt(sTime.substr(0, 2), 10)
      let sMinute = sTime.substr(2, 4)
      let eHour = parseInt(eTime.substr(0, 2), 10)
      let eMinute = eTime.substr(2, 4)

      if (sHour > 12) {
        sHour -= 12
        sType = "p.m."
      } else {
        sType = "a.m."
      }

      if (eHour > 12) {
        eHour -= 12
        eType = "p.m."
      } else {
        eType = "a.m."
      }

      const startTime = sHour + ":" + sMinute + " " + sType
      const endTime = eHour + ":" + eMinute + " " + eType
      stringTime = startTime + " - " + endTime
    }

    return stringTime
  }

  getMonth(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ]
    if (date != undefined) {
      return monthNames[date.getMonth()]
    } else {
      return ""
    }
  }

  getDay(date) {
    const { t } = this.props
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thurday",
      "Friday",
      "Saturday"
    ]
    if (dayNames !== undefined) {
      return dayNames[date.getDay()]
    } else {
      return "N/A"
    }
  }

  convertDate(i) {
    const startDate = this.props.courses[i].StartDate
    const endDate = this.props.courses[i].EndDate
    if (startDate != null && endDate != null) {
      const startParts = startDate.split(" ")
      const startDateParts = startParts[0].split("-")
      const startYear = startDateParts[0]
      const startMonth = startDateParts[1]
      const startDay = startDateParts[1]
      const newStartDate = new Date(startYear, startMonth, startDay, 0, 0, 0)
      const strStartMonth = this.getMonth(newStartDate)
      const strStartDay = this.getDay(newStartDate)
      const finStartDate =
        strStartDay + " " + strStartMonth + " " + startDay + " " + startYear

      const endParts = endDate.split(" ")
      const endDateParts = endParts[0].split("-")
      const endYear = endDateParts[0]
      const endMonth = endDateParts[1]
      const endDay = endDateParts[1]
      const newEndDate = new Date(endYear, endMonth, endDay, 0, 0, 0)
      const strEndMonth = this.getMonth(newEndDate)
      const strEndDay = this.getDay(newEndDate)
      const finEndDate =
        strEndDay + " " + strEndMonth + " " + endDay + " " + endYear
      return finStartDate + " - " + finEndDate
    } else {
      return "N/A"
    }
  }

  getMeetDays(i) {
    if (this.props.courses[i].MeetDays !== null) {
      return this.props.courses[i].MeetDays
    } else {
      return "N/A"
    }
  }

  getLocation(i) {
    if (this.props.courses[i].Building !== null) {
      const blding = this.props.courses[i].Building
      const room = this.props.courses[i].Room
      if (blding !== undefined && room !== null) {
        return blding + "-" + room
      }
    } else {
      return "N/A"
    }
  }

  getLocationLink(i) {
    const loc = this.getLocation(i)

    if (loc === "N/A") {
      return loc
    } else {
      return (
        <a
          tabIndex="0"
          target="_blank"
          href={getMapUrl(this.props.courses[i].Building, false)}
        >
          {loc}
        </a>
      )
    }
  }

  getCourseInfo(i) {
    const {classes, t} = this.props
    const name =
      this.props.courses[i].Subject + "-" + this.props.courses[i].Number
    const credits = t("credits", {}) + ": " + this.props.courses[i].Credits
    const crn = t("crn", {}) + ": " + this.props.courses[i].Crn
    const section = t("section", {}) + ": " + this.props.courses[i].Section

    return (
      <div>
        <Typography type="subheading" tabIndex="0" className={classes.text}>
          {t("courseInfo", {})}
        </Typography>
        <Divider style={{ marginBottom: 10 }} />
        <Typography tabIndex="0" className={classes.text}>
          {name}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {credits}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {crn}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {section}
        </Typography>
      </div>
    )
  }

  getLocationAndTime(i) {
    const {classes, t} = this.props

    return (
      <div>
        <Typography type="subheading" tabIndex="0" className={classes.text}>
          {t("locationAndTime", {})}
        </Typography>
        <Divider style={{ marginBottom: 10 }} />
        <Typography className={classes.text}>
          {this.getLocationLink(i)}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {this.props.courses[i].MeetDays}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {this.convertDate(i)}
        </Typography>
        <Typography tabIndex="0" className={classes.text}>
          {this.getTime(i)}
        </Typography>
      </div>
    )
  }

  getCardContent(i) {
    const { t } = this.props
    const classes = this.props.classes

    if (this.props.mobile) {
      return (
        <CardContent style={{ backgroundColor: "#F8F5EC" }}>
          {this.getCourseInfo(i)}
          {this.getLocationAndTime(i)}
          <Button
            dense
            raised
            onClick={this.showModal.bind(null, i)}
            aria-label="Students"
            className={classes.button}
          >
            {t("students", {})}
          </Button>
        </CardContent>
      )
    } else {
      return (
        <div className={classes.cardContent}>
          <CardContent>
            {this.getCourseInfo(i)}
          </CardContent>
          <CardContent>
            {this.getLocationAndTime(i)}
          </CardContent>
          <CardContent>
            <Button
              dense
              raised
              onClick={this.showModal.bind(null, i)}
              aria-label="Students"
              className={classes.button}
            >
              {t("students", {})}
            </Button>
          </CardContent>
        </div>
      )
    }
  }

  render() {
    const panels = []
    const classes = this.props.classes

    for (let i = 0; i < this.props.courses.length; i++) {
      panels.push(
        <Card className={classes.card}>
          <div style={{ backgroundColor: "#877148" }}>
            <Typography type="title" className={classes.cardTitle} tabIndex="0">
              {this.props.courses[i].Title}
            </Typography>
          </div>
          <div>
            {this.getCardContent(i)}
          </div>
        </Card>
      )
    }

    return (
      <div>
        {panels}
      </div>
    )
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "Courses" })(
  translate("view", { wait: true })(Courses)
)
