import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
// import Fetch from '../fetch';

// mock server with msw
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    })
)

// start mock server before any tests begin
beforeAll(() => server.listen())

// reset handlers after each test
afterEach(() => server.resetHandlers())

// cleanup after all tests are finished
afterAll(() => server.close())

// displays an error message on server error 500
test('displays error message on server error 500', async()=>{
    server.use(
        rest.get('/testurl',(req, res, ctx)=>{
            return res(ctx.status(500))
        })
    )

    render(<App url="/testurl" />)

    await waitFor(()=>screen.getByRole('alert'))

    expect(screen.getByRole('alert')).toHaveTextContent('Server Error')
})





