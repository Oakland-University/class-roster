import React, { Component } from "react"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Button from "material-ui/Button"
import Radio from "material-ui/Radio"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
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
  text: {
    fontSize: "medium"
  }
})

class TermModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null
    }
  }

  changeSelected = (event, value) => {
    this.setState({ selected: event.currentTarget.value })
  }

  closeModal = () => {
    this.props.closeModal()
  }

  chooseTerm = () => {
    if (this.state.selected !== null) {
      this.props.changeTerm(this.props.terms[this.state.selected])
    }
  }

  getTerms() {
    const {classes} = this.props
    const termButtons = []
    for (let i = 0; i < this.props.terms.length; i++) {
      let label = this.props.terms[i].Description.replace("Semester ", "")
      label = label.replace("Session ", "")

      termButtons.push(
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Radio
            checked={parseInt(this.state.selected) === i}
            onChange={this.changeSelected}
            value={i}
            aria-label={this.props.terms[i].Description}
          />
          <Typography className={classes.text}>
            {label}
          </Typography>
        </div>
      )
    }

    return termButtons
  }

  render() {
    const { t } = this.props
    const classes = this.props.classes

    return (
      <Dialog
        maxWidth="xl"
        open={this.props.open}
        onClose={this.closeModal}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography className={classes.title}>
            {t("terms", {})}
          </Typography>
        </DialogTitle>
        <DialogContent aria-label={t("terms", {})}>
          {this.getTerms()}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" style={{fontSize: 12}} onClick={this.chooseTerm}>
            {t("ok", {})}
          </Button>
          <Button color="secondary" style={{fontSize: 12}} onClick={this.closeModal}>
            {t("cancel", {})}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

TermModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "TermModal" })(
  translate("view", { wait: true })(TermModal)
)
