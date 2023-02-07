import Layout from "../components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>

      <p>
        This example is to help showcase a bug with Apple. If you sign in with a provider that is not Apple, and then proceed to 
        link an Apple account to your signed in account, the result is a second user being created instead of the Apple account being
        linked/tied to the original account that was signed in.
      </p>
      <p>
        Intentional behavior is that the two accounts are linked under a single user, not have two users.
      </p>
      <p>
        If you sign in with Apple first and then proceed to sign in with another provider to link the two accounts, the intended behavior
        takes place, and the two accounts are tied under a single user.
      </p>
      <div style={{ marginTop: '1rem' }}>
        <h3>Get Started</h3>
        <p>
          In order to get started with this reproduction, you need to setup env variables for Google (googleid and google_secret) and
          Apple (your apple id e.g. com.mytestapp and apple secret). For the correct Apple secret, you need to generate a unique JWT that
          consists of several project parameters in your Apple dev console. In this project, look for the apple-generate-secret.mjs to
          generate this JWT secret.
        </p>
        <p>
          Apple also requires your local environment be HTTPS, so you will need to follow this guide in order to get your hosts file and
          certificates configured: <a href='https://next-auth.js.org/providers/apple#host-name-resolution' target='_blank'>Click here</a>
        </p>
        <p>
          TIP: Your NEXTAUTH_URL variable in your env file should be whatever you spoofed your localhost 
          as <strong>(e.g. https://localhost.gov:3000)</strong>.
        </p>
        <p>
          TIP: Your callback urls in your Google and Apple projects need to be whatever you spoof your localhost 
          as <strong>(e.g. https://localhost.gov:3000/api/auth/callback/google)</strong>.
        </p>
      </div>
    </Layout>
  )
}
