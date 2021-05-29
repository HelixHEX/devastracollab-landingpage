// export const baseURL = 'http://192.168.1.219userId/api/v1/freelancer'
import { loadStripe } from '@stripe/stripe-js'

export const baseURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? `http://192.168.1.219:5000/api/v1/` : 'https://www.astracollab.app/api/v1/'
export const frontendApi = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'clerk.u656v.yqagd.lcl.dev' : 'clerk.astracollab.app'
export const stripePromise = loadStripe('pk_test_51Ipg6YDWFqSlSGgFnEzG8oAJNQjdlX8pZpoC3BeEI1JxKRdMuvbWlMtf98VqHX03sgeTvDIphdQN81kEwIlsB1vY00EROIE784')
 