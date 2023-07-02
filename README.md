# SIC Quiz to assess workplace accessibility

## Roadmap for Admin page
- [X] Create basic web traffic analytics
  - [X] visits
    - [X] send a visit to database
    - [X] visualize visits
  - [X] Quiz results analytics:
    - [X] Send quiz results to database
    - [X] Create data visualization page
  - [X] Contact form submits
    - [X] send contact submitted to database
    - [X] visualize submissions
- [ ] Simple CMS
  - [ ] Style dashboard
  - [ ] Updating questions:
    - [ ] create dynamic route to update label or content
    - [ ] state management to keep page up to date with database (recoil or useContext)
  - [ ] Updating results:
    - [ ] Create a view for results
    - [ ] Create database models
    - [ ] dynamic route for updating
    - [ ] state management
- [o] Authentication and Authorization for Admin page
  - [X] page requires email login
  - [ ] add auth to GET routes for analytics etc.
- [ ] Quiz results data model
- [ ] point to quiz.sicofficial.co.uk
  - [ ] `Point quiz CNAME record to ephemeral-kelpie-f9ff28.netlify.app Log in to the account you have with your DNS provider, and add a CNAME record for quiz pointing to ephemeral-kelpie-f9ff28.netlify.app.`
