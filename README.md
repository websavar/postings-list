# Postings List App 
- [Goal](#goal)
- [User Stories](#user-stories)
- [Scenario](#scenario)
- [Public API](#public-api)
- [Setup and Run](#setup-run)

<a name="#goal"></a>
## Goal
Develop an application that displays a list and details of postings which are available via [Public API](#public-api).

<a name="#user-stories"></a>
## User stories
- as a candidate, I want to see list of postings published by server
- as a candidate, I want to filter postings published by `country` and `department`
- as a candidate, I want to see `jobDescription` and `jqualifications` of postings published

<a name="#scenario"></a>
## Scenario
1. Open `localhost:8080`
2. Postings list loads
3. Candidate filter list by country and department
4. List displays only filtered elements
5. Click an item on the list
6. Posting details containing `jobDescription` and `jqualifications` section opens
7. Click `backlink` to return to the list

### Posting details contatining `jobAd.sections.jobDescription` and `jobAd.sections.jqualifications` section

<a name="#public-api"></a>
## Public API
### Get list of postings
```GET  https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings``` 

Demo: https://reqbin.com/fjiq2zrg
Documentation: https://dev.smartrecruiters.com/customer-api/posting-api/endpoints/postings/

### Get posting details
```GET https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings/{postingID}```

Demo: https://reqbin.com/sghcu97n       
Documentation: https://dev.smartrecruiters.com/customer-api/posting-api/endpoints/postingcontent/

### List of departments
```GET https://api.smartrecruiters.com/v1/companies/smartrecruiters/departments```

Documentation: https://dev.smartrecruiters.com/customer-api/live-docs/posting-api/#/postings/v1.listDepartments

### List of countries
The countries dictionary is not yet exposed through Public API, but you can obtain the list using your preferred API, for example - https://restcountries.eu/

<a name="#setup-run"></a>
## Setup and run
1. Run `npm install` to install required dependencies
2. Run `npm run start` to run the project and Open http://localhost:8080
4. Run `live server` to prepare to run the test directly in the browser
3. Run `npm test` (in new terminal) to run the end to end testing