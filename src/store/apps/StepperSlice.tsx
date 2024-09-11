import { createSlice } from '@reduxjs/toolkit'

interface StateType {
  stepperActive: number
}

const initialState: StateType = {
  stepperActive: 0
}

export const StepperSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setActiveStep: (state: StateType, action) => {
      return {
        ...state,
        stepperActive: action.payload
      }
    },
    setNextStep: (state: StateType) => {
      return {
        ...state,
        stepperActive: state.stepperActive + 1
      }
    },
    setPrevStep: (state: StateType) => {
      return {
        ...state,
        stepperActive: state.stepperActive - 1
      }
    }
  }
})

export const { setActiveStep, setNextStep, setPrevStep } = StepperSlice.actions

export default StepperSlice.reducer
