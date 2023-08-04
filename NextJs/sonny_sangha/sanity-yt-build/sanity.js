import App from './groc_2_mysql/api/App'

const client = App()

export const sanityClient = client.db()