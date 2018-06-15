import React, { Component } from "react"
import Card, { CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import TopPanel from "./TopPanel.js"
import { translate } from "react-i18next"

class ErrorPage extends Component {
  openModal = () => {}
  iCal = () => {}

  render() {
    const { t } = this.props
    const titleStyle = {
      marginTop: 10,
      marginLeft: 15,
      marginBottom: 10,
      color: "#ffffff"
    }

    return (
      <div>
        <TopPanel openModal={this.openModal} downloadICal={this.iCal} />
        <Card>
          <div
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: "#877148"
            }}
          >
            <Typography type="title" style={titleStyle} tabIndex="0">
              {t("error", {})}
            </Typography>
          </div>
          <CardContent>
            <Typography type="heading" tabIndex="0">
              {t("errorMessage", {})}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default translate("view", { wait: true })(ErrorPage)
