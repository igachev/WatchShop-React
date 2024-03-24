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
    ];

    beforeEach(() => {
        jest.resetAllMocks();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

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

test("the number of displayed table rows should be equal to the number of purchases in mockAdminHistory array", async() => {

    adminPurchaseHistory.mockResolvedValue({data:mockAdminHistory})
  
       render(
           <Provider store={store}>
           <MemoryRouter>
               <AdminPurchaseHistory />
           </MemoryRouter>
           </Provider>
       )

    const tableBody = await screen.findByTestId("table-body")
    expect(tableBody.children.length).toBe(mockAdminHistory.length)
})

test("first purchase should be displayed with correct details", async() => {

        adminPurchaseHistory.mockResolvedValue({data:mockAdminHistory})
   
        render(
            <Provider store={store}>
            <MemoryRouter>
                <AdminPurchaseHistory />
            </MemoryRouter>
            </Provider>
        )
       
    const firstOrderNumber = await screen.findByText(mockAdminHistory[0]._id)
    const firstOrderBrand = await screen.findByText(mockAdminHistory[0].watchId.brand)
    const firstOrderModel = await screen.findByText(mockAdminHistory[0].watchId.model)
    const firstOrderQuantity = await screen.findByText(mockAdminHistory[0].quantity)
    const firstOrderDate = await screen.findByText(mockAdminHistory[0].date.toString().split('T')[0])
    const firstOrderSum = await screen.findByText(mockAdminHistory[0].totalSum)
    const firstOrderName = await screen.findByText(mockAdminHistory[0].name)
    const firstOrderAddress = await screen.findAllByText(mockAdminHistory[0].address)
    const firstOrderPhone = await screen.findByText(mockAdminHistory[0].phone)

    expect(firstOrderNumber).toBeInTheDocument()
    expect(firstOrderBrand).toBeInTheDocument()
    expect(firstOrderModel).toBeInTheDocument()
    expect(firstOrderQuantity).toBeInTheDocument()
    expect(firstOrderDate).toBeInTheDocument()
    expect(firstOrderSum).toBeInTheDocument()
    expect(firstOrderName).toBeInTheDocument()
    expect(firstOrderAddress[0]).toBeInTheDocument()
    expect(firstOrderPhone).toBeInTheDocument()
})

test("should have and use 'TableRowElement' component if there are purchases", async() => {

    adminPurchaseHistory.mockResolvedValue({data:mockAdminHistory})
   
    render(
        <Provider store={store}>
        <MemoryRouter>
            <AdminPurchaseHistory />
        </MemoryRouter>
        </Provider>
    )

    const tableRowElementComponents = await screen.findAllByTestId('table-row')
    expect(tableRowElementComponents.length).toBeGreaterThan(0)
    expect(tableRowElementComponents.length).toBe(mockAdminHistory.length)

    adminPurchaseHistory.mockRestore()
})

test("should not have 'TableRowElement' component if there are no purchases made", async() => {

    adminPurchaseHistory.mockResolvedValue({data:[]})
    store.dispatch(confirmedGetAdminPurchaseHistoryAction([]))
   
    render(
        <Provider store={store}>
        <MemoryRouter>
            <AdminPurchaseHistory />
        </MemoryRouter>
        </Provider>
    )

    const tableRowElementComponents = screen.queryAllByTestId('table-row')
    expect(tableRowElementComponents.length).toBe(0)
})

})