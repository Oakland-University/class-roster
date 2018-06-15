import React, { Component } from "react"
import { getData, getCourses, getStudents } from "./utils/fetchData.js"
import { getICalFile } from "./utils/iCalCreator.js"
import { CircularProgress } from "material-ui/Progress"
import TermModal from "./component/TermModal.js"
import TopPanel from "./component/TopPanel.js"
import Courses from "./component/Courses.js"
import StudentModal from "./component/StudentModal.js"
import ErrorPage from "./component/ErrorPage.js"

/* global token*/

class ClassRoster extends Component {
  constructor() {
    super()
    this.state = {
      courses: [],
      studentFirstName: [],
      studentLastName: [],
      studentRegistration: [],
      termList: [],
      selectedTerm: null,
      selectedCourse: null,
      showmodal: false,
      error: false,
      open: false,
      mobile: false,
      initialized: false
    }

    this.getTerms()
  }

  getTerms() {
    getData("api/v1/terms", token.encryptedToken)
      .then(data => {
        const terms = []
        if (data.length === 0) {
          this.setState({ error: true })
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].IsCurrentTerm === "Y") {
              this.setState({ selectedTerm: data[i] })
              break
            }
          }

          if (this.state.selectedTerm === null) {
            let selTerm = this.getSelTerm(data)
            if (selTerm === null) {
              selTerm = this.getBetweenTerm(data)
            }

            this.setState({ selectedTerm: selTerm })
          }

          this.changeTerm(this.state.selectedTerm)
          this.setState({ termList: data })
        }
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    if (document.getElementById(this.props.rootElement).clientWidth < 400) {
      this.setState({ mobile: true })
    }

    this.setState({ initialized: true })
  }

  getSelTerm(terms) {
    let date = new Date()

    for (let i = 0; i < terms.length; i++) {
      let stDate = terms[i].StartDate.split(" ")[0].split("-")
      let endDate = terms[i].EndDate.split(" ")[0].split("-")

      if (parseInt(stDate[0]) === date.getFullYear()) {
        if (
          parseInt(stDate[1]) <= date.getMonth() + 1 &&
          parseInt(endDate[1]) >= date.getMonth() + 1
        ) {
          return terms[i]
        }
      }
    }

    return null
  }

  getBetweenTerm(terms) {
    let date = new Date()

    for (let i = 0; i < terms.length - 1; i++) {
      let endDate = terms[i].EndDate.split(" ")[0].split("-")
      let stDate = terms[i + 1].StartDate.split(" ")[0].split("-")

      if (parseInt(stDate[0]) === date.getFullYear()) {
        if (
          parseInt(stDate[1]) >= date.getMonth() + 1 &&
          parseInt(endDate[1]) <= date.getMonth() + 1
        ) {
          return terms[i]
        }
      }
    }

    return null
  }

  updateWidth = () => {
    const width = document.getElementById(this.props.rootElement).clientWidth
    if (width < 500) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  downloadICal = text => {
    let element = document.createElement("a")
    const fileName =
      "OUSchedule-" + this.state.selectedTerm.Description + ".ics"
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    )
    element.setAttribute("download", fileName)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  getICal = term => {
    const file = getICalFile(this.state.courses)
    this.downloadICal(file)
  }

  changeTerm = term => {
    getCourses("api/v1/courses", token.encryptedToken, term.TermCode)
      .then(data => {
        this.setState({
          courses: data,
          open: false,
          selectedTerm: term
        })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  changeStudents = crn => {
    let term = this.state.selectedTerm.TermCode
    getStudents("api/v1/students", token.encryptedToken, term, crn)
      .then(data => {
        if (data.length > 0) {
          const firstName = []
          const lastName = []
          const registration = []

          for (let i = 0; i < data.length; i++) {
            firstName.push(data[i].FirstName)
            lastName.push(data[i].LastName)
            registration.push(data[i].RegistrationStatus)
          }

          this.setState({
            studentFirstName: firstName,
            studentLastName: lastName,
            studentRegistration: registration,
            showmodal: true
          })
        }
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  hideModal = () => {
    this.setState({ showmodal: false })
  }

  selectStudents = i => {
    this.setState({ selectedCourse: this.state.courses[i].Title })
    this.changeStudents(this.state.courses[i].Crn)
  }

  openModal = () => {
    this.setState({ open: true })
  }

  closeModal = () => {
    this.setState({ open: false })
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />
    } else if (!this.state.initialized) {
      return (
        <div>
          <CircularProgress color="accent" size={50} />
        </div>
      )
    } else {
      return (
        <div>
          <TopPanel
            mobile={this.state.mobile}
            openModal={this.openModal}
            downloadICal={this.getICal}
            term={this.state.selectedTerm}
          />
          <Courses
            mobile={this.state.mobile}
            openModal={this.selectStudents}
            courses={this.state.courses}
          />
          <TermModal
            changeTerm={this.changeTerm}
            closeModal={this.closeModal}
            open={this.state.open}
            currentTerm={this.state.selectedTerm}
            terms={this.state.termList}
          />
          <StudentModal
            onClose={this.hideModal}
            showmodal={this.state.showmodal}
            selectedCourse={this.state.selectedCourse}
            firstName={this.state.studentFirstName}
            lastName={this.state.studentLastName}
            registration={this.state.studentRegistration}
          />
        </div>
      )
    }
  }
}

export default ClassRoster
