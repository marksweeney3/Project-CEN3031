# CEN3031 Web App Project
### Mark Sweeney, Shelton Joseph, Jackson Culbreth

## Web stack: MERN
- Database: MySQL
- Frontend + Backend: Express + React
- Networking: Node.js

## Solution Description
Our product will be called GatorStudyCentral, a web app for UF Students to find study groups


A gap experienced by many students at UF is networking with students in their field of study and specifically their current classes. Many classes are not designed in such a way that fosters in-class student-to-student interactions, and many students find that they are not often registered for classes with their primary friend group.


### Specifications
- **Authentication**: User authentication will be developed utilizing password hashing for frontend ⇔ backend communication
- **Database**: Utilizing MySQL we can store the adequate data in a hierarchical format with many local and cloud hosting options
- **Operations**: Users will be able to browse subject categories, current UF classes, study spaces, and fellow users. Users will be able to add other uses as friends, create a study session, and query available study sessions.
### Expectations
- **Data**: We will include real data, either scraped or API-obtained, of UF’s classes so users can add their current classes to their profile
- **Registration**: A new user can make a new account if they are a UF student. Since we probably can’t access UF’s UFID database, we will use a simple check that the provided email ends with “ufl.edu”
Admin/test accounts will not have this requirement since we need sample users to test the product
- **UI**: A user-friendly and easy to navigate UI will be designed
Aesthetics
An easy-to-read style scheme will be applied to direct users to important information on each page
- **Dynamic**: Utilizing React and Express will provide sufficiently dynamic content
