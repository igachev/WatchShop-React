import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import { MemoryRouter } from "react-router-dom"
import SearchWatches from './SearchWatches'
import * as watchActions from '../../store/actions/watchActions'
import * as watchService from '../../services/watchService'
import { act } from "react-dom/test-utils"


describe("Search component", () => {

    const mockWatches = [
        {
          "_id": "64ce44580bc299cc98f4a95c",
          "brand": "Casio",
          "model": "G-Shock",
          "image": "https://images.unsplash.com/photo-1595520407624-66b24f015830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "battery": "Lithium 3v",
          "mechanism": "quartz",
          "price": 150,
          "strap": "rubber",
          "glass": "mineral",
          "waterResistance": "20 ATM",
          "rating": [
              {
                  "userId": "64ce47c70bc299cc98f4a978",
                  "userRating": 4,
                  "_id": "64ce48100bc299cc98f4a982"
              },
              {
                  "userId": "64ce498f0bc299cc98f4a9f7",
                  "userRating": 4,
                  "_id": "64ce4a3a0bc299cc98f4aa27"
              },
              {
                  "userId": "656f045a2c1edb6f5ed97233",
                  "userRating": 5,
                  "_id": "656f04882c1edb6f5ed97283"
              }
          ],
          "__v": 0
      },
      {
          "_id": "64ce449f0bc299cc98f4a95f",
          "brand": "Omega",
          "model": "new model",
          "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
          "battery": "no",
          "mechanism": "automatic",
          "price": 500,
          "strap": "metal",
          "glass": "sapphire",
          "waterResistance": "no",
          "rating": [
              {
                  "userId": "64ce47c70bc299cc98f4a978",
                  "userRating": 5,
                  "_id": "64ce48c80bc299cc98f4a9af"
              },
              {
                  "userId": "64ce498f0bc299cc98f4a9f7",
                  "userRating": 4,
                  "_id": "64ce4a820bc299cc98f4aa42"
              },
              {
                  "userId": "64d6266539c834f942b18c4b",
                  "userRating": 3,
                  "_id": "64d626a839c834f942b18c75"
              }
          ],
          "__v": 0
      },
      {
        "_id": "64ce44580bc299cc98f4a95d",
        "brand": "Casio1",
        "model": "G-Shock",
        "image": "https://images.unsplash.com/photo-1595520407624-66b24f015830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "battery": "Lithium 3v",
        "mechanism": "quartz",
        "price": 150,
        "strap": "rubber",
        "glass": "mineral",
        "waterResistance": "20 ATM",
        "rating": [
            {
                "userId": "64ce47c70bc299cc98f4a978",
                "userRating": 4,
                "_id": "64ce48100bc299cc98f4a982"
            },
            {
                "userId": "64ce498f0bc299cc98f4a9f7",
                "userRating": 4,
                "_id": "64ce4a3a0bc299cc98f4aa27"
            },
            {
                "userId": "656f045a2c1edb6f5ed97233",
                "userRating": 5,
                "_id": "656f04882c1edb6f5ed97283"
            }
        ],
        "__v": 0
      },
      {
        "_id": "64ce449f0bc299cc98f4a95c",
        "brand": "Omega1",
        "model": "new model",
        "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
        "battery": "no",
        "mechanism": "automatic",
        "price": 500,
        "strap": "metal",
        "glass": "sapphire",
        "waterResistance": "no",
        "rating": [
            {
                "userId": "64ce47c70bc299cc98f4a978",
                "userRating": 5,
                "_id": "64ce48c80bc299cc98f4a9af"
            },
            {
                "userId": "64ce498f0bc299cc98f4a9f7",
                "userRating": 4,
                "_id": "64ce4a820bc299cc98f4aa42"
            },
            {
                "userId": "64d6266539c834f942b18c4b",
                "userRating": 3,
                "_id": "64d626a839c834f942b18c75"
            }
        ],
        "__v": 0
      },
      {
        "_id": "64ce44580bc299cc98f4a95h",
        "brand": "Casio2",
        "model": "G-Shock",
        "image": "https://images.unsplash.com/photo-1595520407624-66b24f015830?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "battery": "Lithium 3v",
        "mechanism": "quartz",
        "price": 150,
        "strap": "rubber",
        "glass": "mineral",
        "waterResistance": "20 ATM",
        "rating": [
            {
                "userId": "64ce47c70bc299cc98f4a978",
                "userRating": 4,
                "_id": "64ce48100bc299cc98f4a982"
            },
            {
                "userId": "64ce498f0bc299cc98f4a9f7",
                "userRating": 4,
                "_id": "64ce4a3a0bc299cc98f4aa27"
            },
            {
                "userId": "656f045a2c1edb6f5ed97233",
                "userRating": 5,
                "_id": "656f04882c1edb6f5ed97283"
            }
        ],
        "__v": 0
      },
      {
        "_id": "64ce449f0bc299cc98f4a95t",
        "brand": "Omega2",
        "model": "new model",
        "image": "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80",
        "battery": "no",
        "mechanism": "automatic",
        "price": 500,
        "strap": "metal",
        "glass": "sapphire",
        "waterResistance": "no",
        "rating": [
            {
                "userId": "64ce47c70bc299cc98f4a978",
                "userRating": 5,
                "_id": "64ce48c80bc299cc98f4a9af"
            },
            {
                "userId": "64ce498f0bc299cc98f4a9f7",
                "userRating": 4,
                "_id": "64ce4a820bc299cc98f4aa42"
            },
            {
                "userId": "64d6266539c834f942b18c4b",
                "userRating": 3,
                "_id": "64d626a839c834f942b18c75"
            }
        ],
        "__v": 0
      },
      ]

test("should have only 1 input field and 1 label with text 'Brand Name:'",async () => {

    let getAllWatchesBeforeSearchSpy;
    let getWatchesBeforeSearchActionSpy;

    await act(async() => {
    
        getAllWatchesBeforeSearchSpy = jest.spyOn(watchService,'getAllWatchesBeforeSearch').mockResolvedValue({data: mockWatches})
        getWatchesBeforeSearchActionSpy = jest.spyOn(watchActions,'getWatchesBeforeSearchAction')
    
        render(
            <Provider store={store}>
            <MemoryRouter>
            <SearchWatches />
            </MemoryRouter>
            </Provider>
        )
    
       })

       const brandNameLabelText = await screen.findByText("Brand Name:")
       const searchInputField = screen.getByRole('textbox')
       const allInputFields = screen.getAllByRole('textbox')

       expect(brandNameLabelText).toBeInTheDocument()
       expect(searchInputField).toBeInTheDocument()
       expect(allInputFields.length).toBe(1)

       getAllWatchesBeforeSearchSpy.mockRestore()
   getWatchesBeforeSearchActionSpy.mockRestore()

})

test("should have button with name 'Search'", async () => {

    let getAllWatchesBeforeSearchSpy;
    let getWatchesBeforeSearchActionSpy;
    
       await act(async() => {
    
        getAllWatchesBeforeSearchSpy = jest.spyOn(watchService,'getAllWatchesBeforeSearch').mockResolvedValue({data: mockWatches})
        getWatchesBeforeSearchActionSpy = jest.spyOn(watchActions,'getWatchesBeforeSearchAction')
    
        render(
            <Provider store={store}>
            <MemoryRouter>
            <SearchWatches />
            </MemoryRouter>
            </Provider>
        )
    
       })

    const searchBtn = screen.getByRole('button',{name:'Search'})
    expect(searchBtn).toBeInTheDocument()

    getAllWatchesBeforeSearchSpy.mockRestore()
   getWatchesBeforeSearchActionSpy.mockRestore()

})

test("should load all existing watches on component initialization", async() => {

let getAllWatchesBeforeSearchSpy;
let getWatchesBeforeSearchActionSpy;

   await act(async() => {

    getAllWatchesBeforeSearchSpy = jest.spyOn(watchService,'getAllWatchesBeforeSearch').mockResolvedValue({data: mockWatches})
    getWatchesBeforeSearchActionSpy = jest.spyOn(watchActions,'getWatchesBeforeSearchAction')

    render(
        <Provider store={store}>
        <MemoryRouter>
        <SearchWatches />
        </MemoryRouter>
        </Provider>
    )

   })
   const firstWatchBrand = await screen.findByText('Brand: Casio')
   const lastWatchBrand = await screen.findByText('Brand: Omega2')
   const searchWatchCards = await screen.findAllByTestId('search-watch-card')

   expect(firstWatchBrand).toBeInTheDocument()
   expect(lastWatchBrand).toBeInTheDocument()
   expect(searchWatchCards.length).toBe(mockWatches.length)

   expect(getAllWatchesBeforeSearchSpy).toHaveBeenCalledTimes(1)
   expect(getWatchesBeforeSearchActionSpy).toHaveBeenCalledTimes(1)

   getAllWatchesBeforeSearchSpy.mockRestore()
   getWatchesBeforeSearchActionSpy.mockRestore()
})

test("clicking 'Search' button with input value of 'Casio' should call searchByBrand() and searchedWatchesAction()" , async() => {

    let getAllWatchesBeforeSearchSpy;
    let getWatchesBeforeSearchActionSpy;
    let searchByBrandSpy;
    let searchedWatchesActionSpy;

   await act(async() => {

    getAllWatchesBeforeSearchSpy = jest.spyOn(watchService,'getAllWatchesBeforeSearch').mockResolvedValue({data: mockWatches})
    getWatchesBeforeSearchActionSpy = jest.spyOn(watchActions,'getWatchesBeforeSearchAction')
    searchByBrandSpy = jest.spyOn(watchService,'searchByBrand')
    searchedWatchesActionSpy = jest.spyOn(watchActions,'searchedWatchesAction')

    render(
        <Provider store={store}>
        <MemoryRouter>
        <SearchWatches />
        </MemoryRouter>
        </Provider>
    )

   })


   await act(async() => {
   let searchInputField = screen.getByRole('textbox')
   fireEvent.change(searchInputField,{target: {value:'Casio'}})
  
  
   })
   
   const searchBtn = screen.getByRole('button',{name:'Search'})
   fireEvent.click(searchBtn)
   
   await waitFor(() => {
    expect(searchedWatchesActionSpy).toHaveBeenCalledTimes(1)
   expect(searchedWatchesActionSpy).toHaveBeenCalledWith('Casio')

   expect(searchByBrandSpy).toHaveBeenCalledTimes(1)
   expect(searchByBrandSpy).toHaveBeenCalledWith('Casio')
   
   })

   getAllWatchesBeforeSearchSpy.mockRestore()
   getWatchesBeforeSearchActionSpy.mockRestore()
   searchByBrandSpy.mockRestore()
   searchedWatchesActionSpy.mockRestore()
  // const brandOmega2 = await screen.findByText('Brand: Omega2')
  // expect(brandOmega2).not.toBeInTheDocument()
})

test("clicking the search button with input value of non existing watch brand should display the text 'not found'" , async() => {

    let getAllWatchesBeforeSearchSpy;
    let getWatchesBeforeSearchActionSpy;
    let searchByBrandSpy;
    let searchedWatchesActionSpy;

   await act(async() => {

    getAllWatchesBeforeSearchSpy = jest.spyOn(watchService,'getAllWatchesBeforeSearch').mockResolvedValue({data: mockWatches})
    getWatchesBeforeSearchActionSpy = jest.spyOn(watchActions,'getWatchesBeforeSearchAction')
    searchByBrandSpy = jest.spyOn(watchService,'searchByBrand').mockResolvedValue({data: []})
    searchedWatchesActionSpy = jest.spyOn(watchActions,'searchedWatchesAction')

    render(
        <Provider store={store}>
        <MemoryRouter>
        <SearchWatches />
        </MemoryRouter>
        </Provider>
    )

   })

   await act(async() => {
   let searchInputField = screen.getByRole('textbox')
   fireEvent.change(searchInputField,{target: {value:'non existing'}})
   })
   
   const searchBtn = screen.getByRole('button',{name:'Search'})
   fireEvent.click(searchBtn)
   
   await waitFor(() => {
    expect(searchedWatchesActionSpy).toHaveBeenCalledTimes(1)
   expect(searchedWatchesActionSpy).toHaveBeenCalledWith('non existing')

   expect(searchByBrandSpy).toHaveBeenCalledTimes(1)
   expect(searchByBrandSpy).toHaveBeenCalledWith('non existing')
   
   })
  
   const notFoundText = await screen.findByText('Not found')
   expect(notFoundText).toBeInTheDocument()

   getAllWatchesBeforeSearchSpy.mockRestore()
   getWatchesBeforeSearchActionSpy.mockRestore()
   searchByBrandSpy.mockRestore()
   searchedWatchesActionSpy.mockRestore()
})

})