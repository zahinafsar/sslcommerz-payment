## After cloning the repo follow the steps below:-
### step 1: install [ngrok](https://ngrok.com/)
### step 2: open CMD and run 
  $``ngrok http 4000``
### step 3: copy the forwarded url given by ngrok
### step 4: replace the ipn_url(in initiatePaypent file) with --forwarded url--/sslcommerz/ipn
### step 5: open another CMD and locate the repo folder and run 
  $``npm run install-c``
  $``npm run dev``

