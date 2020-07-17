import React, { Component } from 'react';
import moment from 'moment'
import weddingList from './utils/weddingList'
import styled from 'styled-components'

const PTitle = styled.p`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Swanky and Moo Moo', cursive;
`

const SearchButton = styled.button`
  width: 60px;
  display: inline-block;
  height: 36px;
  border: 1px solid #eee;
  vertical-align: top;
  outline: none;
  background-color: var(${props => props.styledTheme.color});

  &:hover {
    box-shadow: 0 0 100px rgba(0, 0, 0, .4) inset;
    color: #eee;
  }
`
const DivContainer = styled.div`
  displa: block;
  color: #333;
  font-size: 23px;
  font-family: 'Swanky and Moo Moo', cursive;
  width: 100%;

    p {
      font-size: 25px;
    }
`
const BoxContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  margin: 30px 0;
  text-align: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(${props => props.styledTheme.color});
    border-radius: 10px;
    padding: 30px 0;
    color: #777;
    font-family: 'Galada', cursive;
    font-size: 20px;

    span {
      font-size: 80px;
      display: block;
      text-align: center;
      color: #555555;
    }

    @media (max-width: 750px) {
      font-size: 32px;

      span {
        font-size: 65px
      }
    }
  }

  @media (max-width: 550px) {
    grid-template-columns: 100% !important;
  }

  &.to-get-married {
    & > div {
      background-color: var(--color-default-countdown-2);
    }
  }
`

let styledTheme = {
  color: '--color-default-countdown'
}

const DEFAULT_DATE_VALUE = moment(new Date(2015, 9, 31, 18, 30))

export default class Home extends Component {
  constructor () {
    super()

    this.state = {
      marriedDate: '',
      d: '',
      h: '',
      m: '',
      s: '',
      Mo: '',
      y: '',
      currentWedding: '',
      gotMarried: false,
      date: null,
      time: null
    }

    this.interval = null
  }

  componentDidMount () {
    const MD = moment(DEFAULT_DATE_VALUE)
    this.setState({
      marriedDate: DEFAULT_DATE_VALUE
    })

    this.getSplitedTime(MD)
  }

  getSplitedTime = MD => {
    const DEY = MD.year(),
      DEMo = MD.month(),
      DED = MD.date(),
      DEH = MD.hour(),
      DEM = MD.minute()

    this.setDiffTime(DEY, DEMo, DED, DEH, DEM, MD)
  }

  setWedding (y) {
    const currentWedding = weddingList.find((wedding) => {
      return wedding.id === y
    })

    const nextWedding = weddingList.find((wedding) => {
      return wedding.id === y + 1
    })

    this.setState({
      currentWedding: currentWedding.name,
      nextWedding: nextWedding.name
    })
  }

  setDiffTime (DEY, DEMo, DED, DEH, DEM, MD) {
    let eventTime = moment(new Date(DEY, DEMo, DED, DEH, DEM)).unix(),
      currentTime = moment().unix(),
      diffTime = currentTime - eventTime,
      hasWedding = true,
      setMarried = true
    styledTheme = {
      color: '--color-default-countdown'
    }

    if (diffTime <= 0) {
      diffTime = eventTime - currentTime
      hasWedding = false
      setMarried = false
      styledTheme = {
        color: '--color-default-countdown-2'
      }
    }

    const duration = moment.duration(diffTime * 1000, 'milliseconds')

    let y = moment.duration(duration).years()
    y = y.length === 1 ? '0' + y : y

    this.setState({ y, gotMarried: setMarried })
    this.setCountdown(DEY, DEMo, DED, DEH, DEM, y, hasWedding, MD)
    this.setWedding(y)
  }

  setCountdown (DEY, DEMo, DED, DEH, DEM, y, hasWedding, MD) {
    let nextEvent = moment(new Date(DEY + y + 1, DEMo, DED, DEH, DEM)).unix()

    if (!hasWedding) {
      nextEvent = moment(MD).unix()
    }

    let currentTime = moment().unix(),
      diffTime = nextEvent - currentTime,
      duration = moment.duration(diffTime * 1000, 'milliseconds'),
      interval = 1000

    clearInterval(this.interval)

    if (diffTime > 0) {
      this.interval = setInterval( () => {
        duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds')
        let d = moment.duration(duration).days(),
          h = moment.duration(duration).hours(),
          m = moment.duration(duration).minutes(),
          s = moment.duration(duration).seconds(),
          Mo = moment.duration(duration).months()

          d = d.length === 1 ? '0' + d : d
          h = h.length === 1 ? '0' + h : h
          m = m.length === 1 ? '0' + m : m
          s = s.length === 1 ? '0' + s : s
          Mo = Mo.length === 1 ? '0' + Mo : Mo

        if (s < 0) {
          this.setState({
            gotMarried: true,
            marriedDate: moment(new Date())
          })
          this.getSplitedTime(moment(new Date()))
        }

        this.setState({
          d, h, m, s, Mo
        })
      }, interval)
    }
  }

  gridCalc = (y, d, Mo) => {
    let number = 6

    if (y === 0) {
      number = number - 1
    }
    if (Mo === 0) {
      number = number - 1
    }
    if (d === 0) {
      number = number - 1
    }
    if (y >= 1 && this.state.gotMarried) {
      number = number - 1
    }

    const percent = 100/number
    const pixel = ((number - 1) * 20 / number)

    let value = ''
    for(let i = 0; i < number; i++) {
      value = `${value} calc(${percent}% - ${pixel}px)` 
    }

    return value
  }

  onChangeInput = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  onSubmitForm = e => {
    e.preventDefault()
    const {date, time} = this.state
    if (!date || !time) {
      return
    }
    const MD = moment(`${date} ${time}`)
    this.setState({marriedDate: MD})
    this.getSplitedTime(MD)
  }

  render () {
    const {
      marriedDate,
      y, d, h, m, s, Mo,
      currentWedding,
      gotMarried,
      nextWedding} = this.state
    const gridCalc = this.gridCalc(y, d, Mo)
    return (
      marriedDate && (
        <div className='home'>
          <div className='explanation'>
            <div className='squad home'>
              <p>Olá visitante. Tenho aqui um contador que funciona da seguinte forma: Se colocar uma data anterior a de hoje, ele exibirá informações das Bodas de Matrimônio (mas só até 100 anos ahahaha). Ele vai começar a contar a partir da data e horário que foi informado, desde Bodas de Papel até Bodas de Jequitibá. Ao se passarem os anos, ele automaticamente alterará o valor, não precisando se preocupar em preencher nada além da data.</p>
              <p>Caso a data seja futura ao dia de hoje, inicia-se uma contagem para o dia do casamento. O cronômetro chegando em 0, automaticamente altera para o setup explicado acima, contando as bodas.</p>

              <p>Faça um teste, selecione uma data para seu evento!</p>
              <form onSubmit={e => this.onSubmitForm(e)}>
                <input type='date' name='date' onChange={e => this.onChangeInput(e)} />
                <input type='time' name='time' onChange={e => this.onChangeInput(e)} />
                <SearchButton styledTheme={styledTheme} type='submit'><i className="fas fa-search"></i></SearchButton>
              </form>
            </div>
          </div>
          <div className='squad'>
            {gotMarried ? (
              <div>
                <PTitle>Contagem Regressiva para as <span style={{color: `var(${styledTheme.color})`}}>próximas bodas!</span></PTitle>
                <DivContainer>
                  <p>Nosso casamento foi realizado em <b>{marriedDate.format('DD/MM/YYYY')}</b> às <b>{marriedDate.format('H:mm')}</b>. {y > 0 ? (
                    y > 1 ? `Se passaram ${y} anos` : `Se Passou 1 ano`
                  ) : 'Ainda não completamos um ano'} desde então.</p>
                  <p>Estamos em <span className='destaque' style={{color: `var(${styledTheme.color})`}}>{currentWedding}</span></p>
                <p>Para comemorar {y <= 1 ? 'este primeiro ano' : `${y + 1} anos`} e as <span className='destaque destaque-dois'>{nextWedding}</span>, faltam... </p>
                  <BoxContainer styledTheme={styledTheme} style={{gridTemplateColumns: gridCalc}}>
                    {Mo > 0 ? (<div><div><span>{Mo}</span> {Mo >= 2 ? 'meses' : 'mês'}</div></div>) : null}
                    {d > 0 ? (<div><div><span>{d}</span> {d >= 2 ? 'dias' : 'dia'}</div></div>) : null}
                    <div><div><span>{h}</span> {h >= 2 ? 'horas' : 'hora'}</div></div>
                    <div><div><span>{m}</span> {m >= 2 ? 'minutos' : 'minuto'}</div></div>
                    <div><div><span>{s}</span> {s >= 2 ? 'segundos' : 'segundo'}</div></div>
                  </BoxContainer>
                </DivContainer>
              </div>
            ) : (
              <div>
                <PTitle>Contagem Regressiva para <span style={{color: `var(${styledTheme.color})`}}>nosso casamento!</span></PTitle>
                <DivContainer>
                  <p>Nosso casamento será no dia <span className='destaque destaque-dois'>{marriedDate.format('DD/MM/YYYY')}</span> às <span className='destaque destaque-dois'>{marriedDate.format('H:mm')}</span> na <span className='destaque' style={{color: `var(${styledTheme.color})`}}>Igreja Brasil no Ibirapuera</span>.</p>
                  <p>Agora, faltam ...</p>
                  <BoxContainer styledTheme={styledTheme} style={{gridTemplateColumns: gridCalc}}>
                    {y > 0 ? (<div><div><span>{y}</span> {y >= 2 ? 'anos' : 'ano'}</div></div>) : null}
                    {Mo > 0 ? (<div><div><span>{Mo}</span> {Mo >= 2 ? 'meses' : 'mês'}</div></div>) : null}
                    {d > 0 ? (<div><div><span>{d}</span> {d >= 2 ? 'dias' : 'dia'}</div></div>) : null}
                    <div><div><span>{h}</span> {h >= 2 ? 'horas' : 'hora'}</div></div>
                    <div><div><span>{m}</span> {m >= 2 ? 'minutos' : 'minuto'}</div></div>
                    <div><div><span>{s}</span> {s >= 2 ? 'segundos' : 'segundo'}</div></div>
                  </BoxContainer>
                </DivContainer>
              </div>
            )}
          </div>
        </div>
      )
    )
  }
}
