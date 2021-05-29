import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useUser } from "@clerk/clerk-react";

import axios from 'axios'

import { baseURL, } from '../../utils/globalVar'
import { Text } from '@chakra-ui/layout';

import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_51HA3pcBLzTCeZRo6ryIyFBBa3vqgDxWx4kZs5p7EGUtgJqRp5YaOWXofr2382HM91vrH1s0DDSER8zreTABXxo4f00bY1HEX7p')

const Checkout = () => {
  const { plan } = useParams()
  const user = useUser()
  useEffect(() => {
    
    const main = async () => {
      // alert('hi')
      const stripe = await stripePromise
      if (plan === 'premium') {
        const priceId = 'price_1Iw7szBLzTCeZRo6BVENGKxS'
        await axios.post(baseURL + 'stripe/create-checkout-session', {
          priceId: 'price_1Iw7szBLzTCeZRo6BVENGKxS'
        }).then(res => {
          // if (res.data.success) {
          stripe.redirectToCheckout({ sessionId: res.data.sessionId }).then(res => alert(res))
          // alert(res.data.sessionId)
          // }
        })
      }
    }
    main()
  }, [])
  return (
    <>
      <Text color='white'>Test 2</Text>
    </>
  )
}

export default Checkout