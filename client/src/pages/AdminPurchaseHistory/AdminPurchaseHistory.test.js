import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import AdminPurchaseHistory from "./AdminPurchaseHistory"
import * as authActions from "../../store/actions/authActions"
import { adminPurchaseHistory } from "../../services/authService"
import { confirmedGetAdminPurchaseHistoryAction } from "../../store/actions/authActions"
import { act } from "react-dom/test-utils"


jest.mock('../../services/authService', () => ({
    adminPurchaseHistory: jest.fn(),
  }));


describe("AdminPurchaseHistory component", () => {
    let mockAdminHistory = [
        {
            "watchId": {
                "_id": "64ce44580bc299cc98f4a95c",
                "brand": "Casio",
                "model": "G-Shock"
            },
            "quantity": 2,
            "totalSum": 300,
            "name": "ivan",
            "phone": "6543843828",
            "address": "str:petar 3,burgas",
            "_id": "64ce48780bc299cc98f4a994",
            "date": "2023-08-05T13:02:48.902Z"
        },

        {
            "watchId": {
                "_id": "64ce451e0bc299cc98f4a963",
                "brand": "Timex",
                "model": "new"
            },
            "quantity": 1,
            "totalSum": 400,
            "name": "hristo",
            "phone": "6554387687",
            "address": "str:petar 3,burgas",
            "_id": "64d0b8583b883b3568283898",
            "date": "2023-08-07T09:24:40.427Z"
        },
    ]

test("should have title 'All purchases made by users'", async() => {

    adminPurchaseHistory.mockResolvedValue({data:mockAdminHistory})
    render(
        <Provider store={store}>
        <MemoryRouter>
            <AdminPurchaseHistory />
        </MemoryRouter>
        </Provider>
    )

    const h1Element = screen.getByRole('heading',{level: 1, name: 'All purchases made by users'})
    expect(h1Element).toBeInTheDocument()
})

test("should call getAdminPurchaseHistoryAction() on component mounting", async() => {

  let getAdminPurchaseHistoryActionSpy = jest.spyOn(authActions,'getAdminPurchaseHistoryAction')
  adminPurchaseHistory.mockResolvedValue({data:mockAdminHistory})
  
       render(
           <Provider store={store}>
           <MemoryRouter>
               <AdminPurchaseHistory />
           </MemoryRouter>
           </Provider>
       )

    expect(getAdminPurchaseHistoryActionSpy).toHaveBeenCalledTimes(1)
    expect(adminPurchaseHistory).toHaveBeenCalledTimes(1)
    
    getAdminPurchaseHistoryActionSpy.mockRestore()
})

})