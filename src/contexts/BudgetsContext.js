import React, { useContext, useState } from "react"
import { v4 as uuidv4} from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"
const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = 'uncategorizedzzz'


export function useBudgets(){
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    
    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses =>{
            
            return [...prevExpenses,
            { id: uuidv4(), description, amount, budgetId}]
        })
    }

    function addBudget({name, max}){
        
        setBudgets(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets,
            { id: uuidv4(), name, max}]
        })
    }

    function deleteBudget({id}){
        // const expensesToBeDeleted = getBudgetExpenses(id)
        // setExpenses(prevExpenses => {
        //     return prevExpenses.filter(expense => !expensesToBeDeleted.includes(expense))
        // })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    
    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    
    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetContext.Provider> 
    
}