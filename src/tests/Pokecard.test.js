import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Pokecard from '../components/Pokecard';
import pokecardMock from './PokecardMock';

jest.mock('axios');

// Props mockados
const urlMock = "https://pokeapi.co/api/v2/pokemon/2"

const openModalMock = jest.fn();

// Resposta do axios.get mockada
const axiosResponseMock = {
    data: pokecardMock
}

describe("Pokecard", () => {
    test("Card renderiza", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}
        />)

        const loading = screen.getByText(/loading\.\.\./i);
        expect(loading).toBeInTheDocument();

        // screen.logTestingPlaygroundURL();

        await waitFor(() => {});
    })

    test("Card renderiza após o carregamento", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}
        />)

        const loading = screen.getByText(/loading\.\.\./i)

        await waitFor(() => {
            const title = screen.getByRole('heading', { name: /ivysaur/i });
            const img = screen.getByRole('img', { name: /ivysaur/i });
            const typeA = screen.getByText(/grass/i);
            const typeB = screen.getByText(/poison/i);
            
            expect(title).toBeInTheDocument();
            expect(img).toBeInTheDocument();
            expect(typeA).toBeInTheDocument();
            expect(typeB).toBeInTheDocument();
            expect(loading).not.toBeInTheDocument();
        });

        screen.logTestingPlaygroundURL()
    })
})