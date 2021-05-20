import {Component} from 'react';
import dateFormat from 'dateformat';
import s from '../styles/timer.module.scss'

let timeInterval;

const DATE_FORMAT_YMD = 'yyyy-mm-dd';
const DATE_FORMAT_YMD_HM = 'yyyy-mm-dd H:MM';

const dateEnd = '2021-05-21 19:00:00';

export class Timer extends Component {
    state = {}

    constructor(props) {
        super(props);
        const dateNow = Date.now();

        this.state = {
            currentTime: dateNow,
            finishTime: Date.parse(dateEnd),
            finishTimeFormated: dateFormat(dateEnd, DATE_FORMAT_YMD_HM)
        };
    }

    componentDidCatch(error, errorInfo) {
        this.__stopUpdateCurrentTime();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.currentTime <= this.state.finishTime;
    }

    componentDidMount() {
        this.__startUpdateCurrentTime();
    }

    __updateCurrentTime = () => {
        this.setState({currentTime: Date.now()})
    }

    __startUpdateCurrentTime = () => {
        setTimeout(() => {
            timeInterval = setInterval(() => this.__updateCurrentTime(), 1000)
        }, 1000);
    }
    __stopUpdateCurrentTime = () => {
        clearInterval(timeInterval);
    }

    __getDiffTime(currentTime, finishTime) {
        const diff = finishTime - currentTime

        return {
            // year: dateFormat(diff, 'yyyy'),
            // mouth: dateFormat(diff, 'mm'),
            // day: dateFormat(diff, 'dd'),
            hour: dateFormat(diff, 'H'),
            minute: dateFormat(diff, 'M'),
            seconds: dateFormat(diff, 'ss'),
        };
    }

    render() {
        const {currentTime, finishTime} = this.state;
        // const {styles: s} = this.props;
        const needUpdate = (finishTime - currentTime) > 0;

        const diff = this.__getDiffTime(currentTime, finishTime);

        return (
            needUpdate ?
                <div className={s.timer}>
                    {/*<div className={[s.timer__cell, s.timer__cellYear].join(' ')}>{diff.year}</div>*/}
                    {/*<div className={s.timer__cellDash}>-</div>*/}
                    {/*<div className={[s.timer__cell, s.timer__cellMouth].join(' ')}>{diff.mouth}</div>*/}
                    {/*<div className={s.timer__cellDash}>-</div>*/}
                    {/*<div className={[s.timer__cell, s.timer__cellDay].join(' ')}>{diff.day}</div>*/}

                    {/*<div className={s.timer__cellSpace} />*/}

                    <div className={[s.timer__cell, s.timer__cellHour].join(' ')}>{diff.hour}</div>
                    <div className={s.timer__cellColon}>:</div>
                    <div className={[s.timer__cell, s.timer__cellMinute].join(' ')}>{diff.minute}</div>
                    <div className={s.timer__cellColon}>:</div>
                    <div className={[s.timer__cell, s.timer__cellSeconds].join(' ')}>{diff.seconds}</div>
                </div>
                :
                <div className={s.timer}>
                    <div className={s.timer__danger}>
                        Мероприятие началось: {dateEnd}
                    </div>
                </div>
        );

    }
}
