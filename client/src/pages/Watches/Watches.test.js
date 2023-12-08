// components/Watches/Watches.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Watches from './Watches';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../services/watchService');

describe('Watches', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
        auth: {
            auth: {
                _id:"",
                email: "",
                accessToken:"",
                isOwner: false
            }
        },
      watches: {
        watches: [
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
        ],
        currentPage: 1,
        itemsPerPage: 5,
        totalPages: 1
      },
      spinner: {
        isLoading: false
      }
    });
  });

  it('renders watches correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
        <Watches />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the component to re-render after the network request
    await screen.findByText(/Casio/i);

    expect(screen.getAllByText(/Casio/i)).toHaveLength(1);
    expect(screen.getAllByText(/Omega/i)).toHaveLength(1);
  });
});