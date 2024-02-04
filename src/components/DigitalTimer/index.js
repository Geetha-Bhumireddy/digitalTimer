// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerStarted: false,
  timerLimitInMinutes: 25,
  timerInSeconds: 0,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecrementTime = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTime = () => {
    const {timerLimitInMinutes} = this.state

    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerInSeconds} = this.state
    const isButtonDisabled = timerInSeconds > 0

    return (
      <div>
        <p>Set Timer limit</p>
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={this.onDecrementTime}
        >
          -
        </button>
        <p>{timerLimitInMinutes}</p>
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={this.onIncrementTime}
        >
          +
        </button>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {isTimerStarted, timerLimitInMinutes, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerStarted: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  onStartOrPauseTimer = () => {
    const {isTimerStarted, timerLimitInMinutes, timerInSeconds} = this.state
    const isTimeCompleted = timerLimitInMinutes * 60 === timerInSeconds

    if (isTimeCompleted) {
      this.clearTimeInterval()
    }
    if (isTimerStarted) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
  }

  renderTimerController = () => {
    const {isTimerStarted} = this.state

    const startOrPauseImageUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerStarted ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerStarted ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timerInSeconds} = this.state
    const totalRemainingTime = timerLimitInMinutes * 60 - timerInSeconds

    const min = Math.floor(totalRemainingTime / 60)
    const sec = Math.floor(totalRemainingTime * 60)
    const stringMin = min > 9 ? min : `0${min}`
    const stringSec = sec > 9 ? sec : `0${sec}`

    return `${stringMin}:${stringSec}`
  }

  render() {
    const {isTimerStarted, timerLimitInMinutes, timerInSeconds} = this.state
    const labelText = isTimerStarted ? 'Running' : 'Paused'

    return (
      <div>
        <h1>Digital Timer</h1>
        <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
        <p>{labelText}</p>
        <p>{this.renderTimerController()}</p>
        <p>{this.renderTimerLimitController()}</p>
      </div>
    )
  }
}

export default DigitalTimer
