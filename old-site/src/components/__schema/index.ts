/**
 * XML Page schema for crawling
 */

const schemaScript = document.createElement('script')
schemaScript.type = 'application/ld+json';
document.head.appendChild(schemaScript);
schemaScript.innerHTML = schema();
function schema() {
	if (process.env.DEV) return;
	return schemaScript.innerText = `{ 
  "@context": "http://schema.org",
  "@type": "Person",
  "birthDate":"1984-05-21",
  "callSign":"C1i44",
  "gender":"male",
  "knowsAbout":"Web application and cloud technology",
  "nationality":"South Africa",
  "address": {
    "@type": "text",
    "addressLocality": "Johannesburg",
    "addressRegion": "GP",
    "postalCode": "2191"
  },
  "email": "mailto:me@cliff-crerar.tech",
  "image": "https://photos.app.goo.gl/ztDuVByJEFUPjjsr8",
  "jobTitle": "Software Engineer",
  "name": "Cliff Crerar",
  "url": "http://cliff-crerar.tech",
  "description":"iCode

I develop software. I love coding, it's my hobby as well as my Job. My weapon of choice is JavaScript, it is the kind of application development. Front End, Middleware, Databases, Web apps, Desktop Apps, Progressive Apps, Mobile Apps, App Tools, Frameworks it is definitively the language as well as what is under the hood of some other languages like TypeScript. Except for that, I am considered an expert with SQL among my peers and I have some experience with the .net core.

iBuild

What I build most is my knowledge about technology. I do this mostly by self-study every day, sometimes a lot, sometimes a little. My favorite topic is Cloud technology and most a lot of time exploring Azure, GCP, and AWS. I regularly deploy resources on ZEIT because it is an open-source cloud. Anything I don't know I learn fast especially if I find it interesting which is almost everything related to tech.

iSolve

One of my motivators for learning on a daily basis is to enable myself to solve problems. As solutions architect my job is to solve problems, the more I know the better I solve complex problems, the more problems I solve the better I get at solving problems not yet encountered before. Although I develop software and I can use cloud tech, I do not see myself as a software engineer nor cloud smith. Yes, these are my passion. However; solving problems with tech is my major.

Skills:

HTML, CSS, JavaScript/jQuery, React, Angular, Node.js, SQL/NoSQL, UML, IaaS, SaaS, IoT, Git, Erp Systems, Accounting, Agile, Learning, Soft Skills, Rest API, Requirements Gathering, Excel, Power-Point, Teacher.

I have a deep understanding of

Relational Databases, the history of how it came to be, what it was 30 years ago and what it is now, what are the different components and how they function together, what enables it to be distributed, how it keeps data consistent what enables it to do disaster recovery. I have experience with SQL Server, Oracle, PostgreSQL some MySQL and MariaDB.
User interface design and designing for User Experience, For this I have spent extensive time studying the topic academically, and furthermore what the modern web is. I have self-studied Google’s Material Design principles. Includes exploring the web looking at what designers are doing critically evaluating their work to differentiate what works from what looks shiny.
My most outstanding achievement is self-managing my own, legitimate, secure and functioning email exchange, in the cloud, using open source tech with my own domain, on a very small server (1 core, 1 gig ram), in a command-line environment. Yes, it has gone down once or twice in the last two years but that was because of the stupid webmaster (me). No spammer or trolls has broken in yet despite being under attack all the time. But I must attribute some of my success to my cloud service provider’s security standards."
}`;
}


