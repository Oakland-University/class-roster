function getHeader() {
  return (
    "BEGIN:VCALENDAR\n" +
    "PRODID:-//Oakland University//Courses Calendar//EN" +
    "\nVERSION:2.0" +
    "\nCALSCALE:GREGORIAN" +
    "\nMETHOD:PUBLISH\n"
  )
}

function getDays(days) {
  if (days !== undefined) {
    const dayParts = days.split(" ")
    const meetDays = []
    for (let i = 0; i < dayParts.length; i++) {
      switch (dayParts[i]) {
        case "Sunday":
          meetDays.push("SU")
          break
        case "Monday":
          meetDays.push("MO")
          break
        case "Tuesday":
          meetDays.push("TU")
          break
        case "Wednesday":
          meetDays.push("WE")
          break
        case "Thursday":
          meetDays.push("TH")
          break
        case "Friday":
          meetDays.push("FR")
          break
        case "Saturday":
          meetDays.push("SA")
          break
        default:
          break
      }
    }
    return meetDays.join(",")
  } else {
    return " "
  }
}

function getDate(date, time) {
  if (date !== null && time !== null) {
    const parts = date.split(" ")
    const dateParts = parts[0].split("-")
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    return year + month + day + "T" + time + "00"
  } else {
    return " "
  }
}

function getClassName(sub, num) {
  if (sub !== undefined && num !== undefined) {
    return sub + " " + num
  } else {
    return " "
  }
}

function getLoc(building, room) {
  if (building !== undefined && room !== undefined) {
    return building + "-" + room
  } else {
    return " "
  }
}

function getClassData(data) {
  return (
    "BEGIN:VEVENT" +
    "\nDTSTART:" +
    data.startDate +
    "\nDTEND:" +
    data.endDate +
    "\nRRULE:FREQ=WEEKLY" +
    ";UNTIL=" +
    data.until +
    ";BYDAY=" +
    data.days +
    "\nLOCATION:" +
    data.loc +
    "\nSUMMARY:" +
    data.className +
    "\nDTSTAMP:" +
    data.until +
    "\nEND:VEVENT\n"
  )
}

function getICalFile(courses) {
  const data = []
  for (let i = 0; i < courses.length; i++) {
    data.push({
      startDate: getDate(courses[i].StartDate, courses[i].StartTime),
      endDate: getDate(courses[i].StartDate, courses[i].EndTime),
      loc: getLoc(courses[i].Building, courses[i].Room),
      className: getClassName(courses[i].Subject, courses[i].Number),
      until: getDate(courses[i].EndDate, courses[i].EndTime),
      days: getDays(courses[i].MeetDays)
    })
  }
  const file = getICal(data)

  return file
}

function getICal(data) {
  let iCalFile = getHeader()
  for (let i = 0; i < data.length; i++) {
    iCalFile += getClassData(data[i])
  }

  iCalFile += "END:VCALENDAR"

  return iCalFile
}

export { getICalFile }
