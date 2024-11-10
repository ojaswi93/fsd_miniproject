# WorksApp - A Platform for Unskilled Labor Employment

## Problem Statement

Unemployment among unskilled laborers in India is a significant issue. Many individuals without educational qualifications struggle to find consistent and reliable employment, particularly in an economy where job opportunities are often linked to formal education. This results in a lack of income stability and financial insecurity for a substantial portion of the workforce.

## Proposed Solution

To address this issue, WorksApp will be developed, a specialized platform similar to LinkedIn but tailored specifically for individuals lacking educational qualifications. This website will serve two main functions:

1. **Connecting Startups with Short-term Labor**:

   - **Medium for Employment**: The platform will enable startups to find unskilled labor for short-term tasks that do not require formal education. For example, startups may need workers for temporary jobs like stapling papers or assisting in cooking for a few days. This allows businesses to hire the necessary workforce for specific periods without the need for long-term commitments.

2. **Providing Income Opportunities for Daily Wage Workers**:
   - **Platform for Job Access**: The website will offer daily wage workers a means to find and access short-term job opportunities. This is particularly beneficial for those who rely on daily earnings, providing them with a stable source of income by connecting them to available jobs in their area.

By bridging the gap between startups in need of temporary help and unskilled laborers seeking employment, this website aims to reduce unemployment and provide financial stability for daily wage workers.

## Wireframing

This section outlines the key features, functionalities, and web pages that will be included in the WorksApp platform.

### Key Features

1. **User Registration and Profile Creation**
2. **Job Posting and Search**:
   - **Job Listings**: Employers can post jobs specifying duration, tasks, and pay.
   - **Job Search**: Workers can search and filter jobs based on location, type, and duration.
3. **Application and Hiring**:
   - **Job Applications**: Workers can apply for jobs directly through the platform.
   - **Hiring Management**: Employers can review applications and hire workers.
4. **Communication and Notification**
5. **Support and FAQ**

### Web Pages

1. **Home Page**
2. **Registration and Login Pages**
3. **Worker Dashboard**
4. **Employer Dashboard**
5. **Company Profile Page**
6. **Worker Profile Page**
7. **Read More Pages for Worker and Employer**

## Additional Implementation: Password Encryption

### Overview

Password encryption is a crucial security measure to protect user credentials, ensuring that sensitive information is stored securely and is not easily compromised. In WorksApp, password encryption will be implemented using bcrypt, a widely-used algorithm designed specifically for securing passwords.

### Benefits

- **Enhanced Security**: By encrypting passwords, WorksApp prevents unauthorized access to user accounts, safeguarding both worker and employer data. It is challenging for attackers to guess passwords, even if they gain access to the hashed passwords.
- **Salting to Prevent Rainbow Table Attacks**: Each password is salted with a unique, random value, making it impractical for attackers to use precomputed hash tables, such as rainbow tables, to crack the passwords. 
- **Protection Against Brute-Force Attacks**: Bcrypt is designed to be resistant to brute-force attacks due to its slower hashing speed, deterring attackers from trying a high volume of guesses in a short time.
