import React, { useEffect } from 'react'

import { BrowserRouter as Router, useHistory, Switch, Route, useParams } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

//General
import Welcome from './Pages/Welcome'
import Privacy from './Pages/Privacy'

//Freelancer
import { default as FreelancerDashboard } from './Pages/Freelancer/Dashboard'
import Signup from "./Pages/Freelancer/Signup";
import Signin from "./Pages/Freelancer/Signin";
import { default as FreelancerProject } from './Pages/Freelancer/Project'
import { default as FreelancerChat } from './Pages/Freelancer/Chat'
import { default as FreelancerMoney } from './Pages/Freelancer/Stripe'


//Team
import { default as TeamSignup } from './Pages/Team/Signup'
import { default as TeamCheckout } from './Pages/Team/Checkout'

//client
import { default as ClientDashboard } from './Pages/Client/Dashboard'
import { default as ClientProject } from './Pages/Client/Project'
import { default as ClientChat } from './Pages/Client/Chat'
// import { AcceptInviteSignedin, AcceptInviteSignup } from './Pages/Client/AcceptInvite'
import InviteSignup from './Pages/Client/InviteSignup'
import AcceptInviteSignedin from './Pages/Client/AcceptInviteSignedin'

import { baseURL, frontendApi } from './utils/globalVar'
// import axios from 'axios';

// import { accountTypeSelector, accountTypeAtom } from './utils/atom'
// import { useRecoilState } from 'recoil'
import axios from 'axios';

import {Text} from '@chakra-ui/react'

axios.defaults.withCredentials = true

export const AccountType = () => {
  const user = useUser()
  useEffect(() => {
    window.location.href = `/${user.publicMetadata.type}`
  })
  return null
}

export const ClientSignup = () => {
  const user = useUser()
  const { id, email } = useParams()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'client/createaccount', {
        id: user.id
      }).then(res => {
        if (res.data.success || res.data.error === 'User exists') {
          window.location.href = `/client/project/${id}/invite/${email}`
        } else {
          window.location.href = '/'
        }
      })
    }
    main()
  })
  return null
}

export const TeamUpdateUser = () => {
  const user = useUser()
  const {plan} = useParams()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'team/updateuser', {
        id: user.id,
        plan
      }).then(() => {
        window.location.href = '/'
      })
    }
    main()
  })
  return null
}

export const FreelancerSignup = () => {
  const user = useUser()
  useEffect(() => {
    const main = async () => {
      await axios.post(baseURL + 'freelancer/createaccount', {
        id: user.id
      }).then(() => {
        window.location.href = '/'
      })
    }
    main()
  })
  return null
}

// export const TeamCheckout = () => {
//   return (
//     <>
//     <Text color='white'>Test</Text>
//     </>
//   )
// }

const App = () => {


  return (
    <Router forceRefresh={false} >
      <Switch>
        <ClerkProviderWithNavigate>
          <SignedIn>

            <Route exact path="/" render={(props) => <AccountType {...props} />} />

            {/* freelancers */}
            <Route exact path="/freelancer" render={(props) => <FreelancerDashboard {...props} />} />
            <Route exact path='/freelancer/project/:id' render={(props) => <React.Suspense fallback={null}> <FreelancerProject {...props} /></React.Suspense>} />
            <Route exact path="/freelancer/signup" render={(props) => <FreelancerSignup {...props} />} />
            <Route exact path="/freelancer/chat" render={(props) => <FreelancerChat {...props} />} />
            <Route exact path="/freelancer/chat/default" render={(props) => <FreelancerChat {...props} />} />
            <Route exact path="/freelancer/stripe" render={(props) => <FreelancerMoney {...props} />} />

            {/* Teams */}
            <Route exact path="/team/updateuser/:plan" render={(props) => <TeamUpdateUser {...props} />} />
            <Route exact path="/team/stripecheckout/:plan" render={(props) => <TeamCheckout {...props} />} />
            
            {/* clients */}
            <Route exact path="/client" render={(props) => <ClientDashboard {...props} />} />
            <Route exact path='/client/project/:id' render={(props) => <React.Suspense fallback={null}> <ClientProject {...props} /></React.Suspense>} />

            <Route exact path='/client/project/:id/invite/:email' render={(props) => <AcceptInviteSignedin {...props} />} />
            <Route exact path="/client/project/:id/signup/:email" render={(props) => <ClientSignup {...props} />} />

            <Route exact path="/client/chat/default" render={(props) => <ClientChat {...props} />} />
          </SignedIn>
          <SignedOut>
            <Route exact path='/client/project/:id/invite/:email' render={(props) => <InviteSignup {...props} />} />
            <Route exact path="/" render={(props) => <Welcome {...props} />} />
            <Route exact path="/team/signup/:plan" render={(props) => <TeamSignup {...props} />} />
          </SignedOut>
          <Route exact path="/signin" render={(props) => <Signin {...props} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} />} />
          <Route exact path='/privacy' render={(props) => <Privacy {...props} />} />
        </ClerkProviderWithNavigate>
      </Switch>
    </Router>
  );
}

const ClerkProviderWithNavigate = ({ children }) => {
  const { push } = useHistory();
  return (
    <ClerkProvider
      frontendApi={frontendApi}
      // "clerk.8ldah.hb3ja.lcl.dev"
      navigate={(to) => {
        return push(to);
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default App