import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, Separator } from '../../styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

interface CountdownProps {
  resetForm: () => void
}
export function Countdown({ resetForm }: CountdownProps) {
  const {
    activeCycle,
    activeCycleId,
    secondsPassedAmount,
    setSecondsPassedOnCycle,
    endCountdownTimer,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassedAmount : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondAmount = currentSeconds % 60
  const minutesToShow = String(minutesAmount).padStart(2, '0')
  const secondsToShow = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    console.log('useEffect - ' + activeCycle?.minutesAmount)
    console.log('activeCycle.startDate - ' + activeCycle?.startDate)

    if (activeCycle) {
      console.log('activeCycle')
      interval = setInterval(() => {
        console.log('onterval')
        const secondsPassedOnCycle = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsPassedOnCycle >= totalSeconds) {
          console.log('finshed')

          endCountdownTimer(totalSeconds)
          resetForm()
          clearInterval(interval)
        } else {
          console.log('setSecondsPassedOnCycle - ' + secondsPassedOnCycle)
          setSecondsPassedOnCycle(secondsPassedOnCycle)
        }
      })
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    endCountdownTimer,
    setSecondsPassedOnCycle,
    resetForm,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToShow}: ${secondsToShow} - ${activeCycle.task}`
    } else {
      document.title = 'Timer'
    }
  }, [minutesToShow, secondsToShow, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesToShow[0]}</span>
      <span>{minutesToShow[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToShow[0]}</span>
      <span>{secondsToShow[1]}</span>
    </CountdownContainer>
  )
}
