import React, { Component } from "react"
import { IconButton, Button, Typography, Divider } from "material-ui"
import MenuIcon from "material-ui-icons/Menu"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import { translate } from "react-i18next"

const styles = theme => ({
  appBar: {
    margin: 0,
    padding: 0,
    display: "grid",
    alignItems: "center",
    justifyContent: "space-between"
  },
  panel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gridColumn: 1
  },
  termButton: {
    minWidth: 20,
    paddingLeft: 0,
    paddingRight: 10
  },
  icalButton: {
    padding: 0,
    fontSize: "medium"
  },
  text: {
    fontSize: "medium"
  } 
})

class TopPanel extends Component {
  menuClick = () => {
    this.props.openModal()
  }

  iCalDownload = e => {
    this.props.downloadICal()
  }

  getTerm() {
    if (this.props.term !== null && this.props.term !== undefined) {
      return this.props.term.Description.replace("Semester ", "")
    } else {
      return ""
    }
  }

  render() {
    const { t } = this.props
    const classes = this.props.classes

    if (this.props.mobile) {
      return (
        <div>
          <div className={classes.appBar}>
            <div className={classes.panel}>
              <Button
                onClick={this.menuClick}
                className={classes.termButton} 
                aria-label={t("termMenu", {})}
              >
                <MenuIcon />
              </Button>
            </div>
            <Typography 
              tabIndex="0" 
              style={{fontSize: "medium", marginRight: 15, gridColumn: 2 }}
            >
              {this.getTerm()}
            </Typography>
            <Button
              aria-label={t("downloadICal", {})}
              className={classes.icalButton}
              style={{ gridColumn: 3, textTransform: "none" }}
              onClick={this.iCalDownload}
            >
              {t("downloadICal", {})}
            </Button>
          </div>
          <Divider style={{ marginBottom: 20 }} />
        </div>
      )
    } else {
      return (
        <div>
          <div className={classes.appBar}>
            <div className={classes.panel}>
              <Button
                onClick={this.menuClick}
                className={classes.termButton}
                aria-label={t("termMenu", {})}
              >
                <MenuIcon />
              </Button>
              <Typography className={classes.text}>
                {t("terms", {})}
              </Typography>
            </div>
            <Typography tabIndex="0" className={classes.text} style={{ marginRight: 15, gridColumn: 2 }}>
              {this.getTerm()}
            </Typography>
            <Button
              aria-label={t("downloadICal", {})}
              className={classes.icalButton}
              style={{ gridColumn: 3, textTransform: "none" }}
              onClick={this.iCalDownload}
            >
              {t("downloadICal", {})}
            </Button>
          </div>
          <Divider style={{ marginBottom: 10 }} />
        </div>
      )
    }
  }
}

TopPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "TopPanel" })(
  translate("view", { wait: true })(TopPanel)
)
