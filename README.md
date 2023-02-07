## Next-Auth Apple Bug Troubleshooting

This example is to help showcase a bug with Apple. You are unable to link an Apple account to an existing Google account.
If you link an account to an existing Apple account, the two are linked correctly.

### Steps to Setup Project

1. Perform a yarn install
2. Configure .env file to include Apple and Google project parameters. Look at .env.example for help.
3. Add localhost.gov to your hosts file or use a domain name acceptable to both Apple and Google
4. Create a certificates folder in the project and add the localhost.crt and localhost.key

TIP: Your NEXTAUTH_URL variable in your env file should be whatever you spoofed your localhost 
as **(e.g. https://localhost.gov:3000)**.

TIP: Your callback urls in your Google and Apple projects need to be whatever you spoof your localhost 
as **(e.g. https://localhost.gov:3000/api/auth/callback/google)**.